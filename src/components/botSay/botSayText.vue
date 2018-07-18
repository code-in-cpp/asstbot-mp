<template>
  <view class="incoming">
    <emoji-text :text="content"></emoji-text>
  </view>
</template>

<script>
import emojiText from '@/components/emojiText'
export default {
  components: {
    emojiText
  },
  props: ['content']
}
</script>

