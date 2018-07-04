<template>
  <view class="boxFloat" :class="{'top_0':list.type === 'checkbox'}">
    <view class="boxItems">
      <view class="boxItemTitle">
        <view>{{list.title}}</view>
        <view class="sure"  @click="selectItem()">确定</view>
      </view>
      <scroll-view scroll-y=true class="ulBox">
        <!--<ul class="boxItemBox">-->
          <!--<li class="item" v-for="(option, value) in list.items" :key="item">-->
        <checkbox-group @change="selectOption">
          <view class="selectRadio" v-for="option in list.items" :key="item">
            <label class="selectlabel"><checkbox :value="option.value">{{option.caption}}</checkbox></label>
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
    data: {
      captionArray: []
    },
    methods: {
      selectItem () {
        if (this.captionArray.length) {
          const list = this.list
          let queryString = list.prefix ? (list.postfix ? list.prefix + this.captionArray.join(list.split) + list.postfix : list.prefix + this.captionArray.join(list.split)) : (list.postfix ? this.captionArray.join(list.split) + list.postfix : this.captionArray.join(list.split))
          this.$store.dispatch('sendQuery', queryString)
        }
      },
      selectOption (e) {
        this.captionArray = [...e.mp.detail.value]
      },
      deleteItem (array, item) {
        for (let i = 0; i < array.length; i++) {
          if (array[i] === item) {
            array.splice(i, 1)
          }
        }
      },
      isIn (array, item) {
        for (let i = 0; i < array.length; i++) {
          if (array[i] === item) {
            return true
          }
        }
        return false
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
    height: 50vh;
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
