const path = require("path");
const poststyl = require("poststylus");
const rucksack = require("rucksack-css");
const rupture = require("rupture");

module.exports = {
  devtool: "source-map",
  entry: "./src/app.ts",
  mode: "development",
  optimization: {
    minimize: false,
    // sideEffects: false
  },
  resolve: {
    alias: {
      app: path.resolve(__dirname, "src/app"),
      components: path.resolve(__dirname, "src/components"),
      core: path.resolve(__dirname, "src/core"),
      styl: path.resolve(__dirname, "src/styl"),
      types: path.resolve(__dirname, "src/types"),
      uis: path.resolve(__dirname, "src/uis"),
      utils: path.resolve(__dirname, "src/utils"),
    },
    extensions: [".styl", ".ts"],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: "/node_modules/",
      },
      /*{
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        include: path.resolve(__dirname, "src"),
        loader: "graphql-tag/loader",
      },*/
      {
        test: /\.styl$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "stylus-native-loader",
            options: {
              define: {
                /* @todo ANKH stylus variables/function */
              },
              include: path.join(__dirname, "src/styl"),
              use: [
                rupture({ scale: "0 400px 600px 800px 1050px 1800px" }),
                poststyl([rucksack({ autoprefixer: true })]),
              ],
            },
          },
        ],
      },
    ],
  },
};
