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
    <view class="footer">
      <command-area/>
    </view>
    <!--<box-float :list="dataArray" :type="type"></box-float>-->
    <box-float></box-float>
    <upload-image></upload-image>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import commandArea from '@/components/commandArea'
import headerArea from '@/components/headerArea'
import boxFloat from '@/components/boxFloat'
import msgList from '@/components/msgList'
import uploadImage from '@/components/uploadImage'

export default {
  computed: {
    ...mapState({
      messagesList: state => state.messages.data,
      scrollToView: state => `bottom${state.messages.data.length - 1}`
    })
  },

  components: {
    headerArea,
    commandArea,
    boxFloat,
    msgList,
    uploadImage
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

<style scoped
</style>
