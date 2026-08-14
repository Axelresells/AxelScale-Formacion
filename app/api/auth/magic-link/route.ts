import { type NextRequest, NextResponse } from "next/server"
import { createMagicLink, sendMagicLinkEmail } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Email es requerido" },
        { status: 400 }
      )
    }

    const cleanEmail = email.trim().toLowerCase()

    const token = await createMagicLink(cleanEmail)
    const magicUrl = await sendMagicLinkEmail(cleanEmail, token)

    return NextResponse.json({
      success: true,
      message: "Magic link sent",
      magicUrl: process.env.NODE_ENV === "development" ? magicUrl : undefined,
    })
  } catch (error) {
    console.error("Error creating magic link:", error)

    return NextResponse.json(
      { error: "Error al enviar el magic link" },
      { status: 500 }
    )
  }
}
