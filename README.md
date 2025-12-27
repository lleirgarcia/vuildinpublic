# vuilding in public

Una plataforma donde construimos software basado en feedback de redes sociales como YouTube, Instagram o TikTok. Apalancamos el desarrollo y creamos software basado en IA. Construimos software basado en la comunidad, cada proyecto nace de una propuesta, feedback y comentarios que obtenemos y desarrollamos.

## 🎯 Concepto

**vuilding in public** es una plataforma que transforma comentarios y feedback de redes sociales en proyectos de software reales. La comunidad propone ideas, vota por las que más le interesan, y seguimos el progreso en tiempo real desde la concepción hasta el lanzamiento.

### Características principales

- **Proyectos basados en feedback**: Cada proyecto nace de un comentario o propuesta de la comunidad
- **Sistema de votación**: La comunidad decide qué proyectos se construyen
- **Seguimiento en tiempo real**: Visualiza el estado de cada proyecto (brainstorming, in progress, testing, shipped)
- **Transparencia total**: Todo el proceso de desarrollo es público y visible
- **Proyectos pequeños y ágiles**: Nos enfocamos en crear software pequeño y funcional, no proyectos grandes

## 🚀 Inicio rápido

### Prerrequisitos

- **Node.js 18+**
- **npm** o **yarn**
- **Docker** y **Docker Compose** (recomendado para PostgreSQL)

### Instalación

1. **Clonar el repositorio:**
   ```bash
   git clone <repository-url>
   cd project1
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno:**
   ```bash
   cp .env.example .env
   ```
   
   El archivo `.env` debe contener:
   ```env
   DATABASE_URL="postgresql://postgres:postgres@localhost:5433/vuilding?schema=public"
   ```

4. **Iniciar PostgreSQL con Docker:**
   ```bash
   npm run docker:up
   ```
   
   Esto iniciará un contenedor PostgreSQL en el puerto **5433** (para evitar conflictos con instalaciones locales).

5. **Configurar la base de datos:**
   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```

6. **Poblar con datos de ejemplo:**
   ```bash
   npm run db:seed
   ```

