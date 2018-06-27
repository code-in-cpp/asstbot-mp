<template>
  <view class="wrapper" >
  </view>
</template>

<script>
export default {
  props: ['content']
}
</script>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: row-reverse;
}

.outgoing {
  padding: 10px;
  border: solid #2b85e4 1px;
  border-radius: 10px 10px 0 10px;
  background-color: #70b3f7
}
</style>
