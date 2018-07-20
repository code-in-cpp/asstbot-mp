/*
 * @description: 小程序左划删除组件
 * @Author: bigmeow (https://github.com/bigmeow/minapp-slider-left)
 */

'use strict'
Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.default = Component({

  properties: {
    // 阈值，往左移动超过则显示菜单项，否则隐藏（一般为菜单宽的40%）
    moveThreshold: {
      type: Number,
      value: 30
    },
    // // 可以往左拖动的最大距离,同时它也是组件的初始x坐标，此时菜单不可见
    openWidth: {
      type: Number,
      value: 300
    },
    iconTitles: {
      type: Array,
      value: [{title: '分享', color: 'grey'}, {title:'删除', color: 'red'}]
    },
    isActive: {
      type: Boolean,
      value: false,
      observer: function (isActive) {
        if (!isActive) {
          this.setData({open : false})
          this.setData({x:  this.data.openWidth})
        }
      }
    },
    //菜单是否打开了，true表示打开，false表示关闭
    open: {
      type: Boolean,
      value: false,
      observer: function (open) {
        this.setData({
          x: open ? 0 : this.data.openWidth
        })

        this.triggerEvent('change', {
          open
        })
      }
    }

  },

  /**
   * 组件的初始数据
   */
  data: {
    x: 150, // 单位rpx
    itemCount: 3,
    itemWidth: 150,
    currentX: 150, // 当前记录组件被拖动时的x坐标
    moveInstance: 0,  // 记录往左移动的距离
    moved: false      //记录是否发生过滑动
  },
  attached: function () {
    this.setData({
      itemCount: this.data.iconTitles.length
    })
    this.setData({
      itemWidth: this.data.openWidth / this.data.itemCount
    })
    this.setData({
      x: this.data.open ? 0 : this.data.openWidth
    })
  },
  methods: {
    handleChange: function (e) {
      const x = e.detail.x
      this.data.moveInstance = this.data.openWidth - x
      this.data.currentX = x
    },
    // 开始左滑时触发（轻触摸的时候也会触发），主要用于显示当前删除按钮前先 隐藏掉其它项的删除按钮
    handleTouchestart: function () {
      if (!this.data.open) {
        this.triggerEvent('sliderLeftStart')
      }
    },
    handleTouchmove: function() {
      this.setData({ moved: true })
    },
    handleTouchend: function () {
      // 如果松开手指的时候，已经被拖拽到最左边或者最右边，则不处理
      if (!this.data.moved) {
        this.setData({ open: false })
        return
      }
      this.setData({ moved: false })
      if (this.data.currentX === 0) {
        this.setData({ open: true })
        return
      }
      if (this.data.currentX === this.data.openWidth) {
        this.setData({ open: false })
        return
      }
      // 如果当前菜单是打开的，只要往右移动的距离大于0就马上关闭菜单
      if (this.data.open && this.data.currentX > 0) {
        this.setData({ open: false })
        return
      }
      // 如果当前菜单是关着的，只要往左移动超过阀值就马上打开菜单
      if (this.data.moveInstance < this.data.moveThreshold) {
        this.setData({
          open: false,
          x: this.data.openWidth
        })
      } else {
        this.setData({ open: true })
      }
    },
    // 点击删除按钮触发的事件
    handleClicked: function (e) {
      this.setData({ open: false })
      this.triggerEvent('btnClicked', {index:e.target.dataset.index})
    },
  }
})
