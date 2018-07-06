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
      <view class="weui-tab">
        <nav-bar :navItems="items" @tabActive="tabActive"></nav-bar>
        <view class="weui-tab__panel">
          <scroll-view scroll-y='true' style="height: 100%">
            <view v-if="activeIndex == 0">
              <block v-for="(subject, i) in subjects" :key="subject">
                <view class="subject-divider"></view>
                <view class="weui-cells weui-cells_after-title">
                  <view class="weui-cell weui-cell_input subject-area" >
                    <view class="weui-cell__hd">
                      <view class="weui-label">题目 {{i+1}}</view>
                    </view>
                    <view class="weui-cell__bd">
                      <input class="weui-input" type="text" placeholder="请输入问题" :value="subject.question"
                        @change="updateSubjectQuestion({index: i,  question: $event.mp.detail.value})"/>
                    </view>
                    <view class="weui-cell__ft">
                      <picker @change="updateSubjectType({index:i, type: subjectType[$event.mp.detail.value]})" :value="subject.typeIndex" :range="subjectTypeName">
                        <view class="weui-select">{{typeNames[i]}}</view>
                      </picker>
                    </view>
                    <view class="weui-cell__ft">
                      <view @click="removeSubject(i)">
                        <i class="icon iconfont icon-trash"></i>
                      </view>
                    </view>
                  </view>

                </view>
                <edit-answer :subjectIndex="i" :type="subject.type" ></edit-answer>
              </block>
              <view class="subject-divider"></view>
              <view class="weui-cells weui-cells_after-title">
                <view class="weui-cell" @click="addSubject">
                  <view class="weui-cell__hd"><i class="icon iconfont icon-add"></i></view>
                  <view class="weui-cell__bd">添加题目</view>
                </view>
              </view>
            </view>

            <view v-if="activeIndex == 1">
              <view class="weui-cells weui-cells_after-title" v-for="(conclusion, i) in conclusions" :key="conclusion">
                <view class="subject-divider"></view>
                <view class="weui-cells__title">
                  <view class="weui-cell" >
                    <view class="weui-cell__bd">
                      <view class="weui-label">评语分类 {{i+1}}</view>
                    </view>
                    <view class="weui-cell__ft">
                      <view @click="removeConclusion(i)">
                        <i class="icon iconfont icon-trash"></i>
                      </view>
                    </view>
                  </view>
                </view>
                <view class="weui-cells weui-cells_after-title">
                  <view class="weui-cell weui-cell_input" >
                    <view class="weui-cell__hd">
                      <view class="weui-label">最少答对题数</view>
                    </view>
                    <view class="weui-cell__bd">
                      <input class="weui-input" type="number" :value="conclusion.scoreRange.min"
                        @change="updateConclusionMinScore({index: i, value: $event.mp.detail.value})"/>
                    </view>
                  </view>
                  <view class="weui-cell weui-cell_input" >
                    <view class="weui-cell__hd">
                      <view class="weui-label">最多答对题数</view>
                    </view>
                    <view class="weui-cell__bd">
                      <input class="weui-input" type="number" :value="conclusion.scoreRange.max"
                        @change="updateConclusionMaxScore({index: i, value: $event.mp.detail.value})"/>
                    </view>
                  </view>
                  <view class="weui-cell weui-cell_input" >
                    <view class="weui-cell__hd">
                      <view class="weui-label">评语内容</view>
                    </view>
                    <view class="weui-cell__bd">
                      <input class="weui-input" placeholder="请输入文本" :value="conclusion.text"
                        @change="updateConclusionText({index: i, text: $event.mp.detail.value})"/>
                    </view>
                  </view>
                </view>
              </view>
              <view class="subject-divider"></view>
              <view class="weui-cells weui-cells_after-title" >
                <view class="weui-cell" @click="addConclusion">
                  <view class="weui-cell__hd"><i class="icon iconfont icon-add"></i></view>
                  <view class="weui-cell__bd">添加评语分类</view>
                </view>
              </view>
            </view>
          </scroll-view>
        </view>
      </view>
    </view>
    <view class="footer bottom_button">
      <view class="weui-flex">
        <view class="weui-flex__item">
          <button class="weui-btn" type="warn" @click="clearSurvey"><i class="icon iconfont icon-delete"></i>清空</button>
        </view>
        <view class="weui-flex__item">
          <button class="weui-btn" type="default" @click="saveSurvey" ><i class="icon iconfont icon-brush_fill"></i>保存 </button>
        </view>
        <view class="weui-flex__item">
          <button class="weui-btn" open-type="share" type="primary"><i class="icon iconfont icon-share"></i>发布 </button>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import editAnswer from '@/components/editAnswer'
import navBar from '@/components/navBar'

const subjectType = ['radio', 'checkbox', 'text']
const subjectTypeName = ['单选', '多选', '问答']

export default {
  data () {
    return {
      subjectTypeName: subjectTypeName,
      subjectType: subjectType,
      items: ['题目', '评语'],
      activeIndex: 0
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

  components: {
    editAnswer,
    navBar
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
      'clearSurvey',
      'removeSubject',
      'updateSubjectType',
      'updateSubjectQuestion',
      'addAnswer',
      'removeAnswer',
      'updateAnswerValue',
      'updateAnswerCorrect'
    ]),
    saveSurvey () {
      this.$store.dispatch('editSurvey', this.survey)
        .then(() => {
          wx.navigateTo({
            url: `/pages/home/main`
          })
        })
    },
    tabActive (event) {
      this.activeIndex = event
    }
  },

  created () {
  },

  onLoad (option) {
    var survey = this.$store.getters.getSurvey(option.id)
    this.updateCurrentSurvey(survey)
  },

  onShareAppMessage (res) {
    if (res.from === 'button') {
      console.log(res.target)
    }
    let surveyId = this.survey.id
    this.$store.dispatch('editSurvey', this.survey)
        .then(() => {
          wx.navigateTo({
            url: `/pages/display/main?id=${surveyId}`
          })
        })
    return {
      title: this.survey.title,
      path: '/pages/index/main?id=' + this.survey.id,
      imageUrl: this.survey.avatarUrl
    }
  }
}
</script>

<style>
.content {
  flex-direction: column;
}

.mini-btn{
    width: 30%;
    margin-right: 20rpx;
}
.weui-select {
  border-right: 0 !important;
}

.subject-divider {
  margin-top: 10px;
}

.bottom_button {
  margin: 40rpx 15rpx
}

.bottom_button .weui-btn {
  width: 210rpx;
  line-height: 2
}

.iconfont {
  display: inline-block
}

</style>
