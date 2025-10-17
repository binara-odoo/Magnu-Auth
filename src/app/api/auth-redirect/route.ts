import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

export async function GET(request: NextRequest) {
  try {
    const pwaUrl = process.env.NEXT_PUBLIC_PWA_URL || 'http://localhost:3000';
    const url = new URL(request.url);
    const isLogout = url.searchParams.get('logout') === 'true';
    const callbackUrl = url.searchParams.get('callbackUrl');
    
    console.log('🔄 Auth-redirect:', { isLogout, callbackUrl });
    
    if (isLogout) {
      // Logout explícito - limpiar cookies y redirigir
      console.log('❌ Logout explícito, limpiando cookies y redirigiendo');
      
      const response = NextResponse.redirect(`${pwaUrl}/`);
      
      // Limpiar todas las cookies de NextAuth
      response.cookies.delete('next-auth.session-token');
      response.cookies.delete('next-auth.csrf-token');
      response.cookies.delete('next-auth.callback-url');
      response.cookies.delete('next-auth.state');
      response.cookies.delete('next-auth.pkce.code_verifier');
      
      // Limpiar también las cookies de Google OAuth si existen
      response.cookies.delete('__Secure-1PSID');
      response.cookies.delete('__Secure-3PSID');
      response.cookies.delete('SID');
      response.cookies.delete('HSID');
      response.cookies.delete('APISID');
      response.cookies.delete('SAPISID');
      
      return response;
    }
    
    // Verificar sesión solo si no es logout
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      // No autenticado - redirigir a página principal
      console.log('❌ Sin sesión, redirigiendo a página principal');
      return NextResponse.redirect(`${pwaUrl}/`);
    }
    
    // Usuario autenticado, redirigir con datos
    const userData = {
      success: true,
      data: {
        user: session.user,
        accessToken: 'dummy-token',
        expiresIn: 7 * 24 * 60 * 60
      }
    };
    
    const encodedData = encodeURIComponent(JSON.stringify(userData));
    const redirectUrl = `${pwaUrl}/dashboard/main?authData=${encodedData}`;
    
    console.log('✅ Redirigiendo con datos de usuario:', session.user.email);
    return NextResponse.redirect(redirectUrl);
    
  } catch (error) {
    console.error('Error en auth-redirect:', error);
    const pwaUrl = process.env.NEXT_PUBLIC_PWA_URL || 'http://localhost:3000';
    return NextResponse.redirect(`${pwaUrl}/`);
  }
}
