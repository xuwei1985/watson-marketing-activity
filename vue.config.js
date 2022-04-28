const path = require('path')
const resolve = dir => path.join(__dirname, dir)

const { defineConfig } = require('@vue/cli-service')
const PublicPath = process.env.NODE_ENV === 'production' ? '/' : '/'
module.exports = defineConfig({
  transpileDependencies: true,
  productionSourceMap: false,
  publicPath: PublicPath,
  outputDir: 'dist',
  assetsDir: 'public',
  indexPath: 'index.html',
  lintOnSave: true,
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].title = '2022屈臣氏王牌放试官'
      return args
    })
    config.resolve.alias
      .set('@', resolve('src'))
      .set('_v', resolve('src/views'))
  },
  devServer: {
    proxy: { // 目的是解决跨域，若测试环境不需要跨域，则不需要进行该配置
      '/api': { // 拦截以 /api 开头的url接口
        target: 'http://api.wuxuwei.vip/watsons/api', // 目标接口域名
        changeOrigin: true, /* 在本地会创建一个虚拟服务端，然后发送请求的数据，
        并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题 */
        ws: false, // 如果要代理 websockets，配置这个参数
        secure: false, // 如果是https接口，需要配置这个参数
        // 标识替换
        // 原请求地址为 /api/getData 将'/api'替换''时，
        // 代理后的请求地址为： http://xxx.xxx.xxx/getData
        // 若替换为'/other',则代理后的请求地址为 http://xxx.xxx.xxx/other/getData
        pathRewrite: { // 标识替换
          '^/api': '' // 重写接口 后台接口指向不统一  所以指向所有/
          // '^/api': '/api/mock'
        }
      }
    }
  }

})
