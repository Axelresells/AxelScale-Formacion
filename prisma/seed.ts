import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  const email = "benjacostm100@gmail.com"

  console.log("🌱 Iniciando seed de la base de datos...")
  console.log("📧 Email del admin:", email)

  // Verificar si el usuario ya existe
  const existingUser = await prisma.user.findUnique({
    where: { email },
    include: { subscription: true }
  })

  if (existingUser) {
    console.log("👤 Usuario ya existe en la base de datos")
    console.log("   ID:", existingUser.id)
    console.log("   Role actual:", existingUser.role)
    console.log("   Suscripción:", existingUser.subscription ? "✓ Activa" : "✗ No tiene")
  }

  // Crear o actualizar usuario admin con suscripción
  const user = await prisma.user.upsert({
    where: { email },
    update: {
      role: "ADMIN",
    },
    create: {
      email,
      role: "ADMIN",
      subscription: {
        create: {
          plan: "12months",
          status: "active",
          currentPeriodEnd: new Date(
            Date.now() + 365 * 24 * 60 * 60 * 1000 // +1 año desde ahora
          ),
        },
      },
    },
    include: {
      subscription: true
    }
  })

  // Si el usuario existe pero no tiene suscripción, crearla
  if (!user.subscription) {
    console.log("📝 Creando suscripción para usuario existente...")
    
    await prisma.subscription.create({
      data: {
        userId: user.id,
        plan: "12months",
        status: "active",
        currentPeriodEnd: new Date(
          Date.now() + 365 * 24 * 60 * 60 * 1000 // +1 año desde ahora
        ),
      },
    })

    // Recargar usuario con suscripción
    const updatedUser = await prisma.user.findUnique({
      where: { email },
      include: { subscription: true }
    })
    
    if (updatedUser) {
      user.subscription = updatedUser.subscription
    }
  }

  console.log("\n✅ Usuario admin creado/actualizado exitosamente")
  console.log("─".repeat(50))
  console.log("📋 Detalles del usuario:")
  console.log("   ID:", user.id)
  console.log("   Email:", user.email)
  console.log("   Role:", user.role)
  console.log("   Creado:", user.createdAt.toLocaleString('es-ES'))
  
  if (user.subscription) {
    console.log("\n💎 Suscripción:")
    console.log("   Plan:", user.subscription.plan)
    console.log("   Estado:", user.subscription.status)
    console.log("   Vence:", user.subscription.currentPeriodEnd.toLocaleString('es-ES'))
  }
  
  console.log("─".repeat(50))
  console.log("🎉 Seed completado!\n")
}

main()
  .catch((error) => {
    console.error("\n❌ Error durante el seed:")
    console.error(error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
