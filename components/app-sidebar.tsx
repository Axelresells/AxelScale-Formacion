"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  ChevronDown,
  ChevronRight,
  Ghost,
  Package,
  Smartphone,
  Home,
  Calendar,
  MessageCircle,
  Menu,
  X,
  PlayCircle,
  Shield,
  LogOut,
  BookOpen,
  CreditCard,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  ghost: Ghost,
  package: Package,
  smartphone: Smartphone,
}

interface Module {
  id: string
  title: string
  slug: string
  icon: string
  lessons: { id: string; title: string; order: number }[]
}

interface AppSidebarProps {
  isOpen: boolean
  onToggle: () => void
  user: any
  modules: Module[]
}

export function AppSidebar({ isOpen, onToggle, user, modules }: AppSidebarProps) {
  const pathname = usePathname()
  const [expandedModules, setExpandedModules] = useState<string[]>([])
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [logoutProgress, setLogoutProgress] = useState(0)

  const isAdmin = user.role === "ADMIN"

  const toggleModule = (moduleId: string) => {
    setExpandedModules((prev) => (prev.includes(moduleId) ? prev.filter((id) => id !== moduleId) : [...prev, moduleId]))
  }

  const isActiveLesson = (lessonId: string) => {
    return pathname === `/app/lesson/${lessonId}`
  }

  const isActiveModule = (moduleSlug: string) => {
    return pathname === `/app/module/${moduleSlug}`
  }

  const handleLogout = async () => {
    if (isLoggingOut) return
    
    setIsLoggingOut(true)
    
    // Animación de progreso
    const interval = setInterval(() => {
      setLogoutProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 10
      })
    }, 40)
    
    // Esperar a que la animación se complete
    await new Promise(resolve => setTimeout(resolve, 500))
    
    try {
      await fetch("/api/auth/logout", { method: "POST" })
    } catch (error) {
      console.error("Error logging out:", error)
    }
    
    // Redirigir al login
    window.location.href = "/login"
  }

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
            onClick={onToggle}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 h-full w-[280px] bg-[#0D0D0D] border-r border-[#2D2D2D]",
          "flex flex-col transition-transform duration-300",
          "lg:relative lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {/* Logo */}
        <div className="flex items-center justify-between p-6 border-b border-[#2D2D2D]">
          <Link href="/app" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#DAA520] to-[#B8860B] flex items-center justify-center">
              <span className="font-display text-lg text-[#000000]">A</span>
            </div>
            <span className="font-display text-xl text-[#FFFFFF] tracking-wide">AXELSCALE</span>
          </Link>
          <Button variant="ghost" size="icon" className="lg:hidden text-[#808080]" onClick={onToggle}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {/* Dashboard */}
          <Link
            href="/app"
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
              pathname === "/app" ? "bg-[#DAA520] text-[#000000] font-semibold" : "text-[#D9D9D9] hover:bg-[#2D2D2D]",
            )}
          >
            <Home className="h-5 w-5" />
            <span className="font-body font-medium">Dashboard</span>
          </Link>

          {/* Introducción ESENCIAL */}
          <Link
            href="/app/introduccion"
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
              pathname === "/app/introduccion"
                ? "bg-[#DAA520] text-[#000000] font-semibold"
                : "text-[#D9D9D9] hover:bg-[#2D2D2D]",
            )}
          >
            <BookOpen className="h-5 w-5" />
            <span className="font-body font-medium">Introducción ESENCIAL</span>
          </Link>

          {/* Plan 50 días */}
          <Link
            href="/app/plan-50-dias"
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
              pathname === "/app/plan-50-dias"
                ? "bg-[#DAA520] text-[#000000] font-semibold"
                : "text-[#D9D9D9] hover:bg-[#2D2D2D]",
            )}
          >
            <Calendar className="h-5 w-5 text-[#DAA520]" />
            <span className="font-body font-medium">Plan 50 Días</span>
          </Link>

          {/* Ver Planes */}
          <Link
            href="/subscribe"
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
              pathname === "/subscribe"
                ? "bg-[#DAA520] text-[#000000] font-semibold"
                : "text-[#D9D9D9] hover:bg-[#2D2D2D]",
            )}
          >
            <CreditCard className="h-5 w-5 text-[#DAA520]" />
            <span className="font-body font-medium">Ver Planes</span>
          </Link>

          {/* Admin Panel - Only visible to admins */}
          {isAdmin && (
            <Link
              href="/app/admin"
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
                pathname === "/app/admin"
                  ? "bg-[#DAA520]/20 text-[#DAA520] font-semibold"
                  : "text-[#D9D9D9] hover:bg-[#DAA520]/10",
              )}
            >
              <Shield className="h-5 w-5 text-[#DAA520]" />
              <span className="font-body font-medium">Panel Admin</span>
            </Link>
          )}

          {/* Divider */}
          <div className="py-4">
            <div className="h-px bg-[#2D2D2D]" />
            <p className="text-xs uppercase text-[#808080] mt-4 mb-2 px-4 font-semibold tracking-wider">Módulos</p>
          </div>

          {/* Modules */}
          {modules.map((module) => {
            const Icon = iconMap[module.icon] || Package
            const isExpanded = expandedModules.includes(module.id)

            return (
              <div key={module.id} className="space-y-1">
                <button
                  onClick={() => toggleModule(module.id)}
                  className={cn(
                    "w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200",
                    isActiveModule(module.slug)
                      ? "bg-[#DAA520]/10 text-[#DAA520]"
                      : "text-[#D9D9D9] hover:bg-[#2D2D2D]",
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={cn("h-5 w-5", isActiveModule(module.slug) ? "text-[#DAA520]" : "")} />
                    <span className="font-body font-medium text-sm text-left">{module.title}</span>
                  </div>
                  {isExpanded ? (
                    <ChevronDown className="h-4 w-4 text-[#808080]" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-[#808080]" />
                  )}
                </button>

                {/* Lessons */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="ml-4 pl-4 border-l border-[#2D2D2D] space-y-1">
                        {module.lessons.map((lesson) => (
                          <Link
                            key={lesson.id}
                            href={`/app/lesson/${lesson.id}`}
                            className={cn(
                              "flex items-center gap-2 px-3 py-2 rounded-md transition-all duration-200 text-sm",
                              isActiveLesson(lesson.id)
                                ? "bg-[#DAA520]/10 text-[#DAA520]"
                                : "text-[#808080] hover:text-[#D9D9D9] hover:bg-[#2D2D2D]/50",
                            )}
                          >
                            <PlayCircle className="h-4 w-4 shrink-0" />
                            <span className="truncate">{lesson.title}</span>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </nav>

        {/* User info & Actions */}
        <div className="p-4 border-t border-[#2D2D2D] space-y-3">
          {user && (
            <div className="px-4 py-2">
              <p className="text-xs text-[#808080] truncate">{user.email}</p>
              {isAdmin && <span className="text-xs text-[#DAA520] font-medium">Admin</span>}
            </div>
          )}

          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="relative w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-400/10 transition-all duration-200 disabled:opacity-80 disabled:cursor-not-allowed overflow-hidden"
          >
            {/* Barra de progreso */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-red-400/5 to-red-400/20"
              initial={{ width: "0%" }}
              animate={{ width: `${logoutProgress}%` }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
            
            {/* Contenido del botón */}
            <div className="relative z-10 flex items-center gap-3">
              <LogOut className="h-5 w-5" />
              <span className="font-body font-medium text-sm">
                {isLoggingOut ? "Cerrando sesión..." : "Cerrar Sesión"}
              </span>
            </div>
            
            {/* Indicador de carga */}
            {isLoggingOut && (
              <div className="relative z-10 ml-auto">
                <motion.div
                  className="w-4 h-4 border-2 border-red-400/30 border-t-red-400 rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
              </div>
            )}
          </button>

          <a
            href="https://wa.me/34626040664"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-4 py-3 rounded-lg bg-[#00FF9D]/10 hover:bg-[#00FF9D]/20 transition-all duration-200 text-[#00FF9D]"
          >
            <MessageCircle className="h-5 w-5" />
            <div>
              <p className="font-body font-semibold text-sm">Soporte 24/7</p>
              <p className="text-xs text-[#00FF9D]/70">+34 626 04 06 64</p>
            </div>
          </a>
        </div>
      </aside>

      {/* Mobile toggle button */}
      <Button
        variant="ghost"
        size="icon"
        className={cn("fixed top-4 left-4 z-50 lg:hidden bg-[#2D2D2D]", isOpen && "hidden")}
        onClick={onToggle}
      >
        <Menu className="h-6 w-6" />
      </Button>
    </>
  )
}