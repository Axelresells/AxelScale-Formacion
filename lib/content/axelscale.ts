// Contenido de la plataforma AXELSCALE
// Todos los módulos y lecciones están definidos aquí

export interface Lesson {
 id: string
 title: string
 content: string
 videoUrl?: string
 order: number
}

export interface Module {
 id: string
 slug: string
 title: string
 description: string
 icon: string
 videoUrl?: string
 order: number
 lessons: Lesson[]
}

export const AXELSCALE_MODULES: Module[] = [
 {
 id: "mod_1",
 slug: "shopify-ghost-dropshipping",
 title: "Shopify Ghost Dropshipping",
 description: "Reventa de productos digitales con 100% de margen",
 icon: "ghost",
 videoUrl: "https://www.youtube.com/embed/7bgOdjETWFg?autoplay=1&mute=1",
 order: 1,
 lessons: [
 {
 id: "les_1_1",
 title: "S.G.D Qué Productos Digitales Usar",
 content: `# S.G.D Qué Productos Digitales Usar

Mis 3 recomendaciones principales para revender productos digitales.

## 1. Proveedores de reventa (mi favorita)

AxelScale 2.0 se ha creado por esta opción; es con la que más dinero he ganado y la que os recomiendo hacer sí o sí.

Trata de revender el contacto de tus proveedores como hago yo en axelresells.com.

Si no tenéis proveedores, os recomiendo los míos. Así tendréis fiabilidad y seguridad de que son buenos, y no gastaréis dinero hasta encontrar unos confiables (no vienen incluidos en AxelScale 2.0, están aparte).

 **Consejo**: esta es la opción con la que más dinero he ganado, tanto en el mercado hispano como en el inglés.

## 2. Cursos

Puedes adquirir o comprar cursos de otras personas y revenderlos, pero corres el riesgo de que el propietario lo descubra y te denuncie. (Riesgo mínimo si revendes cursos de gente poco conocida o en inglés).

## 3. Cualquier otro producto digital

Puedes revender el producto digital que quieras. Estas dos ideas no son reventa digital pura, pero siguen siendo rentables:

- Vender mentorías 1 a 1 en las que guíes o enseñes a tus alumnos.
- Escalar negocios ofreciendo tus conocimientos a cambio de un porcentaje, comisiones o alianzas.

 **Importante**: estas prácticas deben seguir las políticas de cada plataforma. Evita copiar material protegido sin permiso.`,
 order: 1,
 },
 {
 id: "les_1_2",
 title: "S.G.D Creación Producto Digital",
 content: `# S.G.D Creación Producto Digital

Crea tu producto digital en 5 sencillos pasos

## Vas a seguir 5 sencillos pasos:

Sigue esta guía paso a paso para crear tu primer producto digital de forma rápida y efectiva.

### 1. Buscar Google Doc
**Búsqueda**
Vas a ir a Google y vas a buscar Google Doc

### 2. Crear Documento
**Creación**
Vas a crear un documento de Google

### 3. Escribir Información
**Contenido**
Escribes la información de tu producto digital

### 4. Configurar Permisos
**Importante**
Pones que los que tengan el enlace lo puedan leer pero no editar (importante)

### 5. Alternativa: Google Sheets
**Opción**
También lo puedes crear desde Google Sheet (Formato Excel), en vez de Google Doc (Formato Word).

## Resumen de Opciones

Elige el formato que mejor se adapte a tu producto

### Google Doc
Formato Word - Ideal para guías, manuales y contenido textual

### Google Sheets
Formato Excel - Perfecto para plantillas, hojas de cálculo y datos organizados

 **Recuerda**: Configura siempre los permisos para que solo se pueda leer, no editar.`,
 order: 2,
 },
 {
 id: "les_1_3",
 title: "S.G.D Creación Web",
 content: `# S.G.D Creación Web

Guía esencial para crear y configurar tu tienda Shopify

## 3 puntos clave para crear tu web (por orden)

Sigue estos pasos en orden para crear tu tienda Shopify de forma correcta y profesional.

### 1. Crear tienda Shopify
**Esencial**
Vas a ir a Shopify para crear tu web, utiliza este video para aprender lo esencial:
[Video tutorial de Shopify]

### 2. Configurar envío contra reembolso
**Importante**
Mira este video para configurar el envío contra reembolso en Shopify:
 Configuración envío contra reembolso (8:45 min)

### 3. Imágenes de productos
**Crítico**
NO pongáis fotos de los productos reales, haced ilustraciones de ellos.

**Advertencia importante**: Usar fotos reales puede llevar a problemas legales y de derechos de autor.

## Herramientas recomendadas

Software esencial para crear diseños profesionales

### ChatGPT
Para crear los diseños iniciales y generar ideas creativas
*IA Generativa*

### Photopea
Para transformar y editar los diseños a tu gusto
*Editor Online*

### Lets Enhance
Para aumentar la calidad del diseño final
*Mejora de Calidad*

## Flujo de trabajo recomendado:

1. ChatGPT para ideas → 2. Photopea para editar → 3. Lets Enhance para calidad`,
 order: 3,
 },
 {
 id: "les_1_4",
 title: "S.G.D Marketing",
 content: `# S.G.D Marketing

Estas son las 2 mejores opciones:

## S.G.D.M Tráfico Orgánico

**Mi favorita sin duda. Prácticamente obligatorio.**

Esta información es la MÁS VALIOSA de toda la formación, si lo lleváis a raja tabla unos meses, os cambiaría la vida por completo.

### Pros
- No tienes que gastarse dinero en publicidad
- Puedes captar miles o millones de clientes gratis

### Contras
- Lleva mucho trabajo
- No depende al 100% de ti
- Necesitas ser muy constante

### PASO A PASO BÁSICO

1. Crea una cuenta en Instagram y TikTok (YouTube Shorts opcional)
2. Sube 1/3 reels al día y resúbelos en TikTok al día siguiente, intenta analizar los fallos y pros de cada reel para que el siguiente sea mejor que el anterior.
3. Sube 1 historia diaria
4. OPCIONAL, intenta tener destacadas de testimonios/reseñas, y otras de la calidad de tus proveedores (fotos de productos y demás)

### Como llevar tu contenido y marketing (información muy valiosa):

- No hace falta que crees tus propias ideas, llena tu algoritmo de vídeos en inglés sobre todo (hay muchas mas personas y mejores en todos los aspectos) de emprendimiento/reventa e intenta replicarlos a tu manera, son ideas que ya han funcionado y en España son nuevas.

- De esos 1/3 vídeos diarios, enfoca 2 vídeos de esos en intentar que sean virales, aunque no conviertan muchas ventas, y 1 vídeo centrado en convertir ventas.

- Si puedes enseñar tu cara en algunas partes del vídeo o en algunos vídeos, enséñala. Esto genera mucha confianza en tu público y hace que se fien a la hora de comprar.

- Intenta que la mayoría de tus vídeos acaben con un CTA, es decir, que inciten al espectador a tomar una acción, comentar, seguirte, ir a tu web... etc

- Si un video te ha funcionado, intenta mantener el formato del vídeo pero cambiando los clips de fondo o dándole otro enfoque, así con un solo video viral haces 2/3 más.

- Fijate en vídeos que te salgan en el algoritmo (de emprendimiento), en porqué han funcionado, que estructura tienen, que clips ponen de fondo, que dicen, como acaba... etc

- Intenta responder todos los comentarios de TikTok incitando a que te hablen por privado para darles algo o resolverles una duda, esto te dispara las ventas y los seguidores.

- No hacen falta vídeos de un millón de visitas para vender, con 10/50k de visitas en vídeos bien estructurados y pensados para convertir, puedes hacer entre 2/6 mil euros al mes fácil.

## S.G.D.M Anuncios Pagados

### Pros
- No lleva apenas trabajo, solamente tienes que crear el anuncio
- Es automático
- Es escalable
- Puedes controlarlo, depende al 100% de ti

### Contras
- Necesitas bastante dinero para invertir en publicidad
- El anuncio tiene que ser muy bueno para que sea rentable
- Estas limitado, cuanto menos dinero, menos ventas
- Necesitas un buen ROAS (cuantos euros ganas por cada euro que gastas), una campaña decente (es difícil de conseguir con un info-producto) es de un ROAS de x1,2-2, es decir, por cada euro que pierdes ganas 1,2-2 euros.

### PASO A PASO:

#### 1. Definición del público objetivo:
- Identifica quién compraría tu producto
- Analiza datos demográficos, intereses y comportamientos
- Crea un perfil detallado de tu cliente ideal

#### 2. Selección de plataformas:
- Elige dónde publicarás tus anuncios (Facebook, Instagram, Google, TikTok, etc.)
- Adapta tu estrategia a cada plataforma

#### 3. Creación del anuncio:
- Diseña un copy persuasivo que resuelva problemas
- Utiliza imágenes/videos de alta calidad
- Incluye llamadas a la acción claras`,
 order: 4,
 },
 {
 id: "les_1_5",
 title: "S.G.D Automatizaciones IA",
 content: `# S.G.D Automatizaciones IA

Optimiza tu negocio con estas herramientas esenciales

## Automatizaciones OBLIGATORIAS

Estas herramientas son esenciales para el funcionamiento eficiente de tu negocio.

### LDT Digital Downloads
Para automatizar la entrega del producto digital al comprador.

**Nota**: Explicación de cómo instalarla en el apartado "S.G.D Creación Web".

### ManyChat
Para automatizar los DMs, comentarios y redirección hacia la web.

**Plantillas**: Tenéis las plantillas para usar en el apartado de "PLANTILLAS".

### Vídeos de explicación completos:
 **Accede a todos los vídeos explicativos**
Instalación, configuración y uso paso a paso de todas las automatizaciones
→

## Automatizaciones OPCIONALES

Mejoras adicionales para escalar tu negocio

### Lista de herramientas opcionales

- **Klaviyo o Shopify Email** - para automatizar correos de bienvenida y seguimiento.
- **Meta Ads Manager** - para automatizar campañas publicitarias y retargeting.
- **Zapier** - para conectar apps (Shopify, Google Sheets, Notion, etc.) y simplificar tareas.
- **Google Analytics + Meta Pixel** - para automatizar el seguimiento de conversiones.`,
 order: 5,
 },
 {
 id: "les_1_6",
 title: "S.G.D Reembolsos",
 content: `# S.G.D Reembolsos

## Recomiendo solo aceptar pagos por PayPal y Tarjeta de crédito.

Al ser un producto digital, si os abren una disputa en PayPal, la vais a ganar casi siempre, ya que PayPal apenas protege al comprador en productos digitales.

Si os abren una disputa en Shopify (un contracargo), no lo vais a poder ganar nunca: así funciona Shopify con los productos digitales.

## Importante

Para evitar suspensiones por contracargos y reportes, crea tus políticas en **Configuración → Políticas (Shopify Admin)**. 

Puedes tomar como base las de **axelresells.com** y adaptarlas para tu web. 

**Déjalas siempre visibles para los usuarios al final de la página.**`,
 order: 6,
 },
 ],
 },
 {
 id: "mod_2",
 slug: "shopify-productos-fisicos",
 title: "Shopify Productos Físicos",
 description: "Reventa de productos físicos con márgenes escalables",
 icon: "package",
 videoUrl: "https://www.youtube.com/embed/qC4lI_3RkZA?autoplay=1&mute=1",
 order: 2,
 lessons: [
 {
 id: "les_2_1",
 title: "S.P.F Qué Productos Físicos Vender",
 content: `# S.P.F Qué Productos Físicos Vender

## Mis principales recomendaciones:

### 1. Airpods (mi favorito)
Sin duda es el producto con el que más dinero he ganado.

### 2. Perfumes
Cuesta mucho más que alguien los compre, ya que al contrario que los Airpods, su precio original suele rondar los 40/90€, y para ganar dinero los tendrías que vender por 45€. Por lo que casi nadie preferirá comprar una réplica por un precio casi de original.

### 3. Relojes
Al contrario que los perfumes, su precio de réplica es bajísimo, mientras que su precio original es altísimo.

## Otras recomendaciones:

- Ropa
- Zapatillas
- Carteras/Bolsos
- Legos`,
 order: 1,
 },
 {
 id: "les_2_2",
 title: "S.P.F Creación Web",
 content: `# S.P.F Creación Web

**3 puntos clave para crear tu web (por orden):**

### 1. Crear tienda Shopify
Vas a ir a Shopify para crear tu web, utiliza este video para aprender lo esencial:
[Video tutorial de Shopify]

### 2. Configurar envío contra reembolso
Mira este video para configurar el envío contra reembolso en Shopify:
[Video de configuración]

### 3. Imágenes de productos
NO pongáis fotos de los productos reales, haced ilustraciones de ellos.

### 4. Herramientas recomendadas
Recomiendo utilizar **ChatGPT** para crear los diseños, **Photopea** para transformar los diseños a tu gusto y **Lets Enhance** para aumentar la calidad del diseño final.`,
 order: 2,
 },
 {
 id: "les_2_3",
 title: "S.P.F Marketing",
 content: `# S.P.F Marketing

**Tenéis toda la información aquí:** /S.G.D Marketing

Los anuncios pagados funcionan mucho mejor con productos físicos, por lo que, para este modelo de negocio SÍ son buenos.

## **Referencia a S.G.D Marketing**

Para estrategias de marketing completas, consulta el módulo de **S.G.D Marketing** donde encontrarás:

- Tráfico orgánico (Instagram, TikTok, YouTube Shorts)
- Anuncios pagados (Facebook Ads, Google Ads)
- Estrategias de contenido
- Cómo viralizar tus productos

 **Nota importante**: Los anuncios pagados son especialmente efectivos con productos físicos debido a su naturaleza tangible y la capacidad de mostrar el producto en acción.`,
 order: 3,
 },
 {
 id: "les_2_4",
 title: "S.P.F Automatizaciones",
 content: `# S.P.F Automatizaciones

En este modelo de negocio solo podéis automatizar las redes sociales:

## ManyChat

ManyChat para Automatizar los DMs, Comentarios, y Redirigimiento hacia la web.

Tenéis las plantillas para usar en el apartado de "PLANTILLAS".

### Video de explicación:

[Video explicativo de ManyChat]

## Automatizaciones disponibles

- Respuestas automáticas a DMs
- Respuestas automáticas a comentarios
- Redirección hacia la web de compra
- Seguimiento automatizado de clientes potenciales

 **Nota**: A diferencia de los productos digitales, las automatizaciones en productos físicos están más limitadas debido a la naturaleza del negocio y los envíos contra reembolso.`,
 order: 4,
 },
 {
 id: "les_2_5",
 title: "S.P.F Reembolsos",
 content: `# S.P.F Reembolsos

**Depende al 100% de vosotros aceptar o no reembolsos.**

Ya que comprador no puede abrir una disputa de ninguna manera al ser el envío contra reembolso.

## Ventajas del envío contra reembolso

- El comprador paga cuando recibe el producto
- No puede abrir disputas en plataformas de pago
- Tú tienes el control total sobre las políticas de reembolso

## Política recomendada

Puedes decidir:

1. **No aceptar reembolsos** - El cliente inspecciona el producto al recibirlo y decide si lo acepta o no en ese momento
2. **Aceptar reembolsos con condiciones** - Solo en casos específicos como producto defectuoso o error en el envío
3. **Política flexible** - Aceptar devoluciones dentro de un plazo determinado

 **Consejo**: Deja clara tu política de reembolsos en tu página web para evitar malentendidos con los clientes.`,
 order: 5,
 },
 {
 id: "les_2_6",
 title: "S.P.F Cómo Hacer Envíos",
 content: `# S.P.F Como Hacer Envíos

**Para todo el tema de envíos recomiendo [packlink.es](http://packlink.es/), es mucho más barato que enviar directamente desde la propia empresa de envío, correos, etc.**

No existe ninguna opción más barata.

## Ventajas de Packlink

- Mucho más económico que las empresas de envío directas
- Permite envíos Contra Reembolso
- Permite envíos normales Europeos
- Integración con múltiples transportistas
- Gestión centralizada de todos tus envíos

## Características principales

### Envíos Contra Reembolso
Ideal para productos físicos donde el cliente paga al recibir el producto.

### Envíos normales Europeos
Si decides expandir tu negocio a otros países europeos.

### Comparativa de precios
Packlink te permite comparar precios entre diferentes transportistas y elegir la opción más económica.

 **Recomendación**: Empieza usando Packlink desde el primer envío para minimizar costes y maximizar beneficios.`,
 order: 6,
 },
 {
 id: "les_2_7",
 title: "S.P.F Precio Productos",
 content: `# S.P.F Precio Productos

### Airpods:

#### 1. Airpods Pro 2/3:
- **Precio de Venta en Shopify** 35/40€ la unidad, contando envío.
- **Costo por unidad aproximado** 14/18€ + 5/9€ envío contra reembolso.
- **Beneficio por venta de** 15/20€ aproximadamente.

#### 2. Airpods 4:
- **Precio de Venta en Shopify** 30/35€ la unidad, contando envío.
- **Costo por unidad aproximado** 10/14€ + 5/9€ envío contra reembolso.
- **Beneficio por venta de** 15/20€ aproximadamente.

#### 3. Airpods Max:
- **Precio de venta en Shopify** 110/120€ la unidad, contando envío.
- **Costo por unidad aproximado** 79€ + 9/15€ envío contra reembolso.
- **Beneficio por venta de** 20/35€ aproximadamente.

### Perfumes:

- Precio de Venta en Shopify 40/50€ la unidad, contando envío.
- Costo por unidad aproximado 23/27€ + 5/9€ envío contra reembolso.
- Beneficio por venta de 10/20€ la unidad, contando envío.

### Relojes:

#### 1. G-Shock:
- Precio de Venta en Shopify 30/40€ la unidad, contando envío.
- Costo por unidad aproximado 14/18 + 5/9 envío contra reembolso.
- Beneficio por venta de 15/20€ aproximadamente.

#### 2. Rolex/Gamas de relojes altas:
- Precio de Venta en Shopify 110/300€ la unidad contando envío.
- Costo por unidad aproximado 80/160€ + envío contra reembolso.
- Beneficio por venta 30/150€ aproximadamente.`,
 order: 7,
 },
 ],
 },
 {
 id: "mod_3",
 slug: "aplicaciones-de-reventa",
 title: "Aplicaciones de Reventa",
 description: "Wallapop, Vinted y marketplaces para resultados rápidos",
 icon: "smartphone",
 videoUrl: "https://www.youtube.com/embed/Y_gJ09mJoJE?autoplay=1&mute=1",
 order: 3,
 lessons: [
 {
 id: "les_3_1",
 title: "A.D.R Que Productos Vender",
 content: `# A.D.R Que Productos Vender

## Zapatillas: **el mejor producto**

Recomiendo vender zapatillas Adidas Spezial, pero vended Nike y Adidas mayoritariamente.

## Ropa

Cualquier tipo de prenda/marca sirve.

## Airpods

Para pasar el control de Wallapop y que te deje publicar los anuncios de Airpods, vas a necesitar comprar mi Pack Élite en [axelresells.com](http://axelresells.com).`,
 order: 1,
 },
 {
 id: "les_3_2",
 title: "A.D.R Donde Vender Cada Producto",
 content: `# A.D.R Donde Vender Cada Producto

## Wallapop

**Vende todo en general, pero sobre todo Airpods.**

Wallapop es la plataforma más versátil donde puedes vender prácticamente cualquier producto, pero destaca especialmente para la venta de Airpods.

### Productos recomendados para Wallapop:
- Airpods (producto estrella)
- Zapatillas
- Ropa
- Electrónica en general
- Accesorios

## Vinted

 **NO vendas Airpods en Vinted** (te meten permaban al instante)

Vende solamente **ropa y zapatillas**.

### Productos que funcionan bien en Vinted:

#### Zapatillas
Las zapatillas se venden muy bien en Vinted, pero siguiendo los precios del apartado **A.D.R Precios Productos** (55/65€ la unidad).

#### Ropa
La ropa también se vende bien en Vinted.

### Importante:
- NUNCA publiques Airpods en Vinted
- Enfócate en ropa y zapatillas
- Respeta los precios recomendados para maximizar ventas`,
 order: 2,
 },
 {
 id: "les_3_3",
 title: "A.D.R Precios Productos",
 content: `# A.D.R Precios Productos

### Airpods
Los vas a vender por **90/150€ la unidad**.

### Zapatillas
Las vas a vender por **55/65€ la unidad**.

### Ropa
Depende mucho de la prenda.

## Proveedores recomendados

Para comprar las zapatillas te recomiendo **Hacoo** (Es una App). La calidad es mucho peor que en mis proveedores, pero te permite sacar un beneficio grande por cada venta de zapatilla.

 **Importante sobre Airpods**: Los Airpods no te recomiendo que los compres por Hacoo, ya que la calidad es bastante mala y te van a banean la cuenta en Wallapop, aparte de que si consiguieras pasar el control de Wallapop (no lo vas a hacer), el comprador te los devolvería 100%.`,
 order: 3,
 },
 ],
 },
]

// Helper functions
export function getAllModules(): Module[] {
 return AXELSCALE_MODULES.sort((a, b) => a.order - b.order)
}

export function getModuleBySlug(slug: string): Module | undefined {
 return AXELSCALE_MODULES.find((m) => m.slug === slug)
}

export function getLessonById(lessonId: string): { lesson: Lesson; module: Module } | undefined {
 for (const module of AXELSCALE_MODULES) {
 const lesson = module.lessons.find((l) => l.id === lessonId)
 if (lesson) {
 return { lesson, module }
 }
 }
 return undefined
}

export function getModuleLessons(moduleSlug: string): Lesson[] {
 const module = getModuleBySlug(moduleSlug)
 return module ? module.lessons.sort((a, b) => a.order - b.order) : []
}

// Updated: 2025-12-18 - Fixed ADR module structure
