<template>
  <view>
    <scroll-view scroll-y="true" class="weui-cells weui-cells_after-title" style="height: 100%">
      <block v-for="(replyInfo, i) in replySurveys" :key="replyInfo.resultId">
        <slider-left :iconTitles="icons" :openWidth="300" :isActive="selectedIndex==i"
                     @btnClicked="sliderActionClicked($event, i)"
                     @sliderLeftStart="slider(i)">
        <view  @click="selected(i)">
          <survey-item :surveyInfo="replyInfo.survey" :isActive="selectedIndex==i"></survey-item>
        </view>
        </slider-left>
      </block>
    </scroll-view>
  </view>
</template>
<script>
import { mapGetters } from 'vuex'
import surveyItem from '@/components/viewSurvey/surveyItem'

export default {
  data: function () {
    return {
      selectedIndex: 0,
      icons: [
        {title: '删除', color: 'red'}
      ]
    }
  },
  computed: {
    ...mapGetters({
      replySurveys: 'getReplySurveys'
    })
  },
  methods: {
    selected (index) {
      console.log('index', index, 'is clicked')
      this.selectedIndex = index
      if (this.replySurveys === undefined || this.replySurveys === null || this.replySurveys.length === 0) {
        return
      }
      console.log('survey id:', this.replySurveys[index].id)
      wx.navigateTo({
        url: `/pages/detail/main?resultId=${this.replySurveys[index].id}&type=reply&score=${this.replySurveys[index].score}`
      })
    },
    slider (index) {
      // console.log('slider left')
      this.selectedIndex = index
    },

    sliderActionClicked (e, selectedItem) {
      // console.log('enter actionClicked')
      let operId = e.mp.detail.index
      let id = this.replySurveys[selectedItem].id
      let that = this
      // 删除
      if (operId === 0) {
        console.log('delete survey result id', id)
        this.deleteSurveyResult(that, id)
      }
    },

    deleteSurveyResult: function (that, id) {
      wx.showModal({
        title: '您确认要删除吗？',
        confirmText: '确认',
        cancelText: '取消',
        success: function (res) {
          if (res.confirm) {
            that.$store.dispatch('deleteSurveyResult', id)
          } else {
            console.log('用户点击取消操作')
          }
        }
      })
    }
  },
  components: {
    surveyItem
  },
  onLoad () {
    this.$store.dispatch('querySurveyResultByUser')
  }
}
</script>

<style lang="less" scoped>

</style>
