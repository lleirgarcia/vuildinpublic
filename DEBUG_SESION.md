# 🔍 Debug: Sesión no se guarda

## Problema
Después de hacer login con Google, la sesión no se mantiene (status: "unauthenticated").

## Cambios Aplicados

1. **Estrategia de sesión**: Añadida `session: { strategy: 'database' }` - necesaria cuando usas PrismaAdapter
2. **Logs de debug**: Añadidos logs para ver la configuración al iniciar
3. **Verificación de variables**: El `.env.local` existe y tiene las variables correctas

## Verificaciones Necesarias

### 1. Verificar Logs del Servidor

Cuando reinicies el servidor, deberías ver en la terminal:

```
🔧 NextAuth Config: {
  hasClientId: true,
  hasClientSecret: true,
  hasSecret: true,
  nextAuthUrl: 'http://localhost:3000',
  providersCount: 1
}
```

Si ves `providersCount: 0`, significa que las variables no se están cargando.

### 2. Verificar Base de Datos

Después de intentar hacer login, verifica que se creó el usuario y la sesión:

```bash
npx prisma studio
```

O consulta directa:
```sql
-- Ver usuarios
SELECT * FROM "User" ORDER BY "createdAt" DESC LIMIT 5;

-- Ver sesiones
SELECT * FROM "Session" ORDER BY "expires" DESC LIMIT 5;

-- Ver cuentas
SELECT * FROM "Account" ORDER BY "createdAt" DESC LIMIT 5;
```

### 3. Verificar Redirect URI en Google Cloud

Asegúrate de que en Google Cloud Console tengas configurado:

**Authorized redirect URIs:**
```
http://localhost:3000/api/auth/callback/google
```

### 4. Verificar Cookies del Navegador

1. Abre las herramientas de desarrollador (F12)
2. Ve a **Application** > **Cookies** > `http://localhost:3000`
3. Deberías ver una cookie llamada `next-auth.session-token` después del login

Si no aparece, hay un problema con la creación de la sesión.

### 5. Verificar Consola del Navegador

Abre la consola (F12) y busca errores. También deberías ver:

```
🔐 Auth Status: authenticated
👤 Session: { user: "...", id: "..." }
```

### 6. Verificar Logs del Servidor Durante Login

Cuando hagas login, deberías ver en la terminal del servidor:

```
🔐 SignIn callback: { userId: "...", email: "...", name: "..." }
📋 Session callback: { userId: "...", email: "...", name: "..." }
```

## Posibles Problemas

### Problema 1: Variables no se cargan
**Solución**: Reinicia el servidor después de crear/modificar `.env.local`

### Problema 2: Base de datos no conecta
**Solución**: Verifica que Docker esté corriendo:
```bash
docker ps
npm run docker:up
```

### Problema 3: Tablas de NextAuth no existen
**Solución**: Ejecuta las migraciones:
```bash
npx prisma migrate dev
npx prisma generate
```

### Problema 4: Redirect URI incorrecto
**Solución**: Añade `http://localhost:3000/api/auth/callback/google` en Google Cloud Console

### Problema 5: Cookies bloqueadas
**Solución**: Verifica que las cookies no estén bloqueadas en el navegador

## Próximos Pasos

1. Reinicia el servidor
2. Intenta hacer login
3. Revisa los logs del servidor
4. Revisa la consola del navegador
5. Verifica la base de datos con Prisma Studio
6. Comparte los logs/errores que veas

