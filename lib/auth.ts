import { db } from "./db"
import { randomBytes } from "crypto"
import { Resend } from "resend"

const SUPER_ADMIN_EMAIL = "benjacostm100@gmail.com"

// Lazy loading de Resend - safe mode como Stripe
let resendInstance: Resend | null = null

function getResend(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY

  if (!apiKey) {
    console.warn("[Resend] RESEND_API_KEY no configurada - emails deshabilitados")
    return null
  }

  if (!resendInstance) {
    resendInstance = new Resend(apiKey)
  }

  return resendInstance
}

export async function createMagicLink(email: string) {
  const token = randomBytes(32).toString("hex")
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000) // 15 minutes

  console.log("[v0] Creating magic link for:", email)
  console.log("[v0] Token:", token)
  console.log("[v0] Expires at:", expiresAt)

  await db.magicLink.create({
    data: {
      token,
      email,
      expiresAt,
    },
  })

  return token
}

export async function verifyMagicLink(token: string) {
  console.log("[v0] Verifying magic link token:", token)

  const magicLink = await db.magicLink.findUnique({
    where: { token },
  })

  if (!magicLink) {
    console.log("[v0] ❌ Token not found in database")
    return { valid: false, error: "Invalid token - not found in database" }
  }

  console.log("[v0] Magic link found:", {
    email: magicLink.email,
    used: magicLink.used,
    expiresAt: magicLink.expiresAt,
    now: new Date(),
  })

  if (magicLink.used) {
    console.log("[v0] ❌ Token already used")
    return { valid: false, error: "Token already used" }
  }

  if (magicLink.expiresAt < new Date()) {
    console.log("[v0] ❌ Token expired")
    return { valid: false, error: "Token expired" }
  }

  // Mark as used
  await db.magicLink.update({
    where: { token },
    data: { used: true },
  })

  console.log("[v0] ✅ Token marked as used")

  // Determine role: ADMIN for super admin email, USER otherwise
  const role = magicLink.email === SUPER_ADMIN_EMAIL ? "ADMIN" : "USER"

  // Create or get user
  let user = await db.user.findUnique({
    where: { email: magicLink.email },
  })

  if (!user) {
    console.log("[v0] Creating new user with email:", magicLink.email, "role:", role)
    user = await db.user.create({
      data: {
        email: magicLink.email,
        role,
      },
    })
  } else {
    // Update role if this is the super admin and role is not set
    if (magicLink.email === SUPER_ADMIN_EMAIL && user.role !== "ADMIN") {
      console.log("[v0] Updating super admin role")
      user = await db.user.update({
        where: { id: user.id },
        data: { role: "ADMIN" },
      })
    }
  }

  console.log("[v0] ✅ User authenticated:", { id: user.id, email: user.email, role: user.role })

  return { valid: true, user }
}

export async function sendMagicLinkEmail(email: string, token: string) {
  const magicUrl = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/verify?token=${token}`

  console.log("[v0] Magic link generated for:", email)
  console.log("[v0] Magic link URL:", magicUrl)

  const resend = getResend()

  if (!resend) {
    console.warn("[Resend] Email no configurado - solo logging del magic link")
    console.log("[v0] 📧 Magic link (desarrollo):", magicUrl)
    return magicUrl
  }

  const emailFrom = process.env.EMAIL_FROM

  if (!emailFrom) {
    console.error("[Resend] EMAIL_FROM no configurado")
    console.log("[v0] 📧 Magic link (desarrollo):", magicUrl)
    return magicUrl
  }

  try {
    const { data, error } = await resend.emails.send({
      from: emailFrom,
      to: email,
      subject: "Tu acceso a AxelScale",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #f4f4f4;
              }
              .container {
                background-color: #ffffff;
                border-radius: 8px;
                padding: 40px;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
              }
              .logo {
                text-align: center;
                margin-bottom: 30px;
              }
              .logo h1 {
                color: #DAA520;
                font-size: 32px;
                margin: 0;
                font-weight: bold;
              }
              .content {
                margin: 30px 0;
              }
              .button {
                display: inline-block;
                padding: 14px 32px;
                background: linear-gradient(135deg, #DAA520 0%, #B8860B 100%);
                color: #ffffff !important;
                text-decoration: none;
                border-radius: 8px;
                font-weight: 600;
                margin: 20px 0;
                text-align: center;
              }
              .button:hover {
                background: linear-gradient(135deg, #B8860B 0%, #DAA520 100%);
              }
              .footer {
                margin-top: 40px;
                padding-top: 20px;
                border-top: 1px solid #e0e0e0;
                font-size: 12px;
                color: #888;
                text-align: center;
              }
              .warning {
                background-color: #fff3cd;
                border-left: 4px solid #DAA520;
                padding: 12px;
                margin: 20px 0;
                border-radius: 4px;
                font-size: 14px;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="logo">
                <h1>AXELSCALE</h1>
              </div>
              
              <div class="content">
                <h2 style="color: #333; margin-bottom: 20px;">¡Hola! 👋</h2>
                <p>Has solicitado acceder a tu cuenta de <strong>AxelScale</strong>.</p>
                <p>Haz clic en el botón de abajo para iniciar sesión de forma segura:</p>
                
                <div style="text-align: center; margin: 30px 0;">
                  <a href="${magicUrl}" class="button">
                    🔐 Acceder a AxelScale
                  </a>
                </div>
                
                <div class="warning">
                  <strong>⚠️ Importante:</strong> Este enlace es válido por <strong>15 minutos</strong> y solo puede usarse una vez.
                </div>
                
                <p style="font-size: 14px; color: #666;">
                  Si no solicitaste este acceso, puedes ignorar este email de forma segura.
                </p>
              </div>
              
              <div class="footer">
                <p>© ${new Date().getFullYear()} AxelScale. Todos los derechos reservados.</p>
                <p>Este es un email automático, por favor no respondas a este mensaje.</p>
              </div>
            </div>
          </body>
        </html>
      `,
    })

    if (error) {
      console.error("[Resend] Error enviando email:", error)
      console.log("[v0] 📧 Fallback - Magic link (desarrollo):", magicUrl)
      return magicUrl
    }

    console.log("[Resend] ✅ Email enviado exitosamente:", data?.id)
    return magicUrl
  } catch (error) {
    console.error("[Resend] Exception enviando email:", error)
    console.log("[v0] 📧 Fallback - Magic link (desarrollo):", magicUrl)
    return magicUrl
  }
}

