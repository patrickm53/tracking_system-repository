require("dotenv").config();

const nextConfig = {
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ["mongoose"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.kitapyurdu.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "bookwave-profile-image.s3.eu-central-1.amazonaws.com",
        port: "",
      },
    ],
  },
  webpack(config) {
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
    };
    return config;
  },
};

module.exports = nextConfig;
