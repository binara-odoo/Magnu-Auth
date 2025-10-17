# 🔧 Configuración de Variables de Entorno

## 📋 Variables Requeridas

Crea un archivo `.env.local` en la raíz del proyecto `magnu-auth-service` con las siguientes variables:

```env
# Google OAuth - Obtén estos valores de Google Cloud Console
GOOGLE_CLIENT_ID="tu-google-client-id-aqui"
GOOGLE_CLIENT_SECRET="tu-google-client-secret-aqui"

# NextAuth
NEXTAUTH_SECRET="tu-secret-super-seguro-para-firmar-tokens"
NEXTAUTH_URL="http://localhost:3001"

# PWA URL (donde redirigir después del login exitoso)
NEXT_PUBLIC_PWA_URL="http://localhost:3000"

# Environment
NODE_ENV="development"
```

## 🔑 Cómo Obtener las Credenciales de Google OAuth

### 1. Ir a Google Cloud Console
- Ve a [Google Cloud Console](https://console.cloud.google.com/)
- Selecciona o crea un proyecto

### 2. Habilitar la API
- Ve a "APIs & Services" > "Library"
- Busca "Google+ API" y habilítala

### 3. Crear Credenciales OAuth 2.0
- Ve a "APIs & Services" > "Credentials"
- Haz clic en "Create Credentials" > "OAuth 2.0 Client IDs"
- Selecciona "Web application"

### 4. Configurar URLs Autorizadas
- **Authorized JavaScript origins:**
  - `http://localhost:3001`
  - `https://tu-dominio.com` (para producción)

- **Authorized redirect URIs:**
  - `http://localhost:3001/api/auth/callback/google`
  - `https://tu-dominio.com/api/auth/callback/google` (para producción)

### 5. Configurar Dominio de Usuarios
- Ve a "APIs & Services" > "OAuth consent screen"
- En "Authorized domains", agrega:
  - `magnitudshgroup.com`
- En "Test users" (si está en modo testing), agrega los emails de los empleados

### 6. Copiar Credenciales
- Una vez creadas, copia el `Client ID` y `Client Secret` a tu archivo `.env.local`

## 🔐 Generar NEXTAUTH_SECRET

Puedes generar un secret seguro con:

```bash
openssl rand -base64 32
```

O usar cualquier generador de strings aleatorios de 32+ caracteres.

## ✅ Verificar Configuración

Una vez configurado, deberías poder:

1. **Iniciar el servicio de auth:**
   ```bash
   cd magnu-auth-service
   npm run dev
   ```

2. **Iniciar la PWA:**
   ```bash
   cd MagnuV2
   npm run dev
   ```

3. **Probar el login:**
   - Ir a `http://localhost:3000`
   - Hacer clic en "Iniciar sesión"
   - Debería redirigir a Google OAuth
   - Solo usuarios con email `@magnitudshgroup.com` podrán acceder

## 🚨 Notas Importantes

- **Solo empleados internos:** El sistema está configurado para permitir acceso únicamente a usuarios con email `@magnitudshgroup.com`
- **HTTPS en producción:** Asegúrate de usar HTTPS en producción
- **Dominios autorizados:** Solo los dominios configurados en Google Cloud Console podrán usar las credenciales OAuth
