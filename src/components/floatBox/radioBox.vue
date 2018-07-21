<template>
  <view class="big-box">
    <view class="option-container user-msg-box-color light form-control" @click="selectItem(option)" v-for="option in list.items" :key="option" :class="{'have': !havaImage, 'no-image': havaImage}">
      <block v-if="option.imageUrl">
        <view class="image-box imageBox">
          <image class="image" :src="option.imageUrl">没有上传图片哦</image>
        </view>
        <view class="value">{{option.caption}}</view>
      </block>
      <block v-else>
        <view class="value valueBox">{{option.caption}}</view>
      </block>
    </view>
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
    computed: {
      havaImage: state => {
        let a = state.list.items.find(item => !!item.imageUrl === true)
        return a === undefined
      }
    },
    methods: {
      selectItem (obj) {
        this.$store.dispatch('sentRadioReply', {...obj, value: obj.caption})
      }
    }
  }
</script>

<style lang="less" scoped>
@import "../../../static/base.less";
.image-box{
  overflow: hidden;
  height:300rpx;
  width:300rpx;
  border-top-left-radius: 20rpx;
  border-top-right-radius: 20rpx;
}
.image{
  width:100%;
  height:100%;
  text-align: center;
  line-height: 300rpx;
  font-size: @font-size-tiny;
  color:#999;
}
.have{
  width:300rpx;
  border-radius:20rpx;
  height:400rpx;
  border:1rpx solid #dadada;
  margin-right:20rpx;
}
.hava .imageBox{
  display: block;
  width: 100%;
}
.hava .value {
  width:100%;
  word-wrap: break-word;
}
.no-image{
  width: auto;
  border-radius: 10rpx;
  padding:5rpx;
  margin-left: 30rpx;
}
.no-image>.image-box{
  display: none;
}
.no-image>.value{
  width: 100%;
  white-space: nowrap;
  padding:6rpx 20rpx;
}
.have .valueBox{
  display: flex;
  align-items: center;
  justify-items: center;
  justify-content: center;
  align-content: center;
  width: 300rpx;
  height: 400rpx;
}
</style>
