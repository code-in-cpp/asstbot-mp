<template>
<view class="counter">
    <view class="counter__number">
        <view class="counter__modify counter__opt" 
            :class="number <= min || disabled ? ' counter__no' : ''" @tap="minusHandler">
            <da-icon type="minus" :color="number <= min || disabled ? '#d2d2d2' : color"></da-icon>
        </view>
        <text class="counter__modify counter__text" :class="disabled ? ' counter__no' : ''">{{number}}</text>
        <view class="counter__modify counter__opt"
            :class="number >= max || disabled ? ' counter__no' : ''" @tap="addHandler">
            <da-icon type="add" :color="number >= max || disabled ? '#d2d2d2' : color"></da-icon>
        </view>
    </view>
</view>
</template>

<script>
import daIcon from './daIcon'
export default {
  props: {
    color: {
      type: String,
      default: '#ff5777'
    },
    number: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 1
    },
    min: {
      type: Number,
      default: 0
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  components: {
    daIcon
  },
  methods: {
    addHandler (e) {
      if (this.max <= this.number || this.disabled) return
      this.number = this.number + 1
      this.$emit('changenumber', {
        e,
        number: this.number,
        min: this.min,
        max: this.max,
        type: 'add'
      })
    },
    minusHandler (e) {
      if (this.min >= this.number || this.disabled) return
      this.number = this.number - 1
      this.$emit('changenumber', {
        e,
        number: this.number,
        min: this.min,
        max: this.max,
        type: 'minus'
      })
    }
  }
}
</script>

<style>
.counter {
    display:flex;
    margin-top:10rpx
}
.counter__number {
    box-sizing:border-box;
    height: 50rpx;
    border: 1rpx solid #dad7d7;
    -webkit-border-radius: 4rpx;
    border-radius: 4rpx
}
.counter__modify {
    display: inline-block;
    height: 48rpx;
    line-height: 48rpx;
    text-align: center;
    vertical-align: top;
    color: #ff5777;
    font-size:0;
    padding:0;
    background:none
}
.counter__opt {
    width: 56rpx
}
.counter__text {
    min-width: 58rpx;
    border-left: 1rpx solid #dad7d7;
    border-right: 1rpx solid #dad7d7;
    color: #424242;
    font-size: 28rpx;
    box-sizing:border-box;
    padding: 0 6rpx
}
.counter__no {
    color: #d2d2d2
}
</style>