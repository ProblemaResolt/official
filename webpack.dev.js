const { merge } = require('webpack-merge');// webpack-merge
const common = require('./webpack.common.js') // 汎用設定をインポート
module.exports = merge(common, {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    static: {
      directory: './docs',
    },
      host: '0.0.0.0',
      port: 8000,
      hot: true
    },
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    }
})