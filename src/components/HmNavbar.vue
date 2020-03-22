<template>
  <div class="hm-navbar" @click="clickout">
    <div class="left">{{ title }}</div>
    <div class="center">{{ conent }}</div>
    <div class="right">
      <span class="iconfont iconjiantou1"></span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    conent: String
  },
  methods: {
    clickout() {
      // console.log('11111111')
      this.$emit('click')
    }
  }
}
</script>

<style lang="less" scoped>
.hm-navbar {
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid #ccc;
  display: flex;
  margin-left: 20px;
  justify-content: space-between;
  .center {
    flex: 1;
    text-align: right;
    color: #ccc;
  }
  .right {
    width: 30px;
    text-align: center;
  }
}
</style>
