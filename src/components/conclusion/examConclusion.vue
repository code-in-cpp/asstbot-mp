<template>
<block>
<view class="weui-cells weui-cells_after-title clear-border" v-for="(conclusion, i) in conclusions" :key="conclusion">
    <view class="subject-divider"></view>
    <view class="weui-cell weui-cell_input subject-area subject-style font-size clear-border">
        <view class="weui-cell__hd subject-item-style flex-1">
          <view class="weui-label subject-title-style">结论分类 {{i+1}}</view>
        </view>
        <view class="weui-cell__ft">
          <view class="subject-item-style icon-item-style width-92" @click="removeConclusion(i)">
              <i class="icon iconfont icon-trash trash-icon-color"></i>
          </view>
        </view>
    </view>
    <view class="weui-cells weui-cells_after-title">
    <view class="weui-cell weui-cell_input" >
        <view class="weui-cell__hd">
        <view class="weui-label">最少答对题数</view>
        </view>
        <view class="weui-cell__bd">
        <input class="weui-input" type="number" :value="conclusion.scoreRange.min"
                @change="updateConclusionMinScore({index: i, value: $event.mp.detail.value})"/>
        </view>
    </view>
    <view class="weui-cell weui-cell_input" >
        <view class="weui-cell__hd">
        <view class="weui-label">最多答对题数</view>
        </view>
        <view class="weui-cell__bd">
        <input class="weui-input" type="number" :value="conclusion.scoreRange.max"
                @change="updateConclusionMaxScore({index: i, value: $event.mp.detail.value})"/>
        </view>
    </view>
    <view class="weui-cell weui-cell_input" >
        <view class="weui-cell__hd">
        <view class="weui-label">结论内容</view>
        </view>
        <view class="weui-cell__bd">
        <input class="weui-input" placeholder="请输入文本" :value="conclusion.text"
                @change="updateConclusionText({index: i, text: $event.mp.detail.value})"/>
        </view>
        <view class="icon-item-style font-style" @click="addConclusionMedia(i)">
        <i v-if="!conclusion.imageUrl" class="icon iconfont icon-picture font-color image-icon-color"></i>
        <image class="answer-image" v-if="conclusion.imageUrl" :src="conclusion.imageUrl"></image>
        </view>
    </view>
    </view>
</view>
<view class="subject-divider"></view>
<view class="weui-cells weui-cells_after-title" >
    <view class="weui-cell" @click="addConclusion">
    <view class="weui-cell__hd"><i class="icon iconfont icon-add"></i></view>
    <view class="weui-cell__bd">添加结论分类</view>
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
      'updateConclusionMinScore',
      'addConclusion',
      'updateConclusionMaxScore'
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
  height:92rpx;
  width:92rpx;
  line-height:92rpx;
  text-align:center;
}
</style>
