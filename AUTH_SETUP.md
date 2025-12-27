# Configuración de Autenticación con Google

Este proyecto utiliza NextAuth.js para autenticación con Google OAuth.

## Pasos para configurar Google OAuth

### 1. Crear un proyecto en Google Cloud Console

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Habilita la **Google+ API** (si no está habilitada)

### 2. Configurar OAuth 2.0

1. Ve a **APIs & Services** > **Credentials**
2. Haz clic en **Create Credentials** > **OAuth client ID**
3. Si es la primera vez, configura la **OAuth consent screen**:
   - Tipo: **External** (para desarrollo) o **Internal** (para G Suite)
   - Completa la información requerida
4. Crea el **OAuth client ID**:
   - Tipo de aplicación: **Web application**
   - Nombre: "vuilding in public" (o el que prefieras)
   - **Authorized JavaScript origins**:
     - `http://localhost:3000` (para desarrollo)
     - `https://tudominio.com` (para producción)
   - **Authorized redirect URIs** (IMPORTANTE: debe ser el URI completo):
     - `http://localhost:3000/api/auth/callback/google` (para desarrollo)
     - `https://tudominio.com/api/auth/callback/google` (para producción)
   
   ⚠️ **NOTA CRÍTICA:** El redirect URI debe ser **exactamente** `/api/auth/callback/google`, no solo la raíz del dominio.

### 3. Obtener las credenciales

Después de crear el OAuth client ID, obtendrás:
- **Client ID**: Un string largo que termina en `.apps.googleusercontent.com`
- **Client Secret**: Un string secreto

### 4. Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto (o actualiza el existente) con:

```env
# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="tu-secret-key-aqui"

# Google OAuth
GOOGLE_CLIENT_ID="tu-client-id.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="tu-client-secret"
```

### 5. Generar NEXTAUTH_SECRET

Puedes generar un secret seguro con:

```bash
openssl rand -base64 32
```

O usa cualquier generador de strings aleatorios seguro.

### 6. Ejecutar migraciones de base de datos

Los modelos de NextAuth (Account, Session, VerificationToken) ya están en el schema de Prisma. Ejecuta:

```bash
npx prisma migrate dev --name add-nextauth-models
```

O si prefieres aplicar directamente:

```bash
npx prisma db push
```

### 7. Reiniciar el servidor

Después de configurar las variables de entorno, reinicia el servidor de desarrollo:

```bash
npm run dev
```

## Uso

Una vez configurado, verás un botón **"Iniciar sesión"** en el navigator. Al hacer clic:

1. Serás redirigido a Google para autenticarte
2. Después de autorizar, serás redirigido de vuelta a la aplicación
3. Tu sesión se guardará y verás tu avatar y un botón **"Cerrar sesión"**

## Modelos de base de datos

NextAuth crea automáticamente los siguientes modelos en la base de datos:

- **Account**: Almacena las cuentas OAuth vinculadas a usuarios
- **Session**: Almacena las sesiones activas
- **VerificationToken**: Tokens para verificación de email (si se usa)

El modelo **User** existente se actualiza con:
- `emailVerified`: Fecha de verificación del email
- Relaciones con `Account` y `Session`

## Notas

- En desarrollo, `NEXTAUTH_URL` debe ser `http://localhost:3000`
- En producción, debe ser tu dominio completo (ej: `https://vuildinginpublic.com`)
- El `NEXTAUTH_SECRET` debe ser único y seguro, nunca lo compartas públicamente
- Los redirect URIs en Google Console deben coincidir exactamente con las URLs de tu aplicación

