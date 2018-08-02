<template>
  <view class="mask" @click="close_panel">
    <view class="panel">
      <view class="title">{{panelTitle}}</view>
      <wux-row>
        <block v-for="(item, index) in buttons" :key="index">
          <wux-col span="3">
            <view  class="weui-btn" @click="item_selected(index)">
              <!--<icon-button class="cell-item" title="item.text" icon="icon-share" @click="item_selected(index)"> </icon-button>-->
              <icon-button :title="item.title" :icon="item.icon" :opentype="item.opentype"> </icon-button>
            </view>
          </wux-col>
        </block>
      </wux-row>
      <view class="cmdbtn" @click="close_panel">关闭</view>
    </view>
  </view>
</template>

<script>
import iconButton from '@/components/viewSurvey/iconButton'
export default {
  props: {
    buttons: {
      type: Object,
      default: [
        {title: '分享', icon: 'icon-moment', opentype: ''},
        {title: '转发', icon: 'icon-send', opentype: ''}
      ]
    },
    panelTitle: {
      type: String,
      default: '请选择操作'
    }
  },

  methods: {
    item_selected (index) {
      // console.log(index)
      this.$emit('iconBtnClicked', index)
      this.$emit('panelClosed')
    },
    close_panel () {
      this.$emit('panelClosed')
    }
  },
  components: {
    iconButton
  },
  onLoad: function () {
  }
}
</script>

<style lang="less" scoped>
  @import "../../static/base.less";
  .panel {
    position:fixed;
    left:0;right:0;bottom:0;
    background-color: @background-color;
    width: 100%;
    z-index: @button-panel-z-index;
    alignment: bottom;
  }
  .title {
    width: 750rpx;
    color: @p-dark-color;
    font-size: @font-size-tiny;
    border-bottom: 2rpx solid @btn-border-color;
    /*border-bottom-color: @;*/
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    align-content: center;
    text-align: center;
    padding-top: 20rpx;
    padding-bottom: 20rpx;
    background-color: @background-color;
    margin-bottom: 20rpx;
  }
  .cmdbtn {
    width: 750rpx;
    color: @p-dark-color;
    font-size: @font-size-middle;
    align-content: center;
    text-align: center;
    border-top: 2rpx solid @btn-border-color;
    margin-top: 20rpx;
    padding-top: 20rpx;
    padding-bottom: 20rpx;
  }
  .mask {
    position:fixed;
    left:0;right:0;bottom:0;
    background-color: transparent;
    width: 100%;
    height: 100%;
    z-index: @button-panel-z-index;
    padding: 0 0;
  }
</style>
