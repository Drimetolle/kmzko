const path = require('path');
const TSLintPlugin = require('tslint-webpack-plugin');

module.exports = {
  configureWebpack: {
    resolve: {
        alias: {
            actions: path.resolve(__dirname, 'src/store/actions'),
        }
    },
    plugins: [
      new TSLintPlugin({
          files: ['./src/**/*.ts']
      })
    ],
  },
  transpileDependencies: [
    'vuetify'
  ]
}