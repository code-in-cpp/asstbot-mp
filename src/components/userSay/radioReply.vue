<template>
  <view>
    <view class="wrapper word-text right-block">
      <block v-if="content.caption">
        <view class="outgoing right-item" >
          <copyable-text :text="content.caption"/>
        </view>
      </block>
    </view>
    <view class="right-block word-text">
      <image @click="previewImage(content.imageUrl)" v-if="content.imageUrl" class="image" mode="widthFix" :src="content.imageUrl"></image>
    </view>
  </view>
</template>

<script>
  export default {
    props: {
      content: {
        type: Object,
        default: {}
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
    padding-bottom: 20rpx;
  }

  .right-block{
    display: flex;
    flex-direction: row-reverse;
  }
  .right-item{
    max-width: 70%;
  }
  .image{
    width: 400rpx;
    margin-right: 10rpx;
    border-radius: 20rpx;
  }
</style>
