"use client"

import { Button } from "@/components/ui/button"
import { useState } from "react"

interface SilverPricingCardProps {
  duration: string
  price: string
  durationText: string
}

export function SilverPricingCard({ duration, price, durationText }: SilverPricingCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div 
      className="rounded-3xl py-12 px-4 text-center relative transition-all duration-300"
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
      <div className="mb-10">
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
        <div className="text-7xl leading-none" style={{fontFamily: "'Montserrat', sans-serif", fontWeight: 800, color: 'white'}}>{price}</div>
      </div>

      {/* Línea blanca divisoria */}
      <div className="h-px w-full mb-4" style={{
        background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0) 100%)',
        opacity: 0.6
      }}></div>

      {/* Descripción */}
      <div className="space-y-1 mb-4">
        <p className="text-white/90 text-base">Acceso completo a AxelScale</p>
        <p className="text-white/90 text-base">
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
        <p className="text-white/90 text-base">Después, 100 €/mes.</p>
        <p className="text-white/90 text-base">Cancela cuando quieras.</p>
      </div>

      {/* Botón */}
      <Button className="w-auto px-10 bg-[#36d67a] hover:bg-[#2bc46a] text-black h-14 rounded-full text-2xl uppercase transition-all" style={{fontFamily: "'Montserrat', sans-serif", fontWeight: 800}}>
        ELEGIR PLAN
      </Button>
    </div>
  )
}
