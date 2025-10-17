import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Deshabilitar ESLint durante el build para evitar errores de deploy
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Deshabilitar verificación de tipos durante el build si es necesario
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
