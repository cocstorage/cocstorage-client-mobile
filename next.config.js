module.exports = {
  experimental: {
    scrollRestoration: true
  },
  swcMinify: true,
  env: {
    API_BASE_URL: process.env.API_BASE_URL,
    X_API_KEY: process.env.X_API_KEY,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
    IMAGE_DOMAIN: process.env.IMAGE_DOMAIN
  },
  images: {
    domains: [process.env.IMAGE_DOMAIN]
  }
};
