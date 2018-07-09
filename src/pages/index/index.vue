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
      </scroll-view>
    </view>
    <view class="footer" :class="{'height_700': !flag }">
      <command-area v-if="flag"/>
      <float-index v-else-if="!flag"></float-index>
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

export default {
  data () {
    return {
      survey: {},
      isIphoneX: false
    }
  },
  computed: {
    ...mapState({
      messagesList: state => state.messages.data,
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
        // let isText = false
        // let data = state.messages.data.slice(-1)
        // if (data[0] && data[0].to) {
        //   let type = data[0].msgs.slice(-1)[0].type
        //   switch (type) {
        //     case 'radio':
        //       if (data[0].msgs.length > 10) {
        //         isText = true
        //       } else {
        //         isText = false
        //       }
        //       break
        //     case 'checkbox':
        //       isText = true
        //       break
        //     default: {
        //       isText = false
        //     }
        //   }
        // } else {
        //   isText = false
        // }
        // if (isText) {
        //   setTimeout(function () {
        //     console.log(`bottom${state.messages.data.length - 1}`)
        //     return `bottom${state.messages.data.length - 1}`
        //   }, 600)
        // } else {
        //   return `bottom${state.messages.data.length - 1}`
        // }
        return `bottom${state.messages.data.length - 1}`
      },
      userAuthed: state => state.userProfile.authed
    }),
    ...mapGetters({
      falg: 'textOrRadioAction'
    })
  },
  components: {
    headerArea,
    commandArea,
    // boxFloat,
    floatIndex,
    pageTitle,
    msgList
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
    const surveyId = option.id ? option.id : option.scene

    if (surveyId) {
      this.$store.dispatch('setId', surveyId)
      this.$store.dispatch('retrieveSurveyById', surveyId)
        .then((survey) => {
          this.survey = survey
        })
        .catch((err) => {
          console.log(err)
        })
      this.$store.dispatch('updateUserInfo').then((res) => {
        if (this.userAuthed) {
          this.$store.dispatch('start', surveyId)
        } else {
          this.$store.dispatch('getUserinfo', {content: '获取你的公开信息（昵称、头像等)', type: 'getUserinfo'})
        }
      }).catch((err) => {
        this.$store.dispatch('getUserinfo', {content: '获取你的公开信息（昵称、头像等)', type: 'getUserinfo'})
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>
  .footer{

  }
  .height_700{
    height:700rpx
  }
</style>
