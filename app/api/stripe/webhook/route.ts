import { type NextRequest, NextResponse } from "next/server"
import { getStripe } from "@/lib/stripe"
import { db } from "@/lib/db"
import type Stripe from "stripe"
import { sendPaymentConfirmationEmail } from "@/lib/auth"

export const dynamic = "force-dynamic"

// === CONFIG SIMPLE DE DÍAS POR PLAN ===
const PLAN_DAYS: Record<string, number> = {
  monthly: 30,
  quarterly: 90,
  annual: 365,
}

export async function POST(request: NextRequest) {
  const stripe = getStripe()

  if (!stripe) {
    console.error("[Stripe Webhook] Stripe no configurado")
    return NextResponse.json({ error: "Stripe no configurado" }, { status: 501 })
  }

  const body = await request.text()
  const signature = request.headers.get("stripe-signature")

  if (!signature) {
    console.error("[Stripe Webhook] No signature header")
    return NextResponse.json({ error: "No signature" }, { status: 400 })
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

  if (!webhookSecret) {
    console.error("[Stripe Webhook] STRIPE_WEBHOOK_SECRET no configurado")
    return NextResponse.json(
      { error: "Webhook secret no configurado" },
      { status: 500 }
    )
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (err: any) {
    console.error("[Stripe Webhook] Signature verification failed:", err.message)
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
  }

  console.log("[Stripe Webhook] Processing event:", event.type)

  try {
    switch (event.type) {
      // =====================================================
      // ✅ EVENTO ÚNICO IMPORTANTE
      // =====================================================
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session

        const email = session.customer_email || session.metadata?.email
        const plan = session.metadata?.plan

        if (!email || !plan) {
          console.error("[Stripe Webhook] Missing email or plan", {
            email,
            plan,
          })
          return NextResponse.json({ error: "Invalid session data" }, { status: 400 })
        }

        console.log("[Stripe Webhook] Checkout completed:", { email, plan })

        // Buscar o crear usuario
        let user = await db.user.findUnique({
          where: { email },
          include: { subscription: true },
        })

        if (!user) {
          user = await db.user.create({
            data: {
              email,
              role: "USER",
              name: session.customer_details?.name || null,
            },
          })
          console.log("[Stripe Webhook] User created:", user.id)
        }

        // === CÁLCULO SIMPLE DE FECHA ===
        const days = PLAN_DAYS[plan] ?? 30
        const now = new Date()

        // Si ya tiene una suscripción activa, se suma desde ahí
        let baseDate = now
        if (
          user.subscription &&
          user.subscription.currentPeriodEnd &&
          user.subscription.currentPeriodEnd > now
        ) {
          baseDate = user.subscription.currentPeriodEnd
        }

        const currentPeriodEnd = new Date(
          baseDate.getTime() + days * 24 * 60 * 60 * 1000
        )

        console.log("[Stripe Webhook] 📅 Access granted until:", {
          plan,
          days,
          currentPeriodEnd: currentPeriodEnd.toISOString(),
        })

        // Crear o actualizar subscription (LICENCIA POR TIEMPO)
        await db.subscription.upsert({
          where: { userId: user.id },
          create: {
            userId: user.id,
            plan,
            status: "active",
            stripeCustomerId: (session.customer as string) || "",
            stripeSubscriptionId: session.subscription
              ? (session.subscription as string)
              : "",
            currentPeriodEnd,
          },
          update: {
            plan,
            status: "active",
            currentPeriodEnd,
          },
        })

        console.log("[Stripe Webhook] ✅ Subscription updated correctly")
        await sendPaymentConfirmationEmail(email, plan)

        break
      }

      // =====================================================
      // 🔕 EL RESTO SE IGNORA (NO AFECTA ACCESO)
      // =====================================================
      default:
        console.log("[Stripe Webhook] Ignored event:", event.type)
    }

    return NextResponse.json({ received: true })
  } catch (error: any) {
    console.error("[Stripe Webhook] Error processing webhook:", error)
    return NextResponse.json(
      { error: error.message || "Webhook error" },
      { status: 500 }
    )
  }
}
