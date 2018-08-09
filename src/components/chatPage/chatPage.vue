<template>
  <block>
    <view class="content" style="flex-direction: column">
      <scroll-view scroll-y='true' :scroll-into-view="scrollToView" style="height: 100%"
         upper-threshold="150">
        <!--<view class="padding-top-64" :class="{'height-110':!showImage,'height-444':showImage}">-->
        <view class="padding-top-64">
          <block v-for="(index, i) in displayIndexs" :key="index" >
            <view :id="index">
              <message-item :survey="survey" :lastBotMsg="i==(displayIndexs.length-1)" :msgIndex="index" :chatType="chatType"
                      @renderComplete="renderComplete" @renderUpdate="renderUpdate" @itemLoad="scollToBottom"/>
            </view>
            <view :id="'bottom'+index"></view>
          </block>
          <block v-if="localMsgSending">
            <user-say-sending/>
          </block>
          <view id="bottom"></view>
        </view>
      </scroll-view>
    </view>
    <view class="footer">
      <select-box  v-if="displayFinish" :messageAction="activeBoxMsg"/>
      <command-area  @msgSendStatus="handleMsgSendStatus"
          :inputPromt="activeInputPromtMsg"
          :displayFinish="displayFinish" @keyBoardUp="keyBoardUp"
          :needFocus="msgListSize && msgListSize>5"/>
    </view>
  </block>
</template>

<script>
import commandArea from '@/components/commandArea'
// import { mapGetters } from 'vuex'
import selectBox from '@/components/selectBox'
import messageItem from '@/components/chatPage/messageItem'
import userSaySending from '@/components/userSay/sending'

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
      keyBoardHeight: '0rpx',
      scrollToView: 'bottom'
    }
  },
  props: {
    msgListSize: {
      type: Number,
      default: 0
    },

    chatType: {
      type: String,
      default: ''
    },

    survey: {
      type: Object,
      default: {}
    }
  },
  watch: {
    msgListSize: function (val) {
      const that = this
      this.msgDisplayBegin()
      if (this.showImage) {
        setTimeout(function () {
          that.scrollToView = `bottom${val - 1}`
        }, 500)
      } else {
        this.scrollToView = `bottom${val - 1}`
      }
    }
  },
  computed: {
    // ...mapGetters({
    //   // displayIndexs: 'getCreatorMsgIndexs',
    //   needTextReply: 'needTextReply',
    //   activeMsg: 'activeMsg'
    // }),

    needTextReply () {
      return this.$store.getters.needTextReply(this.chatType)
    },

    activeMsg () {
      return this.$store.getters.activeMsg(this.chatType)
    },

    displayIndexs () {
      return this.$store.getters.getDisplayIndexs(this.chatType)
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
      console.log('last msg ====> !', lastMsg)
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
    keyBoardUp (height) {
      // console.log('height:' + height)
      this.keyBoardHeight = height
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
      this.scrollToView = 'bottom'
      setTimeout(function () {
        that.scrollToView = ''
        that.scrollToView = 'bottom'
      }, 100)
    }
  },

  components: {
    commandArea,
    selectBox,
    messageItem,
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
