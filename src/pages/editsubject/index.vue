<template>
  <view class="page">  
    <title-bar :title="survey.title"/>
    <view class="content">
    <scoll-view scroll-y='true' class="scroll-style">
      <view class="weui-cells__title">标题</view>
      <view class="weui-cells weui-cells_after-title">
        <view class="weui-cell">
          <view class="weui-cell__bd">
            <text-or-area :content="subject.question"  @getTextareaValue="updateTitleValue" :defaultValue="'请填写内容'"></text-or-area>
          </view>
        </view>
        <view class="weui-cell">
          <image-uploader :url="subject.imageUrl" @chooseImage="chooseTitleImage" @deleteImage="deleteImage"/>
        </view>
        <view class="weui-cell weui-cell_input weui-cell_warn" v-if="!isLegal">
          <view class="weui-cell__bd">
            标题: 文字和图片不能同时为空
          </view>
          <view class="weui-cell__ft">
              <icon type="warn" size="15" color="#E64340"></icon>
          </view>
        </view>
        <view class="weui-cell weui-cell_select">
          <view class="weui-cell__hd weui-cell__hd_in-select-after">
              <view class="weui-label">类型</view>
          </view>
          <view class="weui-cell__bd">
            <picker @change="subjectTypeChange" :value="typeIndex" :range="typeNameRange">
              <view class="weui-select weui-select_in-select-after">{{typeNameRange[typeIndex]}}</view>
            </picker>
          </view>
        </view>
      </view>
      <view class="weui-cells__title">选项</view>
      <edit-answer :survey="survey" :subject="subject" @input="answerChange"/>
      <view class="weui-cell weui-cell_input weui-cell_warn" v-if="!answersLegal">
          <view class="weui-cell__bd">
            {{inlegalText}}
          </view>
          <view class="weui-cell__ft">
              <icon type="warn" size="15" color="#E64340"></icon>
          </view>
      </view>
    </scoll-view>
    </view>
    <view class="footer bottom_button">
      <button class="weui-btn" type="primary" @tap="saveSubject">保存</button>
    </view>
  </view>
</template>

<script>
import { mapState } from 'vuex'
import editAnswer from '@/components/editAnswer'
import textOrArea from '@/components/textOrArea'
import imageUploader from '@/components/widget/imageUploader'

const subjectType = ['radio', 'checkbox', 'text', 'date', 'location', 'phone']
const subjectTypeName = ['单选', '多选', '问答', '日期', '地点', '手机']

export default {
  data: {
    subject: {},
    typeRange: subjectType,
    typeNameRange: subjectTypeName,
    typeIndex: -1,
    isLegal: true,
    answersLegal: true,
    inlegalText: ''
  },
  computed: {
    ...mapState({
      survey: state => state.curSurvey.survey
    }),
    error () {
      if (this.subject.question === '' && this.subject.imageUrl === '') {
        return true
      }

      let answerError = false
      this.subject.answers.map((answer) => {
        if (answer.value === '' && answer.imageUrl === '') {
          answerError = true
        }
      })
      return answerError
    }
  },
  components: {
    editAnswer,
    textOrArea,
    imageUploader
  },
  methods: {
    updateTitleValue (event) {
      console.log(event)
      this.subject.question = event.value
      this.verifySubject()
    },
    deleteImage () {
      this.subject.imageUrl = ''
      this.verifySubject()
    },
    chooseTitleImage (url) {
      console.log('chooseTitleImage', url)
      this.subject.imageUrl = url
      this.verifySubject()
    },
    subjectTypeChange (event) {
      this.typeIndex = event.mp.detail.value
      let type = this.typeRange[this.typeIndex]
      var oldType = this.subject.type
      if (type === 'date' || type === 'phone' || type === 'location') {
        if (oldType !== type) {
          this.subject.answers = []
          this.subject.type = type
        }
        return
      }

      if (type === 'radio' && oldType !== 'radio') {
        var findFirstRadio = false
        var answers = this.subject.answers
        answers = answers.map((answer) => {
          if (answer.correct && !findFirstRadio) {
            findFirstRadio = true
          } else {
            answer.correct = false
          }
          return answer
        })
        this.subject.answers = answers
      }
      this.subject.type = type
      this.subject.nlu = type === 'date'
      this.verifyAnswers()
    },
    answerChange (event) {
      this.subject.answers = event
      console.log(this.subject.answers)
    },

    verifySubject () {
      this.isLegal = this.subject.question !== '' || this.subject.imageUrl !== ''
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

    hasCorrectAnswer () {
      let correctAnswer = this.subject.answers.find(answer => {
        return answer.correct === true
      })
      return correctAnswer != null
    },

    verifyAnswers () {
      let ret = true
      if (this.subject.type === 'radio') {
        this.answersLegal = this.subject.answers.length >= 1
        this.inlegalText = '单选题最少有一个选型'
      } else if (this.subject.type === 'checkbox') {
        this.answersLegal = this.subject.answers.length >= 2
        this.inlegalText = '多选题最少有二个选型'
      } else {
        this.answersLegal = true
        this.inlegalText = ''
      }
      if (!this.answersLegal) {
        return false
      } else if (this.survey.type === 'exam') {
        if (!this.hasCorrectAnswer()) {
          this.answersLegal = false
          this.inlegalText = '没有有效的正确答案'
        }
        if (!this.answersLegal) {
          return false
        }
      }

      this.subject.answers.forEach(answer => {
        this.verifyAnswer(answer)
        ret = ret & answer.islegal
      })
      console.log('answer is', this.subject.answers)
      return ret
    },

    saveSubject () {
      this.verifySubject()
      let answerLegal = this.verifyAnswers()
      if (!this.isLegal || !answerLegal) {
        console.log('subject question is in legal')
        return
      }
      const option = this.$root.$mp.query
      if (option.action === 'create') {
        this.$store.commit('appendCurSubject', this.subject)
      } else {
        this.$store.commit('updateCurSubject', {index: option.subject, subject: this.subject})
      }
      this.$store.dispatch('saveCurSurvey', this.survey)
        .then(() => {
          wx.navigateBack()
        })
    }
  },
  onLoad (option) {
    if (!option.action) {
      console.error('need to set parameter')
    }
    if (option.action === 'create') {
      this.subject = {
        type: 'radio',
        question: '',
        imageUrl: '',
        answers: []
      }
    } else {
      this.subject = JSON.parse(JSON.stringify(this.survey.subjects[option.subject]))
    }

    this.typeIndex = this.typeRange.indexOf(this.subject.type)
  }
}
</script>

<style lang="less" scoped>
@import '../../../static/base.less';
.weui-select {
  border-right: none!important;
  text-align: center;
}

.weui-label {
  color: #999;
}

.content {
  width: 100%
}

.scroll-style{
  height: 100%;
  width: 100%;
  overflow: auto;
}

.footer {
  margin-top: 20rpx;
  margin-bottom: 20rpx;
}

.weui-cell_warn {
  font-size: 24rpx;
}


</style>
