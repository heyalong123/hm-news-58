import Vue from 'vue'
import App from './App.vue'
// 引入通用模式
import './styles/base.less'
// 导入字体图标得样式
import './styles/iconfont.less'
//  引入lib-flexible
import 'lib-flexible'
// 导入路由对象
import router from './router'

// 全局注册头部
import HmHeader from '../src/components/HmHeader.vue'
Vue.component('hm-header', HmHeader)
// 全局logo
import HmLogo from '../src/components/HmLogo.vue'
Vue.component('hm-logo', HmLogo)
// 全局button
import HmButton from '../src/components/HmButton.vue'
Vue.component('hm-button', HmButton)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
