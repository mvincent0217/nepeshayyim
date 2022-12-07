const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://dev-en-viaeim2.decatechnologies.com:8080/Decatech/BRM_Canteen_WEB/ValidateUserAccount?username=if.brm&password=decatech',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      },
      '/api2': {
        target: 'http://dev-en-viaeim2.decatechnologies.com:8000/Decatech/BRM_Canteen_WEB/GetUserAccountByName?username=if.brm',
        changeOrigin: true,
        pathRewrite: {
          '^/api2': ''
        }
      }
    }
  }
})
