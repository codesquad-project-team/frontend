const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');
const { DefinePlugin } = require('webpack');
const {
  KAKAO_MAP_API_URL,
  ALBUM_BUCKET_NAME,
  BUCKET_REGION,
  IDENTITY_POOL_ID
} = process.env;

module.exports = {
  mode: 'production',
  devtool: 'cheap-module-source-map',
  resolve: {
    extensions: ['.js', '.jsx']
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
          {
            loader: MiniCssExtractPlugin.loader, // generates css files
            options: {
              esModule: true
            }
          },
          {
            loader: 'css-loader', // translates CSS into CommonJS
            options: {
              modules: {
                mode: 'local',
                localIdentName: '[hash:base64:5]',
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
        //cropper.js 사용을 위한 loader. node_modules를 제외하지 않음.
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      }
    ]
  },

  output: {
    publicPath: '/',
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[chunkhash:16].js',
    chunkFilename: '[name].[chunkhash:16].js' //dynamic import로 생성되는 chunk file의 이름을 설정.(optional)
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash:16].css'
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    new CleanWebpackPlugin(),
    new DefinePlugin({
      ALBUM_BUCKET_NAME: JSON.stringify(ALBUM_BUCKET_NAME),
      BUCKET_REGION: JSON.stringify(BUCKET_REGION),
      IDENTITY_POOL_ID: JSON.stringify(IDENTITY_POOL_ID),
      KAKAO_MAP_API_URL: JSON.stringify(KAKAO_MAP_API_URL)
    })
  ]
};
