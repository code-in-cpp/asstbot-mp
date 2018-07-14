<template>
  <view>
    <view class="wrapper word-text right-block">
      <block v-if="content.caption">
        <view class="outgoing right-item" >
          {{content.caption}}
        </view>
      </block>
    </view>
    <view class="right-block">
      <image v-if="content.imageUrl" class="image" mode="widthFix" :src="content.imageUrl"></image>
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
    created () {
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
  }
</style>
