<template>
  <view class="incoming">
    {{content}}
  </view>
</template>

<script>
export default {
  props: ['content']
}
</script>

<style scoped>
.incoming {
  padding: 10px;
  border: solid #dddee1 1px;
  border-radius: 15px 15px 15px 0;
  background-color: #f8f8f9;
  width: auto!important;
  display: inline-block;
  font-size: 12px;
}
</style>
