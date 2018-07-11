<template>
  <view class="big-box">
    <view class="option-container" @click="selectItem(option)" v-for="option in list.items" :key="option" :class="{'have': option.imageUrl, 'no-image': !option.imageUrl}">
      <view class="image-box imageBox">
        <image class="image" :src="option.imageUrl"></image>
      </view>
      <view class="value">{{option.caption}}</view>
    </view>
  </view>
</template>

<script>
  export default {
    data () {
      return {
        value: ''
      }
    },
    name: 'radioBox',
    props: ['list'],
    methods: {
      selectItem (obj) {
        console.log(obj)
        this.$store.dispatch('sentRadioReply', {...obj, value: obj.caption})
        // this.$store.commit('updateData', {...obj, type: 'radio'}
        // this.$store.dispatch('sendQuery', obj.value)
      }
    }
  }
</script>

<style scoped>
  .big-box{
    display: flex;
    align-items: center;
    padding: 20rpx 0;
    overflow: auto;
  }
  .image-box{
    overflow: hidden;
    height:300rpx;
  }
  .image{
    width:100%;
    height:100%;
  }
  .have{
    width:300rpx;
    border-radius:20rpx;
    padding:10rpx;
    height:400rpx;
    border:1rpx solid #dadada;
    margin-right:20rpx;
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
    background: #ffffff;
    color: #333333;
    border: 1rpx solid #333333;
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
</style>
