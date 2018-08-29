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
    <daVideoForList v-if="conclusion.urlType=='video'" :poster="conclusion.mediaInfo?conclusion.mediaInfo.poster:''"/>
    <daAudio v-else-if="conclusion.urlType=='audio'" :url="conclusion.imageUrl" :data="conclusion"/>
    <da-image v-else :url="conclusion.imageUrl"/>
  </view>
</block>
</template>

<script>
  import daImage from '@/components/view/daImage'
  import daVideoForList from '@/components/view/daVideoForList'
  import daAudio from '@/components/view/daAudio'
export default {
    props: ['surveyType', 'conclusion', 'index'],
    components: {
      daImage,
      daVideoForList,
      daAudio
    }
}
</script>

<style>
.card {
  padding: 10px;
}
</style>
