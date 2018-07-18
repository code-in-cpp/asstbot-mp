<template>

  <movable-area class="move-area">
    <view class="page">
      <title-bar title=" "/>
      <view class="weui-cells clear-border">
        <view class="weui-cell clear-border">
          <view class="weui-cell__hd" style="position: relative;margin-right: 10px;" @click="changeAvatar">
            <image :src="displayAvatar" style="width: 50px; height: 50px; display: block"/>
            <i class="icon iconfont icon-camera font-camera"></i>
          </view>
          <view class="weui-cell__bd">
            <view v-if="!titleEditFlag" @click="editTitle">{{survey.title}}</view>
            <input v-if="titleEditFlag" style="height: 48rpx" placeholder="请输入标题" type="text" focus="true" @blur="changeTitle" :value="survey.title">
            <view v-if="!introEditFlag" style="font-size: 13px;color: #888888;" @click="editIntro">{{survey.intro}}</view>
            <input v-if="introEditFlag" style="height: 36rpx" placeholder="请输入简介" type="text" focus="true" @blur="changeIntro" :value="survey.intro">
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
                  <view class="weui-cells weui-cells_after-title clear-border">
                    <view class="weui-cell weui-cell_input subject-area subject-style font-size">
                      <view class="weui-cell__hd subject-item-style">
                        <view class="weui-label subject-title-style">题目 {{i+1}}</view>
                      </view>
                      <view class="weui-cell__bd subject-item-style">
                        <input class="weui-input subject-hieght-line" type="text" placeholder="请输入问题" :value="subject.question"
                               @change="updateSubjectQuestion({index: i,  question: $event.mp.detail.value})"/>
                      </view>
                      <view class="subject-item-style icon-item-style" @click.stop="addMedia(i)">
                        <i class="icon iconfont icon-picture font-color"></i>
                      </view>
                      <view class="weui-cell__ft subject-item-style">
                        <picker @change="updateSubjectType({index:i, type: subjectType[$event.mp.detail.value]})" :value="subject.typeIndex" :range="subjectTypeName">
                          <view class="weui-select subject-hieght-line">{{typeNames[i]}}</view>
                        </picker>
                      </view>
                      <view class="weui-cell__ft subject-item-style">
                        <view class="icon-item-style" @click="removeSubject(i)">
                          <i class="icon iconfont icon-trash"></i>
                        </view>
                      </view>
                    </view>
                  </view>
                  <image-gallery v-if="subject.imageUrl" :imageUrl="subject.imageUrl" :index="i" :type="'question'"></image-gallery>
                  <edit-answer :subjectIndex="i" :type="subject.type" :surveyType="type" ></edit-answer>
                </block>
                <view class="subject-divider"></view>
                <view class="weui-cells weui-cells_after-title clear-border">
                  <view class="weui-cell" @click="addSubject">
                    <view class="weui-cell__hd"><i class="icon iconfont icon-add"></i></view>
                    <view class="weui-cell__bd">添加题目</view>
                  </view>
                </view>
              </view>

              <view v-if="activeIndex == 1">
                <block v-if="type=='exam'">
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
                      <view class="icon-item-style font-style" @click="addConclusionMedia(i)">
                        <i v-if="!conclusion.imageUrl" class="icon iconfont icon-picture font-color"></i>
                        <image class="answer-image" v-if="conclusion.imageUrl" :src="conclusion.imageUrl"></image>
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
                </block>
                <block v-else>
                    <view class="poll-conclusion-cell" >
                      <view class="inline-cell-title">
                        <view class="weui-cells__title">评语内容：</view>
                        <view class="icon-item-style font-style" @click="addConclusionMedia(0)">
                          <i class="icon iconfont icon-picture font-color"></i>
                        </view>
                      </view>
                      <view class="poll-conclusion-bd">
                        <textarea class="weui-textarea" placeholder="请输入文本" :value="pollConclusion.text"
                               @input="updateConclusionText({index: 0, text: $event.mp.detail.value})"/>
                      </view>
                      <image-gallery v-if="pollConclusion.imageUrl" :imageUrl="pollConclusion.imageUrl" :index="0" :type="'pollConclusion'"></image-gallery>
                    </view>
                </block>
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
    <home-button/>
  </movable-area>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import editAnswer from '@/components/editAnswer'
import navBar from '@/components/navBar'
import imageGallery from '@/components/imageGallery'

const subjectType = ['radio', 'checkbox', 'text', 'date', 'location', 'phone']
const subjectTypeName = ['单选', '多选', '问答', '日期', '地点', '手机']

