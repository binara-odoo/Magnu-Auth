import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "select_account",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      // Verificar que el usuario pertenece al dominio autorizado
      if (user.email && user.email.endsWith('@magnitudshgroup.com')) {
        console.log('✅ Usuario autorizado:', user.email);
        return true;
      }
      
      // Si no es del dominio autorizado, denegar acceso
      console.log('❌ Acceso denegado para:', user.email);
      return false;
    },
    async session({ session, token }) {
      // Agregar información adicional a la sesión si es necesario
      if (session.user && token.sub) {
        (session.user as { id: string }).id = token.sub;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async redirect({ url, baseUrl }) {
      // Manejar redirección después del login exitoso
      console.log('🔄 NextAuth redirect callback:', { url, baseUrl });
      
      // Si es una URL relativa, usar la base URL
      if (url.startsWith('/')) {
        // Redirigir al endpoint de auth-redirect que manejará el envío de datos a la PWA
        return `${baseUrl}/api/auth-redirect`;
      }
      
      // Si la URL contiene el dominio de la PWA, permitir la redirección
      const pwaUrl = process.env.NEXT_PUBLIC_PWA_URL || 'http://localhost:3000';
      if (url.startsWith(pwaUrl)) {
        return url;
      }
      
      // Por defecto, redirigir a auth-redirect
      return `${baseUrl}/api/auth-redirect`;
    },
  },
  pages: {
    signIn: '/', // Usar la página principal como página de login
    error: '/auth/error',
  },
  session: {
    strategy: 'jwt',
    maxAge: 7 * 24 * 60 * 60, // 7 días
  },
  secret: process.env.NEXTAUTH_SECRET,
};
