<template>
  <block>
    <bot-say-image :content="msg.url" v-if="msg.type=='image'" @loadDone="$emit('loadDone', $event)"></bot-say-image>
    <bot-say-button-list :message="msg" v-else-if="msg.type=='button-list'"></bot-say-button-list>
    <!--<bot-say-radio-select :content="msg.title" v-else-if="msg.type=='radio'" :options="msg.items"></bot-say-radio-select>-->
    <!-- <bot-say-text :content="msg.reply" v-else></bot-say-text> -->
    <block v-else-if="msg.type=='text'">
      <view class="incoming" v-if="msg.reply.length > 0">
        <emoji-text :text="msg.reply" @longpress="copyText(msg.reply)"></emoji-text>
      </view>
    </block>
  </block>
</template>

<script>
import botSayImage from '@/components/botSay/image'
import botSayButtonList from '@/components/botSay/buttonList'
import emojiText from '@/components/emojiText'

export default {
  props: {
    msg: {
      type: Object,
      default: {}
    }
  },
  components: {
    botSayImage,
    botSayButtonList,
    emojiText
  },
  methods: {
    copyText (text) {
      wx.setClipboardData({
        data: text,
        success: () => {
          wx.showToast({
            title: '内容已复制'
          })
        }
      })
    }
  }
}
</script>

<style>
.card {
  padding: 10px;
}
</style>