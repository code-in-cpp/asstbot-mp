<template>
  <view class="weui-flex">
    <view class="weui-flex__item" @tap="editPage">
      <icon-button icon="editor" title="编辑"/>
    </view>
    <view class="weui-flex__item" @tap="moveup">
      <icon-button icon="packup" title="上移"/>
    </view>
    <view class="weui-flex__item" @tap="movedown">
      <icon-button icon="unfold" title="下移"/>
    </view>
    <view class="weui-flex__item" @tap="remove">
      <icon-button icon="trash" title="删除" />
    </view>
  </view>
</template>

<script>
import iconButton from './iconButton'

export default {
  props: ['subject'],
  components: {
    iconButton
  },
  methods: {
    editPage () {
      this.$emit('actionDone')
      wx.navigateTo({
        url: `/pages/editsubject/main?subject=${this.subject}&action=edit`
      })
    },
    moveup () {
      this.$emit('actionDone')
      this.$store.commit('moveUpCurSurveySubject', this.subject)
      this.$store.dispatch('saveCurSurvey', this.$store.state.curSurvey.survey)
    },
    movedown () {
      this.$emit('actionDone')
      this.$store.commit('moveDownCurSurveySubject', this.subject)
      this.$store.dispatch('saveCurSurvey', this.$store.state.curSurvey.survey)
    },
    remove () {
      this.$emit('actionDone')
      this.$store.commit('deleteCurSurveySubject', this.subject)
      this.$store.dispatch('saveCurSurvey', this.$store.state.curSurvey.survey)
    }
  }
}
</script>

<style lang="less" scoped>
@import "../../../static/base.less";

.weui-flex {
  background-color: @background-color+#050505
}
</style>