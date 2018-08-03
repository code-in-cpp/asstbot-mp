<template>
  <divider :message="{timestamp}"></divider>
</template>

<script>
import divider from '@/components/mpSay/divider'
export default {
  data () {
    return {
      timestamp: new Date()
    }
  },
  props: {
    message: {
      type: Object,
      default: {}
    }
  },
  components: {
    divider
  }
}
</script>

<style>
.padding {
  width: 40rpx;
}
</style>