7. **Iniciar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```

8. **Abrir en el navegador:**
   ```
   http://localhost:3000
   ```

## 📁 Estructura del proyecto

```
project1/
├── app/                          # Next.js App Router
│   ├── api/                      # API endpoints
│   │   ├── comments/             # Endpoints para comentarios
│   │   ├── projects/             # Endpoints para proyectos
│   │   ├── polls/                # Endpoints para votaciones
│   │   ├── users/                # Endpoints para usuarios
│   │   └── home/                 # Endpoint consolidado para home
│   ├── board/                    # Vista tipo Kanban/Trello
│   ├── projects/[id]/            # Página de detalle de proyecto
│   ├── inbox/                    # Gestión de comentarios (backoffice)
│   ├── layout.tsx                # Layout principal con header y footer
│   └── page.tsx                  # Página principal
├── components/                    # Componentes reutilizables
│   ├── SocialStats.tsx           # Estadísticas de redes sociales
│   ├── ProjectCard.tsx           # Tarjeta de proyecto reutilizable
│   ├── PollSection.tsx           # Sección de votaciones
│   ├── KanbanBoard.tsx           # Board tipo Trello
│   ├── KanbanColumn.tsx          # Columna del board
│   ├── KanbanCard.tsx            # Tarjeta del board
│   └── VideoEmbed.tsx            # Embed de videos (YouTube, TikTok, Instagram)
├── lib/                           # Utilidades y configuraciones
│   ├── prisma.ts                 # Cliente de Prisma
│   ├── spec.ts                   # Generador de mini-specs (mock)
│   └── config.ts                 # Configuración general
├── prisma/                       # Prisma ORM
│   ├── schema.prisma             # Schema de base de datos
│   ├── seed.ts                   # Seed con datos de ejemplo
│   ├── clear-votes.ts            # Script para limpiar votos
│   └── migrations/               # Migraciones de base de datos
├── public/                       # Archivos estáticos
│   ├── logo.png                  # Logo principal
│   ├── favicon.png               # Favicon
│   └── [iconos sociales]         # Iconos PNG para redes sociales
└── package.json
```

## 🎨 Páginas principales

### 1. **Home (`/`)**

Dashboard principal que muestra:

- **Introducción**: Explicación de la plataforma y su propósito
- **En construcción**: Proyectos actualmente en desarrollo con sus estados
- **Votar proyecto**: Lista de proyectos propuestos para votación
- **Top 10 interacciones**: Usuarios más activos de la comunidad
- **Terminados**: Proyectos completados y lanzados

### 2. **Board (`/board`)**

Vista tipo Kanban/Trello estática que organiza proyectos en columnas:

- **En Votación**: Proyectos propuestos esperando votos
- **Brainstorming**: Proyectos en fase de ideación
- **In Progress**: Proyectos en desarrollo activo
- **Testing**: Proyectos en fase de pruebas
- **Shipped**: Proyectos completados y lanzados

### 3. **Detalle de Proyecto (`/projects/[id]`)**

Página de detalle que incluye:

- **Header**: Número del proyecto, estado y título
- **Créditos**: Usuario que propuso el proyecto y comentario original
- **Requisitos técnicos**: Mini-spec con objetivo, alcance, criterios de aceptación y fuera de alcance
- **Videos**: Videos embebidos relacionados con el proyecto (YouTube, TikTok, Instagram)
- **Tarjeta shareable**: Visualización grande para compartir en redes sociales
  - Botón "Copiar texto": Copia un resumen al portapapeles
  - Botón "Exportar PNG": Exporta la tarjeta como imagen PNG

### 4. **Inbox (`/inbox`)**

Backoffice para gestión de comentarios:

- **Formulario**: Agregar comentarios manualmente (tiktokHandle, commentText, videoUrl)
- **Lista de comentarios**: Ver todos los comentarios guardados
- **Acciones disponibles**:
  - Marcar/Quitar candidato de hoy
  - Generar spec (mock por ahora)
  - Crear proyecto desde comentario

## 🗄️ Modelo de datos

### Entidades principales

- **User**: Usuarios de la plataforma con información de perfiles sociales
- **Comment**: Comentarios capturados de redes sociales
- **Project**: Proyectos creados a partir de comentarios
- **Estado**: Estados de proyecto con colores personalizados (brainstorming, in progress, testing, shipped)
- **Message**: Mensajes/comentarios sobre proyectos con sistema de likes
- **Poll**: Encuestas/votaciones para decidir próximos proyectos
- **Vote**: Votos de usuarios en polls
- **Video**: Videos relacionados con proyectos (YouTube, TikTok, Instagram)
- **SocialStat**: Estadísticas de redes sociales (seguidores, crecimiento, etc.)

### Relaciones

- Un `Comment` puede generar un `Project` o un `Poll`
- Un `Project` tiene un `Estado` y múltiples `Message` y `Video`
- Un `Poll` tiene múltiples `Vote`
- Los `User` pueden estar asociados a `Comment`, `Message` y `Vote`

## 🔌 API Endpoints

### Comentarios

- `GET /api/comments` - Listar comentarios (con filtros opcionales)
- `POST /api/comments` - Crear nuevo comentario
- `GET /api/comments/[id]` - Obtener comentario específico
- `POST /api/comments/[id]/toggle-candidate` - Marcar/desmarcar candidato
- `POST /api/comments/[id]/generate-spec` - Generar spec para comentario
- `POST /api/comments/[id]/create-project` - Crear proyecto desde comentario

### Proyectos

- `GET /api/projects` - Listar proyectos (con filtros por estado)
- `GET /api/projects/[id]` - Obtener proyecto específico
- `POST /api/projects/[id]` - Actualizar proyecto
- `POST /api/projects/[id]/videos` - Agregar video a proyecto

### Votaciones

- `GET /api/polls` - Listar polls activos con conteo de votos
- `POST /api/polls/vote` - Votar por un poll

### Usuarios

- `GET /api/users/top` - Obtener top 10 usuarios por interacciones

### Home

- `GET /api/home` - Endpoint consolidado con todos los datos para la página principal

## 🔧 Scripts disponibles

### Desarrollo

- `npm run dev` - Inicia servidor de desarrollo en `http://localhost:3000`
- `npm run build` - Construye la aplicación para producción
- `npm run start` - Inicia servidor de producción
- `npm run lint` - Ejecuta el linter

