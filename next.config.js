module.exports = {
  i18n: {
    locales: ['en', 'es', 'gl'],
    defaultLocale: 'en',
  },
  webpack(config) {
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
    };

    return config;
  },
};
