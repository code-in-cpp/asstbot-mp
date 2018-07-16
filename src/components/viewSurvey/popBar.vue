<template>
  <view class="short-cut weui-flex transited primary-color" :class="shortCutStatus[i]">
    <view class="weui-flex__item" @click="deletesurvey(i)">
      <i class="icon iconfont icon-trash"></i>
      <view class="desc">删除</view>
    </view>
    <view class="weui-flex__item">
      <i class="icon iconfont icon-setup" @click="editsurvey(i)"></i>
      <view class="desc">编辑</view>
    </view>
    <view class="weui-flex__item">
      <i class="icon iconfont icon-browse" @click="browsesurvey(i)"></i>
      <view class="desc">查看</view>
    </view>
    <view class="weui-flex__item">
      <i class="icon iconfont icon-share" @click="toShareSurvey(i)"></i>
      <view class="desc">分享</view>
    </view>
    <view class="weui-flex__item share">
      <button open-type="share">
        <view>
          <image src='../../static/image/weixin.png' />
        </view>
      </button>
    </view>
    <view class="weui-flex__item share">
      <button>
        <view>
          <image src='../../static/image/moment.png'/>
        </view>
      </button>
    </view>
  </view>
</template>

<script>
 export default {
   props: {
     index: {
       type: Number,
       default: 0
     }
   },
   methods: {
    toShareSurvey (index) {
      this.shortCutStatus = this.shortCutStatus.map((val, i) => {
        if (index === i) {
          return val === 'show' ? 'show-more' : 'show'
        } else {
          return 'hide'
        }
      })
      this.$emit('readtoshare', this.surveyList[index])
    },
    deletesurvey (index) {
      let that = this
      wx.showModal({
        title: '您确认要删除吗？',
        confirmText: '确认',
        cancelText: '取消',
        success: function (res) {
          if (res.confirm) {
            that.$store.dispatch('deleteSurvey', that.surveyList[index].id)
          } else {
            console.log('用户点击取消操作')
          }
        }
      })
    },
    editsurvey (index) {
      wx.navigateTo({
        url: `/pages/surveySubjects/main?id=${this.surveyList[index].id}`
      })
    },
    browsesurvey (index) {
      wx.navigateTo({
        url: `/pages/display/main?id=${this.surveyList[index].id}`
      })
    }
  }
}

</script>

<style scoped>

</style>
