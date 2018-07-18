<template>
    <view class="imageGallery" @click="previewImage">
      <image mode="widthFix" class="image" :src="imageUrl"></image>
      <i class="icon iconfont icon-close font-del" @click.stop="delImage"></i>
    </view>
</template>

<script>
  export default {
    name: 'imageGallery',
    props: ['imageUrl', 'index', 'type'],
    methods: {
      previewImage () {
        wx.previewImage({
          current: this.imageUrl,
          urls: [this.imageUrl]
        })
      },
      delImage () {
        if (this.type === 'question') {
          this.$store.commit('deleteSubjectQuestionImage', {index: this.index})
        } else if (this.type === 'pollConclusion') {
          this.$store.commit('deleteConclusionImage', {index: this.index})
        }
      }
    }
  }
</script>


<style lang="less">
  @import "../../static/base";
.imageGallery{
  text-align: center;
  font-size: 0;
  position: relative;
}
  .image{
    display: inline-block;
    width:100%;
  }
  .font-del{
    position:absolute;
    top:0;
    right:0;
    width:48rpx;
    height:48rpx;
    background:#fff;
    line-height:48rpx;
    text-align:center;
  }
</style>
