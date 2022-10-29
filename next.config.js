module.exports = {
  experimental: {
    scrollRestoration: true
  },
  compiler: {
    emotion: true
  },
  swcMinify: true,
  env: {
    API_BASE_URL: process.env.API_BASE_URL,
    X_API_KEY: process.env.X_API_KEY,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
    IMAGE_DOMAIN: process.env.IMAGE_DOMAIN,
    RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED:
      process.env.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED
  },
  images: {
    domains: [process.env.IMAGE_DOMAIN]
  }
};
