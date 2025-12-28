"use client"

import { motion } from "framer-motion"
import { CheckCircle, ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useSearchParams } from "next/navigation"

interface SuccessContentProps {
  user?: any
}

export default function SuccessContent({ user }: SuccessContentProps) {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get("session_id")
  const fromStripe = !!sessionId

  return (
    <div className="min-h-screen bg-[#000000] flex items-center justify-center relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-[#00FF9D]/5 rounded-full blur-3xl" />
        <div className="absolute top-1/4 right-1/3 w-96 h-96 bg-[#00FF9D]/5  rounded-full blur-3xl" />
      </div>

      <div className="container px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-lg mx-auto text-center"
        >
          {/* Success icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-24 h-24 rounded-full bg-[#00FF9D]/20 flex items-center justify-center mx-auto mb-8 shadow-[0_0_40px_rgba(0,255,157,0.3)]"
          >
            <CheckCircle className="h-12 w-12 text-[#00FF9D]" />
          </motion.div>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#DAA520]/10 border border-[#DAA520]/20 mb-6">
              <Sparkles className="h-4 w-4 text-[#DAA520]" />
              <span className="text-sm text-[#DAA520] font-medium">Pago confirmado</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              ¡Bienvenido a{" "}
              <span className="bg-linear-to-r from-[#DAA520] via-[#FFD700] to-[#DAA520] bg-clip-text text-transparent">
                AXELSCALE
              </span>
              !
            </h1>

            <p className="text-lg text-[#D9D9D9] mb-8">
              Tu suscripción se ha activado correctamente.
            </p>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            {user ? (
              <Link href="/app">
                <Button 
                  size="lg" 
                  className="group bg-[#00FF9D] hover:bg-[#00E589] text-black font-bold text-base px-8 py-6 h-auto shadow-[0_0_30px_rgba(0,255,157,0.2)] hover:shadow-[0_0_40px_rgba(0,255,157,0.4)] transition-all"
                >
                  Acceder a la Plataforma
                  <ArrowRight className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            ) : (
              <Link href="/login">
                <Button 
                  size="lg" 
                  className="group bg-[#00FF9D] hover:bg-[#00E589] text-black font-bold text-base px-8 py-6 h-auto shadow-[0_0_30px_rgba(0,255,157,0.2)] hover:shadow-[0_0_40px_rgba(0,255,157,0.4)] transition-all"
                >
                  Iniciar Sesión
                  <ArrowRight className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            )}
          </motion.div>

          {/* Features */}
            {/*<motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-12 p-6 bg-[#1A1A1A] rounded-2xl border border-[#808080]/30"
          >
            <p className="text-sm text-[#808080] mb-4">
              Tu acceso incluye:
            </p>
            <div className="grid grid-cols-2 gap-3 text-left">
              {[
                "3 módulos completos",
                "Plan de 50 días",
                "Soporte 24/7",
                "Actualizaciones gratis",
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-[#00FF9D] shrink-0" />
                  <span className="text-sm text-white">{feature}</span>
                </div>
              ))}
            </div>
          </motion.div>*/}
        </motion.div>
      </div>
    </div>
  )
}
