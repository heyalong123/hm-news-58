<template>
  <div class="mycomment">
    <hm-header>我的跟帖</hm-header>

    <div class="list">
      <van-list
        @load="onLoad"
        :immediate-check="false"
        :offset="30"
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
      >
        <div class="itme" v-for="itme in list" :key="itme.id">
          <div class="time">
            {{ itme.create_date | data('YYYY-MM-DD HH:mm') }}
          </div>
          <!-- 父评论的内容 -->
          <div class="parent-comment" v-if="itme.parent">
            <div class="parent-name">回复：{{ itme.parent.user.nickname }}</div>
            <div class="parent-content">
              {{ itme.parent.content }}
            </div>
          </div>
          <div class="conent">{{ itme.content }}</div>
          <div class="link">
            <div class="title one-txt-cut">原文：{{ itme.post.title }}</div>
            <span class="iconfont iconjiantou1"></span>
          </div>
        </div>
      </van-list>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      pageIndex: 1,
      pageSize: 10
    }
  },
  created() {
    this.getcomment()
  },
  methods: {
    async getcomment() {
      const res = await this.$axios({
        method: 'get',
        url: '/user_comments',
        params: {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      })
      // console.log(res.data)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        // this.list = data
        this.list = [...this.list, ...data]
        console.log(this.list)
        this.loading = false
        if (data.length < this.pageSize) {
          // 没有更多数据
          this.finished = true
        }
      }
    },
    onLoad() {
      console.log('我触底了')
      this.pageIndex++
      this.getcomment()
    }
  }
}
</script>

<style lang="less" scoped>
.itme {
  border-bottom: 1px solid #cccccc;
  padding: 10px;
  .time {
    font-size: 16px;
    height: 30px;
    line-height: 30px;
  }
  .conent {
    font-size: 14px;
    padding: 0px 10px;
  }
  .link {
    color: #999;
    display: flex;
    margin-top: 10px;
    justify-content: space-between;

    .title {
      flex: 1;
    }
    span {
      text-align: right;
      width: 50px;
    }
  }
  .parent-comment {
    background: #dddddd;
    padding: 10px;
    font-size: 14px;
    line-height: 30px;
  }
  .parent-name {
    font-size: 12px;
  }
}
</style>
