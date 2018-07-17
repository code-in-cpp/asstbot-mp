<template>
  <view class="primary-color dark title-bar">
    <device-top-padding></device-top-padding>
    <view class="weui-flex">
      <view style="width: 174rpx;" >
        <view class="return-button" @click="navigateBack" v-if="canReturn">
          <i class="icon iconfont icon-return"></i>
          <view class="desc"><text>返回</text></view>
        </view>
      </view>
      <view class="title">
        {{title}}
      </view>
      <view style="width: 174rpx;">
      </view>      
    </view>
  </view>
</template>

<script>
import deviceTopPadding from '@/components/view/deviceTopPadding'
export default {
  data () {
    return {
      canReturn: false
    }
  },
  props: {
    title: {
      type: String,
      default: '  '
    }
  },
  components: {
    deviceTopPadding
  },
  methods: {
    navigateBack () {
      wx.navigateBack()
    }
  },
  onLoad () {
    this.canReturn = getCurrentPages().length > 1
  }
}
</script>

<style lang="less" scoped>
@import "~@/../static/base.less";
.return-button {
  display: flex;
  flex-direction: row;
}

.return-button:active {
  background-color: @p-color;
}

.title-bar {
  padding-bottom: 20rpx;
}

.title-bar .iconfont {
  font-size: @font-size-big ;
  font-weight: bold;
  display: block;
}

.return-button  .desc{
  line-height: @font-size-big;
  vertical-align: middle;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.title {
  min-height: 76rpx;
  flex: 1;
  text-align: center;
}
</style>