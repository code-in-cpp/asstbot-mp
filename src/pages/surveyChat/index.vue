<template>
<movable-area class="move-area">
  <view class="page">
    <bot-title-bar :avatarUrl="survey.avatarUrl" :title="survey.title"></bot-title-bar>
    <chat-page :messageList="messageList"/>
  </view>
</movable-area>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import chatPage from '@/components/chatPage/chatPage'

export default {
  data () {
    return {
      survey: {},
      option: {}
    }
  },
  computed: {
    ...mapState({
      messageList: state => state.messages.surveybotMsg
    }),
    ...mapGetters([
      'hasLogin'
    ])
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
    }
  },

  created () {
  },

  onShow () {
    console.log(this.hasLogin)
    if (this.hasLogin) {
      this.startChat()
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
    this.option = option
  }
}
</script>

<style scoped>
</style>
