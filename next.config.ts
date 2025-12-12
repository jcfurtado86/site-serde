import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  distDir: "build",
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
