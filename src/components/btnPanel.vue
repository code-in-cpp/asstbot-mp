<template>
  <view class="panel">
    <wux-row>
      <block v-for="(item, index) in buttons" :key="index">
        <wux-col span="3">
          <view  @click="item_selected(index)">
            <!--<icon-button class="cell-item" title="item.text" icon="icon-share" @click="item_selected(index)"> </icon-button>-->
            <icon-button :title="item.title" :icon="item.icon"> </icon-button>
          </view>
        </wux-col>
      </block>
    </wux-row>
  </view>
</template>

<script>
import iconButton from '@/components/viewSurvey/iconButton'
export default {
  props: {
    buttons: {
      type: Object,
      default: [
        {title: '分享', icon: 'icon-moment'},
        {title: '转发', icon: 'icon-send'},
        {title: '自测', icon: 'icon-playon_fill'},
        {title: '删除', icon: 'icon-trash'},
        {title: '统计', icon: 'icon-zhtn'}
      ]
    }
  },
  methods: {
    item_selected (i) {
      console.log(i)
      this.$emit('btnClicked', {index: i})
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
    width: 750rpx;
    background-color: @background-color;
  }
</style>
