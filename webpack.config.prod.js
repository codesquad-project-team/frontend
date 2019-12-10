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
            loader: 'style-loader' // creates style nodes from JS strings
          },
          {
            loader: 'css-loader' // translates CSS into CommonJS
          },
          {
            loader: 'sass-loader' // compiles Sass to CSS
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      }
    ]
  },

  output: {
    publicPath: '/',
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[chunkhash].js'
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
