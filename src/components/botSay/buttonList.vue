<template>
  <view class="weui-flex button-list" v-if="show">
    <view class="weui-flex button" v-for="(button, index) in message.items" :key="index">
      <button class="weui-btn mini-btn" type="default" size="mini" @click="click(button)">{{button.caption}}</button>
    </view>
  </view>
</template>

<script>
export default {
  data () {
    return {
      show: true
    }
  },
  props: {
    message: {
      type: Object,
      default: {}
    }
  },
  methods: {
    click (button) {
      if (this.message.reflex) {
        this.$store.commit('appendUserMessage', button.caption)
      }
      this.$store.dispatch('sendGenericRequest', {
        type: 'event',
        data:
        {
          name: button.event,
          ...button.data
        }
      }).then(() => {
        if (this.message.once) {
          this.show = false
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.button-list {
  max-width: 90%;
}
</style>