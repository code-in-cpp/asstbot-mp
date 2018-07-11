<template>
  <block>
    <view class="weui-cells weui-cells_after-title">
      <label class="weui-cell weui-check__label" v-for="(answer, index) in answers" :key="index">
        <view class="weui-cell__hd weui-check__hd_in-checkbox font-style" @click="toUpdateAnswerCorrect(index)">
          <block v-if="type=='radio' && surveyType=='exam'">
            <icon class="weui-icon-checkbox_success height-46" type="success" size="23" v-if="answer.correct"></icon>
            <icon class="weui-icon-checkbox_circle height-46" type="circle" size="23" v-else></icon>
          </block>
          <block v-else-if="type=='checkbox' && surveyType=='exam'">
            <view class="checkbox-icon-box__wrapper">
              <view class="checkbox-icon-box">
                <i class="icon iconfont icon-right" v-if="answer.correct"></i>
              </view>
            </view>
          </block>
        </view>
        <view class="weui-cell__bd height-92">
          <block v-if="type=='date'">
           <picker mode="date" :value="answer.value" start="2015-09-01" end="2017-09-01" @change="updateAnswerValue({subject: subjectIndex, answer: index, value: $event.mp.detail.value})">
              <view class="picker height-line-92">
                 {{answer.value}}
              </view>
           </picker>  
          </block>
          <block v-else>  
            <input class="weui-input height-line-92" :placeholder="'请输入答案'+(index+1)"
              @change="updateAnswerValue({subject: subjectIndex, answer: index, value: $event.mp.detail.value})"
                        :value="answer.value"/>
          </block>           
        </view>
        <view class="icon-item-style font-style" @click.stop="addMedia({subject: subjectIndex, answer: index})">
          <i v-if="!answer.imageUrl" class="icon iconfont icon-picture font-color"></i>
          <image class="answer-image" v-if="answer.imageUrl" :src="answer.imageUrl"></image>
        </view>
        <view class="weui-cell__ft font-style">
          <view class="icon-item-style" @click="removeAnswer({subject:subjectIndex, answer:index})">
            <i class="icon iconfont icon-trash"></i>
          </view>
        </view>
      </label>
      <label class="weui-cell weui-check__label" @click="addAnswer(subjectIndex)">
        <view class="weui-cell__ft"  >
          <i class="icon iconfont icon-add"></i>
        </view>
        <view class="weui-cell__ft">
          添加答案
        </view>
      </label>
    </view>
  </block>

</template>

<script>
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
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
      let survey = this.$store.state.currentSurvey.survey
      if (!survey || !survey.subjects || survey.subjects === 0 || !survey.subjects[this.subjectIndex]) {
        return []
      }
      console.log(this.$store.state.currentSurvey.survey.subjects[this.subjectIndex].answers)
      return this.$store.state.currentSurvey.survey.subjects[this.subjectIndex].answers
    }
  },

  methods: {
    ...mapMutations([
      'addAnswer',
      'removeAnswer',
      'updateAnswerValue',
      'updateAnswerCorrect',
      'updateAnswerImagePath'
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
    },

    addMedia (obj, e) {
      const that = this
      wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: function (res) {
          that.$store.dispatch('uploadImage', res.tempFilePaths[0]).then(res => {
            that.$store.commit('updateAnswerImagePath', {...obj, value: res})
          }).catch(err => {
            console.log(err)
          })
        }
      })
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
  padding: 0rpx 60rpx;
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
    width:100%;
    height: 100%;
    display: block;
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
</style>
