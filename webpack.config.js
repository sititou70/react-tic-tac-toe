const path = require("path");

module.exports = [{
  entry: {
    bundle: "./src/index.js"
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "index.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          plugins: ["transform-react-jsx"]
        }
      },
      {
        test: /\.scss$/,
        loader: ["style-loader", "css-loader", "sass-loader"]
      }
    ]
  }
}];