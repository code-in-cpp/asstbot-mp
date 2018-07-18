<template>
  <block>
    <bot-say-user-auth :content="msg.reply" v-if="msg.type=='getUserinfo'"></bot-say-user-auth>
    <bot-say-new :content="msg.reply" v-else-if="msg.type=='dialog-end'"></bot-say-new>
    <bot-say-image :content="msg.url" v-else-if="msg.type=='image'"></bot-say-image>
    <!--<bot-say-radio-select :content="msg.title" v-else-if="msg.type=='radio'" :options="msg.items"></bot-say-radio-select>-->
    <bot-say-text :content="msg.reply" v-else></bot-say-text>
  </block>
</template>

<script>
import botSayText from '@/components/botSay/botSayText'
import botSayUserAuth from '@/components/botSay/botSayUserAuth'
import botSayNew from '@/components/botSay/botSayNew'
import botAvatar from '@/components/bodAvatar'
import botSayRadioSelect from '@/components/botSay/botSayRadioSelect'
import botSayImage from '@/components/botSay/botSayImage'

export default {
  props: {
    msg: {
      type: Object,
      default: {}
    }
  },
  components: {
    botSayText,
    botSayUserAuth,
    botSayNew,
    botAvatar,
    botSayRadioSelect,
    botSayImage
  }
}
</script>

<style>
.card {
  padding: 10px;
}
</style>