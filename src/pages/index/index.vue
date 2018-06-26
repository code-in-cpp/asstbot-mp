<template>
  <div class="page">
    <view class="content">
      <scroll-view>
        <header-area/>
      </scroll-view>
    </view>
    <view class="footer">
      <command-area>

      </command-area>
    </view>
  </div>
</template>

<script>
import commandArea from '@/components/commandArea'
import headerArea from '@/components/headerArea'

export default {
  data () {
    return {
      motto: 'Hello World',
      userInfo: {}
    }
  },

  components: {
    headerArea,
    commandArea
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
  },

  onShow () {
    this.$store.dispatch('login')
  }
}
</script>

<style scoped>
.page {
  display: flex;
  height: 100% !important;
  flex-direction: column;
}

.content {
  flex: 1;
  background-color: rgb(249, 249, 249);
  height: auto;
}

.footer {
  background-color: rgb(249, 249, 249);
}
</style>
