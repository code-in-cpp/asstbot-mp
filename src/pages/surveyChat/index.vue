<template>
<movable-area class="move-area">
  <view class="page" v-if="loadDone">
    <bot-title-bar :avatarUrl="survey.avatarUrl" :title="survey.title"></bot-title-bar>
    <chat-page messageSource="surveyBot" :survey="survey"/>
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
      option: {},
      loadDone: false,
      firstTimeShow: true,
      scene: ''
    }
  },
  computed: {
    ...mapState({
      previewImageFlag: state => {
        return state.inputValue.previewShow
      }
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
      console.log('startChat, option:', option)
      if (option.id) {
        const scene = option.scene ? option.scene : 'publish'
        this.$store.commit('talkToSurveyBot', {id: option.id, scene})

        this.$store.dispatch('retrieveSurveyById', option.id)
          .then((survey) => {
            this.survey = survey
            this.loadDone = true
          })
          .catch((err) => {
            console.log(err)
          })
      } else if (option.scene) {
        // 临时方案，适配二维码扫码后微信规定只能用scene传递参数，这时scene存的是survey id
        const id = option.scene
        const scene = 'publish'
        this.$store.commit('talkToSurveyBot', {id: id, scene})
        this.$store.dispatch('retrieveSurveyById', id)
          .then((survey) => {
            this.survey = survey
            this.loadDone = true
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
    console.log('on show')
    if (!this.previewImageFlag) {
      this.$store.commit('setPreviewTrue')
      return
    }

    if (!this.firstTimeShow && this.scene !== 'test') {
      wx.showModal({
        title: '你有一份问卷未完成',
        content: '现在继续回答吗？',
        success: function (res) {
          if (res.confirm) {
            console.log('用户选择继续答卷')
          } else if (res.cancel) {
            console.log('用户选择取消答卷')
            wx.reLaunch({
              url: '../index/main?scene=relaunchFrom'
            })
          }
        },
        fail: (err) => {
          console.log('comfirm continue on survey : ' + JSON.stringify(err))
        }
      })
    }
    this.firstTimeShow = false
  },
  onHide () {
    console.log('hide:')
  },

  onLoad (option) {
    this.option = option
    this.loadDone = false
    this.firstTimeShow = true
    this.scene = option.scene

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
  }
}
</script>

<style scoped>
</style>
