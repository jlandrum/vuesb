const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const path = require("path");

module.exports = (storybookBaseConfig, configType, config) => {
  config.module.rules.push({
    test: /\.ts$/,
    exclude: /node_modules/,
    use: [
      {
        loader: 'babel-loader'
      },
      {
        loader: 'ts-loader',
        options: {
          appendTsSuffixTo: [/\.vue$/],
          transpileOnly: true // used with ForkTsCheckerWebpackPlugin
        },
      }
    ],
  },{
    test: /\.scss$/,
    loaders: ['style-loader', 'css-loader', 'sass-loader'],
    include: path.resolve(__dirname, "../src/styles")
  })
  config.resolve.extensions.push('.ts', '.tsx', '.vue', '.css', '.less', '.scss', '.sass', '.html')
  config.plugins.push(new ForkTsCheckerWebpackPlugin())

  return config;
};
