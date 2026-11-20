import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Redireciona permanentemente (308) o domínio antigo da Vercel para o domínio próprio,
      // para o Google transferir a relevância e não indexar conteúdo duplicado.
      // Previews da Vercel usam outros hosts e não são afetados.
      {
        source: "/:path*",
        has: [{ type: "host", value: "samucadev.vercel.app" }],
        destination: "https://samuca.tec.br/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
