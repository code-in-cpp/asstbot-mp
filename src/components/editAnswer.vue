<template>
  <block>
    <checkbox-group  v-if="type=='checkbox'" class="anwser-container">
      <view class="checkbox anwser-item" v-for="(answer, index) in answers" :key="index">
        <checkbox v-if="type=='checkbox' && surveyType=='exam'" @click="toUpdateAnswerCorrect(index)" :checked="answer.correct" class="anwser-check-icon"></checkbox>
        <view class="weui-cell__bd height-92">
            <input class="weui-input height-line-92" :placeholder="'请输入答案'+(index+1)"
                   @change="updateAnswerValue({subject: subjectIndex, answer: index, value: $event.mp.detail.value})"
                   :value="answer.value"/>
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
      </view>
    </checkbox-group>

    <radio-group v-if="type=='radio'"  class="anwser-container">
      <view class="radio anwser-item" v-for="(answer, index) in answers" :key="index">
        <radio v-if="type=='radio' && surveyType=='exam'" @click="toUpdateAnswerCorrect(index)" :checked="answer.correct" class="anwser-check-icon"></radio>
        <view class="weui-cell__bd height-92">
          <input class="weui-input height-line-92" :placeholder="'请输入答案'+(index+1)"
                  @change="updateAnswerValue({subject: subjectIndex, answer: index, value: $event.mp.detail.value})"
                  :value="answer.value"/>
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
      </view>
    </radio-group>

    <block v-if="type!='radio' && type !='checkbox'">
      <view class="radio anwser-item anwser-container" v-for="(answer, index) in answers" :key="index">
        <view class="weui-cell__bd height-92">
          <block v-if="type=='date'">
            <picker mode="date" :value="answer.value" start="2015-09-01" end="2017-09-01" @change="updateAnswerValue({subject: subjectIndex, answer: index, value: $event.mp.detail.value})">
              <view class="picker height-line-92">
                {{answer.value}}
              </view>
            </picker>
          </block>
          <block v-else-if="type=='location'">
            <picker mode="region" @change="updateRegionAnswer(index, $event.mp.detail.value)" :value="region">
              <view class="picker height-line-92">
                {{answer.value}}
              </view>
            </picker>
          </block>
          <block v-else-if="type=='phone'">
            <input class="weui-input height-line-92" type="number" placeholder="请输入号码"
                   @change="updateAnswerValue({subject: subjectIndex, answer: index, value: $event.mp.detail.value})"
                   :value="answer.value"/>
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
      </view>
    </block>
  
    <label class="weui-cell weui-check__label add-answer-box" @click="addAnswer(subjectIndex)">
        <view class="weui-cell__ft font-style"  >
          <i class="icon iconfont icon-add"></i>
        </view>
        <view class="weui-cell__ft height-line-92">
          添加答案
        </view>
    </label>

  </block>

</template>

<script>
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      region: ['广东', '广州', '海珠'],
      customItem: '全部'
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

    updateRegionAnswer (index, value) {
      console.log('region select:', index, 'value', value)
      let location = value[0].replace('省', '') + '-' + value[1].replace('市', '')
      this.updateAnswerValue({
        subject: this.subjectIndex,
        answer: index,
        value: location
      })
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

<style lang="less" scoped>
@import "../../static/base.less";

view {
  font-size: @font-size-small;
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
    border-bottom:1rpx solid #dadada;
    padding:0 30rpx;
  }
  .anwser-check-icon{
    line-height:92rpx;
    width:92rpx;
    text-align:center;
  }
  .add-answer-box{
    padding: 0 30rpx!important;
  }
  .add-answer-box:before{
    border-top: none;
  }
</style>
