<template>
  <block>
    <bot-say-image :content="msg.url" v-if="msg.type=='image'" @loadDone="$emit('loadDone', $event)"></bot-say-image>
    <bot-say-button-list :message="msg" v-else-if="msg.type=='button-list'" @buttonListEvent="action"></bot-say-button-list>
    <!--<bot-say-radio-select :content="msg.title" v-else-if="msg.type=='radio'" :options="msg.items"></bot-say-radio-select>-->
    <bot-say-text :content="msg.reply" v-else></bot-say-text>
  </block>
</template>

<script>
import botSayImage from '@/components/botSay/image'

export default {
  props: {
    msg: {
      type: Object,
      default: {}
    }
  },
  components: {
    botSayImage
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
    }
  }
}
</script>

<style>
.card {
  padding: 10px;
}
</style>