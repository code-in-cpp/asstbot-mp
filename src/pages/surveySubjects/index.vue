<template>
  <movable-area class="move-area">
    <view class="page">
      <title-bar title=" "/>
      <survey-item :surveyInfo="survey" @changeInfo="toEditPage" @changeAvatar="changeAvatar"></survey-item>
      <view class="content">
        <view class="weui-tab">
          <nav-bar :navItems="updateTitle" @tabActive="tabActive"></nav-bar>
          <view class="weui-tab__panel">
            <scroll-view scroll-y='true' style="height: 100%">
              <view v-if="activeIndex == 0">
                <view v-for="(subject, i) in subjects" :key="i" class="subject-wrapper" :class="ativeSubjectIndex===i?'active-subject':''">
                  <view @click="toggleSubject(i)">
                    <view class="weui-cells weui-cells_after-title clear-border" style="border-bottom:1rpx solid #dadada">
                      <view class="weui-cell weui-cell_input subject-area subject-style font-size">
                        <view class="weui-cell__hd subject-item-style flex-1">
                          <view class="weui-label subject-title-style">题目 {{i+1}}</view>
                        </view>
                        <view class="weui-cell__ft subject-item-style">
                          <view class="subject-hieght-line">{{typeNames[i]}}</view>
                        </view>
                      </view>
                    </view>

                    <da-text :content="subject.question"></da-text>
                    <da-image :url="subject.imageUrl"/>
                    <da-answer :subjectIndex="i" :type="subject.type" :surveyType="type"></da-answer>
                  </view>
                  <view :id="'subject-operation-'+i">
                    <subject-operation :subject="i" v-if="ativeSubjectIndex===i" @actionDone="ativeSubjectIndex=-1"/>
                  </view>
                </view>
                <view class="weui-cells weui-cells_after-title clear-border">
                  <view class="weui-cell">
                    <view class="weui-cell__ft" @click="addSubject"><i class="icon iconfont icon-add"></i></view>
                    <view class="weui-cell__ft" @click="addSubject">添加题目</view>
                  </view>
                </view>
              </view>

              <view v-if="activeIndex == 1">
                <view v-for="(conclusion, i) in conclusions" :key="conclusion" :class="activeConclusionIndex===i?'active-conclusion':''">
                  <view @click="toggleConclusion(i)">
                    <conclusion :surveyType="survey.type" :conclusion="conclusion" :index="i"/>
                  </view>
                  <view :id="'conclusion-operation-'+i">
                    <conclusion-operation :conclusion="i" v-if="activeConclusionIndex===i" @actionDone="activeConclusionIndex=-1"/>
                  </view>
                </view>
                <view class="subject-divider"></view>
                <view class="weui-cells weui-cells_after-title clear-border" v-if="survey.type=='exam'||survey.type=='quiz'||conclusions.length == 0">
                  <view class="weui-cell">
                    <view class="weui-cell__ft" @click="addConclusion"><i class="icon iconfont icon-add"></i></view>
                    <view class="weui-cell__ft" @click="addConclusion">添加结论</view>
                  </view>
                </view>
              </view>
            </scroll-view>
          </view>
        </view>
      </view>
      <view class="footer bottom_button">
        <view class="weui-flex bottom-button-box">
          <view class="weui-flex__item btn-style-survey" v-if="activeIndex==0">
            <button class="weui-btn btn-font" type="default" @click="addSubject"><i class="icon iconfont icon-add"></i>新题目</button>
          </view>          
          <view class="weui-flex__item btn-style-survey" v-if="activeIndex==1">
            <button class="weui-btn btn-font" type="default" @click="addConclusion"><i class="icon iconfont icon-add"></i>新结论 </button>
          </view>
          <view class="weui-flex__item btn-style-survey">
            <button class="weui-btn btn-font" type="default" @click="selfTest"><i class="icon iconfont icon-live"></i>自测</button>
          </view>
          <view class="weui-flex__item btn-style-survey">
            <button class="weui-btn btn-font" type="primary" @click="toPublishPage" :disabled="disableShare"><i class="icon iconfont icon-share"></i>分享 </button>
          </view>
        </view>
      </view>
    </view>
  </movable-area>
</template>

<script>
import { mapState } from 'vuex'
import navBar from '@/components/navBar'
import daText from '@/components/view/daText'
import daImage from '@/components/view/daImage'
import daAnswer from '@/components/view/daAnswer'
import subjectOperation from '@/components/widget/subjectOperation'
import conclusion from '@/components/conclusion/conclusion'
import conclusionOperation from '@/components/widget/conclusionOperation'
import surveyItem from '@/components/viewSurvey/surveyItem'

const subjectType = ['radio', 'checkbox', 'text', 'date', 'location', 'phone']
const subjectTypeName = ['单选', '多选', '问答', '日期', '地点', '手机']

