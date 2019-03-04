const path = require('path');
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const uglify = require('uglifyjs-webpack-plugin');
const devMode = process.argv[3] !== 'production'
console.log('-----------------------')
console.log(process.argv[3])
console.log('-----------------------')
module.exports = {
  mode: 'development',
  //entry为入口,webpack从这里开始编译
  entry: [
    "babel-polyfill",
    path.join(__dirname, './src/js/index.js')
  ],
  //output为输出 path代表路径 filename代表文件名称
  output: {
    path: path.join(__dirname, './dist'),
    filename: './js/index.[hash:8].js',
    chunkFilename: './js/[name].[chunkhash:8].js'
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'common',
          chunks: 'all'
        }
      }
    }
  },
  module: {
    rules: [{
        test: /\.(le|sa|sc|c)ss$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader, //开发环境不抽离css文件
          'css-loader',
          'postcss-loader',
          'sass-loader',
          'less-loader'
        ],
      }, {
        test: /\.js$/,
        use: ['babel-loader'],
        include: path.join(__dirname, 'src'),
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [{
          loader: 'url-loader',
          options: {
            name:'[name].[ext]',
            publicPath:'../img/',//图片的对外引用目录（例如打包的css里面的引用目录是../img/开头）
            outputPath:'img/',//图片打包的生成目录
            limit: 8192 //8k一下的转义为base64
          }
        }]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new MiniCssExtractPlugin({
      filename: "./css/[name].css",
      chunkFilename: "./css/[id].css"
    }),
    new uglify(),
    new htmlWebpackPlugin({
      filename: "index.html", //打包后的文件名
      template: path.join(__dirname, "./src/index.html") //要打包文件的路径
    }),
    new webpack.HotModuleReplacementPlugin(), //模块热更新
  ],
  devServer: {
    host: 'localhost', //域名
    port: 8018, //端口号
    hot: true, //热更新
    contentBase: path.join(__dirname, 'src'), //启动路径
    watchContentBase: true,
    open: true, //新开浏览器窗口
    progress: true //显示打包进度
  }
};