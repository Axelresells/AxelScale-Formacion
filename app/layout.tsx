import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

export const metadata: Metadata = {
  title: "AXELSCALE 2.0 - Tu guía hacia los 50.000€/mes",
  description:
    "La guía paso a paso que me llevó de ser un chico normal a generar más de 50.000€ al mes con 19 años gracias a la reventa online.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/logo.png",
        sizes: "any",
      },
    ],
    apple: "/logo.png",
    shortcut: "/logo.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
