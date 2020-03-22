<template>
  <div class="login">
    <!-- 头部 -->
    <hm-header>登录</hm-header>
    <!-- 字体图标 -->
    <hm-logo></hm-logo>
    <!-- input框 -->
    <hm-input
      type="text"
      placeholder="请输入用户名"
      v-model="username"
      :rule="/^1\d{4,10}$/"
      message="用户名错误"
      ref="username"
    ></hm-input>
    <hm-input
      type="password"
      placeholder="请输入密码"
      v-model="password"
      :rule="/\d{3,13}$/"
      message="用户密码错误"
      ref="password"
    ></hm-input>
    <!--按钮 -->
    <hm-button @click="click">登录</hm-button>
    <div class="go-register">
      没有账号？去
      <router-link class="link" to="/register">注册</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    async click() {
      const result = this.$refs.username.validate(this.username)
      const result1 = this.$refs.password.validate(this.password)
      // console.log(result, result1)
      if (!result || !result1) {
        return
      }

      // console.log('我登录了')
      const res = await this.$axios({
        method: 'POST',
        url: '/login',
        data: {
          username: this.username,
          password: this.password
        }
      })
      // console.log(res)
      const { statusCode, data, token } = res.data
      if (res.data.statusCode === 200) {
        // alert('登录成功')
        this.$toast.success('登录成功')
        localStorage.setItem('token', data.token)
        localStorage.setItem('user_id', data.user.id)

        this.$router.push('/user')
      } else {
        // alert('登录失败')
        this.$toast.fail('登录失败')
      }
    }
  },

  created() {
    // console.log(this.$route)
    this.username = this.$route.params.username
    this.password = this.$route.params.password
  }
}
</script>

<style lang="less" scoped>
.go-register {
  font-size: 18px;
  text-align: right;
  padding: 0 20px;
  .link {
    color: #666;
  }
}
</style>
