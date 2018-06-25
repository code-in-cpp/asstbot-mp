<template>
  <div class="page">
    <scroll-view class="content">

    </scroll-view>
    <view class="footer">
      Test
    </view>
  </div>
</template>

<script>
import card from '@/components/card'

export default {
  data () {
    return {
      motto: 'Hello World',
      userInfo: {}
    }
  },

  components: {
    card
  },

  methods: {
    bindViewTap () {
      const url = '../logs/main'
      wx.navigateTo({ url })
    },
    getUserInfo () {
      // 调用登录接口
      wx.login({
        success: () => {
          wx.getUserInfo({
            success: (res) => {
              this.userInfo = res.userInfo
            }
          })
        }
      })
    },
    clickHandle (msg, ev) {
      console.log('clickHandle:', msg, ev)
    }
  },

  created () {
    // 调用应用实例的方法获取全局数据
    this.getUserInfo()
  }
}
</script>

<style scoped>
.page {
  display: flex;
  height: 100vh;
  flex-direction: column;
}

.content {
  flex: 1;
  background-color: rgb(249, 249, 249)
}

.footer {
  background-color: rgb(236, 232, 232)
}

</style>
