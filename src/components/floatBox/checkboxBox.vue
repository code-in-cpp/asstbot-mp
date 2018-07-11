<template>
  <view class="big-box">
    <view class="option-container" :id="option`${$index}`" v-for="option in list.items" :key="option" :class="{'have-image': option.imageUrl, 'no-image': !option.imageUrl}">
      <view class="image-box">
        <image class="image" :src="option.imageUrl"></image>
      </view>
      <view class="value">{{option.caption}}</view>
    </view>
    <checkbox-group class="select-box" @change="selectOption">
      <view class="selectRadio" v-for="option in list.items" :key="option">
        <label :for="option`${$index}`" class="selectlabel"><checkbox class="radioItem" :value="option"></checkbox></label>
      </view>
    </checkbox-group>
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
      selectOption (e) {
        console.log(e)
        // this.value = obj.value
        // this.$store.commit('updateData', {...obj, type: 'checkbox'})
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
  }
  .image-box{
    overflow: hidden;
    height:100rpx;
  }
  .image{
    width:100%;
  }
  .hava-image{
    width:40%;
    border-radius: 6rpx;
    padding: 10rpx;
  }
  .hava-image .image-box{
    display: block;
    width: 100%;
  }
  .hava-image .value {
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
  .no-image .image-box{
    display: none;
  }
  .no-image .value{
    width: 100%;
    white-space: nowrap;
    padding:6rpx 20rpx;
  }
  .select-box{
    display: none;
  }
</style>
