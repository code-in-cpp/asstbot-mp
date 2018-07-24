<template>
<block>
<view class="weui-cells weui-cells_after-title" v-for="(conclusion, i) in conclusions" :key="i">
    <view class="subject-divider"></view>
    <view class="weui-cells__title">
    <view class="weui-cell" >
        <view class="weui-cell__bd">
        <view class="weui-label">结论 {{i+1}}</view>
        </view>
        <view class="icon-item-style font-style" @click="addConclusionMedia(0)">
            <i class="icon iconfont icon-picture font-color"></i>
        </view>
        <view class="weui-cell__ft">
        <view @click="removeConclusion(i)">
            <i class="icon iconfont icon-trash"></i>
        </view>
        </view>
    </view>
    </view>
    <view class="weui-cells weui-cells_after-title">
    <view class="poll-conclusion-bd">        
    <textarea class="weui-textarea" placeholder="请输入文本" :value="conclusion.text"
        @input="updateConclusionText({index: i, text: $event.mp.detail.value})"/>
    </view>
    <image-gallery v-if="conclusion.imageUrl" :imageUrl="conclusion.imageUrl" :index="i" :type="'pollConclusion'"></image-gallery>
    </view>
</view>
<view class="subject-divider"></view>
<view class="weui-cells weui-cells_after-title" >
    <view class="weui-cell" @click="addQuizConclusion">
        <view class="weui-cell__hd"><i class="icon iconfont icon-add"></i></view>
        <view class="weui-cell__bd">添加评语分类</view>
    </view>
</view>
</block>
</template>


<script>
import imageGallery from '@/components/imageGallery'
import { mapMutations } from 'vuex'
export default {
  props: {
  },
  computed: {
    conclusions () {
      let survey = this.$store.state.currentSurvey.survey
      if (!survey || !survey.conclusions) {
        return []
      }
      console.log('conclusion', survey.conclusions)
      return survey.conclusions
    }
  },
  components: {
    imageGallery
  },
  methods: {
    ...mapMutations([
      'removeConclusion',
      'updateConclusionText',
      'addQuizConclusion'
    ]),
    addConclusionMedia (index) {
      const that = this
      wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: function (res) {
          that.$store.dispatch('uploadImage', res.tempFilePaths[0]).then(res => {
            console.log(res)
            that.$store.commit('updateConclusionimage', {index: index, imageUrl: res})
          }).catch(error => {
            console.error(error)
          })
        }
      })
    }
  }
}
</script>

<style scoped>
.font-style{
  width:92rpx;
  text-align:center;
}

.poll-conclusion-bd {
  margin-top: 30rpx;
  margin-left: 30rpx;
}
</style>
