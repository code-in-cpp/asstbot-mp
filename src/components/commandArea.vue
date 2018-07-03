<template>
  <form report-submit="true" @submit="sendMessage" class="footer">
    <view class="weui-flex container-box">
      <view class="placeholder">
        <button class="height-line-height" v-if="!userAuthed" open-type="getUserInfo" @getuserinfo="updateUserInfo">用户</button>
      </view>
      <view class="weui-flex__item height-line-height command-box">
        <!--<i-input v-if="!activeAction" auto-height="auto" class="height-line-height word-break" type="textarea" :value="currentMessage" @change="valueChange" placeholder="请输入消息" />-->
        <textarea v-if="!activeAction" class=" word-textarea  word-break command-text" :value="currentMessage" @input="valueChange" @change="valueChange" @linechange="rowChange" adjust-position auto-height @focus="focusActive" cursor-spacing="12"/>
      </view>
      <view class="placeholder">
        <button class="input-widget height-line-height buttonSend" size="small" formType="submit" :disabled="currentMessage=='' || focusFlag">发送</button>
      </view>
    </view>
  </form>
</template>
<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      currentMessage: '请输入消息',
      rowHeight: '0rpx',
      focusFlag: true
    }
  },

  computed: {
    ...mapState({
      userAuthed: state => state.userProfile.authed
    }),
    activeAction: state => state.$store.getters.activeAction
  },
  methods: {
    updateUserInfo (ev) {
      this.$store.dispatch('updateUserInfo')
    },
    valueChange (ev) {
      this.currentMessage = ev.mp.detail.value
      console.log(this.currentMessage, this.focusFlag)
    },
    sendMessage (ev) {
      this.$store.dispatch('sendQuery', this.currentMessage)
      this.currentMessage = ''
    },
    rowChange (e) {
      this.rowHeight = e.mp.detail.heightRpx + 'rpx'
    },
    focusActive () {
      if (this.focusFlag) {
        this.currentMessage = ''
        this.focusFlag = false
      }
    }
  }
}
</script>

<style>
.input-widget {
  margin: 0!important;
  height: 100%;
  max-height: 80rpx;
  color:#fff!important;
  background:#2d8cf0!important
}
.input-widget:disabled{
  background: rgba(168,167,165,0.09)!important;
  padding-left: 20px;
}
  .height-line-height{
    /*height: 80rpx;*/
    line-height: 80rpx;
    box-sizing: border-box;
  }
  .container-box{
    align-items: flex-end;
    background: #ccc;
  }
  .word-break{
    /*word-wrap: normal;*/
    word-break: break-word;
  }
  .word-textarea{
    height: auto;
    background: #fff;
    min-height: 72rpx;
    padding-left: 10rpx;
    line-height: 72rpx;
  }
  .buttonSend[disabled]{
    background: #999!important;
  }
  .command-box{
    padding: 4rpx 8rpx;
  }
  .command-text{
    border: 1rpx solid #dadada;
    box-sizing: border-box;
    width:100%;
    height:100%;
  }
</style>
