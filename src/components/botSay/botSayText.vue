<template>
  <view class="incoming" v-if="content.length > 0">
    <emoji-text :text="content" @longpress="copyText"></emoji-text>
  </view>
</template>

<script>
import emojiText from '@/components/emojiText'
export default {
  components: {
    emojiText
  },
  props: ['content'],
  methods: {
    copyText () {
      wx.setClipboardData({
        data: this.text,
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

