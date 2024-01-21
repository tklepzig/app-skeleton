const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const config = {
  entry: "./src/public/index.tsx",
  output: {
    filename: "app.[chunkhash].js",
    path: path.resolve(__dirname, "dist/public"),
  },

  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: "ts-loader",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/public/index.html",
      inject: "body",
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "./src/public/assets",
          to: "assets",
          noErrorOnMissing: true,
        },
        { from: "./src/public/service-worker.js", noErrorOnMissing: true },
        { from: "./src/public/manifest.json", noErrorOnMissing: true },
        { from: "./src/public/favicon.ico", noErrorOnMissing: true },
      ],
    }),
  ],

  // // When importing a module whose path matches one of the following, just
  // // assume a corresponding global variable exists and use that instead.
  // // This is important because it allows us to avoid bundling all of our
  // // dependencies, which allows browsers to cache those libraries between builds.
  // externals: {
  //     "react": "React",
  //     "react-dom": "ReactDOM"
  // }
};

module.exports = (_, { mode }) => {
  if (mode === "development") {
    return {
      ...config,
      mode: "development",
      devtool: "inline-source-map",
    };
  }
  return {
    ...config,
    mode: "production",
    optimization: {
      minimizer: [new TerserPlugin()],
    },
    plugins: [...config.plugins, new CleanWebpackPlugin()],
  };
};
