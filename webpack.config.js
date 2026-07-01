require('dotenv').config();

const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = (_env, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    entry: {
      main: path.resolve(__dirname, 'src/public/js/passIsStrong.js'),
    },
    output: {
      path: path.resolve(__dirname, 'src/public/build'),
      filename: 'js/[name].js',
      clean: true,
      publicPath: '/build/',
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
        new MiniCssExtractPlugin({
          filename: 'css/styles.css'
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
