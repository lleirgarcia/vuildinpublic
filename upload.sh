#!/bin/bash

# Script para subir cambios a git de forma rápida
# Uso: ./upload.sh [mensaje del commit]

# Color para mensajes
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Obtener el mensaje del commit
if [ -z "$1" ]; then
    COMMIT_MSG="Update: $(date '+%Y-%m-%d %H:%M:%S')"
else
    COMMIT_MSG="$1"
fi

echo -e "${YELLOW}📦 Subiendo cambios a git...${NC}"

# Verificar si hay cambios
if [ -z "$(git status --porcelain)" ]; then
    echo -e "${YELLOW}⚠️  No hay cambios para subir${NC}"
    exit 0
fi

# Agregar todos los cambios
echo -e "${YELLOW}➕ Agregando cambios...${NC}"
git add -A

# Hacer commit
echo -e "${YELLOW}💾 Haciendo commit: ${COMMIT_MSG}${NC}"
git commit -m "$COMMIT_MSG"

# Hacer push
echo -e "${YELLOW}🚀 Subiendo a origin/main...${NC}"
git push origin main

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Cambios subidos exitosamente!${NC}"
else
    echo -e "${RED}❌ Error al subir cambios${NC}"
    exit 1
fi

