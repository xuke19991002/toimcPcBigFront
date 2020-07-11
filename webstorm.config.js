'use strict'
const path = require('path')

function resolve (dir) {
  return path.join(__dirname, '.', dir)
}

module.exports = {
  context: path.resolve(__dirname, './'),
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': resolve('src'),
      '_assets': resolve('src/assets'),
      '_views': resolve('src/views'),
      '_api': resolve('src/api')
    }
  }
}
