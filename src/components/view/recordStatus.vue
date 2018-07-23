<template>
<view class="record-status" v-if="recordStatus && recordStatus!='readyToRecord'">
  <block v-if="recordStatus=='inRecording'">
    <view class="weui-flex" style="width: 300rpx">
      <view class="weui-flex__item">
        <i class="icon iconfont icon-translation_fill" style="color: white; float:right;"></i>
      </view>
      <view class="weui-flex__item">
        <spinner></spinner>
      </view>
    </view>
    <view style="width: 300rpx;text-align: center">
      <text>
        手指上滑，取消发送
      </text>
    </view>
  </block>
  <block v-else>
    <view>
      <i class="icon iconfont icon-undo"></i>
    </view>
    <text class="warn-color light ">
      松开手指，取消发送
    </text>
  </block>
</view>
</template>

<script>
export default {
  props: ['recordStatus']
}
</script>

<style lang="less">
@import "../../../static/base.less";
.record-status {
  position: fixed;
  top: 300rpx;
  left: 225rpx;
  width: 300rpx;
  height: 375rpx;
  background-color: rgba(0 , 0, 0, 0.5);
  text-align: center;
  color: white;
  z-index: 1;
}

.record-status .iconfont {
  font-size: 200rpx;
}

.record-status text {
  font-size: @font-size-small;
}
</style>