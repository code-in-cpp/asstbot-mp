<template>
  <div class="page">
    <page-title :title="survey.title"/>
    <view class="content">
      <scroll-view scroll-y='true' style="height: 100%" :scroll-into-view="scrollToView">
        <header-area :surveyData="survey"/>
        <block v-for="(messages, i) in messagesList" :key="i">
          <view :id="i">
          <msg-list :survey="survey" :receiving="i==(messagesList.length-1)&&messages.to!==undefined"
              :messages="messages"/>
          </view>
          <view :id="'bottom'+i"></view>
        </block>
        <block v-if="waitingBotMessage">
          <bot-msg-receiving/>
        </block>
      </scroll-view>
    </view>
    <!--<view class="footer" :class="{'height_700': !flag }">-->
      <!--<command-area v-if="flag"/>-->
      <!--<float-index v-else-if="!flag"></float-index>-->
    <!--</view>-->
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
      messagesList: [],
      lastShowMessage: {},
      lastMessage: {}
    }
  },
  computed: {
    ...mapState({
      messages: state => state.messages.data,
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
      scrollToView: state => {
        return `bottom${state.messages.data.length - 1}`
      },
      userAuthed: state => state.userProfile.authed
    }),
    ...mapGetters({
      falg: 'textOrRadioAction'
    })
  },
  watch: {
    messages: function (val) {
      let lastMessage = val.slice(-1)[0]
      this.waitingBotMessage = true
      if (lastMessage && lastMessage.to) {
        this.lastMessage = lastMessage
        this.messagesList = val.slice(0, -1)
        this.lastShowMessage = {to: lastMessage.to, type: lastMessage.type, msgs: []}
        this.pushMessageToShow()

        var that = this

        let interval = setInterval(() => {
          if (!that.pushMessageToShow()) {
            clearInterval(interval)
            that.waitingBotMessage = false
          }
        }, 300)
      } else {
        this.messagesList = val
        this.lastShowMessage = {}
      }
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
          if (option.id) {
            wx.navigateTo({
              url: `/pages/surveySubjects/main?id=${option.id}`
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
    pushMessageToShow () {
      if (this.lastShowMessage.msgs.length === this.lastMessage.msgs.length) {
        return false
      }
      this.lastShowMessage.msgs.push(this.lastMessage.msgs[this.lastShowMessage.msgs.length])
      this.messagesList = [...this.messages.slice(0, -1), this.lastShowMessage]
      return true
    }
  },

  created () {
    // 调用应用实例的方法获取全局数据
    this.getDeviceType()
  },

  onShow () {
  },

  onLoad (option) {
    // const complate = wx.getStorageSync('complate')
    // if (complate === 'success') {
    //   wx.navigateTo({
    //     url: '../display/main'
    //   })
    // }
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
