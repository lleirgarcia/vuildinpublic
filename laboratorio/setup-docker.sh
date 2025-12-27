#!/bin/bash

# Script de setup para Docker + PostgreSQL

echo "🐳 Configurando proyecto con Docker + PostgreSQL..."

# Crear .env si no existe
if [ ! -f .env ]; then
  echo "📝 Creando archivo .env..."
  cat > .env << EOF
# Database - PostgreSQL (Docker)
DATABASE_URL="postgresql://laboratorio:laboratorio_dev@localhost:5433/laboratorio?schema=public"
EOF
  echo "✅ Archivo .env creado"
else
  echo "⚠️  Archivo .env ya existe, verifica que tenga la URL de PostgreSQL"
fi

# Iniciar Docker
echo "🚀 Iniciando PostgreSQL con Docker..."
docker-compose up -d

# Esperar a que PostgreSQL esté listo
echo "⏳ Esperando a que PostgreSQL esté listo..."
sleep 5

# Generar Prisma Client
echo "🔧 Generando Prisma Client..."
npx prisma generate

# Crear migración inicial
echo "📦 Creando migración inicial..."
npx prisma migrate dev --name init

# Seed
echo "🌱 Poblando base de datos..."
npm run db:seed

echo "✅ Setup completado!"
echo ""
echo "Para iniciar el servidor:"
echo "  npm run dev"
echo ""
echo "Para ver los logs de PostgreSQL:"
echo "  npm run docker:logs"
echo ""
echo "Para detener PostgreSQL:"
echo "  npm run docker:down"

