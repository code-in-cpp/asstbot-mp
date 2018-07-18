<template>
<movable-area class="move-area">
  <view class="page">
    <bot-title-bar></bot-title-bar>
    <chat-page :messageList="messageList"/>
  </view>
</movable-area>
</template>

<script>
import { mapState } from 'vuex'
import chatPage from '@/components/chatPage/chatPage'

export default {
  data () {
    return {
      option: {},
      scene: 'load'
    }
  },
  computed: {
    ...mapState({
      userAuthed: state => state.userProfile.authed,
      loginStatus: state => state.userProfile.loginStatus
    }),
    ...mapState({
      messageList: state => state.messages.creatorBotMsg
    }),
    hasLogin () {
      return this.userAuthed || this.loginStatus
    }
  },
  components: {
    chatPage
  },

  methods: {
    startChat () {
      this.$store.commit('talkToBotFather')
      this.$store.dispatch('updateUserInfo')
        .then(() => {
          this.$store.dispatch('start')
        })
    }
  },

  onShow () {
    if (!this.hasLogin) {
      this.scene = 'gotoLogin'
      wx.navigateTo({
        url: '/pages/login/main'
      })
    } else {
      if (this.scene === 'gotoLogin') {
        this.startChat()
        this.scene = ''
      } else if (this.scene === 'onload') {
        this.startChat()
        this.scene = ''
      } else {
        this.$store.commit('talkToBotFather')
      }
    }
  },

  onLoad (option) {
    this.scene = 'onload'
  }
}
</script>

<style scoped>
</style>
