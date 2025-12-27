# 🔍 Diagnóstico Completo: Login No Funciona

## ✅ Estado Actual (Verificado)

- ✅ Base de datos conectada
- ✅ Tablas de NextAuth existen (User, Account, Session)
- ✅ Variables de entorno configuradas
- ✅ Estructura permite crear usuarios
- ❌ **0 usuarios en la base de datos** (el login no está creando usuarios)

## 🔍 Pasos de Diagnóstico

### 1. Verificar Redirect URI en Google Cloud Console

**CRÍTICO**: El redirect URI debe ser **exactamente**:

```
http://localhost:3000/api/auth/callback/google
```

**Pasos:**
1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Selecciona el proyecto **vuildinginpublic**
3. Ve a **APIs & Services** > **Credentials**
4. Edita el OAuth 2.0 Client ID
5. En **Authorized redirect URIs**, verifica que esté:
   ```
   http://localhost:3000/api/auth/callback/google
   ```
6. **Guarda los cambios**

### 2. Verificar Logs del Servidor

Cuando intentas hacer login, **deberías ver** en la terminal del servidor:

```
🔐 SignIn callback: { email: "...", name: "...", provider: "google" }
🆕 Nuevo usuario iniciando sesión: { userId: "...", email: "..." }
✅ Usuario creado: { id: "...", email: "...", name: "..." }
✅ Cuenta vinculada: { userId: "...", provider: "google" }
```

**Si NO ves estos logs**, significa que:
- El callback de Google no se está ejecutando
- Hay un error antes de llegar al callback
- El redirect URI no está configurado correctamente

### 3. Verificar URL de Redirección

Cuando haces clic en "Iniciar sesión", la URL debería cambiar a algo como:

```
https://accounts.google.com/o/oauth2/v2/auth?client_id=...
```

**Si NO te redirige a Google**, hay un problema con la configuración.

### 4. Verificar Error en la URL de Retorno

Después de autorizar en Google, si hay un error, la URL será algo como:

```
http://localhost:3000/?error=OAuthCreateAccount
```

**Errores comunes:**
- `OAuthCreateAccount`: No se pudo crear la cuenta (problema con el adapter)
- `Configuration`: Problema con la configuración de NextAuth
- `AccessDenied`: Acceso denegado

### 5. Verificar Cookies del Navegador

Después de intentar hacer login:

1. Abre las herramientas de desarrollador (F12)
2. Ve a **Application** > **Cookies** > `http://localhost:3000`
3. Deberías ver:
   - `next-auth.session-token` (si el login fue exitoso)
   - `next-auth.csrf-token` (siempre presente)

**Si NO ves `next-auth.session-token`**, el login no se completó.

### 6. Verificar Consola del Navegador

Abre la consola (F12) y busca:
- Errores de red (requests fallidos)
- Errores de JavaScript
- Logs de NextAuth

## 🛠️ Soluciones Posibles

### Solución 1: Verificar Redirect URI

El problema más común es que el redirect URI no está configurado correctamente en Google Cloud Console.

**Asegúrate de que sea exactamente:**
```
http://localhost:3000/api/auth/callback/google
```

### Solución 2: Limpiar Cookies y Reintentar

1. Abre las herramientas de desarrollador (F12)
2. Ve a **Application** > **Cookies** > `http://localhost:3000`
3. Elimina todas las cookies
4. Recarga la página
5. Intenta hacer login de nuevo

### Solución 3: Verificar que el Servidor Esté Corriendo

```bash
# Verificar que el servidor esté corriendo
curl http://localhost:3000
```

### Solución 4: Revisar Logs del Servidor en Tiempo Real

Mientras intentas hacer login, observa la terminal donde corre `npm run dev` para ver:
- Si se ejecutan los callbacks
- Si hay errores de Prisma
- Si hay errores de NextAuth

## 📋 Checklist de Verificación

Antes de intentar hacer login, verifica:

- [ ] Docker/PostgreSQL está corriendo (`docker ps`)
- [ ] El servidor Next.js está corriendo (`npm run dev`)
- [ ] Las variables de entorno están en `.env.local`
- [ ] El redirect URI está configurado en Google Cloud Console
- [ ] No hay errores en la consola del navegador
- [ ] No hay errores en los logs del servidor

## 🎯 Próximos Pasos

1. **Verifica el redirect URI en Google Cloud Console** (más importante)
2. **Intenta hacer login de nuevo**
3. **Observa los logs del servidor** mientras haces login
4. **Comparte los logs/errores** que veas

Si después de verificar el redirect URI sigue sin funcionar, comparte:
- Los logs del servidor cuando intentas hacer login
- La URL a la que te redirige Google después de autorizar
- Cualquier error en la consola del navegador

