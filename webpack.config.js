const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",           // name of the bundle
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",                 // important for dev server & React Router
  },
  mode: "development",
  devServer: {
    static: path.join(__dirname, "public"),
    historyApiFallback: true,        // for React Router
    port: 5000,
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
};
