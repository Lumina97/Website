import { i18n } from "./next-i18next.config.js";
/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { dev }) => {
    if (dev) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      };
    }
    return config;
  },
  i18n,
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "preview.redd.it",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "i.redd.it",
        pathname: "/**",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/SpaceTrace/Build/WebGl.data.gz",
        headers: [
          {
            key: "Content-Encoding",
            value: "gzip",
          },
          {
            key: "Content-Type",
            value: "application/octet-stream",
          },
        ],
      },
      {
        source: "/SpaceTrace/Build/WebGl.framework.js",
        headers: [
          {
            key: "Content-Type",
            value: "application/javascript",
          },
        ],
      },
      {
        source: "/SpaceTrace/Build/WebGl.wasm",
        headers: [
          {
            key: "Content-Type",
            value: "application/wasm",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
