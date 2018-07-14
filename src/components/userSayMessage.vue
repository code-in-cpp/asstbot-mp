<template>
  <block>
    <user-say-text :content="messages.data.query" v-if="messages.type=='text'"></user-say-text>
    <user-say-image :url="messages.data.url" v-else-if="messages.type=='image'"></user-say-image>
    <user-say-allow :content="messages.data.query" v-else-if="messages.type=='allow'"></user-say-allow>
    <user-say-speech :content="messages.data" v-else-if="messages.type=='speech'"></user-say-speech>
    <user-say-checkbox-reply :content="messages.data" v-else-if="messages.type==='checkbox-reply'"></user-say-checkbox-reply>
    <user-say-radio-reply :content="messages.data" v-else-if="messages.type=='radio-reply'"></user-say-radio-reply>
  </block>
</template>

<script>
import userSayText from '@/components/userSay/userSayText'
import userSayImage from '@/components/userSay/userSayImage'
import userSayAllow from '@/components/userSay/userSayAllow'
import userSaySpeech from '@/components/userSay/userSaySpeech'
import userSayCheckboxReply from '@/components/userSay/userSayCheckboxReply'
import userSayRadioReply from '@/components/userSay/userSayRadioReply'

export default {
  props: {
    messages: {
      type: Object,
      default: {}
    }
  },
  components: {
    userSayText,
    userSayImage,
    userSayAllow,
    userSaySpeech,
    userSayCheckboxReply,
    userSayRadioReply
  }
}
</script>

<style>
.card {
  padding: 10px;
}
</style>