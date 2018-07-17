<template>
  <view>
    <block v-for="(survey, i) in surveyList" :key="i">
      <slider-left :iconTitles="icons" :openWidth="450" :isActive="selected_index==i" @btnClicked="actionClicked($event, i)" @sliderLeftStart="slider(i)">
        <view  @click="selected(i)">
          <survey-item :surveyInfo="survey" :isActive="selected_index==i"></survey-item>
        </view>
      </slider-left>
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
    slider (index) {
      // console.log('slider left')
      this.selected_index = index
    },
    actionClicked (e, selectedItem) {
      // console.log('enter actionClicked')
      let operId = e.mp.detail.index
      let that = this
      // 删除
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
        return
      }
      // 自测
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

