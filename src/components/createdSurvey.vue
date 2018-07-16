<template>
  <view>
    <block v-for="(survey, i) in surveyList" :key="i">
      <view>
        <view>
          <slider-left :iconTitles="icons" @delete="delete_row($event, i)">
            <view  @click="selected(i)" @touchmove="touchMove(i)">
              <survey-item :surveyInfo="survey" :isActive="selected_index==i"></survey-item>
            </view>
          </slider-left>
        </view>

      </view>
    </block>
  </view>
</template>

<script>
import surveyItem from '@/components/viewSurvey/surveyItem'
import { mapState } from 'vuex'
// import { saveQrCodeToPhotosAlbum } from '@/utils/qrcode'

export default {
  data: function () {
    return {
      selected_index: 0,
      should_pop: false,
      icons: [
        {title: '删除', color: 'red'},
        {title: '朋友圈', color: 'grey'},
        {title: '自测', color: 'grey'}
      ]
    }
  },
  methods: {
    selected (index) {
      this.selected_index = index
      wx.navigateTo({
        url: `/pages/display/main?id=${this.surveyList[index].id}`
      })
    },
    touchMove (index) {
      this.selected_index = index
      this.should_pop = true
    },
    delete_row (e, selectedItem) {
      // console.log(e, selectedItem)
      console.log('#############enter delete_row###########')
      let operId = e.mp.detail.index
      console.log('#############delete_row, log after operId###########')
      console.log('operId', operId)
      let that = this
      if (operId === 0) {
        wx.showModal({
          title: '您确认要删除吗？',
          confirmText: '确认',
          cancelText: '取消',
          success: function (res) {
            if (res.confirm) {
              that.$store.dispatch('deleteSurvey', that.surveyList[selectedItem].id)
            } else {
              console.log('用户点击取消操作')
            }
          }
        })
      }

      if (operId === 2) {
        wx.navigateTo({
          url: `/pages/index/main?id=${that.surveyList[selectedItem].id}&scene=test`
        })
      }
    }
  },

  computed: {
    ...mapState({
      surveyList: state => state.survey.surveyList
    })
  },

  components: {
    surveyItem
  },
  onLoad () {
    this.$store.dispatch('retrieveSurvey')
  }
}
</script>

<style lang="less">
@import "../../static/base.less";
.short-cut {
  width: 600rpx;
  position: absolute;
  right: 0;
  bottom: 0;
  height: 100%;
}

.short-cut.hidden {
  -webkit-transform: translateX(100%);
  transform: translateX(100%);
}

.short-cut.show {
  -webkit-transform: translateX(33%);
  transform: translateX(33%);
}

.short-cut.show-more {
  -webkit-transform: translateX(0%);
  transform: translateX(0%);
}

.short-cut .weui-flex__item{
  text-align: center;
  vertical-align: middle;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.short-cut .iconfont {
  font-size: @font-size-big ;
  color: white;
}

.short-cut .desc {
  font-size: @font-size-small;
  color: white;
}

.short-cut .weui-flex__item.share image{
  width: 70rpx;
  height: 70rpx;
}

.short-cut .weui-flex__item.share button{
  padding: 10rpx 12rpx !important;
  line-height: 1.6 !important;
}

.short-cut .weui-flex__item.share button .desc{
  color: black;
}
</style>
