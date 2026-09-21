import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
  experimental: {
    serverActions: {
      // El bucket "product-images" acepta hasta 5MB por foto; las fotos que
      // salen directo de la cámara del celular suelen pesar más que el 1MB
      // por defecto de Next.js para Server Actions y por eso fallaban ahí,
      // aunque desde PC (archivos ya livianos) pasaban sin problema.
      bodySizeLimit: "8mb",
    },
  },
  async redirects() {
    return [{ source: "/", destination: "/catalogo", permanent: true }];
  },
};

export default nextConfig;
