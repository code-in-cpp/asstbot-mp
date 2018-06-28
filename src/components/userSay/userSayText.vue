<template>
  <view class="wrapper word-text">
    <view class="outgoing">
      {{content}}
    </view>
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
.word-text{
  padding-bottom: 10px;
}
.outgoing {
  padding: 10px;
  border: solid #2b85e4 1px;
  border-radius: 15px 15px 0 15px;
  background-color: #91c4f7;
  font-size: 12px;
  margin-right: 5px;
}
</style>
