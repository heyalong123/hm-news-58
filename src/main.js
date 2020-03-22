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
// 全局过滤器
import moment from 'moment'
Vue.filter('data', function(input, format = 'YYYY-MM-DD') {
  return moment(input).format(format)
})

// axios的优化
// axios和vue没有关系，强行让axios和Vue有关系
Vue.prototype.$axios = axios
// 把axios绑定到了vue的原型上，所有的vue实例（组件）都可以通过 this.axios访问到axios
axios.defaults.baseURL = 'http://localhost:3000'

// 使用vant插件
// 按需加载toast
import {
  Toast,
  Dialog,
  Field,
  Cell,
  CellGroup,
  RadioGroup,
  Radio,
  Uploader,
  Button,
  List
} from 'vant'
Vue.use(Toast)
Vue.use(Dialog)
Vue.use(Field)
Vue.use(Cell)
Vue.use(CellGroup)
Vue.use(RadioGroup)
Vue.use(Radio)
Vue.use(Uploader)
Vue.use(Button)
Vue.use(List)
// 导航条
import HmNavbar from '../src/components/HmNavbar.vue'
Vue.component('hm-navbar', HmNavbar)
// 添加响应拦截器
axios.interceptors.response.use(
  function(res) {
    // console.log('拦截到的res', res)
    const { statusCode, message } = res.data
    if (statusCode === 401 && message === '用户信息验证失败') {
      router.push('/login')
      localStorage.removeItem('token')
      localStorage.removeItem('user_id')
      Toast.fail(message)
    }
    return res
  },
  function(error) {
    // // 对响应错误做点什么
    // return Promise.reject(error);
  }
)
// axios的请求拦截器，所有的axios的请求都会先经过axios的请求拦截器
axios.interceptors.request.use(function(config) {
  // console.log('所有的请求杯拦截le ', config)
  // 统一的给请求添加token
  const token = localStorage.getItem('token')
  config.headers.Authorization = token
  return config
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
