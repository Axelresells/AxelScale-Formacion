import type React from "react"
import { AppLayoutClient } from "@/components/app-layout-client"
import { getAllModules } from "@/lib/content/axelscale"

export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const modules = getAllModules()

  const user = {
    name: "Alumno",
    email: "",
    role: "USER",
    subscription: null,
  }

  return (
    <AppLayoutClient user={user} modules={modules}>
      {children}
    </AppLayoutClient>
  )
}
