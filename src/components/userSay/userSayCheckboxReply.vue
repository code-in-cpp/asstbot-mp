<template>
  <block>
    <view class="wrapper word-text right-block">
      <view class="outgoing right-item">
        {{displayText}}
      </view>
    </view>
    <view class="swiper-box" v-if="imgUrls.length">
      <swiper indicator-dots="true" class="swiper">
        <block v-for="item in imgUrls"  :key="item">
          <swiper-item style="border-radius: 20rpx">
            <image @click="previewImage(item)" :src="item" class="image" mode="widthFix"/>
          </swiper-item>
        </block>
      </swiper>
    </view>
  </block>

</template>

<script>
  export default {
    props: {
      content: {
        type: Object,
        default: {}
      }
    },
    computed: {
      displayText () {
        let chooseItems = this.content.items
        if (chooseItems.length === 1) {
          return chooseItems[0].caption
        } else {
          return this.content.items.reduce((lhs, rhs) => {
            if (lhs.caption) {
              return lhs.caption + ',' + rhs.caption
            } else {
              return lhs + ',' + rhs.caption
            }
          })
        }
      },
      imgUrls () {
        let arr = []
        this.content.items.map(item => {
          if (item.imageUrl) {
            arr = [...arr, item.imageUrl]
          }
        })
        return arr
      }
    },
    methods: {
      previewImage (url) {
        this.$store.commit('setPreviewFalse')
        wx.previewImage({
          current: url,
          urls: this.imgUrls
        })
      }
    },
    created () {
      console.log(this.imgsUrls)
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
    width:400rpx;
    border-radius: 20rpx;
  }
  .swiper-box{
    text-align: right;
  }
  .swiper{
    width:400rpx;
    display:inline-block;
    margin-right:10rpx;
  }
</style>
