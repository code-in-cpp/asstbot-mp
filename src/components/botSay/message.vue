<template>
  <block>
    <bot-say-image :content="msg.url" v-if="msg.type=='image'" @loadDone="$emit('loadDone', $event)"></bot-say-image>
    <bot-say-button-list :message="msg" v-else-if="msg.type=='button-list'"></bot-say-button-list>
    <!--<bot-say-radio-select :content="msg.title" v-else-if="msg.type=='radio'" :options="msg.items"></bot-say-radio-select>-->
    <bot-say-text :content="msg.reply" v-else></bot-say-text>
  </block>
</template>

<script>
import botSayText from '@/components/botSay/text'
import botAvatar from '@/components/bodAvatar'
import botSayRadioSelect from '@/components/botSay/radioSelect'
import botSayImage from '@/components/botSay/image'
import botSayButtonList from '@/components/botSay/buttonList'

export default {
  props: {
    msg: {
      type: Object,
      default: {}
    }
  },
  components: {
    botSayText,
    botAvatar,
    botSayRadioSelect,
    botSayImage,
    botSayButtonList
  }
}
</script>

<style>
.card {
  padding: 10px;
}
</style>