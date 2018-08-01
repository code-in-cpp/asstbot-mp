<template>
    <view class="anwser-container">
      <view class="checkbox anwser-item" v-for="(answer, index) in answers" :key="index">
        <block v-if="type=='radio'">
          <view class="anwser-check-icon" v-if="surveyType==='exam'">
            <icon class="weui-icon-checkbox_circle" type="circle" size="23" v-if="!answer.correct"></icon>
            <icon class="weui-icon-checkbox_success" type="success" size="23" v-else></icon>
          </view>
        </block>
        <block v-else-if="type=='checkbox'">
          <view class="anwser-check-icon" v-if="surveyType==='exam'">
            <view class="checkbox-wrapper">
              <icon class="weui-icon-checkbox_success" type="success_no_circle" size="13" v-if="answer.correct"></icon>
            </view>
          </view>
        </block>
        <view class="weui-cell__bd height-92">
          <view class="weui-input height-line-92 input-location">
            {{answer.value}}
          </view>
        </view>
        <view class="weui-cell__ft height-92" v-if="surveyType=='quiz'" >
          <view class="weui-select subject-hieght-line">{{displayNames[answer.next]}}</view>
        </view>
        <view class="icon-item-style font-style weui-cell__ft"  v-if="answer.imageUrl">
          <image class="answer-image" :src="answer.imageUrl"></image>
        </view>
      </view>
    </view>

</template>

<script>
export default {
  data () {
    return {
      region: ['广东', '广州', '海珠'],
      customItem: '全部',
      focusEnd: true
    }
  },
  props: {
    subjectIndex: {
      type: Number,
      default: 0
    },
    type: {
      type: String,
      default: 'radio'
    },
    surveyType: {
      type: String,
      default: 'exam'
    }
  },

  computed: {
    answers () {
      let survey = this.$store.state.curSurvey.survey
      if (!survey || !survey.subjects || survey.subjects === 0 || !survey.subjects[this.subjectIndex]) {
        return []
      }
      return this.$store.state.curSurvey.survey.subjects[this.subjectIndex].answers
    },
    questionNames () {
      let survey = this.$store.state.curSurvey.survey
      if (!survey || !survey.subjects || survey.subjects === 0 || !survey.subjects[this.subjectIndex]) {
        return []
      }
      let ret = ['顺序']
      // console.log('----', survey.subjects)
      for (let index in survey.subjects) {
        let subject = survey.subjects[index]
        let pos = parseInt(index) + 1
        ret.push('题目' + pos + ':' + subject.question.slice(0, 8) + '...')
      }
      for (let index in survey.conclusions) {
        let conclusion = survey.conclusions[index]
        let pos = parseInt(index) + 1
        ret.push('结论' + pos + ':' + conclusion.text.slice(0, 8) + '...')
      }
      return ret
    },
    displayNames () {
      let ret = ['顺序']
      let survey = this.$store.state.curSurvey.survey
      if (!survey || !survey.subjects || survey.subjects === 0 || !survey.subjects[this.subjectIndex]) {
        return ret
      }
      for (let id = 1; id < survey.subjects.length + 1; id++) {
        ret.push('题目' + id)
      }
      for (let id = 1; id < survey.conclusions.length + 1; id++) {
        ret.push('结论' + id)
      }
      return ret
    }
  }
}
</script>

<style lang="less" scoped>
@import "~@/../static/base.less";

view {
  font-size: @font-size-small;
}

.weui-cells:before {
  border-top: 0rpx;
}

.weui-check__label {
  padding: 0rpx 60rpx;
}

.checkbox-wrapper {
  height: 39rpx;
  width: 39rpx;
  border: solid rgb(155, 152, 152) 2rpx;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.checkbox-icon-box {
  border: solid 1px #666;
  height: 36rpx;
  width: 36rpx;
  margin-right:9.2rpx;
  margin-left: 9.2rpx;
  overflow: hidden;
}
.checkbox-icon-box__wrapper {
  padding-right:0.35em;
}
.checkbox-icon-box .icon-right {
  color: #1AAD19;
  font-size: 40rpx;
}
.icon-item-style{
  width:92rpx;
  text-align: center;
}

.font-style{
  height:92rpx;
  width:92rpx;
  line-height:92rpx;
  text-align:center;
}
.answer-image{
  width:70rpx;
  height:70rpx;
  display:inline-block;
  margin-top:11rpx;
}
.height-92{
  height:92rpx;
}
.height-line-92{
  height: 92rpx;
  line-height: 92rpx;
}
.height-46{
  height: 46rpx;
}

.anwser-container{
  background: #fff;
}
.anwser-item{
  display:flex;
  /*border-bottom:1rpx solid #dadada;*/
  /*margin-left: 20rpx;*/
  position: relative;
  padding: 0 30rpx;
}
.anwser-item:after{
  content: '';
  position: absolute;
  border-bottom:1rpx solid #dadada;
  left: 30rpx;
  bottom:0;
  width: 100%;
  height: 0;
}
.input-location {
  margin-left: 20rpx;
}
.anwser-check-icon{
  // line-height:92rpx;
  // width:92rpx;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  text-align:center;
  vertical-align: middle;
}
.add-answer-box{
  padding: 0 0rpx!important;
  margin-left: 20rpx;
  display: flex;
  justify-content: flex-start;
}
.add-answer-box:before{
  border-top: none;
}


</style>
