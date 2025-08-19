const path = require('path');

module.exports = {
  mode: 'development', // remove the warning
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ["@babel/preset-env", { "modules": "commonjs" }]
            ]
          }
        }
      }
    ]
  },
  devServer: {
    static: path.resolve(__dirname, 'dist'),
    port: 3000,
    open: true, // opens browser automatically
    hot: true   // enables hot reloading
  }
};
