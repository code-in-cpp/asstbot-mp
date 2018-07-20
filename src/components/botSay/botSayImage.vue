<template>
    <image mode="widthFix" class="image" :src="content" @load="$emit('loadDone', $event)"></image>
</template>

<script>
  export default {
    name: 'botSayImage',
    props: ['content']
  }
</script>

<style scoped>
.image{
  width:400rpx;
  margin-left: 20rpx;
}
</style>
