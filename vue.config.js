module.exports = {
  devServer: {
    // 自动打开浏览器
    open: true
  },
  // 配置postcss-px2rem
  css: {
    loaderOptions: {
      css: {},
      postcss: {
        plugins: [
          require('postcss-px2rem')({
            remUnit: 37.5
          })
        ]
      }
    }
  }
}
