<template>
  <view class="wrapper word-text right-block flex-1" v-if="content.length > 0">
    <view class="outgoing right-item">
      <copyable-text :text="content"/>
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

.right-block{
  display: flex;
  flex-direction: row-reverse;
}
.right-item{
  max-width: 70%;
}
  .flex-1{
    flex: 1;
  }
</style>
