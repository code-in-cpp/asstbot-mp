<template>
<block>
  <view class="weui-cells__title">结论 {{index+1}}</view>
  <view class="weui-cells weui-cells_after-title">
    <view class="weui-cell" v-if="surveyType==='exam'">
        <view class="weui-cell__hd">
            <view class="weui-label">答对题目</view>
        </view>
        <view class="weui-cell__ft">
            {{conclusion.scoreRange.min}} ~ {{conclusion.scoreRange.max}}
        </view>
    </view>
    <da-text :content="conclusion.text"></da-text>
    <da-image :url="conclusion.imageUrl"/>
  </view>
</block>
</template>

<script>
export default {
  props: ['surveyType', 'conclusion', 'index']
}
</script>

<style>
.card {
  padding: 10px;
}
</style>