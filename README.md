# MAGNU Auth Service

Servicio de autenticación independiente para la aplicación MAGNU PWA, construido con Next.js y NextAuth.js.

## 🚀 Características

- ✅ **Autenticación con Google OAuth** - Solo miembros de la organización
- ✅ **Next.js 15** con App Router
- ✅ **NextAuth.js** para manejo de sesiones
- ✅ **Redirección automática** a la PWA principal
- ✅ **Páginas de error** personalizadas
- ✅ **Diseño responsive** con Tailwind CSS

## 📋 Requisitos

- Node.js 18+
- Cuenta de Google Cloud Console
- PWA principal de MAGNU

## 🛠️ Instalación

1. **Navegar al directorio:**
   ```bash
   cd magnu-auth-service
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno:**
   ```bash
   cp env.example .env.local
   ```
   
   Editar `.env.local` con tus configuraciones:
   ```env
   GOOGLE_CLIENT_ID="tu-google-client-id"
   GOOGLE_CLIENT_SECRET="tu-google-client-secret"
   NEXTAUTH_SECRET="tu-secret-para-firmar-tokens"
   NEXTAUTH_URL="http://localhost:3001"
   NEXT_PUBLIC_PWA_URL="http://localhost:3000"
   ```

4. **Configurar Google OAuth:**
   - Ir a [Google Cloud Console](https://console.cloud.google.com/)
   - Crear/editar proyecto
   - Habilitar Google+ API
   - Crear credenciales OAuth 2.0
   - Agregar URLs autorizadas:
     - `http://localhost:3001` (desarrollo)
     - `https://tu-dominio.com` (producción)

5. **Iniciar el servidor:**
   ```bash
   npm run dev
   ```

El servicio estará disponible en `http://localhost:3001`

## 🔧 Configuración

### Variables de Entorno

| Variable | Descripción | Requerido |
|----------|-------------|-----------|
| `GOOGLE_CLIENT_ID` | ID del cliente Google OAuth | ✅ |
| `GOOGLE_CLIENT_SECRET` | Secret del cliente Google OAuth | ✅ |
| `NEXTAUTH_SECRET` | Clave para firmar tokens JWT | ✅ |
| `NEXTAUTH_URL` | URL del servicio de auth | ✅ |
| `NEXT_PUBLIC_PWA_URL` | URL de la PWA principal | ✅ |

### Google OAuth Setup

1. **Configurar dominio permitido:**
   - En Google Cloud Console → OAuth consent screen
   - Agregar el dominio de tu organización
   - Configurar usuarios autorizados

2. **URLs de redirección:**
   - `http://localhost:3001/api/auth/callback/google` (desarrollo)
   - `https://auth.tu-dominio.com/api/auth/callback/google` (producción)

## 📡 Endpoints

### Autenticación
- `GET /api/auth/signin` - Página de inicio de sesión
- `GET /api/auth/signout` - Cerrar sesión
- `GET /api/auth/session` - Obtener sesión actual
- `GET /api/auth/providers` - Proveedores disponibles

### Páginas
- `/` - Página principal del servicio
- `/auth/signin` - Página de inicio de sesión
- `/auth/error` - Página de errores

## 🔗 Integración con PWA Principal

### 1. En tu PWA principal (MagnuV2):

```typescript
// Redirigir al servicio de auth
const handleLogin = () => {
  window.location.href = 'http://localhost:3001/api/auth/signin';
};
```

### 2. El servicio redirige automáticamente:
- Después del login exitoso → PWA principal
- En caso de error → Página de error

## 🚀 Despliegue

### Vercel (Recomendado)
```bash
npm run build
vercel --prod
```

### Docker
```bash
docker build -t magnu-auth-service .
docker run -p 3001:3001 magnu-auth-service
```

## 📝 Scripts Disponibles

```bash
npm run dev          # Desarrollo en puerto 3001
npm run build        # Compilar para producción
npm run start        # Iniciar en producción
npm run lint         # Linter
```

## 🔒 Seguridad

- ✅ **HTTPS en producción**
- ✅ **Dominio restringido** en Google OAuth
- ✅ **Tokens JWT** firmados
- ✅ **Sesiones seguras**
- ✅ **Headers de seguridad**

## 📞 Soporte

Para soporte técnico o preguntas sobre la implementación, contacta al equipo de desarrollo de MAGNU.

## 📄 Licencia

MIT License - Ver archivo LICENSE para más detalles.