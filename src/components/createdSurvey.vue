<template>
  <view>
    <block v-for="(survey, i) in surveyList" :key="i">
      <!--<slider-left :iconTitles="icons" :openWidth="300" :isActive="selected_index==i"-->
                   <!--@btnClicked="sliderActionClicked($event, i)"-->
                   <!--@sliderLeftStart="slider(i)">-->
      <view  @click="selected(i)">
        <survey-item :surveyInfo="survey" :isActive="selected_index==i"></survey-item>
      </view>
      <!--<view class="weui-cell__ft weui-cell__ft_in-access"></view>-->
      <!--</slider-left>-->
    </block>
    <btn-panel v-if="showPanel"
      :panelTitle="getPanelTitle"
      :buttons="panel"
      @iconBtnClicked="panelActionClicked($event)"
      @panelClosed="pancelClosed"/>
  </view>
</template>

<script>
import surveyItem from '@/components/viewSurvey/surveyItem'
import btnPanel from '@/components/btnPanel'
import { saveQrCodeToPhotosAlbum } from '@/utils/qrcode'
import { mapState } from 'vuex'

export default {
  data: function () {
    return {
      selectedIndex: 0,
      showPanel: false,
      // icons: [
      //   {title: '删除', color: 'red'},
      //   {title: '自测', color: 'grey'}
      // ],
      panel: [
        {title: '编辑', icon: 'icon-editor'},
        {title: '自测', icon: 'icon-playon_fill'},
        {title: '显示', icon: 'icon-zhtn'},
        {title: '转发', icon: 'icon-send', opentype: 'share'},
        {title: '分享', icon: 'icon-moment'},
        {title: '删除', icon: 'icon-trash'}
      ]
    }
  },
  watch: {
    selectedIndex: function (newVal, oldVal) {
      this.$emit('itemSelected', {title: this.surveyList[newVal].title, id: this.surveyList[newVal].id, imageUrl: this.surveyList[newVal].avatarUrl})
    }
  },
  methods: {
    selected (index) {
      console.log('index', index, 'is clicked')
      this.selectedIndex = index
      this.showPanel = true
    },
    pancelClosed () {
      this.showPanel = false
    },
    // slider (index) {
    //   // console.log('slider left')
    //   this.selectedIndex = index
    //   this.showPanel = false
    // },
    selfTest: function (index) {
      wx.navigateTo({
        url: `/pages/surveyChat/main?id=${index}&scene=test`
      })
    },
    showDetail: function (index) {
      wx.navigateTo({
        url: `/pages/display/main?id=${index}`
      })
    },
    publish: function (index) {
      saveQrCodeToPhotosAlbum(index)
    },
    share: function (index) {
      wx.showShareMenu({
        withShareTicket: true
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
    // sliderActionClicked (e, selectedItem) {
    //   // console.log('enter actionClicked')
    //   let operId = e.mp.detail.index
    //   let id = this.surveyList[selectedItem].id
    //   let that = this
    //   // 删除
    //   if (operId === 0) {
    //     this.deleteSuevey(that, id)
    //   }
    //   // 自测
    //   if (operId === 1) {
    //     console.log('enter self test')
    //     this.selfTest(id)
    //   }
    // },
    panelActionClicked (index) {
      let operId = index
      let id = this.surveyList[this.selectedIndex].id
      let that = this
      this.showPanel = false
      // 编辑
      if (operId === 0) {
        this.editSurvey(id)
      }
      // 自测
      if (operId === 1) {
        this.selfTest(id)
      }
      // 显示
      if (operId === 2) {
        this.showDetail(id)
      }
      // 转发
      if (operId === 3) {
        this.share(id)
      }
      // 分享
      if (operId === 4) {
        this.publish(id)
      }
      // 删除
      if (operId === 5) {
        this.deleteSuevey(that, id)
      }
    }
  },

  computed: {
    ...mapState({
      surveyList: state => {
        return state.survey.surveyList
      }
    }),
    getPanelTitle () {
      if (!(this.surveyList === undefined || this.surveyList === null || this.surveyList.length === 0)) {
        if (this.selectedIndex >= this.surveyList.length) {
          this.selectedIndex = 0
        }
        return this.surveyList[this.selectedIndex].title
      } else {
        return '请选择'
      }
    }
  },

  components: {
    surveyItem,
    btnPanel
  },
  onShareAppMessage (res) {
    if (res.from === 'button') {
      return {
        title: this.surveyList[this.selectedIndex].title,
        path: '/pages/surveyChat/main?id=' + this.surveyList[this.selectedIndex].id,
        imageUrl: this.surveyList[this.selectedIndex].avatarUrl
      }
    }
    return {
      path: '/pages/index/main'
    }
  },
  onLoad () {
    this.$store.dispatch('retrieveSurvey')
  }
}
</script>

