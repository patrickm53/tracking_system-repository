require("dotenv").config();

const nextConfig = {
  env: {
    URL: process.env.API_URL,
  },
  images: {
    domains: [
      "img.kitapyurdu.com",
      "bookwave-profile-image.s3.eu-central-1.amazonaws.com",
    ],
  },
  webpack(config) {
    delete config.experiments.topLevelAwait;
    return config;
  },
};

module.exports = nextConfig;
