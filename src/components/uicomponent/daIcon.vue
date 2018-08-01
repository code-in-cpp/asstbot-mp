<template>
<view :class="'icon iconfont icon-'+type" :style="'font-size:'+size+'rpx; color:'+color"></view>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'add'
    },
    size: {
      type: Number,
      default: 26
    },
    color: {
      type: String,
      default: '#333333'
    }
  }
}
</script>

<style scoped>

</style>