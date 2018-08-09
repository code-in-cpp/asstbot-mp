<template>
  <block>
    <view class="content" style="flex-direction: column">
      <scroll-view scroll-y='true' :scroll-into-view="scrollToView" style="height: 100%"
         upper-threshold="150">
        <view class="padding-top-64">
          <block v-for="(messages, i) in messageList" :key="messages.id">
            <view :id="i">
              <message-item :survey="survey" :lastBotMsg="i==(messageList.length-1)&&messages.to!==undefined"
                        :messages="messages" :userAuthed="userAuthed"
                        @renderComplete="renderComplete"
                        @renderUpdate="renderUpdate"
                        @itemLoad="scollToBottom"
                        @previewImage="$store.commit('setPreviewFalse')"
                        @buttonListEvent="action"/>
            </view>
            <view :id="'bottom'+i"></view>
          </block>
          <block v-if="localMsgSending">
            <user-say-sending/>
          </block>
          <view id="bottom"></view>
        </view>
      </scroll-view>
      <!-- <message-list :messagesList="messageList" :survey="survey" :localmsgsending="localMsgSending"
          @renderFinish="msgDisplayFinish" @renderBegin="msgDisplayBegin"/> -->
    </view>
    <view class="footer">
      <select-box  v-if="displayFinish" :messageAction="activeBoxMsg"/>
      <command-area  @msgSendStatus="handleMsgSendStatus"
          :inputPromt="activeInputPromtMsg"
          :displayFinish="displayFinish" @keyBoardUp="keyBoardUp"
          :needFocus="messageList.length && messageList.length>5"/>
    </view>
  </block>
</template>

<script>
import commandArea from '@/components/commandArea'
import selectBox from '@/components/selectBox'
import userSaySending from '@/components/userSay/sending'
import { mapState } from 'vuex'

const urlMaping = {
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
      localMsgSending: false,
      scrollToView: 'bottom'
    }
  },
  props: {
    messageSource: {
      type: String,
      default: 'creator'
    },
    survey: {
      type: Object,
      default: {}
    }
  },
  watch: {
    messageList: function (val) {
      this.msgDisplayBegin()
      this.scrollToView = `bottom${val.length - 1}`
    }
  },
  computed: {
    ...mapState({
      userAuthed: state => state.userProfile.authed
    }),

    messageList () {
      if (this.messageSource === 'creator') {
        return this.$store.state.messages.creatorBotMsg
      } else {
        return this.$store.state.messages.surveybotMsg
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
    action (event) {
      let buttonList = event.mp.detail.buttonList
      let item = event.mp.detail.item
      if (buttonList.reflex) {
        this.$store.commit('appendUserMessage', item.caption)
      }
      this.$store.dispatch('sendGenericRequest', {
        type: 'event',
        data:
        {
          name: item.event,
          ...item.data
        }
      })
    },
    activeSomeKindOfMsg (array) {
      if (!this.activeMsg) {
        return {}
      }
      let message = this.activeMsg.msgs.filter((msg) => {
        return array.indexOf(msg.type) !== -1
      })

      if (message.length >= 1) {
        return message[0]
      } else {
        return {}
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
      // console.log('build para is', ret)
      return ret
    },
    delayRedirectTo (scene, url) {
      let that = this
      setTimeout(function () {
        that.$emit('redirectTo', scene)
        wx.navigateTo({url})
      }, 500)
    },
    delayRelaunch (url) {
      setTimeout(function () {
        wx.reLaunch({url})
      }, 500)
    },
    handleMsgSendStatus (event) {
      this.localMsgSending = (event === 'start')
      this.scollToBottom()
    },
    renderComplete () {
      this.scollToBottom()
      this.msgDisplayFinish()
    },
    renderUpdate () {
      this.scollToBottom()
    },
    scollToBottom () {
      const that = this
      this.scrollToView = ''
      that.scrollToView = 'bottom'
      setTimeout(function () {
        that.scrollToView = ''
        that.scrollToView = 'bottom'
      }, 100)
    }
  },

  components: {
    commandArea,
    selectBox,
    userSaySending
  }
}
</script>

<style scoped>
  .footer{
    position: relative;
  }
  .pulldown-box{
    /*transition: height 1s;*/
  }
</style>
