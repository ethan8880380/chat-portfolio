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
  // The Commercial Analytics Hub case study lives at its original URL.
  async redirects() {
    return [{ source: "/projects/commercial-analytics-hub", destination: "/projects/kcna-hub", permanent: true }];
  },
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
