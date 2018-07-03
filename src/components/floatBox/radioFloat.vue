<template>
  <view class="boxFloat" :class="{'top_0':list.type === 'radio'}">
    <view class="boxItems">
      <view class="boxItemTitle">
        <view>{{list.title}}</view>
        <view class="sure" @click="selectItem()">确定</view>
      </view>
      <scroll-view scroll-y=true class="ulBox">
        <ul class="boxItemBox">
          <li class="item" v-for="(option, value) in list.items" :key="item">
            <label @click="selectOption(option.value)">
              <input type="radio">
              {{option.caption}}
            </label>
          </li>
        </ul>
      </scroll-view>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'boxFloat',
    methods: {
      selectItem (value) {
        this.$store.dispatch('sendQuery', this.value)
      },
      selectOption (value) {
        this.value = value
      }
    },
    props: [
      'list'
    ]
  }
</script>

<style scoped>
  .boxFloat{
    height:100vh;
    background:rgba(0,0,0,.5);
    position:fixed;
    z-index: 10;
    top:100vh;
    width:100%;
    transition:top .5s;
    /*display: none;*/
  }
  .top_0{
    top: 0;
    /*display: block;*/
  }
  .boxItems{
    background: #fff;
    height: 700rpx;
    margin-top: 50vh;
    padding-top: 40px;
    box-sizing: border-box;
    font-size: 16px;
  }
  .boxItemTitle{
    border-bottom: 1px solid #dadada;
    padding-left: 15px;
    line-height: 40px;
    margin-top: -40px;
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
    margin-top: -80rpx;
    margin-right: 20rpx;
  }
</style>
