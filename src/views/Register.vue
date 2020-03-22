<template>
  <div class="tegister">
    <!-- 头部 -->
    <hm-header>注册</hm-header>
    <!-- 字体图标 -->
    <hm-logo></hm-logo>
    <!-- input -->
    <hm-input
      type="text"
      placeholder="请输入用户名"
      v-model="username"
      :rule="/^1\d{4,10}$/"
      message="用户名错误"
      ref="username"
    ></hm-input>
    <hm-input
      placeholder="昵称"
      v-model="nickname"
      :rule="/^[\u4e00-\u9fa5]{3,7}$/"
      message="用户昵称必须是3-7位"
      ref="nickname"
      >昵称</hm-input
    >
    <hm-input
      type="password"
      placeholder="请输入密码"
      v-model="password"
      :rule="/\d{3,13}$/"
      message="用户密码错误"
      ref="password"
    ></hm-input>

    <!--按钮 -->
    <hm-button @click="register">注册</hm-button>
    <div class="go-login">
      有账号？去<router-link class="link" to="/login">注册</router-link>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    async register() {
      // 进行表单验证
      const result1 = this.$refs.username.validate(this.username)
      const result2 = this.$refs.nickname.validate(this.nickname)
      const result3 = this.$refs.password.validate(this.password)
      if (!result1 || !result2 || !result3) {
        return
      }

      // console.log('我要注册了')
      const res = await this.$axios({
        method: 'post',
        url: '/register',
        data: {
          username: this.username,
          password: this.password,
          nickname: this.nickname
        }
      })
      console.log(res.data)
      // 判断响应状态
      if (res.data.statusCode === 200) {
        this.$toast.success(res.data.message)
        // 跳转到登录页面
        // 发送请求登录就行，登录成功直接跳个人中心就行
        // $router.push()进行路由跳转，还可以传递额外的参数
        this.$router.push({
          name: 'login',
          params: { username: this.username, password: this.password }
        })
      } else {
        this.$toast.fail(res.data.message)
      }
    }
  },
  data() {
    return {
      username: '',
      password: '',
      nickname: ''
    }
  }
}
</script>

<style lang="less" scoped>
.go-login {
  font-size: 18px;
  text-align: right;
  padding: 0 20px;
  .link {
    color: #666;
  }
}
</style>
