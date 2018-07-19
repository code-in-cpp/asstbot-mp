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
      :buttons="panel"
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
      ],
      panel: [
        {title: '分享', icon: 'icon-moment'},
        {title: '转发', icon: 'icon-send'},
        {title: '自测', icon: 'icon-playon_fill'},
        {title: '删除', icon: 'icon-trash'},
        {title: '显示', icon: 'icon-zhtn'},
        {title: '编辑', icon: 'icon-zhtn'}
      ]
    }
  },
  methods: {
    selected (index) {
      this.selected_index = index
      this.showPanel = true
    },
    slider (index) {
      // console.log('slider left')
      this.selected_index = index
      this.showPanel = false
    },
    selfTest: function (index) {
      wx.navigateTo({
        url: `/pages/index/main?id=${index}&scene=test`
      })
    },
    showDetail: function (index) {
      wx.navigateTo({
        url: `/pages/display/main?id=${index}`
      })
    },
    deleteSuevey: function (that, index) {
      wx.showModal({
        title: '您确认要删除吗？',
        confirmText: '确认',
        cancelText: '取消',
        success: function (res) {
          if (res.confirm) {
            that.$store.dispatch('deleteSurvey', index)
          } else {
            console.log('用户点击取消操作')
          }
        }
      })
    },
    editSurvey (index) {
      wx.navigateTo({
        url: `/pages/surveySubjects/main?id=${index}`
      })
    },
    sliderActionClicked (e, selectedItem) {
      // console.log('enter actionClicked')
      let operId = e.mp.detail.index
      let id = this.surveyList[selectedItem].id
      let that = this
      // 删除
      if (operId === 0) {
        this.deleteSuevey(that, id)
      }
      // 自测
      if (operId === 1) {
        console.log('enter self test')
        this.selfTest(id)
      }
    },
    panelActionClicked (index) {
      console.log('enter panelActionClicked' + index)
      let operId = index
      let id = this.surveyList[this.selected_index].id
      let that = this
      this.showPanel = false
      // 自测
      if (operId === 2) {
        console.log('enter self test')
        this.selfTest(id)
      }
      // 删除
      if (operId === 3) {
        this.deleteSuevey(that, id)
      }
      // 显示
      if (operId === 4) {
        this.showDetail(id)
      }
      // 编辑
      if (operId === 5) {
        this.editSurvey(id)
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

