<template>
  <block>
    <view class="wrapper word-text right-block">
      <view class="outgoing right-item">
        {{displayText}}
      </view>
    </view>
    <view class="swiper-box" v-if="imgUrls.length">
      <swiper class="swiper">
        <block v-for="item in imgUrls"  :key="item">
          <swiper-item>
            <image :src="item" class="image" mode="widthFix"/>
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
        // let str = ''
        // this.content.items.map(item => {
        //   str += item.caption + ','
        // })
        // return str.substring(0, str.length - 1)
        return this.content.items.reduce((lhs, rhs) => {
          if (lhs.caption) {
            return lhs.caption + ',' + rhs.caption
          } else {
            return lhs + ',' + rhs.caption
          }
        })
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
  .outgoing {
    padding:20rpx;
    border:solid #81d4f4 1rpx;
    border-radius:30rpx 30rpx 0 30rpx;
    background-color:#b3e5fc;
    font-size:28rpx;
    margin-right:10rpx;
    text-align:left;
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
