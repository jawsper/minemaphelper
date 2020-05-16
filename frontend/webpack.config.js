const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  devServer: {
    proxy: {
      '/api': 'http://localhost:8000',
    }
  },
  // devtool: 'inline-source-map',
  context: path.resolve(__dirname, 'src'),
  entry: [
    './index.js',
    './style.scss',
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash:8].js'
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-react',
              ['@babel/preset-env',
                {
                  modules: false
                }]
            ],
            plugins: [
              "@babel/plugin-proposal-class-properties",
            ]
          }
        }
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'url-loader',
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // process.env.NODE_ENV !== 'production'
          //   ? 'style-loader'
          //   : 
          { loader: MiniCssExtractPlugin.loader, options: { esModule: true, }, },
          'css-loader',
          'resolve-url-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.css$/,
        use: [
          // process.env.NODE_ENV !== 'production'
          //   ? 'style-loader'
          //   : 
          { loader: MiniCssExtractPlugin.loader, options: { esModule: true, }, },
          'css-loader',
          // 'resolve-url-loader',
        ]
      },
    ],
  },
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false,
    }),
    new CleanWebpackPlugin(),
    new HtmlWebPackPlugin({
      template: "index.html",
      filename: "./index.html",
      title: 'Minemap',
    }),

    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].[contenthash:8].css',
      chunkFilename: '[id].css',
    }),
  ]
};