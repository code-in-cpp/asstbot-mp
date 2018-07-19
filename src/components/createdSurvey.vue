<template>
  <view>
    <block v-for="(survey, i) in surveyList" :key="i">
      <slider-left :iconTitles="icons" :openWidth="300" :isActive="selected_index==i"
                   @btnClicked="sliderActionClicked($event, i)"
                   @sliderLeftStart="slider(i)">
        <view  @click="selected(i)">
          <survey-item :surveyInfo="survey" :isActive="selected_index==i"></survey-item>
        </view>
      </slider-left>
    </block>
    <btn-panel
      :shouldShow="showPanel"
      :panelTitle="getPanelTitle"
      @iconBtnClicked="panelActionClicked($event)"/>
  </view>
</template>

<script>
import surveyItem from '@/components/viewSurvey/surveyItem'
import btnPanel from '@/components/btnPanel'
import { mapState } from 'vuex'
// import { saveQrCodeToPhotosAlbum } from '@/utils/qrcode'

export default {
  data: function () {
    return {
      selected_index: 0,
      showPanel: false,
      icons: [
        {title: '删除', color: 'red'},
        {title: '自测', color: 'grey'}
      ]
    }
  },
  methods: {
    selected (index) {
      this.selected_index = index
      this.showPanel = true
      // wx.navigateTo({
      //   url: `/pages/display/main?id=${this.surveyList[index].id}`
      // })
    },
    panelActionClicked (e) {
      console.log('enter panelActionClicked' + e)
    },
    slider (index) {
      // console.log('slider left')
      this.selected_index = index
    },
    sliderActionClicked (e, selectedItem) {
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
      surveyList: state => {
        console.log(state.survey)
        return state.survey.surveyList
      }
    }),
    getPanelTitle () {
      console.log('enter getPanelTitle')
      if (!(this.surveyList === undefined || this.surveyList === null || this.surveyList.length === 0)) {
        if (this.selected_index >= this.surveyList.length) {
          this.selected_index = 0
        }
        return this.surveyList[this.selected_index].title
      } else {
        console.log('survey list is null')
        return '请选择'
      }
    }
  },

  components: {
    surveyItem,
    btnPanel
  },
  onLoad () {
    this.$store.dispatch('retrieveSurvey')
  }
}
</script>

