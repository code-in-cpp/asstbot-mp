<template>
  <div class="page">
    <bot-title-bar :avatarUrl="survey.avatarUrl" :title="survey.title"></bot-title-bar>
    <view class="content">
      <scroll-view scroll-y='true' style="height: 100%" :scroll-into-view="scrollToView">
        <view class="padding-top-64" :class="{'height-110':!haveImage,'height-444':haveImage}">
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
        </view>

      </scroll-view>
    </view>
    <view class="footer">
      <select-box :list="list" :haveImage="haveImage"></select-box>
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
      waitingBotMessage: false,
      // messagesList: [],
      // lastShowMessage: {},
      lastMessage: {},
      scrollToView: 'bottom',
      haveImage: false
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
      ...mapGetters({
        list: 'messageAction'
      }),
      userAuthed: state => state.userProfile.authed
    }),
    ...mapGetters({
      falg: 'textOrRadioAction'
    })
  },
  watch: {
    messagesList: function (val) {
      const that = this
      if (this.haveImage) {
        setTimeout(function () {
          that.scrollToView = `bottom${val.length - 1}`
        }, 500)
      } else {
        this.scrollToView = `bottom${val.length - 1}`
      }
    },
    'lastShowMessage.msgs': function (newVal) {
      if (!this.lastShowMessage || !this.lastShowMessage.to) {
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
    },
    list: function (val) {
      if (val.type === 'radio' || val.type === 'checkbox') {
        let a = this.list.items.find(item => !!item.imageUrl === true)
        this.haveImage = a !== undefined
      } else {
        this.haveImage = false
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
    clickHandle (msg, ev) {
      console.log('clickHandle:', msg, ev)
    },
    scollToBottom () {
      this.scrollToView = 'bottom'
    }
  },

  created () {
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
      this.survey = {}
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
  .footer{
    position: relative;
  }
  .height-110{
    box-sizing: border-box;
    padding-bottom: 110rpx;
  }
  .height-444{
    box-sizing: border-box;
    padding-bottom: 444rpx;
  }
.padding-top-64{
  padding-top: 64rpx;
}
</style>
