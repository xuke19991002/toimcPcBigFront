const config = require('./src/config/index.js')
const url = process.env.NODE_ENV === 'production' ? config.baseURL.pro : config.baseURL.dev

const path = require('path')
function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  lintOnSave: false,
  devServer: {
    port: 8888, // 端口号
    open: true,
    proxy: {
      '/': {
        target: url,
        ws: true,
        changeOrigin: true, // 允许跨域
        pathRewrite: {
          '^/': '/'
        }
      }
    }
  },
  chainWebpack: config => {
    config.resolve.alias
    .set('_c', resolve('src/components'))
    .set('_assets', resolve('src/assets'))
    .set('_views', resolve('src/views'))
    .set('_api', resolve('src/api'))
  }
}
