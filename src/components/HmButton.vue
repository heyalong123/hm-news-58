<template>
  <div class="hm-button" @click="buttonfn">
    <slot></slot>
  </div>
</template>

<script>
export default {
  methods: {
    buttonfn() {
      // console.log("我要登录了");
      this.$emit("click");
    }
  }
};
</script>

<style lang="less" scoped>
.hm-button {
  margin: 20px;
  height: 50px;
  line-height: 50px;
  background-color: red;
  border-radius: 25px;
  color: #fff;
  text-align: center;
  font-size: 20px;
  font-weight: 700;
}
</style>