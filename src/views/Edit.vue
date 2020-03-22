<template>
  <div class="edit">
    <hm-header>编辑资料</hm-header>
    <!-- 头像avatar -->
    <div class="avatar">
      <img :src="$axios.defaults.baseURL + info.head_img" alt />
      <!-- 上传头像的组件 -->
      <van-uploader
        class="uploader"
        :after-read="afterRead"
        :before-read="beforeRead"
      />
    </div>
    <hm-navbar
      title="昵称"
      :conent="info.nickname"
      @click="showNicname"
    ></hm-navbar>
    <hm-navbar
      title="密码"
      :conent="info.password | password"
      @click="showpassword"
    ></hm-navbar>
    <hm-navbar
      title="性别"
      :conent="info.gender === 1 ? '男' : '女'"
      @click="showgender"
    ></hm-navbar>

    <!-- 昵称-->
    <van-dialog
      v-model="show"
      title="修改昵称"
      show-cancel-button
      @confirm="editNickname"
    >
      <van-field v-model="nickname" placeholder="请输入用户昵称" />
    </van-dialog>

    <!-- 密码 -->
    <van-dialog
      v-model="show1"
      title="修改密码"
      show-cancel-button
      @confirm="editpassword"
    >
      <van-field v-model="password" placeholder="请输密码" />
    </van-dialog>

    <!-- 性别 -->
    <van-dialog
      v-model="show2"
      title="修改密码"
      show-cancel-button
      @confirm="editgender"
    >
      <van-radio-group v-model="gender">
        <van-cell-group>
          <van-cell title="男" clickable @click="gender = 1">
            <van-radio slot="right-icon" :name="1" />
          </van-cell>
          <van-cell title="女" clickable @click="gender = 0">
            <van-radio slot="right-icon" :name="0" />
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </van-dialog>

    <!-- 在模板中渲染这个组件 -->
    <div class="marsk" v-show="showcropper">
      <vue-cropper
        ref="cropper"
        :img="img"
        :autoCrop="true"
        :autoCropWidth="150"
        :autoCropHeight="150"
        :fixed="true"
      ></vue-cropper>
      <van-button class="queding" type="primary" @click="queding"
        >确定</van-button
      >
      <van-button class="quxiao" type="primary" @click="quxiao"
        >取消</van-button
      >
    </div>
  </div>
</template>

<script>
// 引入头像裁剪的
import { VueCropper } from 'vue-cropper'
export default {
  data() {
    return {
      info: {},

      // 昵称
      show: false,
      nickname: '',
      // 密码
      show1: false,
      password: '',
      // 性别
      show2: false,
      gender: 1,
      // 头像剪裁的模态框
      showcropper: false,
      img: ''
    }
  },
  // 获取个人信息
  created() {
    this.getinfo()
  },
  methods: {
    async getinfo() {
      // 发送ajax
      const token = localStorage.getItem('token')
      const user_id = localStorage.getItem('user_id')
      const res = await this.$axios({
        method: 'get',
        url: `/user/${user_id}`,
        headers: {
          Authorization: token
        }
      })
      // console.log(res.data)
      const { statusCode, data } = res.data
      this.info = data
      // console.log(this.info)
    },
    // 修改用户，接收需要修改的数据 发送aiaios请求
    editUser(data) {
      const token = localStorage.getItem('token')
      const user_id = localStorage.getItem('user_id')
      this.$axios({
        method: 'post',
        url: `/user_update/${user_id}`,
        data,
        headers: {
          Authorization: token
        }
      }).then(res => {
        console.log(res)
        const { statusCode, data, message } = res.data
        if (statusCode === 200) {
          this.getinfo()
          this.$toast.success(message)
        }
      })
    },
    // 昵称
    showNicname() {
      this.show = true
      this.nickname = this.info.nickname
    },
    editNickname() {
      this.editUser({
        nickname: this.nickname
      })
    },
    // 密码
    showpassword() {
      this.show1 = true
      this.password = this.info.password
    },
    editpassword() {
      // console.log('修改密码呀')
      const token = localStorage.getItem('token')
      const user_id = localStorage.getItem('user_id')
      this.$axios({
        method: 'POST',
        url: `/user_update/${user_id}`,
        data: {
          password: this.password
        },
        headers: {
          Authorization: token
        }
      }).then(res => {
        const { statusCode, data, message } = res.data
        if (statusCode === 200) {
          this.getinfo()
          this.$toast.success(message)
        }
      })
    },
    // 性别
    showgender() {
      this.show2 = true
    },
    editgender() {
      this.editUser({
        gender: this.gender
      })
    },
    afterRead(file) {
      console.log(file)
      // console.log('当选择完文件了，这个函数就会执行', file.file)
      // 需要异步上传文件
      // 读取完文件需要显示裁剪框
      this.showcropper = true
      this.img = file.content
      // const fd = new FormData()
      // fd.append('file', file.file)
      // this.$axios({
      //   method: 'post',
      //   url: '/upload',
      //   data: fd,
      //   headers: {
      //     Authorization: localStorage.getItem('token')
      //   }
      // }).then(res => {
      //   // console.log(res.data)
      //   const { statusCode, data } = res.data
      //   if (statusCode === 200) {
      //     // console.log(data.url)
      //     this.editUser({
      //       head_img: data.url
      //     })
      //   }
      // })
    },
    // 取消
    quxiao() {
      this.showcropper = false
    },
    // 确定
    queding() {
      this.$refs.cropper.getCropBlob(data => {
        // console.log(data)
        const fd = new FormData()
        fd.append('file', data)
        this.$axios({
          method: 'post',
          url: '/upload',
          data: fd
        }).then(res => {
          // console.log(res.data)
          const { statusCode, data } = res.data
          if (statusCode === 200) {
            this.showcropper = false
            this.editUser({
              head_img: data.url
            })
          }
        })
      })
    },
    // 上传前校验
    beforeRead(file) {
      // console.log('上传之前的file', file)
      // 控制文件的大小
      if (file.size / 1024 >= 200) {
        this.$toast.fail('文件大小不能超过200kb')
        return false
      }
      if (file.type !== 'image/jpeg') {
        this.$toast.fail('上传的文件必须是jpg图片')
        return false
      }
      return true
    }
  },
  // 过滤
  filters: {
    password(input) {
      if (input) {
        return input.replace(/./g, '*')
      } else {
        return ''
      }
    }
  },
  components: {
    VueCropper
  }
}
</script>

<style lang="less" scoped>
.avatar {
  position: relative;
  img {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    margin: 30px auto;
    display: block;
  }
  .uploader {
    position: absolute;
    left: 50%;
    top: 0;
    transform: translateX(-50%);
    opacity: 0;
  }
}
.marsk {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 999;
  left: 0;
  top: 0;
  .queding,
  .quxiao {
    position: absolute;
    top: 0;
  }
  .queding {
    left: 0;
  }
  .quxiao {
    right: 0;
  }
}
</style>