### Base de datos

- `npm run db:push` - Aplica cambios del schema directamente (útil para desarrollo rápido)
- `npm run db:migrate` - Crea y aplica una nueva migración
- `npm run db:seed` - Pobla la base de datos con datos de ejemplo
- `npm run db:studio` - Abre Prisma Studio (GUI para explorar la BD)
- `npm run db:clear-votes` - Limpia todos los votos de la base de datos

### Docker

- `npm run docker:up` - Inicia PostgreSQL en Docker (puerto 5433)
- `npm run docker:down` - Detiene y elimina el contenedor PostgreSQL
- `npm run docker:logs` - Ver logs del contenedor PostgreSQL

## 🎨 Diseño y estilo

### Tema

- **Estilo**: Minimalista, "clean tech"
- **Colores**: Tonos oscuros (negro, grises oscuros)
- **Tipografía**: Sans-serif, tamaños grandes para elementos importantes
- **Componentes**: Tarjetas con bordes suaves, espaciado generoso

### Componentes reutilizables

- `ProjectCard`: Tarjeta unificada para mostrar proyectos en diferentes secciones
- `KanbanBoard`: Vista tipo Trello para organización visual
- `SocialStats`: Estadísticas de redes sociales en el header
- `VideoEmbed`: Embed inteligente para YouTube, TikTok e Instagram

## 🔄 Flujo de trabajo

1. **Captura de comentarios**: Los comentarios se agregan manualmente en `/inbox`
2. **Generación de spec**: Se genera un mini-spec (mock por ahora) con objetivo, alcance, criterios y fuera de alcance
3. **Votación**: Los comentarios pueden convertirse en polls para que la comunidad vote
4. **Creación de proyecto**: Cuando un poll gana o se decide crear un proyecto, se crea desde el comentario
5. **Desarrollo**: El proyecto pasa por estados: brainstorming → in progress → testing → shipped
6. **Seguimiento**: La comunidad puede ver el progreso en tiempo real y dejar mensajes con likes

## 🛠️ Tecnologías

- **Next.js 14** (App Router) - Framework React con SSR
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Estilos utility-first
- **Prisma** - ORM para base de datos
- **PostgreSQL** - Base de datos relacional (Docker)
- **Docker & Docker Compose** - Contenedorización de PostgreSQL
- **html-to-image** - Exportación de tarjetas a PNG

## 📝 Notas importantes

- **Sin autenticación**: Esta versión no incluye autenticación de usuarios (MVP)
- **Captura manual**: Los comentarios se agregan manualmente (copy/paste), no hay scraping
- **Specs mock**: El generador de specs es mock pero está preparado para integrar LLM real
- **Datos estáticos**: Las estadísticas de redes sociales son estáticas por ahora
- **Puerto PostgreSQL**: Se usa el puerto 5433 para evitar conflictos con instalaciones locales

## 🚧 Próximas mejoras

- [ ] Integración real con LLM para generación de specs
- [ ] Sistema de autenticación de usuarios
- [ ] Integración con APIs de redes sociales para captura automática
- [ ] Dashboard de administración más completo
- [ ] Notificaciones en tiempo real
- [ ] Sistema de comentarios en tiempo real
- [ ] Analytics y métricas avanzadas

## 📄 Licencia

MIT

## 🤝 Contribuir

Este es un proyecto en desarrollo activo. Las contribuciones son bienvenidas, pero por ahora el desarrollo es interno.

---

**vuilding in public** - Construyendo software en público, basado en la comunidad.
