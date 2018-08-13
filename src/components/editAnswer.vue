<template>
  <block>
    <checkbox-group  v-if="subject.type=='checkbox'" class="anwser-container">
      <block  v-for="(answer, index) in answers" :key="index">
        <view class="checkbox anwser-item">
          <checkbox v-if="survey.type=='exam'" @click="toUpdateAnswerCorrect(index)" :checked="answer.correct" class="anwser-check-icon"></checkbox>
          <view class="weui-cell__bd height-92">
              <input class="weui-input height-line-92 input-location" :placeholder="'请输入答案'+(index+1)"
                    @change="updateAnswerValue(index, $event.mp.detail.value)"
                    :value="answer.value" @blur="blur"/>
          </view>
          <view class="icon-item-style font-style" v-if="!answer.imageUrl" @click.stop="addMedia(index)">
            <i class="icon iconfont icon-picture font-color"></i>
          </view>
          <view class="weui-cell__ft font-style">
            <view class="icon-item-style" @click="removeAnswer(index)">
              <i class="icon iconfont icon-trash"></i>
            </view>
          </view>
        </view>
        <view class="anwser-item border" v-if="answer.imageUrl">
          <view v-if="survey.type=='exam'" class="anwser-check-icon">

          </view>
          <image-uploader :url="answer.imageUrl" add="false" @deleteImage="deleteImage(index)"/>
        </view>
        <view class="weui-cell weui-cell_input weui-cell_warn" v-if="!answer.islegal">
          <view class="weui-cell__bd">
            {{answer.verifyResult}}
          </view>
          <view class="weui-cell__ft">
              <icon type="warn" size="15" color="#E64340"></icon>
          </view>
        </view>
      </block>
    </checkbox-group>

    <radio-group v-else-if="subject.type=='radio'"  class="anwser-container">
      <block  v-for="(answer, index) in answers" :key="index">
        <view class="radio anwser-item">
          <radio v-if="survey.type=='exam'" @click="toUpdateAnswerCorrect(index)" :checked="answer.correct" class="anwser-check-icon"></radio>
          <view class="weui-cell__bd height-92">
            <input class="weui-input height-line-92 input-location" :placeholder="'请输入答案'+(index+1)"
                    @change="updateAnswerValue(index, $event.mp.detail.value)"
                    :value="answer.value"  @blur="blur"/>
          </view>
          <picker v-if="survey.type=='quiz'" @change="updateAnswerNext(index, $event.mp.detail.value)" :value="answer.next" :range="questionNames">
            <view class="weui-select height-line-92">{{displayNames[answer.next]}}</view>
          </picker>
          <view class="icon-item-style font-style" v-if="!answer.imageUrl" @click.stop="addMedia(index)">
            <i class="icon iconfont icon-picture font-color"></i>
          </view>
          <view class="weui-cell__ft font-style">
            <view class="icon-item-style" @click="removeAnswer(index)">
              <i class="icon iconfont icon-trash trash-icon-color"></i>
            </view>
          </view>
        </view>
        <view class="anwser-item border" v-if="answer.imageUrl">
          <view v-if="survey.type=='exam'" class="anwser-check-icon">
          </view>
          <image-uploader :url="answer.imageUrl" add="false" @deleteImage="deleteImage(index)"/>
        </view>
        <view class="weui-cell weui-cell_input weui-cell_warn" v-if="!answer.islegal">
          <view class="weui-cell__bd">
            {{answer.verifyResult}}
          </view>
          <view class="weui-cell__ft">
              <icon type="warn" size="15" color="#E64340"></icon>
          </view>
        </view>
      </block>
    </radio-group>

    <block v-else>
      <view class = "anwser-container">
      <block v-for="(answer, index) in answers" :key="index">
        <view class="radio anwser-item">
          <!-- <radio v-if="survey.type=='exam'" @click="toUpdateAnswerCorrect(index)" :checked="answer.correct" class="anwser-check-icon"></radio> -->
          <view class="weui-cell__bd height-92">
            <block v-if="subject.type=='date'">
              <picker mode="date" :value="answer.value" start="2015-09-01" end="2017-09-01" @change="updateAnswerValue(index, $event.mp.detail.value)">
                <view class="picker height-line-92 input-location">
                  {{answer.value}}
                </view>
              </picker>
            </block>
            <block v-else-if="subject.type=='location'">
              <picker mode="region" @change="updateRegionAnswer(index, $event.mp.detail.value)" :value="region">
                <view class="picker height-line-92 input-location">
                  {{answer.value}}
                </view>
              </picker>
            </block>
            <block v-else-if="subject.type=='phone'">
              <input class="weui-input height-line-92 input-location" type="number" placeholder="请输入号码"
                    @change="updateAnswerValue(index, $event.mp.detail.value)"
                    :value="answer.value"/>
            </block>
            <block v-else>
              <input class="weui-input height-line-92 input-location" :placeholder="'请输入答案'+(index+1)"
                    @change="updateAnswerValue(index, $event.mp.detail.value)"
                    :value="answer.value"/>
            </block>
          </view>
          <view class="icon-item-style font-style" v-if="!answer.imageUrl" @click.stop="addMedia(index)">
            <i class="icon iconfont icon-picture font-color"></i>
          </view>

          <view class="weui-cell__ft font-style">
            <view class="icon-item-style" @click="removeAnswer(index)">
              <i class="icon iconfont icon-trash"></i>
            </view>
          </view>
        </view>
        <view class="anwser-item border" v-if="answer.imageUrl">
          <image-uploader :url="answer.imageUrl" add="false" @deleteImage="deleteImage(index)"/>
        </view>   
        <view class="weui-cell weui-cell_input weui-cell_warn" v-if="!answer.islegal">
          <view class="weui-cell__bd">
            {{answer.verifyResult}}
          </view>
          <view class="weui-cell__ft">
              <icon type="warn" size="15" color="#E64340"></icon>
          </view>
        </view>    
      </block>
      </view>
    </block>
    <block v-if="survey.type=='exam' || subject.type=='radio' || subject.type=='checkbox'">
      <view class="weui-cell weui-check__label add-answer-box anwser-container">
          <view class="weui-cell__ft font-style"   @click="addAnswer()">
            <i class="icon iconfont icon-add"></i>
          </view>
          <view class="weui-cell__ft height-line-92" @click="addAnswer()">
            添加选项
          </view>
      </view> 
    </block>
  </block>
