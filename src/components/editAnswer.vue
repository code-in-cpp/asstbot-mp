<template>
  <block>
    <view class="weui-cells weui-cells_after-title">
      <label class="weui-cell weui-check__label" @click="addAnswer(subjectIndex)">
        <view class="weui-cell__ft"  >
          <i class="icon iconfont icon-add"></i>
        </view>
        <view class="weui-cell__ft">
          添加答案
        </view>
      </label>
      <label class="weui-cell weui-check__label" v-for="(answer, index) in answers" :key="index">
        <view class="weui-cell__hd weui-check__hd_in-checkbox" @click="toUpdateAnswerCorrect(index)">
          <block v-if="type=='radio' && surveyType=='exam'">
            <icon class="weui-icon-checkbox_success" type="success" size="23" v-if="answer.correct"></icon>
            <icon class="weui-icon-checkbox_circle" type="circle" size="23" v-else></icon>
          </block>
          <block v-else-if="type=='checkbox' && surveyType=='exam'">
            <view class="checkbox-icon-box__wrapper">
              <view class="checkbox-icon-box">
                <i class="icon iconfont icon-right" v-if="answer.correct"></i>
              </view>
            </view>
          </block>
        </view>
        <view class="weui-cell__bd">
          <input class="weui-input" :placeholder="'请输入答案'+(index+1)" 
            @change="updateAnswerValue({subject: subjectIndex, answer: index, value: $event.mp.detail.value})"
                      :value="answer.value"/>
        </view>
        <view class="weui-cell__ft">
          <view @click="removeAnswer({subject:subjectIndex, answer:index})">
            <i class="icon iconfont icon-trash"></i>
          </view>
        </view>
      </label>

    </view>
  </block>
  
</template>

<script>
import { mapMutations } from 'vuex'
export default {
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
      let survey = this.$store.state.currentSurvey.survey
      if (!survey || !survey.subjects || survey.subjects === 0 || !survey.subjects[this.subjectIndex]) {
        return []
      }
      return this.$store.state.currentSurvey.survey.subjects[this.subjectIndex].answers
    }
  },

  methods: {
    ...mapMutations([
      'addAnswer',
      'removeAnswer',
      'updateAnswerValue',
      'updateAnswerCorrect'
    ]),
    toUpdateAnswerCorrect (index) {
      if (this.type === 'radio') {
        this.answers.map((answer, i) => {
          this.updateAnswerCorrect({
            subject: this.subjectIndex,
            answer: i,
            value: i === index})
        })
      } else if (this.type === 'checkbox') {
        var correct = !this.answers[index].correct
        this.updateAnswerCorrect({
          subject: this.subjectIndex,
          answer: index,
          value: correct
        })
      }
    }
  }
}
</script>

<style scoped>
view {
  font-size: 28rpx;
}

.weui-cells:before {
  border-top: 0rpx;
}

.weui-check__label {
  padding: 5px 30px;
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
</style>