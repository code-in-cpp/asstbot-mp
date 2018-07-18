<template>
<movable-area class="move-area">
  <view class="page">
    <bot-title-bar :avatarUrl="survey.avatarUrl" :title="survey.title"></bot-title-bar>
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
      survey: {},
      option: {}
    }
  },
  computed: {
    ...mapState({
      userAuthed: state => state.userProfile.authed,
      loginStatus: state => state.userProfile.loginStatus
    }),
    ...mapState({
      messageList: state => state.messages.surveybotMsg
    }),
    hasLogin () {
      return this.userAuthed || this.loginStatus
    }
  },
  // watch: {
  //   hasLogin: function (val, oldVal) {
  //     console.log('hasLogin', val, oldVal)
  //     if (val && !oldVal) {
  //       this.startChat()
  //     }
  //   },
  //   option: function (val) {
  //     if (this.hasLogin) {
  //       this.startChat()
  //     }
  //   }
  // },
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
    }
  },

  created () {
  },

  onShow () {
    if (!this.hasLogin) {
      wx.navigateTo({
        url: '/pages/login/main'
      })
    } else {
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
