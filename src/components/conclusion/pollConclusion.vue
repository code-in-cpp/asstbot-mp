<template>
<block>
    <block v-for="(pollConclusion, i) in conclusions" :key="i">
    <view class="poll-conclusion-cell" >
        <view class="inline-cell-title">
        <view class="weui-cells__title">评语内容：</view>
        <view class="icon-item-style font-style" @click="addConclusionMedia(0)">
            <i class="icon iconfont icon-picture font-color"></i>
        </view>
        </view>
        <view class="poll-conclusion-bd">
        <textarea class="weui-textarea" placeholder="请输入文本" :value="pollConclusion.text"
                @input="updateConclusionText({index: 0, text: $event.mp.detail.value})"/>
        </view>
        <image-gallery v-if="pollConclusion.imageUrl" :imageUrl="pollConclusion.imageUrl" :index="0" :type="'pollConclusion'"></image-gallery>
        </view>
    </block>
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
