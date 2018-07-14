<template>
  <view class="wrapper word-text right-block">
    <view class="outgoing right-item">
      {{content}}
    </view>
  </view>
</template>

<script>
  export default {
    props: ['content'],
    created () {
      console.log(this)
    }
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
</style>
