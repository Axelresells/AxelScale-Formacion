"use client"

import { Button } from "@/components/ui/button"
import { useState } from "react"

interface GoldPricingCardProps {
  userEmail?: string | null
}

export function GoldPricingCard({ userEmail }: GoldPricingCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isButtonHovered, setIsButtonHovered] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubscribe = async () => {
    if (isLoading) return

    // Si no hay email, pedirlo
    let email = userEmail
    if (!email) {
      email = prompt("Por favor, ingresa tu email para continuar:")
      if (!email || !email.includes("@")) {
        alert("Debes ingresar un email válido para continuar.")
        return
      }
    }

    setIsLoading(true)

    try {
      const response = await fetch("/api/stripe/create-checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          plan: "quarterly",
          email: email,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Error al crear sesión de pago")
      }

      if (data.url) {
        window.location.href = data.url
      }
    } catch (error) {
      console.error("Error:", error)
      alert("Hubo un error al procesar tu solicitud. Por favor, intenta de nuevo.")
      setIsLoading(false)
    }
  }

  return (
    <div 
      className="rounded-3xl py-8 md:py-12 px-4 text-center relative transition-all duration-300 group"
      style={{
        position: 'relative',
        background: 'rgba(10,10,10,0.9)',
        border: '1px solid rgba(212,175,55,0.95)',
        borderRadius: '22px',
        boxShadow: isHovered 
          ? '0 0 45px rgba(212,175,55,0.45), 0 0 110px rgba(212,175,55,0.22)'
          : '0 0 35px rgba(212,175,55,0.35), 0 0 80px rgba(212,175,55,0.18)',
        transform: isHovered ? 'translateY(-6px)' : 'translateY(0)'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      {/* Shine metálico arriba */}
      <div className="absolute -top-0.5 left-[10%] w-[80%] h-2.5 pointer-events-none" 
           style={{
             background: 'radial-gradient(circle, rgba(255,220,120,0.95) 0%, rgba(212,175,55,0.55) 35%, rgba(212,175,55,0) 70%)',
             filter: 'blur(2px)',
             opacity: 0.9
           }}></div>
      {/* Reflejos metálicos internos */}
      <div className="absolute inset-0 rounded-[22px] pointer-events-none"
           style={{
             background: 'linear-gradient(120deg, rgba(255,255,255,0.00) 0%, rgba(255,220,140,0.10) 18%, rgba(255,255,255,0.00) 40%, rgba(212,175,55,0.08) 60%, rgba(255,255,255,0.00) 100%)',
             mixBlendMode: 'screen',
             opacity: 0.75
           }}></div>

      {/* Duración */}
      <div className="mb-5 md:mb-1">
        <h3 className="text-2xl uppercase tracking-wider"
            style={{fontFamily: "'Albert Sans', sans-serif", fontWeight: 800, letterSpacing: '0.1em', color: 'white'}}>
          3 MESES
        </h3>
      </div>

      {/* Badge MÁS POPULAR */}
      <div className="mb-4">
        <div className="inline-block text-black px-8 py-1 text-lg font-extrabold uppercase "
             style={{
               background: 'linear-gradient(180deg, #ffd77a 0%, #d4af37 70%, #b98b1e 100%)',
               boxShadow: '0 0 18px rgba(212,175,55,0.25)',
               letterSpacing: '0.15em'
             }}>
          MÁS POPULAR
        </div>
        {/* Línea dorada divisoria */}
      <div className="h-px w-full mb-2" style={{
        background: 'linear-gradient(90deg, rgba(212,175,55,0) 0%, rgba(212,175,55,0.9) 50%, rgba(212,175,55,0) 100%)',
        opacity: 0.85
      }}></div>
      </div>

      {/* Precio dorado con efecto metálico */}
      <div className="mb-4">
        <div className="text-6xl md:text-7xl leading-none"
             style={{
               fontFamily: "'Montserrat', sans-serif",
               fontWeight: 800,
               background: 'linear-gradient(180deg, #fff1b8 0%, #d4af37 45%, #9c7c18 100%)',
               WebkitBackgroundClip: 'text',
               backgroundClip: 'text',
               color: 'transparent',
               textShadow: '0 0 18px rgba(212,175,55,0.35)'
             }}>
          200€
        </div>
      </div>

      {/* Línea dorada divisoria */}
      <div className="h-px w-full mb-4" style={{
        background: 'linear-gradient(90deg, rgba(212,175,55,0) 0%, rgba(212,175,55,0.9) 50%, rgba(212,175,55,0) 100%)',
        opacity: 0.85
      }}></div>

      {/* Descripción */}
      <div className="space-y-1 mb-4">
        <p className="text-white/90 text-base" style={{fontFamily: "'Albert Sans', sans-serif"}}>Acceso completo a Axelscale</p>
        <p className="text-white/90 text-base" style={{fontFamily: "'Albert Sans', sans-serif"}}>
          durante <span className="font-bold">3 meses</span>
        </p>
      </div>

      {/* Línea dorada divisoria */}
      <div className="h-px w-full mb-4" style={{
        background: 'linear-gradient(90deg, rgba(212,175,55,0) 0%, rgba(212,175,55,0.9) 50%, rgba(212,175,55,0) 100%)',
        opacity: 0.85
      }}></div>

      {/* Texto pequeño - mismo formato que descripción */}
      <div className="space-y-1 mb-6">
        <p className="text-white/90 text-base" style={{fontFamily: "'Albert Sans', sans-serif"}}>Después, 66 €/mes.</p>
        <p className="text-white/90 text-base" style={{fontFamily: "'Albert Sans', sans-serif"}}>Cancela cuando quieras.</p>
      </div>

      {/* Botón dorado con onClick */}
      <Button 
        onClick={handleSubscribe}
        disabled={isLoading}
        className="w-auto px-8 text-black h-14 rounded-full text-1xl md:text-2xl uppercase transition-all tracking-tight relative overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, #ffd77a 0%, #d4af37 70%, #b98b1e 100%)',
          boxShadow: isButtonHovered 
            ? '0 0 45px rgba(212,175,55,0.7), 0 0 90px rgba(212,175,55,0.35)'
            : '0 0 25px rgba(212,175,55,0.5)',
          fontFamily: "'Rude', sans-serif",
          fontWeight: 800,
          letterSpacing: '0.05em',
          transform: isButtonHovered ? 'scale(1.05)' : 'scale(1)',
          transition: 'all 0.3s ease',
          opacity: isLoading ? 0.7 : 1,
        }}
        onMouseEnter={() => setIsButtonHovered(true)}
        onMouseLeave={() => setIsButtonHovered(false)}
      >
        {/* Efecto de brillo metálico en hover */}
        {isButtonHovered && !isLoading && (
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.15) 20%, rgba(255, 255, 255, 0.25) 50%, rgba(255, 255, 255, 0.15) 80%, transparent 100%)',
              animation: 'shine 1.5s ease-in-out infinite',
              borderRadius: '9999px'
            }}
          />
        )}
        
        {/* Contenido del botón */}
        <span className="relative z-10">
          {isLoading ? "PROCESANDO..." : "ELEGIR ESTE PLAN"}
        </span>
      </Button>

      {/* Estilos para la animación de brillo */}
      <style jsx>{`
        @keyframes shine {
          0% {
            transform: translateX(-100%) skewX(-15deg);
          }
          100% {
            transform: translateX(200%) skewX(-15deg);
          }
        }
      `}</style>
    </div>
  )
}