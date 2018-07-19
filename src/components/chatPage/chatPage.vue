<template>
  <block>
    <view class="content">
      <message-list :messagesList="messageList" :showImage="showImage" @renderFinish="msgDisplayFinish" @renderBegin="msgDisplayStart"/>
    </view>
    <view class="footer">
      <select-box  v-if="displayFinish" :showImage="showImage" :messageAction="messageAction"/>
      <command-area />
    </view>
    <bot-redirect v-if="displayFinish" :messageList="messageList" @redirectTo="$emit('redirectTo', $event)"/>
  </block>
</template>

<script>
import commandArea from '@/components/commandArea'
import messageList from '@/components/chatPage/messageList'
import selectBox from '@/components/selectBox'
import botRedirect from '@/components/botSay/botRedirect'

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
    msgDisplayFinish () {
      console.log('begin redirect')
      this.displayFinish = true
    },
    msgDisplayStart () {
      this.displayFinish = false
    }
  },

  components: {
    commandArea,
    messageList,
    selectBox,
    botRedirect
  }
}
</script>

<style scoped>
  .footer{
    position: relative;
  }
</style>
