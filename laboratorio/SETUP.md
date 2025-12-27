# Instrucciones de Configuración

## Opción 1: Con Docker y PostgreSQL (Recomendado)

### Paso 1: Crear archivo .env

Copia el archivo de ejemplo:
```bash
cp .env.example .env
```

El archivo `.env` ya contiene la configuración para PostgreSQL:
```
DATABASE_URL="postgresql://laboratorio:laboratorio_dev@localhost:5432/laboratorio?schema=public"
```

### Paso 2: Instalar dependencias

```bash
npm install
```

### Paso 3: Iniciar PostgreSQL con Docker

```bash
npm run docker:up
```

Esto iniciará PostgreSQL en el puerto 5432.

### Paso 4: Configurar Prisma

```bash
# Generar el cliente de Prisma
npx prisma generate

# Crear la base de datos y aplicar el schema (con migraciones)
npx prisma migrate dev --name init
```

### Paso 5: Poblar con datos de ejemplo

```bash
npm run db:seed
```

### Paso 6: Iniciar el servidor

```bash
npm run dev
```

Abre http://localhost:3000 en tu navegador.

## Opción 2: SQLite local (Desarrollo rápido)

### Paso 1: Crear archivo .env

Crea un archivo `.env` con:
```
DATABASE_URL="file:./dev.db"
```

**Importante:** También necesitas cambiar en `prisma/schema.prisma`:
```prisma
datasource db {
  provider = "sqlite"  // Cambiar de "postgresql" a "sqlite"
  url      = env("DATABASE_URL")
}
```

### Paso 2: Instalar dependencias

```bash
npm install
```

### Paso 3: Configurar Prisma

```bash
# Generar el cliente de Prisma
npx prisma generate

# Crear la base de datos y aplicar el schema
npx prisma db push
```

### Paso 4: Poblar con datos de ejemplo

```bash
npm run db:seed
```

### Paso 5: Iniciar el servidor

```bash
npm run dev
```

## Comandos útiles

- **Ver datos en Prisma Studio:**
  ```bash
  npm run db:studio
  ```

- **Ver logs de PostgreSQL:**
  ```bash
  npm run docker:logs
  ```

- **Detener PostgreSQL:**
  ```bash
  npm run docker:down
  ```

- **Resetear base de datos (PostgreSQL):**
  ```bash
  npm run docker:down
  npm run docker:up
  npx prisma migrate reset
  npm run db:seed
  ```

- **Resetear base de datos (SQLite):**
  ```bash
  rm prisma/dev.db
  npx prisma db push
  npm run db:seed
  ```

## Notas

- **PostgreSQL (Docker):** Los datos persisten en un volumen de Docker
- **SQLite:** La base de datos se crea en `prisma/dev.db`
- Puedes ver y editar los datos con `npx prisma studio`

