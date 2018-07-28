<template>
  <scroll-view scroll-x="true">
    <view class="big-box">
      <label class="option-container light form-control" v-for="(option, index) in list.items" :key="option"
             :class="{'haveimage background-fff': !havaImage, 'no-image user-msg-box-color': havaImage, 'checkMe': checkArr[index]}" :for="'option' + index" @click="checked(index)" @touchstart="touchStart(option)" @touchmove="touchMove()" @touchend="touchEnd(option)">
        <view class="weui-flex">
          <view class="weui-flex__item">
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
          <view class="weui-flex__item checked" v-if="checkArr[index]">
            <icon class="weui-icon-radio" type="success_no_circle" size="16" ></icon>
          </view>
        </view>
      </label>
      <!--<checkbox-group class="select-box" @change="selectOption">-->
        <!--<view class="selectRadio" v-for="(option, index) in list.items" :key="option">-->
          <!--<checkbox  :id="'option' + index" class="radioItem" :value="index"></checkbox>-->
        <!--</view>-->
      <!--</checkbox-group>-->
    </view>
  </scroll-view>
</template>

<script>
  export default {
    data () {
      return {
        checkArr: [],
        a: 1,
        touchStartTime: '',
        touchMoveTime: '',
        touchEndTime: '',
        timeout: '',
        checkArrIndex: []
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
        if (this.touchEndTime - this.touchStartTime < 800) {
          let arr = []
          this.checkArrIndex.map(item => {
            arr = [...arr, this.list.items[item]]
          })
          this.$store.commit('updateCheckboxData', {items: arr, event: this.list.event})
        }
      },
      saveInArray (item, arr) {
        if (arr.includes(item)) {
          for (let i = 0; i < arr.length; i++) {
            if (arr[i] === item) {
              arr.splice(i, 1)
            }
          }
        } else {
          arr.push(item)
        }
      },
      checked (index) {
        if (this.touchEndTime - this.touchStartTime < 800) {
          let a = !this.checkArr[index]
          this.checkArr.splice(index, 1, a)
          this.saveInArray(index, this.checkArrIndex)
          let arr = []
          this.checkArrIndex.map(item => {
            arr = [...arr, this.list.items[item]]
          })
          this.$store.commit('updateCheckboxData', {items: arr, event: this.list.event})
        }
      },
      touchStart (option) {
        if (this.timeout) {
          clearTimeout(this.timeout)
        }
        const that = this
        this.touchStartTime = new Date().getTime()
        this.timeout = setTimeout(function () {
          if (option.imageUrl) {
            that.$store.commit('setPreviewFalse')
            wx.previewImage({
              current: option.imageUrl,
              urls: [option.imageUrl]
            })
          }
        }, 800)
        console.log('time:start#' + this.timeout)
      },
      touchMove () {
        this.touchMoveTime = new Date().getTime()
        if (this.touchMoveTime - this.touchStartTime < 800) {
          clearTimeout(this.timeout)
          this.timeout = ''
        }
      },
      touchEnd () {
        this.touchEndTime = new Date().getTime()
        if (this.touchEndTime - this.touchStartTime < 800) {
          clearTimeout(this.timeout)
          this.timeout = ''
        }
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
    height: 100%;
  }
  .haveimage{
    width:300rpx;
    border-radius: 20rpx;
    height:400rpx;
    border: 1rpx solid #dadada;
    margin-left: 20rpx;
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
     border: 1rpx solid #1cb2b9;
  }
  .checkMe:after{
    content:'';
    /*position: absolute;*/
    /*width:310rpx;*/
    /*height: 410rpx;*/
    /*top:-5rpx;*/
    /*left:-5rpx;*/
    /*border:1rpx solid #1cb2b9;*/
    /*border-radius: 20rpx;*/
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

  .value{
    font-size: 28rpx;
  }

  .haveimage .checked {
    position: absolute;
    top: 10rpx;
    right: 10rpx;
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
