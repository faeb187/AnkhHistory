const path = require("path");
const poststyl = require("poststylus");
const rucksack = require("rucksack-css");
const rupture = require("rupture");

module.exports = {
  entry: './src/app',
  optimization: {
    minimize: false
  },
  resolve: {
    alias: {
      core: path.resolve(__dirname, 'src/core/')
    },
    extensions: [ '.js', '.coffee' ]
  },
  module: {
    rules: [
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        include: path.resolve(__dirname, 'src'),
        loader: 'graphql-tag/loader'
      },
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
      {
        test: /\.coffee$/,
        loader: 'coffee-loader',
        include: path.resolve(__dirname, 'src'),
      }
    ],
  },
};