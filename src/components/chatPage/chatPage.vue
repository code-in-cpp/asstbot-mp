<template>
  <block>
    <view class="content">
      <message-list :messagesList="messageList" :showImage="showImage" @renderFinish="msgDisplayFinish" @renderBegin="msgDisplayBegin"/>
    </view>
    <view class="footer">
      <select-box  v-if="displayFinish" :showImage="showImage" :messageAction="messageAction"/>
      <command-area />
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
  'show-survey': '/pages/display/main'
}

export default {
  data () {
    return {
      displayFinish: false
    }
  },
  props: {
    messageList: {
      type: Object,
      default: []
    }
  },
  computed: {
    messageAction () {
      if (!this.messageList) {
        return {
          title: '',
          type: 'text',
          items: ''
        }
      }
      let list = this.messageList.slice(-1).pop()
      if (list && list.to) {
        return [...list.msgs].slice(-1).pop()
      } else {
        let objType = Object.prototype.toString.call(list).slice(8, -1)
        switch (objType) {
          case 'Array' :
            return {
              title: '',
              type: 'text',
              items: '',
              ...[...list].slice(-1).pop()
            }
          case 'Object':
            return {
              title: '',
              type: 'text',
              items: '',
              ...list
            }
          default:
            return {
              title: '',
              type: 'text',
              items: ''
            }
        }
      }
    },

    showImage () {
      if (!this.messageAction) {
        return false
      }
      let val = this.messageAction
      if (val.type === 'radio' || val.type === 'checkbox') {
        let finditem = val.items.find(item => (!!item.imageUrl) === true)
        return finditem !== undefined
      } else {
        return false
      }
    }
  },
  methods: {
    msgDisplayBegin () {
      this.displayFinish = false
    },
    msgDisplayFinish () {
      this.displayFinish = true
      let lastMsg = this.getlastMsg()
      if (lastMsg) {
        this.doRedirect(lastMsg)
      }
    },
    getlastMsg () {
      if (!this.messageList) {
        return undefined
      }
      let lastmsg = this.messageList.slice(-1)[0]
      if (!lastmsg || !lastmsg.to || !lastmsg.msgs || lastmsg.msgs.length === 0) {
        return undefined
      }

      return lastmsg.msgs.slice(-1)[0]
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
