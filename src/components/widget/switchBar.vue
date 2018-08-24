<template>
  <view class="switchContainer">
    <text class="switchText">图片</text>
    <view class="switchArea" @click="turnOn">
      <view class="switchBtn" :class="switchOn? 'marginLEft40': 'marginLEft0'"></view>
    </view>
    <text class="switchText">视频</text>
  </view>

</template>

<script>
    export default {
      name: 'switchBar',
      data () {
        return {
          switchOn: false
        }
      },
      methods: {
        turnOn () {
          this.switchOn = !this.switchOn
          this.$emit('switchState', this.switchOn)
        }
      }
    }
</script>

<style scoped>
  .switchContainer{
    position: absolute;
    z-index: 2;
    display: flex;
    align-items: center;
    top: 20rpx;
  }
  .switchText{
    font-size: 24rpx;
  }
.switchArea{
  border: 1px solid #dadada;
  height: 40rpx;
  width: 80rpx;
  border-radius: 20rpx;
  display: inline-block;
}
  .switchBtn{
    width: 40rpx;
    height: 40rpx;
    border-radius: 50%;
    background: #1AAD19;
    transition: margin-left 500;
  }
  .marginLEft0{
    margin-left: 0;
  }
  .marginLEft40{
    margin-left: 40rpx;
  }
</style>
