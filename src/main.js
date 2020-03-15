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
// 全部input
import HmInput from '../src/components/HmInput.vue'
Vue.component('hm-input', HmInput)
// 引入axaios
import axios from 'axios'

// axios的优化
// axios和vue没有关系，强行让axios和Vue有关系
Vue.prototype.$axios = axios
// 把axios绑定到了vue的原型上，所有的vue实例（组件）都可以通过 this.axios访问到axios
axios.defaults.baseURL = 'http://localhost:3000'

// 使用vant插件
// 按需加载toast
import { Toast } from 'vant'
Vue.use(Toast)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
