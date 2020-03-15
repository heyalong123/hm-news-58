<template>
  <div>
    <!-- 头部 -->
    <hm-header>注册</hm-header>
    <!-- 字体图标 -->
    <hm-logo></hm-logo>
    <!-- input -->
    <hm-input type="text" placeholder="请输入用户名"></hm-input>
    <hm-input type="password" placeholder="请输入密码"></hm-input>
    <hm-input></hm-input>
    <!--按钮 -->
    <hm-button @click="register">注册</hm-button>
  </div>
</template>

<script>
export default {
  methods: {
    register() {
      console.log('我要注册了')
    }
  }
}
</script>

<style></style>
