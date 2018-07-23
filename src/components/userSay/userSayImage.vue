<template>
  <view class="wrapper word-text">
    <image @click="previewImage(url)" v-if="url" :src="url" class="outgoing image"/>
    <view  v-if="!url" class="outgoing right-item" style="height: auto;width: auto;margin-right: -10rpx">
      您已取消上传
    </view>
  </view>
</template>

<script>
  export default {
    props: {
      url: {
        type: String,
        default: ''
      }
    },
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
  .wrapper {
    display: flex;
    flex-direction: row-reverse;
  }
.word-text{
  padding-bottom: 10px;
  padding-right: 10px;
}
  .outgoing {
    height: 100px;
    width: 100px;
    border: solid 1px beige;
  }
  .image{
    border-radius: 20rpx;
  }
</style>
