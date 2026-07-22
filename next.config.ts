import type { NextConfig } from "next";

const securityHeaders = [
  // Impede que o site seja embutido em iframes de terceiros (clickjacking)
  { key: "X-Frame-Options", value: "DENY" },
  // Impede MIME-sniffing do navegador
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Limita as informações de referrer enviadas a outros sites
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Força HTTPS por 2 anos (só tem efeito quando servido via HTTPS)
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  // Restringe acesso a APIs sensíveis do navegador
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  // Defesa em profundidade contra XSS / injeção de conteúdo
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      // Next injeta estilos inline; Tailwind também
      "style-src 'self' 'unsafe-inline'",
      // 'unsafe-inline' necessário para os scripts de bootstrap do Next
      "script-src 'self' 'unsafe-inline'",
      // fotos do CNPq (configuradas em images.remotePatterns) + data URIs
      "img-src 'self' data: https: http://servicosweb.cnpq.br",
      "font-src 'self' data:",
      "connect-src 'self'",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "object-src 'none'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  distDir: "build",
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "servicosweb.cnpq.br",
        pathname: "/wspessoa/servletrecuperafoto",
      },
      {
        protocol: "http",
        hostname: "servicosweb.cnpq.br",
        pathname: "/wspessoa/servletrecuperafoto",
      },
    ],
  },
};

export default nextConfig;
