<template>
  <scroll-view scroll-x="true">
    <view class="big-box">
      <view class="option-container light form-control" @touchstart="touchStart(option)" @touchmove="touchMove" @touchend="touchEnd" @touch="touchOn" @click="selectItem(option)" v-for="option in list.items" :key="option" :class="{'have background-fff': !havaImage, 'no-image user-msg-box-color': havaImage}">
        <block v-if="option.imageUrl">
          <view class="image-box imageBox" :class="!option.caption.length?'image-box-1':''">
            <image class="image" mode="aspectFill" :src="option.imageUrl"></image>
          </view>
          <view class="value image-value" v-if="option.caption">{{option.caption}}</view>
        </block>
        <block v-else>
          <view class="value valueBox">{{option.caption}}</view>
        </block>
      </view>
    </view>
  </scroll-view>

</template>

<script>
  export default {
    data () {
      return {
        value: '',
        touchStartTime: '',
        touchEndTime: '',
        touchMoveTime: '',
        timeout: ''
      }
    },
    name: 'radioBox',
    props: ['list'],
    computed: {
      havaImage: state => {
        let a = state.list.items.find(item => !!item.imageUrl === true)
        return a === undefined
      }
    },
    methods: {
      selectItem (obj) {
        if (this.touchEndTime - this.touchStartTime < 500) {
          this.$store.dispatch('sentRadioReply', {...obj, value: obj.caption})
        }
      },
      touchStart (option) {
        const that = this
        this.touchStartTime = Date.parse(new Date())
        this.timeout = setTimeout(function () {
          if (option.imageUrl) {
            that.$store.commit('setPreviewFalse')
            wx.previewImage({
              current: option.imageUrl,
              urls: [option.imageUrl]
            })
          }
        }, 500)
      },
      touchMove () {
        this.touchMoveTime = Date.parse(new Date())
        if (this.touchMoveTime - this.touchStartTime < 500) {
          clearTimeout(this.timeout)
          this.timeout = ''
        }
      },
      touchEnd () {
        this.touchEndTime = Date.parse(new Date())
        if (this.touchEndTime - this.touchStartTime < 500) {
          clearTimeout(this.timeout)
          this.timeout = ''
        }
      }
    }
  }
</script>

<style lang="less" scoped>
@import "../../../static/base.less";
.image-box{
  overflow: hidden;
  height:300rpx;
  width:300rpx;
  border-top-left-radius: 20rpx;
  border-top-right-radius: 20rpx;
}
.image-box-1{
  border-radius: 20rpx;
  height: 400rpx;
}
.image{
  width:100%;
  height:100%;
  text-align: center;
  line-height: 300rpx;
  font-size: @font-size-tiny;
  color:#999;
}
.have{
  width:300rpx;
  border-radius:20rpx;
  height:400rpx;
  border:1rpx solid #dadada;
  margin-left:20rpx;
}
.hava .imageBox{
  display: block;
  width: 100%;
}
.hava .value {
  width:100%;
  word-wrap: break-word;
}
.no-image{
  width: auto;
  border-radius: 10rpx;
  padding:5rpx;
  margin-left: 30rpx;
}
.no-image>.image-box{
  display: none;
}
.no-image>.value{
  width: 100%;
  white-space: nowrap;
  padding:6rpx 20rpx;
}
.have .valueBox{
  display: flex;
  align-items: center;
  justify-items: center;
  justify-content: center;
  align-content: center;
  width: 300rpx;
  height: 400rpx;
}
  .background-fff{
    background: #fff;
  }
.image-value{
  text-align:center;
  font-size:28rpx;
  line-height: 50rpx;
  height: 100rpx;
  overflow:hidden;
  text-overflow:ellipsis;
  display:-webkit-box;
  -webkit-box-orient:vertical;
  -webkit-line-clamp:2;
}
</style>
