import path, { resolve as _resolve, join } from "path";
import { fileURLToPath } from "url";

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js", // name of the bundle
    path: _resolve(__dirname, "dist"),
    publicPath: "/", // important for dev server & React Router
  },
  mode: "development",
  devServer: {
    static: join(__dirname, "public"),
    historyApiFallback: true, // for React Router
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
        use: ["style-loader", "css-loader", "postcss-loader"], // 👈 added postcss-loader for Tailwind
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
};
