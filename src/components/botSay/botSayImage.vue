<template>
    <image mode="widthFix" class="image" :src="content" @load="$emit('loadDone', $event)"></image>
</template>

<script>
  export default {
    name: 'botSayImage',
    props: ['content'],
    methods: {
      previewImage (url) {
        wx.previewImage({
          current: url
        })
      }
    }
  }
</script>

<style scoped>
.image{
  width:400rpx;
  margin-left: 20rpx;
  border-radius: 20rpx;
}
</style>