</template>

<script>
import imageUploader from '@/components/widget/imageUploader'

export default {
  data () {
    return {
      region: ['广东', '广州', '海珠'],
      customItem: '全部'
    }
  },
  props: {
    subject: {
      type: Object,
      default: {}
    },
    survey: {
      type: Object,
      default: {}
    }
  },
  components: {
    imageUploader
  },
  computed: {
    answers () {
      console.log('answers is', this.subject.answers)
      return this.subject.answers
    },
    questionNames () {
      let survey = this.survey
      if (!survey || !survey.subjects) {
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
      let survey = this.survey
      if (!survey || !survey.subjects) {
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
  },

  methods: {
    toUpdateAnswerCorrect (index) {
      let value
      if (this.subject.type === 'radio') {
        value = this.answers.map((answer, i) => {
          return i === index
        })
      } else if (this.subject.type === 'checkbox') {
        value = this.answers.map((answer, i) => {
          return i === index ? !answer.correct : answer.correct
        })
      }
      this.updateAnswerCorrect(value)
    },

    updateRegionAnswer (index, value) {
      // console.log('region select:', index, 'value', value)
      let location = value[0].replace('省', '') + '-' + value[1].replace('市', '')
      this.updateAnswerValue(index, location)
    },

    updateAnswerNext (index, value) {
      let answers = [...this.answers].map((answer, i) => {
        if (index === i) {
          answer.next = value
        }
        return answer
      })
      this.$emit('input', answers)
    },

    updateAnswerValue (index, value) {
      let answers = [...this.answers]
      let answer = answers[index]
      answer.value = value
      if ((this.survey.type === 'exam') && (this.subject.type !== 'radio') && (this.subject.type !== 'checkbox')) {
        answer.correct = true
      }
      this.verifyAnswer(answer)
      this.$emit('input', answers)
    },

    updateAnswerCorrect (value) {
      let answers = [...this.answers].map((answer, i) => {
        answer.correct = value[i]
        return answer
      })
      this.$emit('input', answers)
    },

    updateAnswerUrl (index, value) {
      let answers = [...this.answers]
      answers[index].imageUrl = value
      this.verifyAnswer(answers[index])
      this.$emit('input', answers)
    },

    removeAnswer (index) {
      let answers = [...this.answers]
      answers.splice(index, 1)
      this.$emit('input', answers)
    },

    verifyAnswer (answer) {
      if (this.subject.type === 'phone') {
        let reg = /^([1-9][0-9]{10})/
        answer.islegal = reg.test(answer.value)
        console.log('test result=>', answer.islegal)
        answer.verifyResult = (answer.islegal) ? '' : '手机号码需要设置为11位'
      } else {
        answer.islegal = answer.value !== '' || answer.imageUrl !== ''
        answer.verifyResult = (answer.islegal) ? '' : '答案: 文字和图片不能同时为空'
      }
    },

    verifyAnswers () {
      let ret = true
      this.answers.forEach(answer => {
        this.verifyAnswer(answer)
        ret = ret & answer.islegal
      })
      console.log('answer is', this.answers)
      return ret
    },

    addAnswer () {
      let islegal = this.verifyAnswers()
      if (!islegal) {
        return
      }
      let value = ''
      let correct = true
      if (this.subject.type === 'date') {
        value = '2018-07-12'
      }
      if (this.subject.type === 'location') {
        value = '陕西-西安'
      }
      if (this.subject.type === 'radio' || this.subject.type === 'checkbox') {
        correct = false
      }
      let answers = [...this.answers]
      answers.push({value, correct, imageUrl: '', next: 0, islegal: true})
      this.$emit('input', answers)
    },

    addMedia (index, url) {
      this.$store.dispatch('selectImageToUpload')
        .then((url) => {
          this.updateAnswerUrl(index, url)
        })
    },

    deleteImage (index) {
      this.updateAnswerUrl(index, '')
    }
  },

  onLoad (option) {
    this.verifyAnswers()
  }
}
</script>

<style lang="less" scoped>
@import "../../static/base.less";

view {
  font-size: @font-size-small;
}
.iconfont {
  font-size: @font-size-middle+4rpx;
}
.weui-select {
  border-right: none!important;
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
  /*border-bottom:1rpx solid #dadada;*/
  /*margin-left: 20rpx;*/
  position: relative;
  padding: 0 30rpx;
}
.anwser-item.border
{
  :after{
    content: '';
    position: absolute;
    border-bottom:1rpx solid #dadada;
    left: 30rpx;
    bottom:0;
    width: 100%;
    height: 0;
  }
}



.input-location {
  margin-left: 20rpx;
}
.anwser-check-icon{
  line-height:92rpx;
  width:92rpx;
  text-align:center;
}
.add-answer-box{
  padding: 0 0rpx!important;
  padding-left: 20rpx!important;
  display: flex;
  justify-content: flex-start;
}
.add-answer-box:before{
  border-top: none;
}


.image-icon-color {
  color: green
}

.trash-icon-color {
  color: #9d0000
}

</style>
