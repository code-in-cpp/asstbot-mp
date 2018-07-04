<template>
  <view class="weui-cells weui-cells_after-title">
    <label class="weui-cell weui-check__label" v-for="(answer, index) in answers" :key="index">
      <view class="weui-cell__hd weui-check__hd_in-checkbox" @click="toUpdateAnswerCorrect(index)">
        <block v-if="type=='radio'">
          <icon class="weui-icon-checkbox_success" type="success" size="23" v-if="answer.correct"></icon>
          <icon class="weui-icon-checkbox_circle" type="circle" size="23" v-else></icon>
        </block>
        <block v-else-if="type=='checkbox'">
          <view class="checkbox-icon-box__wrapper">
            <view class="checkbox-icon-box">
              <icon class="" type="success_no_circle" size="15" v-if="answer.correct"></icon>
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
          <i-icon type="trash" size="25"/>
        </view>
      </view>
    </label>
    <view class="weui-cell weui-cell_link">
      <view class="weui-cell__bd" @click="addAnswer(subjectIndex)">添加答案</view>
    </view>
  </view>
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

<style>
.weui-check__label {
  padding: 5px 30px;
}

.checkbox-icon-box {
  border: solid 1px #666;
  height: 15px;
  width: 15px;
  margin-right:9.2rpx;
  margin-left: 9.2rpx;
}
.checkbox-icon-box__wrapper {
  padding-right:0.35em;
}
.checkbox-icon-box icon {
  display: block;
}
</style>