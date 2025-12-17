/**
 * Script de prueba para Resend
 * 
 * Ejecutar con: npx tsx scripts/test-resend.ts
 */

import { Resend } from "resend"

const RESEND_API_KEY = process.env.RESEND_API_KEY || "re_ZQULjaLF_Pnw6TYhi6eb1gjqJjb8h7qcr"
const EMAIL_FROM = process.env.EMAIL_FROM || "onboarding@resend.dev"
const TEST_EMAIL = "floppodsshopify@gmail.com" // Email de la cuenta Resend (único permitido sin dominio verificado)

async function testResend() {
  console.log("🧪 Testeando Resend...")
  console.log("─".repeat(50))
  console.log("📧 From:", EMAIL_FROM)
  console.log("📧 To:", TEST_EMAIL)
  console.log("🔑 API Key:", RESEND_API_KEY.substring(0, 10) + "...")
  console.log("─".repeat(50))

  const resend = new Resend(RESEND_API_KEY)

  try {
    const { data, error } = await resend.emails.send({
      from: EMAIL_FROM,
      to: TEST_EMAIL,
      subject: "🧪 Test - Tu acceso a AxelScale",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
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
              .logo h1 {
                color: #DAA520;
                font-size: 32px;
                margin: 0;
                text-align: center;
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
              }
              .success {
                background-color: #d4edda;
                border-left: 4px solid #28a745;
                padding: 12px;
                margin: 20px 0;
                border-radius: 4px;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="logo">
                <h1>AXELSCALE</h1>
              </div>
              
              <h2>✅ Test de Resend Exitoso</h2>
              <p>Este es un email de prueba para verificar la configuración de Resend.</p>
              
              <div style="text-align: center;">
                <a href="http://localhost:3000/app" class="button">
                  🚀 Ir a AxelScale
                </a>
              </div>
              
              <div class="success">
                <strong>✓ Configuración correcta</strong><br>
                Los emails de magic link funcionarán correctamente.
              </div>
              
              <p style="font-size: 12px; color: #888; margin-top: 30px;">
                Email enviado: ${new Date().toLocaleString('es-ES')}
              </p>
            </div>
          </body>
        </html>
      `,
    })

    if (error) {
      console.error("❌ Error enviando email:", error)
      process.exit(1)
    }

    console.log("✅ Email enviado exitosamente!")
    console.log("📨 ID del email:", data?.id)
    console.log("─".repeat(50))
    console.log("🎉 Revisa tu bandeja de entrada:", TEST_EMAIL)
  } catch (error) {
    console.error("❌ Exception:", error)
    process.exit(1)
  }
}

testResend()
