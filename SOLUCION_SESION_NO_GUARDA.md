# 🔧 Solución: Sesión no se guarda (unauthenticated)

## Problema Identificado

La consola muestra:
- `🔐 Auth Status: loading` → `unauthenticated`
- `👤 Session: No session`

Esto significa que NextAuth no está encontrando/creando la sesión en la base de datos.

## Checklist de Verificación

### 1. ✅ Verificar que Docker/PostgreSQL está corriendo

```bash
# Verificar Docker
docker ps

# Si no está corriendo, iniciarlo:
npm run docker:up
```

**Si Docker no está corriendo, la base de datos no funciona y NextAuth no puede guardar sesiones.**

### 2. ✅ Verificar que las migraciones están aplicadas

```bash
# Aplicar migraciones
npx prisma migrate dev

# O si prefieres forzar:
npx prisma db push

# Regenerar el cliente de Prisma
npx prisma generate
```

### 3. ✅ Verificar que .env.local tiene las variables

El archivo `.env.local` debe existir y tener:

```env
GOOGLE_CLIENT_ID="TU_CLIENT_ID_AQUI"
GOOGLE_CLIENT_SECRET="TU_CLIENT_SECRET_AQUI"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="tu-secret-generado"
```

### 4. ✅ Verificar Redirect URI en Google Cloud

En Google Cloud Console, el redirect URI debe ser **exactamente**:

```
http://localhost:3000/api/auth/callback/google
```

### 5. ✅ Verificar logs del servidor

Cuando reinicies el servidor, deberías ver:

```
🔧 NextAuth Config: {
  hasClientId: true,
  hasClientSecret: true,
  hasSecret: true,
  nextAuthUrl: 'http://localhost:3000',
  providersCount: 1
}
```

Si ves `providersCount: 0`, las variables no se están cargando.

### 6. ✅ Verificar base de datos después del login

Después de intentar hacer login, verifica:

```bash
npx prisma studio
```

Deberías ver:
- Un nuevo registro en `User` (tu usuario)
- Un registro en `Account` (tu cuenta de Google)
- Un registro en `Session` (tu sesión activa)

## Pasos de Solución

### Paso 1: Iniciar Docker/PostgreSQL

```bash
npm run docker:up
```

Espera 5-10 segundos a que PostgreSQL inicie completamente.

### Paso 2: Aplicar migraciones

```bash
npx prisma migrate dev
npx prisma generate
```

### Paso 3: Verificar .env.local

Asegúrate de que el archivo existe y tiene todas las variables.

### Paso 4: Reiniciar el servidor

```bash
# Detener el servidor (Ctrl+C)
# Reiniciar:
npm run dev
```

### Paso 5: Verificar logs al iniciar

Deberías ver el log `🔧 NextAuth Config:` con `providersCount: 1`.

### Paso 6: Intentar login

1. Haz clic en "Iniciar sesión"
2. Autoriza con Google
3. Vuelves a la app
4. Verifica en Prisma Studio que se creó:
   - Usuario en tabla `User`
   - Sesión en tabla `Session`
   - Cuenta en tabla `Account`

### Paso 7: Verificar cookies

En el navegador (F12 → Application → Cookies):
- Deberías ver una cookie `next-auth.session-token`
- Si no aparece, hay un problema con la creación de la sesión

## Problemas Comunes

### "Docker no está corriendo"
**Solución**: `npm run docker:up`

### "Tablas no existen"
**Solución**: `npx prisma migrate dev`

### "providersCount: 0"
**Solución**: Verifica `.env.local` y reinicia el servidor

### "No se crea sesión en la base de datos"
**Solución**: Verifica que Docker esté corriendo y que las migraciones estén aplicadas

### "Redirect URI error"
**Solución**: Añade `http://localhost:3000/api/auth/callback/google` en Google Cloud Console

## Debug Adicional

Si después de todos estos pasos sigue sin funcionar:

1. **Revisa los logs del servidor** cuando hagas login:
   - Deberías ver `🔐 SignIn callback:`
   - Deberías ver `📋 Session callback:`

2. **Revisa la consola del navegador**:
   - Busca errores de red
   - Busca errores de JavaScript

3. **Verifica la base de datos directamente**:
   ```bash
   npx prisma studio
   ```

