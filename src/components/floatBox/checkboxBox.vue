<template>
  <view class="big-box">
    <label class="option-container user-msg-box-color light form-control" v-for="(option, index) in list.items" :key="option"
           :class="{'haveimage': !havaImage, 'no-image': havaImage, 'checkMe': checkArr[index]}" :for="'option' + index" @click="checked(index)">     
      <view class="weui-flex">
        <view class="weui-flex__item">
          <block v-if="option.imageUrl">
            <view class="image-box imageBox">
              <image class="image" :src="option.imageUrl"></image>
            </view>
            <view class="value">{{option.caption}}</view>
          </block>
          <block v-else>
            <view class="value valueBox">{{option.caption}}</view>
          </block>
        </view>
        <view class="weui-flex__item checked" v-if="checkArr[index]">
          <icon class="weui-icon-radio" type="success_no_circle" size="16" ></icon>
        </view>
      </view>  
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
    computed: {
      havaImage: state => {
        let a = state.list.items.find(item => !!item.imageUrl === true)
        return a === undefined
      }
    },
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
    border-top-left-radius: 20rpx;
    border-top-right-radius: 20rpx;
  }
  .image{
    width:100%;
    height: 100%;
  }
  .haveimage{
    width:300rpx;
    border-radius: 20rpx;
    height:400rpx;
    border: 1rpx solid #dadada;
    margin-right: 20rpx;
    position: relative;
  }
  .haveimage .imageBox{
    display: block;
  }
  .haveimage .value {
    width:100%;
    word-wrap: break-word;
  }
  .no-image{
    width: auto;
    border-radius: 10rpx;
    padding:5rpx;
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
    /* border: 1rpx solid #188ae2; */
  }
  .haveimage .valueBox{
    display: flex;
    align-items: center;
    justify-items: center;
    justify-content: center;
    align-content: center;
    width: 300rpx;
    height: 400rpx;
  }

  .haveimage .checked {
    position: absolute;
    top: 10rpx;
    right: 10rpx;
  }
</style>
