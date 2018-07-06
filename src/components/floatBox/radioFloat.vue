<template>
  <view class="boxFloat" :class="{'top_0':(list.type === 'radio' && flag)}">
    <view class="boxItems">
      <view class="boxItemTitle">
        <view>{{list.title}}</view>
        <button :disabled="!value" class="sure" @click="selectItem()">确定</button>
      </view>
      <scroll-view scroll-y=true class="ulBox">
        <!--<ul class="boxItemBox">-->
          <!--<li class="item" v-for="(option, value) in list.items" :key="item">-->
            <radio-group @change="selectOption">
              <view class="selectRadio" v-for="option in list.items" :key="item">
                <label class="selectlabel">
                  <radio :value="option.value">{{option.caption}}</radio>
                </label>
              </view>
            </radio-group>
          <!--</li>-->
        <!--</ul>-->
      </scroll-view>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'boxFloat',
    data () {
      return {
        flag: false,
        value: ''
      }
    },
    methods: {
      selectItem (value) {
        this.$store.dispatch('sendQuery', this.value)
      },
      selectOption (e) {
        this.value = e.mp.detail.value
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

<style scoped>
  .boxFloat{
    height:100vh;
    position:fixed;
    z-index: 10;
    top:100vh;
    width:100%;
    transition:top .5s;
    background: transparent;
    /*display: none;*/
  }
  .top_0{
    top: 0;
    /*display: block;*/
  }
  .boxItems{
    position: absolute;
    bottom:0;
    background: #fff;
    height: 700rpx;
    font-size: 32rpx;
    overflow: hidden;
    width:100%;
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
    font-size:28rpx;
    width:120rpx;
  }
  .selectRadio{
    height:80rpx;
    line-height: 80rpx;
    padding-left: 30rpx;
  }
  .selectlabel{
    display: block;
  }
</style>
