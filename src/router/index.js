// 配置路由得信息
import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入组件
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import User from '../views/User.vue'
import Edit from '../views/Edit.vue'
import MyFollow from '../views/MyFollow.vue'
import MyComment from '../views/MyComment.vue'
import MyStart from '../views/MyStart.vue'

Vue.use(VueRouter)
const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login, name: 'login' },
    { path: '/register', component: Register, name: 'register' },
    { path: '/user', component: User, name: 'user' },
    { path: '/edit', component: Edit, name: 'edit' },
    { path: '/myfollow', component: MyFollow, name: 'myfollow' },
    { path: '/mycomment', component: MyComment, name: 'mycomment' },
    { path: '/mystart', component: MyStart, name: 'mystart' }
  ]
})

router.beforeEach((to, from, next) => {
  // console.log('to', to)
  // console.log('from', from)
  const authUrl = ['/user', '/edit', '/mystart', '/myfollow', '/mycomment']
  const token = localStorage.getItem('token')
  if (authUrl.includes(to.path)) {
    // 判断是否有token
    if (token) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

export default router
