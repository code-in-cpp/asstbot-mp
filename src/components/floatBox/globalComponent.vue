<template>
  <scroll-view scroll-x="true">
    <view class="big-box">
      <view class="option-container secondary-color light form-control" @click="doEvent(item)" v-for="(item, index) in list" :key="index" >
        <view class="value valueBox">{{item.value}}</view>
      </view>
    </view>
  </scroll-view>
</template>

<script>
  export default {
    data () {
      return {
        value: '',
        list: [
          {value: '功能1'},
          {value: '功能2'},
          {value: '功能3'},
          {value: '功能4'}
        ]
      }
    },
    name: 'radioBox',
    methods: {
      doEvent (obj) {
        this.$store.commit('setGlobalFalse')
        // console.log('do something...')
      }
    }
  }
</script>

<style lang="less" scoped>
  .option-container{
    width: auto;
    border-radius: 10rpx;
    padding:5rpx;
    margin-left: 30rpx;
  }
  .value{
    width: 100%;
    white-space: nowrap;
    padding:6rpx 20rpx;
  }
</style>
