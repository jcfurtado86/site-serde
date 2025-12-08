import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "servicosweb.cnpq.br",
      },
    ],
  },
}
module.exports = {
  distDir: "build",
}
export default nextConfig
