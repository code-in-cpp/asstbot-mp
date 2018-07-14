<template>
  <view class="boxFloat" :class="{'top_0':(list.type === 'checkbox' && flag)}">
    <view class="boxItems">
      <view class="boxItemTitle">
        <view>{{list.title}}</view>
        <button :disabled="!captionArray.length" class="sure"  @click="selectItem()">确定</button>
      </view>
      <scroll-view scroll-y=true class="ulBox">
        <!--<ul class="boxItemBox">-->
          <!--<li class="item" v-for="(option, value) in list.items" :key="item">-->
        <checkbox-group @change="selectOption">
          <view class="selectRadio" v-for="option in list.items" :key="option">
            <label class="selectlabel"><checkbox class="radioItem" :value="option.value"></checkbox><view class="radioValue">{{option.caption}}</view></label>
          </view>
        </checkbox-group>

          <!--</li>-->
        <!--</ul>-->
      </scroll-view>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'checkboxFloat',
    data () {
      return {
        captionArray: [],
        flag: false
      }
    },
    methods: {
      selectItem () {
        if (this.captionArray.length) {
          let items = this.captionArray.map(item => {
            return {value: item}
          })
          this.$store.dispatch('sentCheckBoxReply', {items})
        }
      },
      selectOption (e) {
        this.captionArray = [...e.mp.detail.value]
      }
    },
    props: [
      'list'
    ],
    created () {
      const that = this
      setTimeout(function () {
        that.flag = true
      }, 50)
    }
  }
</script>

<style lang="less" scoped>
@import "../../../static/base.less";
.boxItems{
  background: #fff;
  height: 700rpx;
  font-size: @font-size-middle;
  overflow: hidden;
  width: 100%;
}
.boxItemTitle{
  border-bottom: 1rpx solid #dadada;
  padding-left: 30rpx;
  line-height: 80rpx;
  /*margin-top: -40px;*/
}
.ulBox{
  height:100%;
}
.boxItemBox{

}
.item{
  padding-left: 15px;
  line-height: 40px;
}
.sure{
  float: right;
  margin-top: -72rpx;
  margin-right: 20rpx;
  background:#fff;
  padding:0;
  line-height:64rpx;
  font-size: @font-size-small;
  width:120rpx;
}
.selectRadio{
  /*height:80rpx;*/
  line-height: 80rpx;
  padding-left: 30rpx;
}
.selectlabel{
  display: block;
  padding-left: 60rpx;
}
.radioItem{
  width:60rpx;
  margin-left: -60rpx;
  vertical-align: top;
}
.radioValue{
  display: inline-block;
}
</style>
