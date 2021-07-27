const path = require("path");
// import poststyl from "poststylus";
// import rucksack from "rucksack-css";
// import rupture from "rupture";

module.exports = {
  devtool: "inline-source-map",
  entry: "./src/app.ts",
  mode: "development",
  optimization: {
    minimize: false,
  },
  resolve: {
    alias: {
      core: path.resolve(__dirname, "src/core"),
      types: path.resolve(__dirname, "src/types"),
      uis: path.resolve(__dirname, "src/uis"),
      utils: path.resolve(__dirname, "src/utils"),
    },
    extensions: [".ts"],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: "/node_modules/",
      },
      /*{
        test: /\.coffee$/,
        loader: "coffee-loader",
        include: "/src/",
        exclude: "/node_modules/",
      },*/
      /*{
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        include: path.resolve(__dirname, "src"),
        loader: "graphql-tag/loader",
      },*/
      /*{
        test: /\.styl$/,
        use: [
          {loader:'style-loader'},
          {loader:'css-loader'},
          {
            loader: 'stylus-loader',
            options: {
              stylusOptions: {
                compress: true,
                use: [
                  rupture({scale: "0 400px 600px 800px 1050px 1800px"}),
                  poststyl([rucksack({autoprefixer: true})])
                ]
              }
            }
          }
        ]
      },*/
    ],
  },
};
