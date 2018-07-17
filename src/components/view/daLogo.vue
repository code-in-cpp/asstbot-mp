<template>
  <image src="../../static/image/logo.png" :style="'width:'+195*ratio+'rpx;height:'+84*ratio+'rpx;'"/>
</template>

<script>
export default {
  props: {
    size: {
      type: String,
      default: 'small'
    }
  },
  computed: {
    ratio () {
      if (this.size === 'small') {
        return 1
      } else if (this.size === 'medium') {
        return 1.5
      } else {
        return 2.5
      }
    }
  }
}
</script>

<style>
.card {
  padding: 10px;
}
</style>