
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  reactHotLoader: true,
  debug: false,
  hasServer: false,
  modifyWebpackConfig: (config, options) => {
    if (options.type === 'client') {
      config.plugins.push(new HtmlWebpackPlugin({
        template: 'src/index.ejs',
      }));
    }

    config.resolve.extensions.push('.jsx');

    return config;
  },
};
