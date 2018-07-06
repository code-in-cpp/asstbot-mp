<template>
  <view class="weui-navbar">
    <block v-for="(navItem, index) in navItems" :key="index">
      <view class="weui-navbar__item" :id="index" :class="activeIndex == index ? 'weui-bar__item_on' : ''" @click="tabClick">
          <view class="weui-navbar__title">{{navItem}}</view>
      </view>
    </block>
    <view class="weui-navbar__slider" :style="sliderStyle">
    </view>
  </view>
</template>

<script>
var sliderWidth = 96

export default {
  data () {
    return {
      activeIndex: 0,
      sliderOffset: 0,
      sliderLeft: 0
    }
  },
  props: {
    navItems: {
      type: Object,
      default: ['选项一', '选项二', '选项三']
    }
  },
  computed: {
    sliderStyle () {
      return `left: ${this.sliderLeft}px; transform: translateX(${this.sliderOffset}px); -webkit-transform: translateX(${this.sliderOffset}px);`
    }
  },

  methods: {
    tabClick (event) {
      var index = event.mp.currentTarget.id
      var offsetLeft = event.mp.currentTarget.offsetLeft

      this.activeIndex = index
      this.sliderOffset = offsetLeft
      this.$emit('tabActive', index)
    }
  },

  onLoad: function () {
    var that = this
    console.log('onload')
    wx.getSystemInfo({
      success: function (res) {
        that.sliderLeft = (res.windowWidth / that.navItems.length - sliderWidth) / 2
        that.sliderOffset = res.windowWidth / that.navItems.length * that.activeIndex
      }
    })
  }
}
</script>

<style>
.card {
  padding: 10px;
}
</style>
