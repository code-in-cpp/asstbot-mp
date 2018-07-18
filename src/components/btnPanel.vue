<template>
  <wux-row class="placeholder">
    <block v-for="(item, index) in titles" :key="index">
      <wux-col span="3">
        <view @click="item_selected(index)">
          <!--<icon-button class="cell-item" title="item.text" icon="icon-share" @click="item_selected(index)"> </icon-button>-->
          <icon-button :title="item.text" icon="icon-share"> </icon-button>
        </view>
      </wux-col>
    </block>
  </wux-row>
</template>

<script>
import iconButton from '@/components/viewSurvey/iconButton'
export default {
  props: {
    surveyInfo: {
      type: Object,
      default: {}
    },
    isActive: {
      default: false,
      type: Boolean
    }
  },
  data () {
    return {
      titles: [ { text: '1' }, { text: '2' }, { text: '3' }, { text: '4' }, { text: '5' }, { text: '6' }, { text: '7' } ]
    }
  },
  components: {
    iconButton
  },
  onLoad: function () {
  }
</script>

<style lang="less" scoped>
  @import "../../../static/base.less";
  .placeholder {

  }
  .cell-item {
    font-weight: normal;
    font-size: @font-size-middle;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: black;
    background-color: white;
    border: 2rpx solid;
    border-color: @btn-border-color;
    height: 120rpx;
    line-height: 120rpx;
    text-align: center;
    padding-left: 34rpx;
    padding-right: 34rpx;
  }
</style>
