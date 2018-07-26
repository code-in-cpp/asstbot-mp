<template>
  <block>
    <view class="content">
      <message-list :messagesList="messageList" :survey="survey" :localmsgsending="localMsgSending"
          @renderFinish="msgDisplayFinish" @renderBegin="msgDisplayBegin"/>
    </view>
    <view class="footer">
      <select-box  v-if="displayFinish" :messageAction="activeBoxMsg"/>
      <command-area  @msgSendStatus="handleMsgSendStatus" 
          :inputFieldFocus="needTextReply"
          :displayFinish="displayFinish"/>
    </view>
  </block>
</template>

<script>
import commandArea from '@/components/commandArea'
import messageList from '@/components/chatPage/messageList'
import selectBox from '@/components/selectBox'

const urlMaping = {'create-survey': '/pages/createdSurvey/main',
  'visit-survey': '/pages/visitedSurvey/main',
  'edit-survey': '/pages/surveySubjects/main',
  'bot-creator': '/pages/index/main',
  'test-survey': '/pages/surveyChat/main',
  'show-survey': '/pages/display/main',
  'publish-survey': '/pages/publish/main',
  'show-survey-result': '/pages/detail/main'
}

export default {
  data () {
    return {
      displayFinish: false,
      localMsgSending: false
    }
  },
  props: {
    messageList: {
      type: Array,
      default: []
    },
    survey: {
      type: Object,
      default: {}
    }
  },
  computed: {
    needTextReply () {
      if (!this.messageList) {
        return false
      }
      if (!this.messageList.length < 5) {
        return false
      }
      let list = this.messageList.slice(-1).pop()
      if (list && list.to) {
        let message = [...list.msgs].slice(-1).pop()
        return message.type === 'text'
      } else {
        return false
      }
    },
    activeMsg () {
      if (!this.messageList) {
        return undefined
      }
      let lastmsg = [...this.messageList].slice(-1)[0]
      if (!lastmsg || !lastmsg.to || !lastmsg.msgs || lastmsg.msgs.length === 0) {
        return undefined
      }
      return lastmsg
    },

    activeRedirectMsg () {
      return this.activeSomeKindOfMsg(['redirect', 'reLaunch'])
    },
    activeBoxMsg () {
      return this.activeSomeKindOfMsg(['radio', 'checkbox', 'imageUploader'])
    },
    activeInputPromtMsg () {
      return this.activeSomeKindOfMsg(['input-prompt'])
    }
  },
  methods: {
    activeSomeKindOfMsg (array) {
      if (!this.activeMsg) {
        return undefined
      }
      let message = this.activeMsg.msgs.filter((msg) => {
        return array.indexOf(msg.type) !== -1
      })

      if (message.length >= 1) {
        return message[0]
      } else {
        return undefined
      }
    },
    msgDisplayBegin () {
      this.displayFinish = false
    },
    msgDisplayFinish () {
      this.displayFinish = true
      let lastMsg = this.activeRedirectMsg
      if (lastMsg) {
        this.doRedirect(lastMsg)
      }
    },
    doRedirect (lastmsg) {
      let redirectUrl = urlMaping[lastmsg.url]
      let headerParas = this.buildHeaderParas(lastmsg.option)
      let urlWithParas = redirectUrl + headerParas

      if (lastmsg.type === 'redirect') {
        this.delayRedirectTo(lastmsg, urlWithParas)
      } else if (lastmsg.type === 'reLaunch') {
        this.delayRelaunch(`${urlWithParas}?scene='relaunchFromBot'`)
      }
    },
    buildHeaderParas (option) {
      if (!option) {
        return ''
      }
      let ret = '?'
      for (let key in option) {
        let para = key + '=' + option[key]
        ret += (ret === '?') ? para : '&' + para
      }
      console.log('build para is', ret)
      return ret
    },
    delayRedirectTo (scene, url) {
      let that = this
      setTimeout(function () {
        that.$emit('redirectTo', scene)
        wx.navigateTo({url})
      }, 1500)
    },
    delayRelaunch (url) {
      setTimeout(function () {
        wx.reLaunch({url})
      }, 1500)
    },
    handleMsgSendStatus (event) {
      this.localMsgSending = (event === 'start')
    }
  },

  components: {
    commandArea,
    messageList,
    selectBox
  }
}
</script>

<style scoped>
  .footer{
    position: relative;
  }
</style>
