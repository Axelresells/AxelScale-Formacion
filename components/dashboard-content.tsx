"use client"

import type React from "react"

import { motion } from "framer-motion"
import Link from "next/link"
import { Ghost, Package, Smartphone, ArrowRight, Calendar, TrendingUp, Target, MessageCircle } from "lucide-react"
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
  description: string | null
  icon: string
  order: number
  lessons: any[]
}

interface DashboardContentProps {
  modules: Module[]
  totalLessons: number
  showMockBanner: boolean
}

export function DashboardContent({ modules, totalLessons, showMockBanner }: DashboardContentProps) {
  return (
    <div className="space-y-10">
      {/* Welcome section */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="font-display text-4xl sm:text-5xl text-foreground mb-2">
          Bienvenido a <span className="text-gradient-gold text-[#DAA520] ">AXELSCALE</span>
        </h1>
          <div> <a href="https://discord.gg/dESsRhG3" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#5865F2] hover:bg-[#4752C4] text-white font-semibold px-6 py-3 rounded-lg transition-colors"  > Únete a nuestra comunidad de Discord </a> </div>
      </motion.div>

      {/* Video de Presentación */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05, duration: 0.5 }}
      >
          <div className="bg-card/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-border/50 max-w-3xl mx-auto">
              <div className="aspect-video w-full">
                  <iframe
                      src="https://www.youtube.com/embed/j5M22pWW1aI?autoplay=1&mute=1"
                      title="Video de Presentación AXELSCALE"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                  />
              </div>
          </div>

      </motion.div>

      {/* Stats */}
        { /* <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-4"
      >
        {[
          { icon: Target, label: "Módulos", value: modules.length, color: "text-[#DAA520]" },
          { icon: TrendingUp, label: "Lecciones", value: totalLessons, color: "text-[#00FF9D]" },
          { icon: Calendar, label: "Días de Plan", value: 50, color: "text-[#DAA520]" },
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.1, duration: 0.5 }}
            className="bg-card/50 backdrop-blur-sm rounded-2xl p-6 border border-border/50 hover:border-[#DAA520]/30 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl bg-muted flex items-center justify-center ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <div>
                <p className="font-display text-3xl text-foreground">{stat.value}</p>
                <p className="font-body text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div> */}

      {/* Plan 50 Days CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-[#DAA520]/30 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#DAA520] to-transparent" />

          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-[#DAA520]/10 flex items-center justify-center">
                <Calendar className="h-7 w-7 text-[#DAA520]" />
              </div>
              <div>
                <h3 className="font-display text-2xl text-foreground">Plan 50 Días</h3>
              </div>
            </div>

            <Button className="bg-[#DAA520] hover:bg-[#B8860B] text-[#000000] font-semibold group" size="lg">
              Comenzar Plan
              <ArrowRight className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Modules grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <h2 className="font-display text-2xl text-foreground mb-6">Módulos de Formación</h2>

        <div className="grid md:grid-cols-3 gap-6">
          {modules.map((module, index) => {
            const Icon = iconMap[module.icon] || Package

            return (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.4 }}
                className="group"
              >
                <Link href={`/app/module/${module.slug}`}>
                  <div className="h-full bg-card/50 backdrop-blur-sm rounded-2xl p-6 border border-border/50 hover:border-[#DAA520]/50 transition-all duration-300 hover:-translate-y-1">
                    <div className="w-12 h-12 rounded-xl bg-[#DAA520]/10 flex items-center justify-center mb-4 group-hover:bg-[#DAA520]/20 transition-colors">
                      <Icon className="h-6 w-6 text-[#DAA520]" />
                    </div>

                    <h3 className="font-display text-xl text-foreground mb-2">{module.title}</h3>

                    <p className="font-body text-sm text-muted-foreground mb-4 line-clamp-2">
                      {module.description || "Contenido premium de formación"}
                    </p>

                    <div className="flex items-center justify-between">
                      <span className="font-body text-sm text-muted-foreground">{module.lessons.length} lecciones</span>
                      <ArrowRight className="h-4 w-4 text-[#DAA520] opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </motion.div>

      {/* WhatsApp Expert CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <div className="bg-[#1A1A1A] rounded-xl p-6 border border-[#2D2D2D] hover:border-[#DAA520]/30 transition-all duration-300">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Left side */}
            <div className="flex items-center gap-4 flex-1">
              <div className="w-12 h-12 rounded-xl bg-[#DAA520]/10 flex items-center justify-center shrink-0">
                <MessageCircle className="h-6 w-6 text-[#DAA520]" />
              </div>
              <div className="text-center sm:text-left">
                <h3 className="font-display text-lg text-[#FFFFFF] mb-1">
                  Chat con un experto <span className="text-[#DAA520]">24/7</span>
                </h3>
                <p className="font-body text-sm text-[#808080]">¿Dudas? Escríbenos por WhatsApp</p>
              </div>
            </div>

            {/* Right side */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <p className="font-display text-lg text-[#D9D9D9]">+34 626 04 06 64</p>
              <a
                href="https://wa.me/34626040664"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#DAA520] hover:bg-[#B8860B] text-[#000000] font-body font-semibold px-5 py-2.5 rounded-lg transition-colors whitespace-nowrap"
              >
                Contactar →
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
