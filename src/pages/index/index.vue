<template>
  <div class="page">
    <page-title :title="survey.title"/>
    <view class="content">
      <scroll-view scroll-y='true' style="height: 100%" :scroll-into-view="scrollToView">
        <header-area :surveyData="survey"/>
        <block v-for="(messages, i) in messagesList" :key="i">
          <view :id="i">
          <msg-list :survey="survey" :lastBotMsg="i==(messagesList.length-1)&&messages.to!==undefined"
              :messages="messages" @renderComplete="scollToBottom"/>
          </view>
          <view :id="'bottom'+i"></view>
        </block>
        <block v-if="waitingBotMessage">
          <bot-msg-receiving/>
        </block>
        <view id="bottom"></view>
      </scroll-view>
    </view>
    <view class="footer">
      <select-box></select-box>
      <command-area/>
    </view>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import commandArea from '@/components/commandArea'
import headerArea from '@/components/headerArea'
import pageTitle from '@/components/pageTitle'
import msgList from '@/components/msgList'
import floatIndex from '@/components/floatIndex'
import selectBox from '@/components/selectBox'
import botMsgReceiving from '@/components/botMsgReceiving'

export default {
  data () {
    return {
      survey: {},
      isIphoneX: false,
      waitingBotMessage: false,
      // messagesList: [],
      // lastShowMessage: {},
      lastMessage: {},
      scrollToView: 'bottom'
    }
  },
  computed: {
    ...mapState({
      messagesList: state => state.messages.data,
      lastShowMessage: state => state.messages.data.slice(-1)[0],
      flag: state => {
        let data = state.messages.data.slice(-1)
        if (data[0] && data[0].to) {
          let type = data[0].msgs.slice(-1)[0].type
          switch (type) {
            case 'radio':
              if (data[0].msgs.slice(-1)[0].items && data[0].msgs.slice(-1)[0].items.length > 10) {
                return false
              } else {
                return true
              }
            case 'checkbox':
              return false
            default: {
              return true
            }
          }
        }
        return true
      },

      userAuthed: state => state.userProfile.authed
    }),
    ...mapGetters({
      falg: 'textOrRadioAction'
    })
  },
  watch: {
    messagesList: function (val) {
      this.scrollToView = `bottom${val.length - 1}`
    },
    'lastShowMessage.msgs': function (newVal) {
      if (!this.lastShowMessage.to) {
        return
      }
      let lastmsg = newVal.slice(-1)[0]
      if (!lastmsg) {
        return
      }
      if (lastmsg.type === 'redirect') {
        if (lastmsg.url === 'view-survey') {
          if (lastmsg.option.id === 'created') {
            wx.navigateTo({
              url: '/pages/createdSurvey/main'
            })
          } else {
            wx.navigateTo({
              url: '/pages/visitedSurvey/main'
            })
          }
        } else if (lastmsg.url === 'create-survey') {
          if (lastmsg.option.id) {
            wx.navigateTo({
              url: `/pages/surveySubjects/main?id=${lastmsg.option.id}`
            })
          }
        }
      }
    }
  },
  components: {
    headerArea,
    commandArea,
    // boxFloat,
    floatIndex,
    pageTitle,
    msgList,
    selectBox,
    botMsgReceiving
    // uploadAvatar,
  },

  methods: {
    bindViewTap () {
      const url = '../logs/main'
      wx.navigateTo({ url })
    },
    getDeviceType () {
      wx.getSystemInfo({
        success: (res) => {
          if (res.model.search('iPhone X') !== -1) {
            this.$store.dispatch('update_device_info', true)
            // console.log('getDeviceType, iphone X')
          } else {
            this.$store.dispatch('update_device_info', false)
            // console.log('getDeviceType, not iphone X')
          }
        }
      })
    },
    clickHandle (msg, ev) {
      console.log('clickHandle:', msg, ev)
    },
    scollToBottom () {
      this.scrollToView = 'bottom'
    }
  },

  created () {
    // 调用应用实例的方法获取全局数据
    this.getDeviceType()
  },

  onShow () {
  },

  onLoad (option) {
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
    } else {
      this.$store.commit('talkToBotFather')
    }

    this.$store.dispatch('updateUserInfo').then((res) => {
      if (this.userAuthed) {
        this.$store.dispatch('start')
      } else {
        this.$store.dispatch('getUserinfo', {content: '获取你的公开信息（昵称、头像等)', type: 'getUserinfo'})
      }
    }).catch((err) => {
      this.$store.dispatch('getUserinfo', {content: '获取你的公开信息（昵称、头像等)', type: 'getUserinfo'})
      console.log(err)
    })
  }
}
</script>

<style scoped>
  .height_700{
    height:700rpx
  }
</style>
