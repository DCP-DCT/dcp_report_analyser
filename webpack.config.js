const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const path = require("path");

const CONTEXTPATH = process.env.CONTEXTPATH || "/";

const HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: __dirname + '/app/index.html',
  filename: 'index.html',
  inject: 'body'
});

module.exports = {
  mode: "development",
  entry: __dirname + '/app/index.tsx',
  plugins: [
    HTMLWebpackPluginConfig,
    new webpack.HotModuleReplacementPlugin(),
  ],
  output: {
    path: __dirname + '/public',
    filename: 'bundle.js',
  },
  devtool: "inline-source-map",
  devServer: {
    hot: true,
    port: 5555,
    contentBase: "./public",
    compress: true,
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: "ts-loader", exclude: /node_modules/ },
      { enforce: "pre", test: /\.ts$/, loader: "source-map-loader" },
      {
        enforce: "pre",
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: ["babel-loader"],
        include: [
          path.join(__dirname, "app"),
          path.join(__dirname, "configuration"),
        ],
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader?sourceMap", "sass-loader?sourceMap"],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader?sourceMap"],
      },
      {
        test: /\.(png|gif|jpg|otf)$/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
          esModule: false,
        },
      },
    ],
  },
  externals: {},
};
