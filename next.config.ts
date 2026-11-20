import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'prod-files-secure.s3.us-west-2.amazonaws.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.notion.so',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.notion.so',
        port: '',
        pathname: '/**',
      },
    ],
    qualities: [75, 90, 100],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  // public/prototypes holds static exports of coded prototypes (see
  // scripts/export-huggies-prototype.cjs). Their pages are "<route>.html"
  // files; serve them at clean URLs. Rewrites returned as an array run after
  // the filesystem, so real files (_next assets, .txt payloads) win.
  async rewrites() {
    return [{ source: "/prototypes/:path*", destination: "/prototypes/:path*.html" }];
  },
  turbopack: {},
  webpack(config) {
    config.module.rules.push({
      test: /\.gif$/,
      type: 'asset',
    });
    return config;
  },
};

export default nextConfig;
