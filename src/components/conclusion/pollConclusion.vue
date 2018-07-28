<template>
<block>
    <block v-for="(pollConclusion, i) in conclusions" :key="i">
    <view class="poll-conclusion-cell" >
        <view class="inline-cell-title">
          <view class="weui-cells__title">结论内容：</view>
          <view class="icon-item-style font-style" @click="addConclusionMedia(0)">
              <i class="icon iconfont icon-picture font-color image-icon-color"></i>
          </view>
          <view class="weui-cell__ft">
            <view class="subject-item-style icon-item-style width-92" @click="removeConclusion(i)">
              <i class="icon iconfont icon-trash trash-icon-color"></i>
            </view>
          </view>
        </view>
        <view class="poll-conclusion-bd">
        <textarea class="weui-textarea" placeholder="请填写评价" :value="pollConclusion.text"
                @change="updateConclusionText({index: 0, text: $event.mp.detail.value})"/>
        </view>
        <image-gallery v-if="pollConclusion.imageUrl" :imageUrl="pollConclusion.imageUrl" :index="0" :type="'pollConclusion'"></image-gallery>
      </view>
    </block>
    <block v-if="conclusions.length === 0">
      <view class="subject-divider"></view>
        <view class="weui-cells weui-cells_after-title" >
        <view class="weui-cell" >
          <view class="weui-cell__hd" @click="addConclusion"><i class="icon iconfont icon-add"></i></view>
          <view class="weui-cell__bd" @click="addConclusion">添加结论</view>
        </view>
      </view>
    </block>
</block>
</template>


<script>
import imageGallery from '@/components/imageGallery'
import textOrArea from '@/components/textOrArea'
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
    imageGallery,
    textOrArea
  },
  methods: {
    ...mapMutations([
      'addConclusion',
      'removeConclusion',
      'updateConclusionText'
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
  line-height: 92rpx;
}

.poll-conclusion-cell{
  padding:20rpx 30rpx;
  display: flex;
  flex-direction: column;
  background: #ffffff;
}

.inline-cell-title{
  display: inline-flex;
  border-bottom:1rpx solid #dadada;
}

.poll-conclusion-bd {
  margin-top: 30rpx;
  margin-left: 30rpx;
}
</style>
