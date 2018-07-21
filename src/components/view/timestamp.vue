<template>
  <view class="time">
      {{displayTime}}
  </view>
</template>

<script>
import util from '@/utils/index'
export default {
  props: {
    time: {
      type: Date
    }
  },
  computed: {
    displayTime () {
      return util.formatTime(this.time)
    }
  }
}
</script>

<style>
.card {
  padding: 10px;
}
</style>