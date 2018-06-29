<template>
  <form report-submit="true" @submit="sendMessage">
    <view class="weui-flex container-box">
      <view class="placeholder">
        <button class="height-line-height" v-if="!userAuthed" open-type="getUserInfo" @getuserinfo="updateUserInfo">用户</button>
      </view>
      <view class="weui-flex__item height-line-height">
        <i-input v-if="!activeAction" auto-height="auto" class="height-line-height word-break" type="textarea" :value="currentMessage" @change="valueChange" placeholder="请输入消息" />
        <!--<textarea v-if="!activeAction" class="height-line-height word-textarea" :value="currentMessage" bindinput="valueChange" placeholder="请输入消息" />-->
      </view>
      <view class="placeholder">
        <button class="input-widget height-line-height" size="small" formType="submit" :disabled="currentMessage==''">发送</button>
      </view>
    </view>
  </form>
</template>
<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      currentMessage: ''
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
      this.currentMessage = ev.mp.detail.detail.value
    },
    sendMessage (ev) {
      this.$store.dispatch('sendQuery', this.currentMessage)
      this.currentMessage = ''
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
  }
  .word-break{
    word-wrap: normal;
    word-break: keep-all;
  }
  .word-textarea{
    height: auto;
    min-height: 44px;
    padding-left: 10px;
  }
</style>
