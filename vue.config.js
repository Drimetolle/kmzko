const path = require('path')

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
  },
  transpileDependencies: [
    'vuetify'
  ]
}
