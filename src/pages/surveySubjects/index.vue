<template>

  <movable-area class="move-area">
    <view class="page">
      <title-bar title=" "/>
      <survey-item :surveyInfo="survey" @changeInfo="toEditPage" @changeAvatar="changeAvatar"></survey-item>
      <view class="content">
        <view class="weui-tab">
          <nav-bar :navItems="items" @tabActive="tabActive"></nav-bar>
          <view class="weui-tab__panel">
            <scroll-view scroll-y='true' style="height: 100%">
              <view v-if="activeIndex == 0">
                <block v-for="(subject, i) in subjects" :key="subject">
                  <view class="subject-divider"></view>
                  <view class="weui-cells weui-cells_after-title clear-border" style="border-bottom:1rpx solid #dadada">
                    <view class="weui-cell weui-cell_input subject-area subject-style font-size">
                      <view class="weui-cell__hd subject-item-style">
                        <view class="weui-label subject-title-style">题目 {{i+1}}</view>
                      </view>
                      <view class="weui-cell__bd subject-item-style">
                        <input class="weui-input subject-hieght-line" type="text" placeholder="请输入问题"
                            :value="subject.question" focus="true" confirm-type="done"
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
                  <exam-conclusion v-if="type=='exam'"/>
                  <quiz-conclusion v-else-if="type=='quiz'" />
                  <poll-conclusion v-else/>
              </view>
            </scroll-view>
          </view>
        </view>
      </view>
      <view class="footer bottom_button">
        <view class="weui-flex bottom-button-box">
          <view class="weui-flex__item btn-style-survey">
            <button class="weui-btn btn-font" type="default" @click="saveSurvey" ><i class="icon iconfont icon-brush_fill"></i>保存 </button>
          </view>
          <view class="weui-flex__item btn-style-survey">
            <button class="weui-btn btn-font" type="default" @click="selfTest" ><i class="icon iconfont icon-interactive"></i>自测</button>
          </view>
          <view class="weui-flex__item btn-style-survey">
            <button class="weui-btn btn-font" open-type="share" type="primary"><i class="icon iconfont icon-share"></i>发布 </button>
          </view>
        </view>
      </view>
    </view>
  </movable-area>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import editAnswer from '@/components/editAnswer'
import navBar from '@/components/navBar'
import imageGallery from '@/components/imageGallery'
import pollConclusion from '@/components/conclusion/pollConclusion'
import examConclusion from '@/components/conclusion/examConclusion'
import quizConclusion from '@/components/conclusion/quizConclusion'
import surveyItem from '@/components/viewSurvey/surveyItem'

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

      // pollConclusion: state => {
      //   return state.currentSurvey.survey.conclusions[0]
      // },
      subjects: state => state.currentSurvey.survey.subjects,
      typeNames: state => {
        if (!state.currentSurvey.survey.subjects) {
          return subjectTypeName[0]
        }

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
    imageGallery,
    pollConclusion,
    examConclusion,
    quizConclusion,
    surveyItem
  },

  methods: {
    ...mapMutations([
      'updateCurrentSurvey',
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
          wx.redirectTo({url: '/pages/createdSurvey/main'})
        })
        .catch((err) => {
          console.error(err)
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
            console.error(err)
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
            console.error(err)
          })
        }
      })
    },
    toEditPage () {
      wx.navigateTo({
        url: '../surveyTitleAndIntro/main'
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

  created () {
  },

  onLoad (option) {
    let that = this
    this.$store.dispatch('retrieveSurveyById', option.id)
      .then((survey) => {
        console.log(survey)
        if (survey.subjects.length) {
          survey.subjects.map(item => {
            item.imageUrl = item.imageUrl ? item.imageUrl : ''
            item.answers.map(item => {
              item.imageUrl = item.imageUrl ? item.imageUrl : ''
            })
          })
        }
        console.log('comming here............')
        that.updateCurrentSurvey(survey)
        if (survey.type !== 'exam') {
          that.initConclusion()
        }
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

</style>
