<template>
    <view class="imageGallery" @click="previewImage">
      <image class="image" :src="imageUrl"></image>
    </view>
</template>

<script>
  export default {
    name: 'imageGallery',
    props: ['imageUrl'],
    methods: {
      previewImage () {
        wx.previewImage({
          current: this.imageUrl,
          urls: [this.imageUrl]
        })
      }
    }
  }
</script>


<style lang="less">
  @import "../../static/base";
.imageGallery{
  text-align: center;
  font-size: 0;
}
  .image{
    display: inline-block;
    width:100%;
  }
</style>
