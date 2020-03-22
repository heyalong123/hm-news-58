<template>
  <div class="myfollw">
    <hm-header>我的关注</hm-header>
    <div class="list">
      <div class="time" v-for="time in list" :key="time.id">
        <div class="left">
          <img :src="$axios.defaults.baseURL + time.head_img" alt="" />
        </div>
        <div class="conent">
          <div class="name">{{ time.nickname }}</div>
          <div class="data">{{ time.create_date | data }}</div>
        </div>
        <div class="right" @click="unfollow(time.id)">取消关注</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: []
    }
  },
  // 获取关注列表
  created() {
    this.getfollow()
  },
  methods: {
    async getfollow() {
      const res = await this.$axios({
        method: 'get',
        url: '/user_follows/'
      })
      // console.log(res.data)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.list = data
        //   console.log(this.list)
      }
    },
    async unfollow(id) {
      try {
        await this.$dialog.confirm({
          title: '温馨提示',
          message: '你确定要取消关注'
        })

        const res = await this.$axios({
          method: 'get',
          url: `/user_unfollow/${id}`
        })
        // console.log(res.data)
        const { statusCode, message } = res.data
        if (statusCode === 200) {
          this.$toast.success('关注成功')
          this.getfollow()
        }
      } catch {
        this.$toast('取消操作')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.time {
  border-bottom: 1px solid #ccc;
  height: 80px;

  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 20px;
  .left {
    img {
      widows: 40px;
      height: 40px;
      border-radius: 50%;
      display: block;
    }
  }
  .conent {
    flex: 1;
    padding: 10px;
    .name {
      font-size: 16px;
    }
    .data {
      font-size: 12px;
      color: #cccccc;
    }
  }
  .right {
    background: #cccccc;
    padding: 10px 20px;
    border-radius: 20px;
  }
}
</style>