export default {
  data () {
    return {
      subjectTypeName: subjectTypeName,
      subjectType: subjectType,
      items: ['题目', '结论'],
      activeIndex: 0,
      titleEditFlag: false,
      introEditFlag: false,
      textareaShowArray: [],
      source: 'main',
      ativeSubjectIndex: -1,
      activeConclusionIndex: -1
    }
  },
  computed: {
    ...mapState({
      displayAvatar: state => {
        var surveyAvatarUrl = (state.curSurvey.survey.avatarUrl !== null && state.curSurvey.survey.avatarUrl !== 'null' && state.curSurvey.survey.avatarUrl !== '') ? state.curSurvey.survey.avatarUrl : ''
        return surveyAvatarUrl === '' ? state.bodProfile.avatar : surveyAvatarUrl
      },
      survey: state => {
        return state.curSurvey.survey
      },
      type: state => state.curSurvey.survey.type,
      conclusions: state => {
        return state.curSurvey.survey.conclusions
      },

      subjects: state => state.curSurvey.survey.subjects,
      typeNames: state => {
        if (!state.curSurvey.survey.subjects) {
          return subjectTypeName[0]
        }

        return state.curSurvey.survey.subjects.map((subject) => {
          var index = subjectType.indexOf(subject.type)
          return subjectTypeName[index]
        })
      }
    }),
    updateTitle () {
      if (!this.survey || !this.survey.subjects || !this.survey.conclusions) {
        return ['题目', '结论']
      }
      return [`题目 ( ${this.survey.subjects.length} )`,
        `结论 ( ${this.survey.conclusions.length} )`]
    },
    disableShare () {
      if (!this.survey || !this.survey.subjects) {
        return true
      }
      return this.survey.subjects.length === 0
    },
    scrollToView () {
      if (this.activeIndex === 0) {
        return `subject-operation-${this.ativeSubjectIndex}`
      } else {
        return `conclusion-operation-${this.activeConclusionIndex}`
      }
    }
  },

  components: {
    navBar,
    daText,
    daImage,
    daAnswer,
    subjectOperation,
    conclusion,
    conclusionOperation,
    surveyItem
  },

  methods: {
    saveSurvey () {
      this.$store.dispatch('saveCurSurvey', this.survey)
        .then(() => {
          if (this.source === 'main') {
            wx.navigateBack()
          } else {
            wx.reLaunch({
              url: '../index/main?scene=relaunchFrom'
            })
          }
        })
        .catch((err) => {
          console.error(err)
        })
    },
    tabActive (event) {
      this.activeIndex = event
      this.ativeSubjectIndex = -1
      this.activeConclusionIndex = -1
    },
    toggleSubject (subject) {
      if (this.ativeSubjectIndex === subject) {
        this.ativeSubjectIndex = -1
      } else {
        this.ativeSubjectIndex = subject
      }
    },
    toggleConclusion (conclusion) {
      console.log(conclusion)
      if (this.activeConclusionIndex === conclusion) {
        this.activeConclusionIndex = -1
      } else {
        this.activeConclusionIndex = conclusion
      }
    },
    changeAvatar () {
      const that = this
      wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: function (res) {
          that.$store.dispatch('uploadImage', res.tempFilePaths[0]).then(res => {
            that.$store.commit('changeCurSurveyAvatar', res)
            that.$store.dispatch('saveCurSurvey', that.survey)
          }).catch(err => {
            console.error(err)
          })
        }
      })
    },
    addSubject () {
      wx.navigateTo({
        url: '/pages/editsubject/main?action=create'
      })
    },
    addConclusion () {
      wx.navigateTo({
        url: '/pages/editconclusion/main?action=create'
      })
    },
    toEditPage () {
      wx.navigateTo({
        url: '../surveyTitleAndIntro/main'
      })
    },
    toPublishPage () {
      wx.navigateTo({
        url: `../publish/main?id=${this.survey.id}&title=${this.survey.title}&avatarUrl=${this.survey.avatarUrl}`
      })
    },
    selfTest () {
      this.$store.dispatch('editSurvey', this.survey)
        .then(() => {
          wx.navigateTo({
            url: `/pages/surveyChat/main?id=${this.survey.id}&scene=test`
          })
        })
    }
  },

  onLoad (option) {
    if (option.source) {
      this.source = option.source
    }
    this.$store.dispatch('retrieveCurSurvey', option.id)
      .then((survey) => {
      })
      .catch((err) => {
        console.log(err)
      })
  },
  onShareAppMessage (res) {
    let surveyId = this.survey.id
    this.$store.dispatch('editSurvey', this.survey)
      .then(() => {
        wx.navigateTo({
          url: `/pages/display/main?id=${surveyId}`
        })
      })
    return {
      title: this.survey.title,
      path: '/pages/surveyChat/main?id=' + this.survey.id,
      imageUrl: this.survey.avatarUrl
    }
  }
}
</script>

<style lang="less">
@import "../../../static/base.less";

.content {
  flex-direction: column;
}

.mini-btn{
    width: 30%;
    margin-right: 20rpx;
}

.subject-divider {
  height: 20rpx;
  border-top:1rpx solid #dadada;
}

.bottom_button {
  margin: 40rpx 15rpx
}

.bottom_button .weui-btn {
  width: 210rpx;
  line-height: 2;
}

.iconfont {
  display: inline-block;
  font-size:32rpx!important;
}

.btn-font {
  font-size: 32rpx;
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

.right-btn-box{
  height: 100%;
}

.bottom-button-box{
  display: flex;
  justify-content: center;
}

.btn-style-survey{
  margin-right: 30rpx;
}
.flex-1{
  flex:1
}

.subject-wrapper {
  margin-bottom: 20rpx;
}

.active-subject, .active-conclusion {
  border: solid 2rpx @s-color
}
</style>
