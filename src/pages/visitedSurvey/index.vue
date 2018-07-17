<template>
  <view class="page">
    <title-bar title="我聊过的..."></title-bar>
    <view class="weui-cells weui-cells_after-title">
      <visited-survey />             
    </view>          
  </view>
</template>

<script>
import visitedSurvey from '@/components/visitedSurvey'

export default {
  components: {
    visitedSurvey
  }
}
</script>

<style>
</style>
