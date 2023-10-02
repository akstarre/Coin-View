/** @type {import('next').NextConfig} */

module.exports = {
    webpack(config) {
      config.module.rules.push({
        test: /\.svg$/,
        use: [{ loader: '@svgr/webpack', options: { icon: true } }],
      });
  
      return config;
    },
    images: {
      domains: ['assets.coingecko.com'],
    },
  };
  