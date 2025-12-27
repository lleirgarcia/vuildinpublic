# Solución: Error OAuth 2.0 de Google

## Problema
El error indica que el redirect URI no está registrado en Google Cloud Console.

## Solución

### 1. Ve a Google Cloud Console
1. Abre [Google Cloud Console](https://console.cloud.google.com/)
2. Selecciona el proyecto **vuildinginpublic**
3. Ve a **APIs & Services** > **Credentials**

### 2. Edita el OAuth 2.0 Client ID
1. Busca el cliente OAuth con tu Client ID (lo encontrarás en Google Cloud Console)
2. Haz clic en el lápiz (editar) o en el nombre del cliente

### 3. Añade el Redirect URI correcto
En la sección **Authorized redirect URIs**, añade:

```
http://localhost:3000/api/auth/callback/google
```

**IMPORTANTE:** Debe ser exactamente este URI, no solo `http://localhost:3000`

### 4. Guarda los cambios
1. Haz clic en **Save**
2. Espera unos segundos para que los cambios se propaguen

### 5. Verifica
El archivo JSON debería tener (después de actualizar en la consola):
```json
{
  "web": {
    "redirect_uris": [
      "http://localhost:3000",
      "http://localhost:3000/api/auth/callback/google"
    ]
  }
}
```

### 6. Reinicia el servidor
Después de actualizar en Google Cloud Console, reinicia el servidor de Next.js:
```bash
npm run dev
```

## Nota
Si estás en producción, también necesitarás añadir:
```
https://tudominio.com/api/auth/callback/google
```

