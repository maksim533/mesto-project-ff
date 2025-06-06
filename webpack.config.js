const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); 

module.exports = {
  entry: { script: './src/scripts/index.js'},
  output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'main.js',
             publicPath: ''
  },
  mode: 'development',
  devServer: {
    static: path.resolve(__dirname, './dist'), 
    compress: true, 
    port: 1234, 
    open: true 
  },
  module: {
    rules: [ 
      {
        test: /\.js$/,
        use: {
        loader: "babel-loader",
          options:  {
            presets: ['@babel/preset-env'],
              }
            },
      exclude: '/node_modules/'
      },
      {
        test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
        type: 'asset/resource'
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, {
        loader: 'css-loader'
        },
        'postcss-loader']
    }
  ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html' 
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin()
  ]
};