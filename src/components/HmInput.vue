<template>
  <div class="hm-input">
    <input
      :type="type"
      :placeholder="placeholder"
      :value="value"
      @input="inputfn"
      :class="{ success: status === 'success', error: status === 'error' }"
    />
    <div class="tip" v-show="status === 'error'">{{ message }}</div>
  </div>
</template>

<script>
export default {
  props: {
    // 接收type
    type: {
      type: String,
      default: 'text'
    },
    // 接收placeholder
    placeholder: {
      type: String,
      default: '请输入......'
    },
    // 接受value值
    value: String,
    // 接收roule message
    rule: RegExp,
    message: String
  },
  //   数据
  data() {
    return {
      status: ''
    }
  },
  //  方法
  methods: {
    inputfn(e) {
      //   console.log(e.target)
      let value = e.target.value
      this.$emit('input', value)
      this.validate(value)
    },
    validate(value) {
      if (this.rule) {
        if (this.rule.test(value)) {
          this.status = 'success'
          return true
        } else {
          this.status = 'error'
          return false
        }
        // console.log(this.status)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.hm-input {
  margin: 0px 20px;
  height: 50px;
  input {
    height: 30px;
    line-height: 30px;
    outline: none;
    border: none;
    border-bottom: 1px solid #ccc;
    width: 100%;
    // 成功
    &.success {
      border-color: green;
    }
    // 失败
    &.error {
      border-color: red;
    }
  }
  .tip {
    font-size: 15px;
    color: red;
    height: 20px;
    line-height: 20px;
  }
}
</style>