export async function sendPaymentConfirmationEmail(
    email: string,
    plan: string
) {
    const resend = getResend()

    if (!resend) {
        console.warn("[Resend] Email no configurado - solo logging de confirmación")
        console.log("[v0] 📧 Confirmación de pago para:", email, "Plan:", plan)
        return
    }

    const emailFrom = process.env.EMAIL_FROM

    if (!emailFrom) {
        console.error("[Resend] EMAIL_FROM no configurado")
        return
    }

    const planNames: Record<string, string> = {
        monthly: "1 Mes",
        quarterly: "3 Meses",
        annual: "12 Meses",
    }

    const planName = planNames[plan] || plan

    try {
        const { data, error } = await resend.emails.send({
            from: emailFrom,
            to: email,
            subject: "¡Pago confirmado! Bienvenido a AxelScale",
            html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #f4f4f4;
              }
              .container {
                background-color: #ffffff;
                border-radius: 8px;
                padding: 40px;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
              }
              .logo {
                text-align: center;
                margin-bottom: 30px;
              }
              .logo h1 {
                color: #DAA520;
                font-size: 32px;
                margin: 0;
                font-weight: bold;
              }
              .success-icon {
                text-align: center;
                font-size: 64px;
                margin: 20px 0;
              }
              .content {
                margin: 30px 0;
              }
              .info-box {
                background-color: #f8f9fa;
                border-radius: 8px;
                padding: 20px;
                margin: 20px 0;
              }
              .info-row {
                display: flex;
                justify-content: space-between;
                padding: 10px 0;
                border-bottom: 1px solid #e0e0e0;
              }
              .info-row:last-child {
                border-bottom: none;
              }
              .info-label {
                font-weight: 600;
                color: #666;
              }
              .info-value {
                color: #333;
              }
              .button {
                display: inline-block;
                padding: 14px 32px;
                background: linear-gradient(135deg, #DAA520 0%, #B8860B 100%);
                color: #ffffff !important;
                text-decoration: none;
                border-radius: 8px;
                font-weight: 600;
                margin: 20px 0;
                text-align: center;
              }
              .footer {
                margin-top: 40px;
                padding-top: 20px;
                border-top: 1px solid #e0e0e0;
                font-size: 12px;
                color: #888;
                text-align: center;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="logo">
                <h1>AXELSCALE</h1>
              </div>
              
              
              <div class="content">
                <h2 style="color: #333; text-align: center; margin-bottom: 20px;">
                  ¡Pago Confirmado!
                </h2>
                <p style="text-align: center; font-size: 16px;">
                  Tu suscripción a <strong>AxelScale</strong> ha sido activada correctamente.
                </p>
                
                <div class="info-box">
                  <div class="info-row">
                    <span class="info-label">Email:</span>
                    <span class="info-value">${email}</span>
                  </div>
                </div>
                
                
                <div style="text-align: center; margin: 30px 0;">
                  <a href="${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/app" class="button">
                    Acceder a la Plataforma
                  </a>
                </div>
                <div style="text-align: center; margin: 20px 0;">
                  <a href="https://discord.gg/dESsRhG3" class="button" style="background: linear-gradient(135deg, #5865F2 0%, #4752C4 100%);">
                    Únete a Discord
                  </a>
                </div>
                
              </div>
              
              <div class="footer">
                <p>© ${new Date().getFullYear()} AxelScale. Todos los derechos reservados.</p>
                <p>Gracias por confiar en nosotros para tu crecimiento profesional.</p>
              </div>
            </div>
          </body>
        </html>
      `,
        })

        if (error) {
            console.error("[Resend] Error enviando confirmación:", error)
            return
        }

        console.log("[Resend] ✅ Email de confirmación enviado:", data?.id)
    } catch (error) {
        console.error("[Resend] Exception enviando confirmación:", error)
    }
}

