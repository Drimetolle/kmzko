const path = require('path')

module.exports = {
  lintOnSave: false,
  runtimeCompiler: true,
  configureWebpack: {
    resolve: {
      alias: {
        actions: path.resolve(__dirname, 'src/store/actions')
      }
    }
  }
}