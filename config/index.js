module.exports = {
    build: {
        // Template for index.html
        index: path.resolve(__dirname, '../dist/index.html'),
    
        // Paths
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: 'static',
        assetsPublicPath: './',
    },
    proxyTable: {
        '/api': {
          target: 'https://8.136.220.192:8888',   //请求地址
          changeOrigin: true, //true表示跨域
          secure: false,
          ws: true,
          logLevel: 'debug',
          pathRewrite: {
            '^/api': ''
          }
        },
        '/token': {
          target: 'http://8.136.220.192',   //请求地址
          changeOrigin: true, //true表示跨域
          secure: false,
          ws: true,
          logLevel: 'debug',
          pathRewrite: {
            '^/token': ''
          }
        }
      },
}
