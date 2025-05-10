import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'servicosweb.cnpq.br',
      },
    ],
  },
};

export default nextConfig;
