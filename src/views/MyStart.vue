<template>
  <div class="my-start">
    <hm-header>我的收藏</hm-header>
    <div class="itme" v-for="itme in list" :key="itme.id">
      <div class="info">
        <div class="title">{{itme.title}}</div>
        <div class="buttom">
          <span>{{itme.user.nickname}}</span>
          <span>{{itme.comments.length}}跟帖</span>
        </div>
      </div>
      <div class="right">
        <img :src="itme.cover[0].url" alt />
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
  async created() {
    const res = await this.$axios.get('/user_star')
    // console.log(res.data)
    const { statusCode, data } = res.data
    if (statusCode === 200) {
      this.list = data
      console.log(this.list)
    }
  }
}
</script>

<style lang="less" scoped>
.itme {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #cccccc;
  padding: 10px;
  .info {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .title {
      font-size: 16px;
    }
    .buttom {
      color: #999;
      span {
        font-size: 12px;
        margin-right: 10px;
      }
    }
  }
  img {
    width: 121px;
    height: 75px;
    display: block;
    object-fit: contain;
  }
}
</style>