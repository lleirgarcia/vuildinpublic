# 🔍 Diagnóstico: Estado "unauthenticated"

Si ves "Status: unauthenticated" en `/debug-auth`, significa que el login no está funcionando. Sigue estos pasos:

## 1. Verificar Variables de Entorno

Next.js lee las variables de entorno de `.env.local` (no `.env`). Verifica:

```bash
# Ver si existe .env.local
ls -la .env.local

# Ver contenido (sin mostrar secretos completos)
grep -E "^[A-Z]" .env.local 2>/dev/null | cut -d'=' -f1
```

**Debes tener estas variables:**
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `NEXTAUTH_URL`
- `NEXTAUTH_SECRET`

## 2. Verificar Logs del Servidor

Cuando inicias el servidor (`npm run dev`), deberías ver:

**Si está bien configurado:**
- No deberías ver errores de "Google OAuth no configurado"
- No deberías ver warnings de "NEXTAUTH_SECRET no configurado"

**Si hay problemas:**
```
❌ ERROR: Google OAuth no configurado.
⚠️  NEXTAUTH_SECRET no configurado.
```

## 3. Verificar Redirect URI en Google Cloud

El redirect URI debe estar exactamente así en Google Cloud Console:
```
http://localhost:3000/api/auth/callback/google
```

## 4. Pasos para Solucionar

### Opción A: Crear .env.local desde el JSON

Si tienes el archivo JSON del cliente de Google:

```bash
# Extraer client_id y client_secret del JSON
CLIENT_ID=$(cat client_secret_*.json | grep -o '"client_id":"[^"]*"' | cut -d'"' -f4)
CLIENT_SECRET=$(cat client_secret_*.json | grep -o '"client_secret":"[^"]*"' | cut -d'"' -f4)

# Generar NEXTAUTH_SECRET
NEXTAUTH_SECRET=$(openssl rand -base64 32)

# Crear .env.local
cat > .env.local << EOF
GOOGLE_CLIENT_ID="$CLIENT_ID"
GOOGLE_CLIENT_SECRET="$CLIENT_SECRET"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="$NEXTAUTH_SECRET"
EOF
```

### Opción B: Configurar Manualmente

1. Crea `.env.local` en la raíz del proyecto
2. Añade:

```env
GOOGLE_CLIENT_ID="TU_CLIENT_ID_AQUI"
GOOGLE_CLIENT_SECRET="TU_CLIENT_SECRET_AQUI"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="genera-un-secret-con-openssl-rand-base64-32"
```

3. Genera el secret:
```bash
openssl rand -base64 32
```

## 5. Reiniciar el Servidor

**IMPORTANTE:** Después de crear/modificar `.env.local`, debes:

1. Detener el servidor (Ctrl+C)
2. Reiniciarlo:
```bash
npm run dev
```

## 6. Probar el Login

1. Ve a `http://localhost:3000`
2. Haz clic en "Iniciar sesión"
3. Deberías ser redirigido a Google
4. Después de autorizar, vuelves a la app
5. Ve a `/debug-auth` y verifica que el status sea "authenticated"

## 7. Verificar en Base de Datos

Si el login funciona, deberías ver un nuevo usuario:

```bash
npx prisma studio
# O
npx prisma db execute --stdin <<< "SELECT email, name, \"createdAt\" FROM \"User\" ORDER BY \"createdAt\" DESC LIMIT 5;"
```

## Problemas Comunes

### "No puedes iniciar sesión porque no cumple con la política OAuth 2.0"
- **Causa**: Redirect URI no configurado en Google Cloud
- **Solución**: Añade `http://localhost:3000/api/auth/callback/google` en Google Cloud Console

### El botón "Iniciar sesión" no hace nada
- **Causa**: Variables de entorno no configuradas
- **Solución**: Crea `.env.local` con las variables necesarias

### Después del login, sigue "unauthenticated"
- **Causa**: `NEXTAUTH_SECRET` no configurado o incorrecto
- **Solución**: Genera un nuevo secret y reinicia el servidor

### Error en consola: "Invalid credentials"
- **Causa**: `GOOGLE_CLIENT_SECRET` incorrecto
- **Solución**: Verifica el secret en Google Cloud Console

