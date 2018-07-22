<template>
  <view>
    <scroll-view scroll-y="true" class="weui-cells weui-cells_after-title" style="height: 100%">
      <block v-for="(replyInfo, i) in replySurveys" :key="replyInfo.resultId">
        <view  @click="selected(i)">
          <survey-item :surveyInfo="replyInfo.survey" :isActive="selected_index==i"></survey-item>
        </view>
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
      selectedIndex: 0
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
