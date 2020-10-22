const path = require("path");

module.exports = {
  entry: './src/app',
  optimization: {
    minimize: false
  },
  resolve: {
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
      {
        test: /\.coffee$/,
        loader: 'coffee-loader',
        include: path.resolve(__dirname, 'src'),
      }
    ],
  },
};