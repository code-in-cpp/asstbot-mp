<template>
<movable-area class="move-area">
  <view class="page">
    <bot-title-bar :avatarUrl="survey.avatarUrl" :title="survey.title"></bot-title-bar>
    <chat-page :messageList="messageList"/>
  </view>
  <user-login @haslogin="userLogin()"/>
</movable-area>
</template>

<script>
import { mapState } from 'vuex'
import chatPage from '@/components/chatPage/chatPage'

export default {
  data () {
    return {
      survey: {},
      option: {},
      hasLogin: false
    }
  },
  computed: {
    ...mapState({
      messageList: state => state.messages.surveybotMsg
    })
  },
  components: {
    chatPage
  },

  methods: {
    startChat () {
      let option = this.option
      if (option.id) {
        const scene = option.scene ? option.scene : 'publish'
        this.$store.commit('talkToSurveyBot', {id: option.id, scene})

        this.$store.dispatch('retrieveSurveyById', option.id)
          .then((survey) => {
            this.survey = survey
          })
          .catch((err) => {
            console.log(err)
          })
      }

      this.$store.dispatch('updateUserInfo')
        .then(() => {
          this.$store.dispatch('start')
        })
      console.error('test')
    },
    userLogin () {
      this.hasLogin = true
      this.startChat()
    }
  },

  created () {
  },

  onShow () {
    if (this.hasLogin) {
      this.startChat()
    }
  },

  onLoad (option) {
    this.option = option
  }
}
</script>

<style scoped>
</style>
