module.exports = {
  devServer: {
    host: 'localhost',
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://mall-pre.springboot.cn',
        changeOrigin: true,
        pathRewrite: {
          '/api': ''
        }
      }
    }
  },
  //  路由根路径前添加
  // publicPath: '/app',
  //  输出文件夹
  // outputDir: 'dist',
  //  输出单一的文件页名
  // indexPath: 'index2.html',
  // eslint开关
  // lintOnSave: false,
  //  开关生成map文件，以防别人通过F12查看源码分析业务、代码
  //  本地调试的时候改成true，自己进行调试
  productionSourceMap: false,

  // 关闭预加载(虽然这样是在空闲时间加载不影响性能，但是可能有些浏览器不兼容)，实现真正按需加载
  chainWebpack: (config) => {
    config.plugins.delete('prefetch');
  }
}