export default {
  data () {
    return {
      subjectTypeName: subjectTypeName,
      subjectType: subjectType,
      items: ['题目', '评语'],
      activeIndex: 0,
      titleEditFlag: false,
      introEditFlag: false
    }
  },

  computed: {
    ...mapState({
      displayAvatar: state => {
        var surveyAvatarUrl = (state.currentSurvey.survey.avatarUrl !== null && state.currentSurvey.survey.avatarUrl !== 'null' && state.currentSurvey.survey.avatarUrl !== '') ? state.currentSurvey.survey.avatarUrl : ''
        return surveyAvatarUrl === '' ? state.bodProfile.avatar : surveyAvatarUrl
      },
      survey: state => {
        return state.currentSurvey.survey
      },
      type: state => state.currentSurvey.survey.type,
      conclusions: state => {
        return state.currentSurvey.survey.conclusions
      },

      pollConclusion: state => {
        return state.currentSurvey.survey.conclusions[0]
      },
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
    navBar,
    imageGallery
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
      'initConclusion',
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
          wx.navigateBack()
        })
    },
    tabActive (event) {
      this.activeIndex = event
    },
    changeAvatar () {
      const that = this
      wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: function (res) {
          that.$store.dispatch('uploadImage', res.tempFilePaths[0]).then(res => {
            that.$store.commit('updateSurveyAvatarUrl', res)
          }).catch(err => {
            console.log(err)
          })
        }
      })
    },
    addMedia (index) {
      const that = this
      wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: function (res) {
          that.$store.dispatch('uploadImage', res.tempFilePaths[0]).then(res => {
            that.$store.commit('updateSubjectQuestionImage', {index, imageUrl: res})
          }).catch(err => {
            console.log(err)
          })
        }
      })
    },

    addConclusionMedia (index) {
      const that = this
      wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: function (res) {
          that.$store.dispatch('uploadImage', res.tempFilePaths[0]).then(res => {
            console.log(res)
            that.$store.commit('updateConclusionimage', {index: index, imageUrl: res})
          }).catch(error => {
            console.log(error)
          })
        }
      })
    },
    editTitle () {
      this.titleEditFlag = true
    },
    changeTitle (e) {
      if (e.mp.detail.value) {
        this.$store.commit('updateSurveyTitle', e.mp.detail.value)
        this.titleEditFlag = false
      } else {
        wx.showToast({title: '请输入标题'})
      }
    },
    editIntro () {
      this.introEditFlag = true
    },
    changeIntro (e) {
      if (e.mp.detail.value) {
        this.$store.commit('updateSurveyIntro', e.mp.detail.value)
        this.introEditFlag = false
      } else {
        wx.showToast({title: '请输入简介'})
      }
    }
  },

  created () {
  },

  onLoad (option) {
    var survey = this.$store.getters.getSurvey(option.id)
    console.log(survey)
    if (survey.subjects.length) {
      survey.subjects.map(item => {
        item.imageUrl = item.imageUrl ? item.imageUrl : ''
        item.answers.map(item => {
          item.imageUrl = item.imageUrl ? item.imageUrl : ''
        })
        return item
      })
    }
    this.updateCurrentSurvey(survey)
    if (this.type !== 'exam') {
      this.initConclusion()
    }
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
.poll-style {
  padding-top: 10rpx;
}

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
  display: inline-block;
  font-size:40rpx!important;
}

.inline-cell-title{
  display: inline-flex;
  border-bottom:1rpx solid #dadada;
}

.poll-conclusion-bd {
  margin-top: 30rpx;
  margin-left: 30rpx;
}
.subject-style{
  height:92rpx;
  overflow: hidden;
  box-sizing: border-box;
}
.subject-item-style{
  height:100%;
  line-height: 92rpx;
}
.subject-title-style{
  color:#999;
  width:150rpx;
}
.icon-item-style{
  width:48rpx;
  text-align: center;
}
.font-style{
  height:92rpx;
  width:92rpx;
  line-height:92rpx;
  text-align:center;
}
.subject-hieght-line{
  height:100%;
  line-height: 92rpx;
}
.answer-image{
  width:70rpx;
  height:70rpx;
  display:inline-block;
  margin-top:11rpx;
}

.poll-conclusion-cell{
  padding:20rpx 30rpx;
  display: flex;
  flex-direction: column;
  background: #ffffff;
}

.font-camera{
  position:absolute;
  top:0;
  right:0;
  font-size:28rpx;
  width:32rpx;
  height:32rpx;
  line-height:32rpx;
  text-align:center;
}

.weui-textarea{
  background-color: #ffffff;
  height: 100rpx;
}
</style>
