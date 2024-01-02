const path = require("path");
const nodeExternals = require("webpack-node-externals");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const config = {
  //extends: require.resolve("webpack-config/server"),
  entry: "./src/server/index.ts",

  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist/server"),
  },

  resolve: {
    extensions: [".ts", ".js"],
  },

  target: "node",

  node: { __dirname: false },

  externals: [nodeExternals()],

  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: "ts-loader",
      },
    ],
  },

  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "./package.json",
          to: "..",
          transform: (content) => {
            var packageJson = JSON.parse(content.toString());
            packageJson.scripts.start = "node server/index.js";
            delete packageJson.devDependencies;
            delete packageJson.jest;
            return Buffer.from(JSON.stringify(packageJson));
          },
        },
        {
          from: "./package-lock.json",
          to: "..",
        },
      ],
    }),
  ],
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
    plugins: [new CleanWebpackPlugin()],
  };
};
