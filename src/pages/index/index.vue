<template>
  <div class="page">
    <view class="content">
      <scroll-view scroll-y='true' style="height: 100%" :scroll-into-view="scrollToView">
        <header-area/>
        <block v-for="(messages, i) in messagesList" :key="i">
          <view :id="i">
          <msg-list :receiving="i==(messagesList.length-1)&&messages.to!==undefined"
              :messages="messages"/>
          </view>
          <view :id="'bottom'+i"></view>
        </block>
      </scroll-view>
    </view>
    <view class="sustainBox" :class="{'height_40': falg }"></view>
    <view class="footer">
      <command-area/>
    </view>
    <!--<box-float></box-float>-->
    <!--<upload-avatar></upload-avatar>-->
    <float-index></float-index>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import commandArea from '@/components/commandArea'
import headerArea from '@/components/headerArea'
// import boxFloat from '@/components/boxFloat'
import msgList from '@/components/msgList'
// import uploadAvatar from '@/components/uploadAvatar'
import floatIndex from '@/components/floatIndex'

export default {
  computed: {
    ...mapState({
      messagesList: state => state.messages.data,
      scrollToView: state => `bottom${state.messages.data.length - 1}`
    }),
    ...mapGetters({
      falg: 'activeAction'
    })
  },

  components: {
    headerArea,
    commandArea,
    // boxFloat,
    floatIndex,
    msgList
    // uploadAvatar,
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
    this.$store.dispatch('start')
  },

  onShow () {

  }
}
</script>

<style scoped>
  .sustainBox{
    width:100%;
    height:0;
    background: transparent;
  }
  .height_40{
    height:540rpx;
  }
</style>
