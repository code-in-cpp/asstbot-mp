<template>
  <view class="page">
    <view class="weui-cells">
      <view class="weui-cell">
        <view class="weui-cell__hd" style="position: relative;margin-right: 10px;">
            <image :src="displayAvatar" style="width: 50px; height: 50px; display: block"/>
        </view>
        <view class="weui-cell__bd">
            <view>{{survey.title}}</view>
            <view style="font-size: 13px;color: #888888;">{{survey.intro}}</view>
        </view>
      </view>
    </view>
    <view class="content">
      <scroll-view scroll-y='true' style="height: 100%">
        <view class="weui-cells__title">结论</view>
        <view class="weui-cells weui-cells_after-title">
          <block v-for="(conclusion, i) in conclusions" :key="conclusion">
            <view class="weui-cells__title">            
              <view class="weui-cell" >
                <view class="weui-cell__bd">
                  <view class="weui-label">结论 {{i+1}}</view>
                </view>
                <view class="weui-cell__ft">
                  <button class="weui-btn mini-btn" type="warn" size="mini" @click="removeConclusion(i)">删除</button>
                </view>
              </view>
            </view>
            <view class="weui-cells weui-cells_after-title">
              <view class="weui-cell weui-cell_input" >
                <view class="weui-cell__hd">
                  <view class="weui-label">最低得分</view>
                </view>
                <view class="weui-cell__bd">
                  <input class="weui-input" type="number" placeholder="0" :value="conclusion.scoreRange.min"
                    @change="updateConclusionMinScore({index: i, value: $event.mp.detail.value})"/>
                </view>
              </view>
              <view class="weui-cell weui-cell_input" >
                <view class="weui-cell__hd">
                  <view class="weui-label">最高得分</view>
                </view>
                <view class="weui-cell__bd">
                  <input class="weui-input" type="number" placeholder="0" :value="conclusion.scoreRange.max"
                    @change="updateConclusionMaxScore({index: i, value: $event.mp.detail.value})"/>
                </view>
              </view>
              <view class="weui-cell weui-cell_input" >
                <view class="weui-cell__hd">
                  <view class="weui-label">结果</view>
                </view>
                <view class="weui-cell__bd">
                  <input class="weui-input" placeholder="请输入文本" :value="conclusion.text"
                     @change="updateConclusionText({index: i, text: $event.mp.detail.value})"/>
                </view>
              </view>
            </view>
          </block>
          <view class="weui-cell weui-cell_link" @click="addConclusion">
            <view class="weui-cell__bd">添加结果</view>
          </view>
        </view>
        <view class="weui-cells__title">题目</view>
        <view class="weui-cells weui-cells_after-title">
          <block v-for="(subject, i) in subjects" :key="subject">
            <view class="weui-cells__title">            
              <view class="weui-cell" >
                <view class="weui-cell__bd">
                  <view class="weui-label">题目 {{i+1}}</view>
                </view>
                <view class="weui-cell__ft">
                  <button class="weui-btn mini-btn" type="warn" size="mini" @click="removeSubject(i)">删除</button>
                </view>
              </view>
            </view>
            <view class="weui-cells weui-cells_after-title">
              <view class="weui-cell weui-cell_input" >
                <view class="weui-cell__hd">
                  <view class="weui-label">题目</view>
                </view>
                <view class="weui-cell__bd">
                  <input class="weui-input" type="text" placeholder="请输入问题" :value="subject.question"
                    @change="updateSubjectQuestion({index: i, question: subject.question})"/>
                </view>
              </view>
              <view class="weui-cell weui-cell_input" >
                <view class="weui-cell__hd">
                  <view class="weui-label">类型</view>
                </view>
                <view class="weui-cell__bd">
                  <picker @change="updateSubjectType({index:i, type: subjectType[$event.mp.detail.value]})" :value="subject.typeIndex" :range="subjectTypeName">
                    <view class="weui-select">{{typeNames[i]}}</view>
                  </picker>
                </view>
              </view>
              <view class="weui-cells__title">答案列表</view>
              <view class="weui-cells weui-cells_after-title">
                <view class="weui-cell weui-cell_input" v-for="(answer, j) in subject.answers" :key="j">
                  <view class="weui-cell__hd">
                    <view class="weui-label">答案 {{j+1}}</view>
                  </view>
                  <view class="weui-cell__bd">
                    <input class="weui-input" type="text" placeholder="请输入答案" 
                      @change="updateAnswerValue({subject: i, answer: j, value: $event.mp.detail.value})"
                      :value="answer.value"/>
                  </view>
                  <view class="weui-cell__bd">
                    <switch @change="updateAnswerCorrect({subject: i, answer: j, value: $event.mp.detail.value})" 
                      :checked="answer.correct"></switch>
                  </view>
                  <view class="weui-cell__ft">
                    <button class="weui-btn mini-btn" type="warn" size="mini" @click="removeAnswer({subject:i, answer:j})">删除</button>
                  </view>
                </view>
                <view class="weui-cell weui-cell_link" @click="addAnswer(i)">
                  <view class="weui-cell__bd">添加答案</view>
                </view>
              </view>
            </view>
          </block>
          <view class="weui-cell weui-cell_link" @click="addSubject">
            <view class="weui-cell__bd">添加题目</view>
          </view>
        </view>  
      </scroll-view>
    </view>
    <view class="footer">
      <button class="weui-btn" type="primary" @click="saveBot">保存配置</button>
    </view>
  </view>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

const subjectType = ['radio', 'checkbox', 'text']
const subjectTypeName = ['单选', '多选', '问答']

export default {
  data () {
    return {
      subjectTypeName: subjectTypeName,
      subjectType: subjectType
    }
  },

  computed: {
    ...mapState({
      displayAvatar: state => {
        var surveyAvatarUrl = state.currentSurvey.survey.avatarUrl || ''
        return surveyAvatarUrl === '' ? state.bodProfile.avatar : surveyAvatarUrl
      },
      survey: state => state.currentSurvey.survey,
      conclusions: state => state.currentSurvey.survey.conclusions,
      subjects: state => state.currentSurvey.survey.subjects,
      typeNames: state => {
        return state.currentSurvey.survey.subjects.map((subject) => {
          var index = subjectType.indexOf(subject.type)
          return subjectTypeName[index]
        })
      }
    })
  },

  methods: {
    ...mapMutations([
      'updateCurrentSurvey',
      'updateConclusionMinScore',
      'updateConclusionMaxScore',
      'updateConclusionText',
      'addConclusion',
      'removeConclusion',
      'addSubject',
      'removeSubject',
      'updateSubjectType',
      'updateSubjectQuestion',
      'addAnswer',
      'removeAnswer',
      'updateAnswerValue',
      'updateAnswerCorrect'
    ]),
    saveBot () {
      this.$store.dispatch('editSurvey', this.survey)
        .then(() => {
          wx.navigateBack({
            delta: 1
          })
        })
    }
  },

  created () {
  },

  onLoad (option) {
    var survey = this.$store.getters.getSurvey(option.id)
    this.updateCurrentSurvey(survey)
  }
}
</script>

<style>
.content {
  flex-direction: column;
}

</style>
