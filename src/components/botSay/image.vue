<template>
    <image @click="previewImage(content)" mode="widthFix" class="image" :src="content" @load="$emit('loadDone', $event)"></image>
</template>

<script>
  export default {
    name: 'botSayImage',
    props: ['content'],
    methods: {
      previewImage (url) {
        this.$store.commit('setPreviewFalse')
        wx.previewImage({
          current: url,
          urls: [url]
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
