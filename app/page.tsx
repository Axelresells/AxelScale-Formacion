import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, MessageCircle, Calendar } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#000000]">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden">
        {/* Animated background particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#DAA520] rounded-full opacity-10 blur-[100px] animate-pulse"></div>
          <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-[#00FF9D] rounded-full opacity-5 blur-[120px] animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
          <div className="inline-block px-4 py-2 bg-[rgba(218,165,32,0.1)] border border-[#DAA520] rounded-full mb-4">
            <span className="text-[#DAA520] font-semibold text-sm tracking-wider">EXCLUSIVO</span>
          </div>

          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl uppercase leading-tight">
            <span className="text-[#FFFFFF]">AXELSCALE</span> <span className="text-[#DAA520] glow-gold">2.0</span>
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-[#D9D9D9] max-w-3xl mx-auto leading-relaxed px-4">
            La guía paso a paso que me llevó de ser un chico normal a generar más de{" "}
            <strong className="text-[#00FF9D]">5 cifras cada mes</strong> con 19 años gracias a la reventa online.
          </p>

          <p className="text-base sm:text-lg text-[#CFCFCF] max-w-2xl mx-auto px-4">
            Aprendé los métodos reales, probados y escalables que utilizo hoy para crear negocios digitales rentables,
            incluso empezando desde cero.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
            <Button
              asChild
              size="lg"
              className="bg-[#00FF9D] hover:bg-[#00E589] text-[#000000] font-bold text-lg px-8 py-6 group"
            >
              <Link href="/login">
                Soy Alumno
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-[#DAA520] text-[#DAA520] hover:bg-[#DAA520] hover:text-[#000000] font-semibold text-lg px-8 py-6 bg-transparent"
            >
              <Link href="/subscribe">Ver Suscripciones</Link>
            </Button>
          </div>
        </div>
      </section>

    </div>
  )
}
