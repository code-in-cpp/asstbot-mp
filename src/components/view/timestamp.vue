<template>
  <view class="time">
      {{time}}
  </view>
</template>

<script>
export default {
  props: {
    time: {
      type: String
    }
  }
}
</script>

<style>
.card {
  padding: 10px;
}
</style>