<template>
  <view class="page">
    <title-bar title="我创建的..."></title-bar>
    <view class="weui-cells weui-cells_after-title">
      <created-survey @readtoshare="toshare"/>             
    </view>          
  </view>
</template>

<script>
import createdSurvey from '@/components/createdSurvey'

export default {
  data () {
    return {
      shareSurvey: {}
    }
  },
  components: {
    createdSurvey
  },
  methods: {
    toshare (event) {
      this.shareSurvey = event
    }
  },
  onShareAppMessage (res) {
    if (res.from === 'button') {
      console.log(res.target)
    }
    return {
      title: this.shareSurvey.title,
      path: '/pages/index/main?id=' + this.shareSurvey.id,
      imageUrl: this.shareSurvey.avatarUrl
    }
  }
}
</script>

<style>
</style>
