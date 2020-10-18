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
        loader: 'graphql-tag/loader'
      },
      {
        test: /\.coffee$/,
        loader: 'coffee-loader'
      }
    ],
  },
};