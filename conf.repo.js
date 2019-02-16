const { resolve } = require('path');

const SRC = resolve(__dirname, './src');

module.exports = {
  webpack: {
    aliases: {
      COMPONENTS: `${ SRC }/components`,
      UTILS: `${ SRC }/utils`,
    },
  },
};