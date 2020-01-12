const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { DefinePlugin } = require('webpack');
const path = require('path');
const { KAKAO_MAP_API_URL } = require('./map_constants');
const {
  ALBUM_BUCKET_NAME,
  BUCKET_REGION,
  IDENTITY_POOL_ID
} = require('./aws_s3');

module.exports = {
  mode: 'development',
  devtool: 'eval-source-map',
  resolve: {
    extensions: ['.js', '.jsx']
  },

  devServer: {
    historyApiFallback: true,
    port: 8080
  },

  entry: './src/index',

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader', // translates CSS into CommonJS
            options: {
              modules: {
                mode: 'local',
                localIdentName: '[name]-[local]--[hash:hex:4]',
                context: path.resolve(__dirname, 'src')
              }
            }
          },
          {
            loader: 'sass-loader' // compiles Sass to CSS
          }
        ],
        exclude: /node_modules/
      },
      {
        //react-bootstrap 사용을 위한 loader. node_modules를 제외하지 않음.
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      }
    ]
  },

  output: {
    publicPath: '/',
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    new DefinePlugin({
      ALBUM_BUCKET_NAME: JSON.stringify(ALBUM_BUCKET_NAME),
      BUCKET_REGION: JSON.stringify(BUCKET_REGION),
      IDENTITY_POOL_ID: JSON.stringify(IDENTITY_POOL_ID),
      KAKAO_MAP_API_URL: JSON.stringify(KAKAO_MAP_API_URL)
    })
  ]
};
