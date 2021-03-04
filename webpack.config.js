const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  entry: {
    main: './src/main.ts',
    dom: './src/dom.ts',
    animate: './src/animate.ts',
    easings: './src/easings.ts'
  },
  devtool: 'eval-source-map',
  plugins: [new CleanWebpackPlugin()],
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  devServer: {
    static: path.join(__dirname, '/'),
    dev: {
      writeToDisk: true
    },
    compress: true,
    port: 9000,
    host: 'localhost'
  },
  output: {
    publicPath: '/',
    filename: 'stroud.[name].js',
    path: path.resolve(__dirname, 'dist'),
    library: 'stroud',
    libraryTarget: 'umd',
    globalObject: "typeof self !== 'undefined' ? self : this"
  }
}
