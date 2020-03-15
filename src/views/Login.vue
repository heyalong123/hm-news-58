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
  </div>
</template>

<script>
// 导入
// import axios from 'axios'
export default {
  methods: {
    click() {
      const a = this.$refs.username.validate(this.username)
      const b = this.$refs.password.validate(this.password)
      // console.log(a, b)
      if (!a || b) {
        return
      }

      // console.log('我登录了')
      this.$axios({
        method: 'POST',
        url: '/login',
        data: {
          username: this.username,
          password: this.password
        }
      }).then(res => {
        // console.log(res.data)
        if (res.data.statusCode === 200) {
          // alert('登录成功')
          this.$toast.success('登录成功')
          this.$router.push('/user')
        } else {
          // alert('登录失败')
          this.$toast.fail('登录失败')
        }
      })
    }
  },
  data() {
    return {
      username: '',
      password: ''
    }
  }
}
</script>

<style></style>
