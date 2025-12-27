# 🔐 Cómo Verificar que el Login Funciona

## 1. Verificación Visual en el Header

Cuando el login funciona correctamente, deberías ver:

- **Antes del login**: Botón "Iniciar sesión"
- **Después del login**: "Hola, [tu nombre]" + icono de logout

## 2. Página de Debug

He creado una página de debug que puedes visitar:

```
http://localhost:3000/debug-auth
```

Esta página muestra:
- Estado de la sesión (authenticated/unauthenticated/loading)
- Información del usuario (ID, nombre, email, avatar)
- Datos completos de la sesión en JSON

## 3. Consola del Navegador

Abre las herramientas de desarrollador (F12) y ve a la pestaña **Console**. Deberías ver logs como:

```
🔐 Auth Status: authenticated
👤 Session: { user: "Tu Nombre", id: "..." }
```

## 4. Logs del Servidor

En la terminal donde corre `npm run dev`, deberías ver logs cuando haces login:

```
🔐 SignIn callback: { userId: "...", email: "...", name: "..." }
📋 Session callback: { userId: "...", email: "...", name: "..." }
```

## 5. Verificar en Base de Datos

Si el login funciona, se crea un registro en la tabla `User`:

```bash
# Opción 1: Prisma Studio (interfaz visual)
npx prisma studio

# Opción 2: Query directa
npx prisma db execute --stdin <<< "SELECT * FROM \"User\" ORDER BY \"createdAt\" DESC LIMIT 5;"
```

Deberías ver tu usuario con:
- `email`: Tu email de Google
- `name`: Tu nombre de Google
- `accounts`: Relación con la cuenta de Google

## 6. Verificar Variables de Entorno

Asegúrate de que tienes estas variables en `.env.local`:

```bash
GOOGLE_CLIENT_ID="tu-client-id"
GOOGLE_CLIENT_SECRET="tu-client-secret"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="tu-secret-generado"
```

## 7. Verificar Redirect URI en Google Cloud

El redirect URI debe estar configurado en Google Cloud Console:

```
http://localhost:3000/api/auth/callback/google
```

## Checklist de Verificación

- [ ] El botón "Iniciar sesión" aparece en el header
- [ ] Al hacer clic, se abre la página de Google OAuth
- [ ] Después de seleccionar cuenta, vuelves a la página principal
- [ ] El botón cambia a "Hola, [tu nombre]" + icono logout
- [ ] La página `/debug-auth` muestra tu información
- [ ] Los logs del servidor muestran los callbacks
- [ ] Existe un registro en la base de datos `User`
- [ ] Puedes hacer logout y volver a hacer login

## Problemas Comunes

### "No puedes iniciar sesión porque no cumple con la política OAuth 2.0"
- **Solución**: Añade el redirect URI `http://localhost:3000/api/auth/callback/google` en Google Cloud Console

### El botón no cambia después del login
- **Solución**: Verifica que `NEXTAUTH_SECRET` esté configurado
- **Solución**: Reinicia el servidor (`npm run dev`)

### No se crea el usuario en la base de datos
- **Solución**: Verifica que la base de datos esté corriendo (Docker)
- **Solución**: Verifica que Prisma esté configurado correctamente

