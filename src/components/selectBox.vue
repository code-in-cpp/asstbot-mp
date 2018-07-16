<template>
    <view class="select-box" :class="{'top_110': !haveImage, 'top_444': haveImage}">
      <radio-box v-if="list.type === 'radio'" :list="list"></radio-box>
      <checkbox-box v-if="list.type === 'checkbox'" :list="list"></checkbox-box>
      <avatar-box v-if="list.type === 'imageUploader'" :list="list"></avatar-box>
    </view>
</template>

<script>
  import radioBox from '@/components/floatBox/radioBox'
  import checkboxBox from '@/components/floatBox/checkboxBox'
  import avatarBox from '@/components/floatBox/avatarBox'
  export default {
    name: 'selectBox',
    components: {
      radioBox,
      checkboxBox,
      avatarBox
    },
    props: ['list', 'haveImage']
  }
</script>

<style scoped>
.select-box{
  /*background: #fff;*/
}
.top_110{
  position: absolute;
  top: -110rpx;
}
.top_444{
  position: absolute;
  top: -444rpx;
}
</style>
