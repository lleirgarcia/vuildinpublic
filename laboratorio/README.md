# Laboratorio - TikTok Feature Lab

Una "máquina de episodios" para crear software basado en comentarios de TikTok. La plataforma permite capturar comentarios, seleccionar candidatos, generar mini-specs con IA (mock por ahora), y publicar episodios con changelog y créditos.

## 🚀 Inicio rápido

### Prerrequisitos

- Node.js 18+ 
- npm o yarn
- Docker y Docker Compose (opcional, para usar PostgreSQL)

### Opción 1: Con Docker (Recomendado)

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Configurar variables de entorno:**
   ```bash
   cp .env.example .env
   # El .env ya tiene la configuración para PostgreSQL
   ```

3. **Iniciar PostgreSQL con Docker:**
   ```bash
   npm run docker:up
   ```

4. **Configurar base de datos:**
   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```

5. **Poblar con datos de ejemplo:**
   ```bash
   npm run db:seed
   ```

6. **Iniciar servidor de desarrollo:**
   ```bash
   npm run dev
   ```

### Opción 2: SQLite local (Desarrollo rápido)

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Configurar variables de entorno:**
   ```bash
   # En .env, usa: DATABASE_URL="file:./dev.db"
   # Y cambia en prisma/schema.prisma: provider = "sqlite"
   ```

3. **Configurar base de datos:**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

4. **Poblar con datos de ejemplo:**
   ```bash
   npm run db:seed
   ```

5. **Iniciar servidor de desarrollo:**
   ```bash
   npm run dev
   ```

### Abrir en el navegador:
```
http://localhost:3000
```

## 📁 Estructura del proyecto

```
laboratorio/
├── app/                    # Next.js App Router
│   ├── api/                # API routes (Server Actions)
│   ├── inbox/              # Página de inbox
│   ├── episodes/[id]/      # Página de detalle de episodio
│   └── page.tsx            # Home
├── lib/                    # Utilidades
│   ├── prisma.ts           # Cliente de Prisma
│   └── spec.ts             # Generador de mini-specs (mock)
├── prisma/
│   ├── schema.prisma       # Schema de base de datos
│   └── seed.ts             # Seed con datos dummy
└── package.json
```

## 🎯 Funcionalidades

### Páginas principales

1. **Home (`/`)** - Dashboard principal
   - Candidatos de hoy (Top 3)
   - Episodios recientes
   - CTA para proponer comentarios

2. **Inbox (`/inbox`)** - Gestión de comentarios
   - Formulario para agregar comentarios manualmente
   - Lista de comentarios guardados
   - Acciones: marcar candidato, generar spec, crear episodio

3. **Episodio (`/episodes/[id]`)** - Detalle de episodio
   - Información completa del episodio
   - Mini-spec generado
   - Changelog editable
   - Tarjeta shareable con export PNG y copiar texto

### Modelo de datos

- **Comment**: Comentarios de TikTok capturados
- **Episode**: Episodios creados a partir de comentarios

## 🔧 Scripts disponibles

### Desarrollo
- `npm run dev` - Inicia servidor de desarrollo
- `npm run build` - Construye para producción
- `npm run start` - Inicia servidor de producción

### Base de datos
- `npm run db:push` - Aplica cambios del schema a la BD (SQLite)
- `npm run db:migrate` - Crea migración (PostgreSQL)
- `npm run db:seed` - Pobla la BD con datos de ejemplo
- `npm run db:studio` - Abre Prisma Studio (GUI para la BD)

### Docker
- `npm run docker:up` - Inicia PostgreSQL en Docker
- `npm run docker:down` - Detiene PostgreSQL
- `npm run docker:logs` - Ver logs de PostgreSQL

## 🎨 Personalización

### Generador de Mini-Specs

El generador de specs está en `lib/spec.ts` y actualmente es un mock. Para conectarlo a una LLM real:

1. Instala el SDK de tu proveedor (OpenAI, Anthropic, etc.)
2. Modifica la función `generateMiniSpec()` en `lib/spec.ts`
3. Reemplaza la lógica mock por una llamada real a la API

## 📝 Notas

- No hay autenticación en esta versión (MVP)
- La captura de comentarios es manual (copy/paste)
- La base de datos puede ser PostgreSQL (Docker) o SQLite (local)
- El generador de specs es mock pero está preparado para ser sustituido

## 🛠️ Tecnologías

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Prisma** + **PostgreSQL** (Docker) o **SQLite** (local)
- **html-to-image** (para exportar PNG)
- **Docker** (opcional, para PostgreSQL)

## 📄 Licencia

MIT

