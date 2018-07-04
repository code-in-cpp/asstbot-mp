<template>
  <view class="boxFloat" :class="{'top_0':(list.type === 'radio' && flag)}">
    <view class="boxItems">
      <view class="boxItemTitle">
        <view>{{list.title}}</view>
        <view class="sure" @click="selectItem()">确定</view>
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
        flag: false
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
  .selectRadio{
    height:80rpx;
    line-height: 80rpx;
    padding-left: 30rpx;
  }
  .selectlabel{
    display: block;
  }
</style>
