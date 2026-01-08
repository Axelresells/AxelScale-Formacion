"use client"

import { Button } from "@/components/ui/button"
import { useState } from "react"

interface DiamondPricingCardProps {
  duration: string
  price: string
  durationText: string
  plan: "monthly" | "annual"
  userEmail?: string | null
}

export function DiamondPricingCard({ duration, price, durationText, plan, userEmail }: DiamondPricingCardProps) {
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
          plan,
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
      className="rounded-3xl py-8 md:py-12 px-4 text-center relative transition-all duration-300"
      style={{
        position: 'relative',
        background: 'rgba(10,10,10,0.92)',
        border: '1px solid rgba(255,255,255,0.35)',
        borderRadius: '22px',
        boxShadow: isHovered
          ? '0 0 28px rgba(255,255,255,0.28), 0 0 70px rgba(255,255,255,0.14)'
          : '0 0 18px rgba(255,255,255,0.18), 0 0 45px rgba(255,255,255,0.08)',
        transform: isHovered ? 'translateY(-5px)' : 'translateY(0)'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      {/* Shine metálico blanco arriba */}
      <div className="absolute -top-0.5 left-[12%] w-[76%] h-2 pointer-events-none" 
           style={{
             background: 'radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.45) 35%, rgba(255,255,255,0) 70%)',
             filter: 'blur(2px)',
             opacity: 0.8
           }}></div>
      {/* Reflejos metálicos internos */}
      <div className="absolute inset-0 rounded-[22px] pointer-events-none"
           style={{
             background: 'linear-gradient(120deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.10) 18%, rgba(255,255,255,0) 42%, rgba(255,255,255,0.06) 60%, rgba(255,255,255,0) 100%)',
             mixBlendMode: 'screen',
             opacity: 0.7
           }}></div>

      {/* Duración */}
      <div className="mb-5 md:mb-10">
        <h3 className="text-2xl uppercase tracking-wider"
            style={{fontFamily: "'Montserrat', sans-serif", fontWeight: 800, letterSpacing: '0.1em', color: 'white'}}>
          {duration}
        </h3>
      </div>

      {/* Línea blanca divisoria */}
      <div className="h-px w-full mb-4" style={{
        background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0) 100%)',
        opacity: 0.6
      }}></div>

      {/* Precio */}
      <div className="mb-4">
        <div className="text-6xl md:text-7xl leading-none" style={{fontFamily: "'Montserrat', sans-serif", fontWeight: 800, color: 'white'}}>{price}</div>
      </div>

      {/* Línea blanca divisoria */}
      <div className="h-px w-full mb-4" style={{
        background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0) 100%)',
        opacity: 0.6
      }}></div>

      {/* Descripción */}
      <div className="space-y-1 mb-4">
        <p className="text-white/90 text-base" style={{fontFamily: "'Albert Sans', sans-serif"}}>Acceso completo a AxelScale</p>
        <p className="text-white/90 text-base" style={{fontFamily: "'Albert Sans', sans-serif"}}>
          durante <span className="font-bold">{durationText}</span>
        </p>
      </div>

      {/* Línea blanca divisoria */}
      <div className="h-px w-full mb-4" style={{
        background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0) 100%)',
        opacity: 0.6
      }}></div>

      {/* Texto pequeño - mismo formato que descripción */}
      <div className="space-y-1 mb-6">
        <p className="text-white/90 text-base" style={{fontFamily: "'Albert Sans', sans-serif", padding: "15px "}}>Cancela cuando quieras.</p>
      </div>

      {/* Botón con onClick y efecto hover */}
      <Button 
        onClick={handleSubscribe}
        disabled={isLoading}
        className="w-auto px-10 h-14 rounded-full text-2xl uppercase transition-all relative overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, #36d67a 0%, #2bc46a 70%, #1fa855 100%)',
          color: 'black',
          fontFamily: "'Montserrat', sans-serif",
          fontWeight: 800,
          boxShadow: isButtonHovered 
            ? '0 0 35px rgba(54, 214, 122, 0.6), 0 0 80px rgba(54, 214, 122, 0.3)'
            : '0 0 20px rgba(54, 214, 122, 0.4)',
          transform: isButtonHovered ? 'scale(1.05)' : 'scale(1)',
          transition: 'all 0.3s ease',
          opacity: isLoading ? 0.7 : 1,
        }}
        onMouseEnter={() => setIsButtonHovered(true)}
        onMouseLeave={() => setIsButtonHovered(false)}
      >
        {/* Efecto de brillo en hover */}
        {isButtonHovered && !isLoading && (
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.25) 20%, rgba(255, 255, 255, 0.35) 50%, rgba(255, 255, 255, 0.25) 80%, transparent 100%)',
              animation: 'shine 1.5s ease-in-out infinite',
              borderRadius: '9999px'
            }}
          />
        )}
        
        {/* Contenido del botón */}
        <span className="relative z-10">
          {isLoading ? "PROCESANDO..." : "ELEGIR PLAN"}
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