<template>
  <view class="radioContainer" v-if="options.length <= 10">
    <!--<view class="incoming">-->
      <!--{{content}}-->
    <!--</view>-->
    <view v-if="flag">
      <radio-group @change="selectOption">
        <view class="selectRadio" v-for="option in options" :key="item">
          <label class="selectlabel">
            <radio class="radioItem" :value="option.value"></radio><view class="radioValue">{{option.caption}}</view>
          </label>
        </view>
      </radio-group>
    </view>
  </view>

</template>

<script>
  export default {
    name: 'botSayRadioSelect',
    data () {
      return {
        flag: true
      }
    },
    props: [
      'content',
      'options'
    ],
    methods: {
      selectOption (e) {
        this.flag = false
        this.$store.dispatch('sendQuery', e.mp.detail.value)
      }
    }
  }
</script>

<style scoped>
.radioContainer{

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
