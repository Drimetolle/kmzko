const path = require('path')
const TSLintPlugin = require('tslint-webpack-plugin')

const isMock = () => process.env.NODE_ENV === 'mock'

const setUrlIfMock = () => {
  if (isMock()) process.env.VUE_APP_API_BASE_URL = process.env.VUE_APP_API_MOCK_URL
}

setUrlIfMock()

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
