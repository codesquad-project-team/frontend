const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { DefinePlugin } = require("webpack");
const path = require("path");
const { NAVER_MAP_CLIENT_ID } = require("./map_constants");
const {
  ALBUM_BUCKET_NAME,
  BUCKET_REGION,
  IDENTITY_POOL_ID
} = require("./aws_s3");

module.exports = {
  mode: "development",
  devtool: "eval-source-map",
  resolve: {
    extensions: [".js", ".jsx"]
  },

  devServer: {
    historyApiFallback: true,
    port: 8080
  },

  entry: "./src/index",

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader" // creates style nodes from JS strings
          },
          {
            loader: "css-loader" // translates CSS into CommonJS
          },
          {
            loader: "sass-loader" // compiles Sass to CSS
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      }
    ]
  },

  output: {
    publicPath: "/",
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "src/index.html"
    }),
    new DefinePlugin({
      NAVER_MAP_CLIENT_ID: JSON.stringify(NAVER_MAP_CLIENT_ID),
      ALBUM_BUCKET_NAME: JSON.stringify(ALBUM_BUCKET_NAME),
      BUCKET_REGION: JSON.stringify(BUCKET_REGION),
      IDENTITY_POOL_ID: JSON.stringify(IDENTITY_POOL_ID)
    })
  ]
};
