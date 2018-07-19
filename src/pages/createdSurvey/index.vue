<template>
  <movable-area class="move-area">
    <view class="page">
      <title-bar title="我创建的..."></title-bar>
      <view class="content">
        <scroll-view scroll-y="true" class="weui-cells weui-cells_after-title">
          <created-survey >
        </scroll-view>
      </view>
    </view>
    <home-button/>
  </movable-area>
</template>

<script>
import createdSurvey from '@/components/createdSurvey'
import btnPanel from '@/components/btnPanel'
import iconButton from '@/components/viewSurvey/iconButton'

export default {
  data () {
    return {
      shareSurvey: {}
    }
  },
  components: {
    createdSurvey,
    btnPanel,
    iconButton
  },
  methods: {
    toshare (event) {
      this.shareSurvey = event
    },
    actionClicked (e) {
      console.log('enter actionClicked')
      let operId = e.mp.detail.index
      console.log(operId)
    }
  },
  onShareAppMessage (res) {
    if (res.from === 'button') {
      console.log(res.target)
    }
    return {
      title: this.shareSurvey.title,
      path: '/pages/surveyChat/main?id=' + this.shareSurvey.id,
      imageUrl: this.shareSurvey.avatarUrl
    }
  }
}
</script>

<style>
</style>
