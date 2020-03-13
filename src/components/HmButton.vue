<template>
  <div class="hm-button">
    <slot></slot>
  </div>
</template>

<script>
export default {};
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