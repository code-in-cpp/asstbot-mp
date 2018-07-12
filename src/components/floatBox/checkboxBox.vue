<template>
  <view class="big-box">
    <label class="option-container" v-for="(option, index) in list.items" :key="option"
           :class="{'haveimage': option.imageUrl, 'no-image': !option.imageUrl, 'checkMe': checkArr[index]}" :for="'option' + index" @click="checked(index)">
      <view class="image-box imageBox">
        <image class="image" :src="option.imageUrl"></image>
      </view>
      <view class="value">{{option.caption}}</view>
    </label>
    <checkbox-group class="select-box" @change="selectOption">
      <view class="selectRadio" v-for="(option, index) in list.items" :key="option">
        <checkbox  :id="'option' + index" class="radioItem" :value="index"></checkbox>
      </view>
    </checkbox-group>
  </view>
</template>

<script>
  export default {
    data () {
      return {
        checkArr: [],
        a: 1
      }
    },
    name: 'radioBox',
    props: ['list'],
    methods: {
      selectOption (e) {
        let arr = []
        e.mp.detail.value.map(item => {
          arr = [...arr, this.list.items[item]]
        })
        this.$store.commit('updateCheckboxData', {items: arr})
      },
      checked (index) {
        this.checkArr[index] = !this.checkArr[index]
        this.a += 1
        // option = {...option, checkFlag: !option.checkFlag}
        // option.checkFlag = !option.checkFlag
        // this.$set(option, 'checkFlag', !option.checkFlag)
        // this.list.items[index] = {...this.list.items[index], checkFlag: !flag}
        // console.log(this.flagArr)
      }
    },
    created () {
      this.list.items.map(item => {
        this.checkArr = [...this.checkArr, false]
      })
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
    width:300rpx;
  }
  .image{
    width:100%;
    height: 100%;
  }
  .haveimage{
    width:300rpx;
    border-radius: 20rpx;
    padding: 10rpx;
    height:400rpx;
    border: 1rpx solid #dadada;
    margin-right: 20rpx;
  }
  .haveimage .imageBox{
    display: block;
    width: 100%;
  }
  .haveimage .value {
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
  .checkMe{
    border: 1rpx solid #188ae2;
  }
</style>
