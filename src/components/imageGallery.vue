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

<style scoped>
.imageGallery{
  text-align: center;
}
  .image{
    display: inline-block;
    width:100%;
    background: linear-gradient(red, pink);
  }
</style>
