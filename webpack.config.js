require('dotenv').config();

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = (_env, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    entry: {
      main: path.resolve(__dirname, 'src/client/js/main.js'),
      styles: path.resolve(__dirname, 'src/client/css/main.css'),
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: isProduction ? 'js/[name].[contenthash].js' : 'js/[name].js',
      clean: true,
      publicPath: '/',
    },
    devtool: isProduction ? 'source-map' : 'eval-source-map',
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [['@babel/preset-env', { modules: false }]],
              sourceType: 'module',
            },
          },
        },
        {
          test: /\.css$/,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader',
          ],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'src/client/index.html'),
        filename: 'index.html',
      }),
      ...(isProduction
        ? [new MiniCssExtractPlugin({ filename: 'css/[name].[contenthash].css' })]
        : []),
    ],
    optimization: {
      minimizer: ['...', new CssMinimizerPlugin()],
    },
    devServer: {
      static: {
        directory: path.join(__dirname, 'dist'),
      },
      port: process.env.WEBPACK_DEV_PORT || 8080,
      hot: true,
      open: true,
      historyApiFallback: true,
      proxy: [
        {
          context: ['/api'],
          target: `http://localhost:${process.env.PORT || 3000}`,
          changeOrigin: true,
        },
      ],
    },
    resolve: {
      extensions: ['.js'],
    },
  };
};
