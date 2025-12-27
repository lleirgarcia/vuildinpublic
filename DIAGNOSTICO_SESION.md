# 🔍 Diagnóstico: Sesión no se guarda después del login

## Problema
Después de hacer login con Google (seleccionar cuenta, entrar credenciales), al volver a la página, la sesión no está iniciada.

## Verificaciones

### 1. Verificar Base de Datos

He creado un endpoint de diagnóstico. Visita:

```
http://localhost:3000/api/auth/test
```

Esto te mostrará:
- Si la base de datos está conectada
- Cuántos usuarios, sesiones y cuentas hay
- Las sesiones y usuarios recientes

### 2. Verificar Logs del Servidor

Cuando hagas login, deberías ver en la terminal del servidor:

```
🔐 SignIn callback: { userId: "...", email: "...", name: "..." }
📋 Session callback: { userId: "...", email: "...", name: "..." }
```

Si NO ves estos logs, significa que el callback no se está ejecutando.

### 3. Verificar Cookies

En el navegador (F12 → Application → Cookies → http://localhost:3000):

Después del login, deberías ver:
- `next-auth.session-token` (cookie con el token de sesión)

Si NO aparece esta cookie, hay un problema con la creación de la sesión.

### 4. Verificar en Prisma Studio

```bash
npx prisma studio
```

Después de intentar hacer login, verifica:
- **Tabla User**: ¿Se creó tu usuario?
- **Tabla Account**: ¿Se creó tu cuenta de Google?
- **Tabla Session**: ¿Se creó una sesión?

Si NO se crean estos registros, hay un problema con el adapter de Prisma.

## Posibles Causas

### Causa 1: Error silencioso en el callback
**Solución**: Revisa los logs del servidor para ver si hay errores.

### Causa 2: Cookies bloqueadas
**Solución**: Verifica que las cookies no estén bloqueadas en el navegador.

### Causa 3: Redirect URI incorrecto
**Solución**: Asegúrate de que en Google Cloud Console tengas:
```
http://localhost:3000/api/auth/callback/google
```

### Causa 4: Base de datos no conecta
**Solución**: Verifica que Docker esté corriendo:
```bash
docker ps
```

### Causa 5: Tablas no existen
**Solución**: Aplica las migraciones:
```bash
npx prisma migrate dev
npx prisma generate
```

## Pasos de Diagnóstico

1. **Visita** `http://localhost:3000/api/auth/test` y comparte el resultado
2. **Intenta hacer login** y comparte los logs del servidor
3. **Verifica cookies** en el navegador (F12 → Application → Cookies)
4. **Verifica Prisma Studio** para ver si se crearon registros

## Información Necesaria

Para diagnosticar mejor, necesito:
- El resultado de `http://localhost:3000/api/auth/test`
- Los logs del servidor cuando haces login
- Si ves la cookie `next-auth.session-token` en el navegador
- Si se crean registros en Prisma Studio

