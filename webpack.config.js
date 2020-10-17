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
        test: /\.coffee$/,
        loader: 'coffee-loader',
        options: {
          transpile: {
            plugins: ["@babel/plugin-syntax-dynamic-import"]
          }
        }
      },
    ],
  },
};