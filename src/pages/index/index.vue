<template>
<movable-area class="move-area">
  <view class="page">
    <bot-title-bar></bot-title-bar>
    <chat-page :messageList="messageList" @redirectTo="toRedirect"/>
  </view>
</movable-area>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import chatPage from '@/components/chatPage/chatPage'

export default {
  data () {
    return {
      option: {},
      scene: 'load',
      redirect: {}
    }
  },
  computed: {
    ...mapState({
      messageList: state => state.messages.creatorBotMsg
    }),
    ...mapGetters([
      'hasLogin'
    ]
    )
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
        .catch(e => {
          console.error(e)
        })
    },
    toRedirect (event) {
      this.scene = `redirectTo ${event}`
      this.redirect = event
    },
    userLogin () {
      this.hasLogin = true
      this.startChat()
    }
  },

  onShow () {
    if (this.hasLogin) {
      if (this.scene.indexOf('redirectTo') !== -1) {
        this.$store.commit('talkToBotFather')
        this.$store.dispatch('sendGenericRequest', {type: 'dialog-start', data: this.redirect})
        this.scene = ''
        this.redirect = {}
      } else if (this.scene.indexOf('relaunchFrom') !== -1) {
        this.startChat()
      } else if (this.scene === 'onLoad') {
        this.startChat()
      } else {
        this.$store.commit('talkToBotFather')
      }
    } else if (this.hasLogin === undefined) {
      this.$store.dispatch('updateAuthStatus')
        .then((auth) => {
          if (auth) {
            this.startChat()
          }
        })
    }
  },

  onLoad (option) {
    console.log('option:', option)
    if (option.scene) {
      this.scene = option.scene
    } else {
      this.scene = 'onLoad'
    }
  }
}
</script>

<style scoped>
</style>
