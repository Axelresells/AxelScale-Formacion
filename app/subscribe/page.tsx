import { getSession } from "@/lib/session"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, Calendar, CreditCard, Sparkles, Zap, Crown } from "lucide-react"
import { SUBSCRIPTION_PLANS } from "@/lib/stripe"
import Link from "next/link"
import Image from "next/image"
import Script from "next/script"
import { GoldPricingCard } from "@/components/gold-pricing-card"
import { SilverPricingCard } from "@/components/silver-pricing-card"
import {DiamondPricingCard} from "@/components/diamond-pricing-card";

export default async function SubscribePage() {
  const user = await getSession()

  const hasActiveSubscription = user?.subscription 
    && user.subscription.status === "active" 
    && user.subscription.currentPeriodEnd > new Date()

  const currentPlan = user?.subscription?.plan || null

  const isActivePlan = (planKey: string) => {
    return hasActiveSubscription && currentPlan === planKey
  }

  const getCurrentPlanName = () => {
    if (!user?.subscription?.plan) return null
    const planKey = user.subscription.plan as keyof typeof SUBSCRIPTION_PLANS
    return SUBSCRIPTION_PLANS[planKey]?.name || "Plan Desconocido"
  }

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <>
      {/* Cargar fuente Montserrat */}
      <Script src="https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800&display=swap" />
      
      <div className="min-h-screen bg-black relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-[#DAA520]/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-[#00FF9D]/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10">
          {/* Header Section */}
          <div className="py-6 px-4">
            <div className="max-w-6xl mx-auto text-center">
              {/* Logo */}
              <div className="mb-3">
                <div className="inline-block">
                  <div className="w-20 h-20 mx-auto mb-2 relative">
                    <Image 
                      src="/logo.png" 
                      alt="AxelScale" 
                      fill 
                      style={{ objectFit: 'contain' }}  
                    />
                  </div>
                </div>
              </div>

              {/* Title */}
              <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl uppercase text-white tracking-wide mb-8 text-center"
                  style={{
                    textShadow: '0 2px 10px rgba(255,255,255,0.1)',
                    fontFamily: "'Anton', 'Impact', sans-serif",
                    letterSpacing: '0.05em'
                  }}>
                SELECCIONA TU PLAN DE ACCESO
              </h1>
            </div>
          </div>

          {/* Pricing Grid */}
          <div className="py-8 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Card 1 - 1 MES */}
              <SilverPricingCard 
                duration="1 MES" 
                price="100€" 
                durationText="1 mes" 
                plan="monthly"
                userEmail={user?.email}
              />

              {/* Card 2 - 3 MESES (Destacada) */}
              <GoldPricingCard userEmail={user?.email} />

              {/* Card 3 - 1 AÑO */}
              <DiamondPricingCard
                duration="1 AÑO" 
                price="750€" 
                durationText="12 meses" 
                plan="annual"
                userEmail={user?.email}
              />
            </div>

            {/* Current Plan Card - Show if user has active subscription */}
            {hasActiveSubscription && user && (
              <div className="mt-12">
                <Card className="bg-[#1A1A1A] border-[#DAA520] border-2 shadow-[0_0_30px_rgba(218,165,32,0.1)]">
                  <CardHeader>
                    <div className="flex items-center justify-between flex-wrap gap-4">
                      <div>
                        <CardTitle className="text-2xl text-white flex items-center gap-2">
                          <CreditCard className="h-6 w-6 text-[#DAA520]" />
                          Tu Plan Actual
                        </CardTitle>
                        <CardDescription className="text-[#D9D9D9] mt-2">
                          Estado de tu suscripción
                        </CardDescription>
                      </div>
                      <div className="bg-[#00FF9D]/20 text-[#00FF9D] px-4 py-2 rounded-full text-sm font-bold shadow-[0_0_20px_rgba(0,255,157,0.2)]">
                        ACTIVO
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <p className="text-sm text-[#808080]">Plan</p>
                        <p className="text-xl font-bold text-[#DAA520]">{getCurrentPlanName()}</p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm text-[#808080] flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          Fecha de Vencimiento
                        </p>
                        <p className="text-xl font-bold text-white">
                          {user.subscription?.currentPeriodEnd && formatDate(user.subscription.currentPeriodEnd)}
                        </p>
                      </div>
                    </div>
                    <div className="pt-4 border-t border-[#808080]/30">
                      <Link href="/app">
                        <Button className="bg-[#DAA520] hover:bg-[#B8860B] text-black font-bold">
                          Volver al Dashboard
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
      </div>
    </>
  )
}