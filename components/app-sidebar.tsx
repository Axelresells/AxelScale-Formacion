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
            { /* <Link
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
          </Link> */ }

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
                <div className="flex items-center gap-1">
                  <Link
                    href={`/app/module/${module.slug}`}
                    className={cn(
                      "flex-1 flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
                      isActiveModule(module.slug)
                        ? "bg-[#DAA520]/10 text-[#DAA520]"
                        : "text-[#D9D9D9] hover:bg-[#2D2D2D]",
                    )}
                  >
                    <Icon className={cn("h-5 w-5", isActiveModule(module.slug) ? "text-[#DAA520]" : "")} />
                    <span className="font-body font-medium text-sm text-left">{module.title}</span>
                  </Link>
                  <button
                    onClick={() => toggleModule(module.id)}
                    className="px-2 py-3 text-[#808080] hover:text-[#D9D9D9] transition-colors"
                  >
                    {isExpanded ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </button>
                </div>

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
                href="https://discord.gg/dESsRhG3"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-4 py-3 rounded-lg bg-[#5865F2]/10 hover:bg-[#5865F2]/20 transition-all duration-200 text-[#5865F2]"
            >
                <div className="h-5 w-5" >
                    <svg viewBox="0 -28.5 256 256" version="1.1" xmlns="http://www.w3.org/2000/svg"  preserveAspectRatio="xMidYMid" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M216.856339,16.5966031 C200.285002,8.84328665 182.566144,3.2084988 164.041564,0 C161.766523,4.11318106 159.108624,9.64549908 157.276099,14.0464379 C137.583995,11.0849896 118.072967,11.0849896 98.7430163,14.0464379 C96.9108417,9.64549908 94.1925838,4.11318106 91.8971895,0 C73.3526068,3.2084988 55.6133949,8.86399117 39.0420583,16.6376612 C5.61752293,67.146514 -3.4433191,116.400813 1.08711069,164.955721 C23.2560196,181.510915 44.7403634,191.567697 65.8621325,198.148576 C71.0772151,190.971126 75.7283628,183.341335 79.7352139,175.300261 C72.104019,172.400575 64.7949724,168.822202 57.8887866,164.667963 C59.7209612,163.310589 61.5131304,161.891452 63.2445898,160.431257 C105.36741,180.133187 151.134928,180.133187 192.754523,160.431257 C194.506336,161.891452 196.298154,163.310589 198.110326,164.667963 C191.183787,168.842556 183.854737,172.420929 176.223542,175.320965 C180.230393,183.341335 184.861538,190.991831 190.096624,198.16893 C211.238746,191.588051 232.743023,181.531619 254.911949,164.955721 C260.227747,108.668201 245.831087,59.8662432 216.856339,16.5966031 Z M85.4738752,135.09489 C72.8290281,135.09489 62.4592217,123.290155 62.4592217,108.914901 C62.4592217,94.5396472 72.607595,82.7145587 85.4738752,82.7145587 C98.3405064,82.7145587 108.709962,94.5189427 108.488529,108.914901 C108.508531,123.290155 98.3405064,135.09489 85.4738752,135.09489 Z M170.525237,135.09489 C157.88039,135.09489 147.510584,123.290155 147.510584,108.914901 C147.510584,94.5396472 157.658606,82.7145587 170.525237,82.7145587 C183.391518,82.7145587 193.761324,94.5189427 193.539891,108.914901 C193.539891,123.290155 183.391518,135.09489 170.525237,135.09489 Z" fill="#5865F2" fill-rule="nonzero"> </path> </g> </g></svg>
                </div>
                <div>
                    <p className="font-body font-semibold text-sm">Únete a Discord Comunidad</p>
                </div>
            </a>

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