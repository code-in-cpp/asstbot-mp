<template>
  <view class="page" v-if="hasLoaded">
    <title-bar title=" "/>
    <survey-item :surveyInfo="survey" @changeInfo="toEditPage" @changeAvatar="changeAvatar"></survey-item>
    <wxc-tab @tabchange="onClick" default-index="0" active-text-color="#1cb2b9" active-line-color="#1cb2b9" component-id="tab1">
      <wxc-tab-panel label='题目' component-id="tab1">
      </wxc-tab-panel>
      <wxc-tab-panel label='结论' component-id="tab1">
      </wxc-tab-panel>
    </wxc-tab>
    <scroll-view scroll-y='true' style="height: 840rpx">
      <view class="list-wrap">
        <view class="list-item">
          <block v-for="(item, i) in survey.subjects" :key="i">
            <question :question = "item"></question>
          </block>
        </view>
      </view>
    </scroll-view>
    <view class="button-container">
      <view class="button-small-wrap">
        <wxc-button :btnStyle="editStyle">返回 <wxc-icon color="#fff" type="arrow-left"></wxc-icon></wxc-button>
        <wxc-button :btnStyle="editStyle">添加 <wxc-icon color="#fff" type="add"></wxc-icon></wxc-button>
      </view>
    </view>
  </view>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'
  import question from '@/components/survey/question'
  import surveyItem from '@/components/viewSurvey/surveyItem'
  export default {
    data () {
      return {
        editStyle: 'width: 222rpx;background: #c1c1c1; border-radius: 66rpx;color: #fff; margin-left:30rpx; margin-right:30rpx;',
        hasLoaded: false
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
        subjects: state => state.currentSurvey.survey.subjects
      //   typeNames: state => {
      //     if (!state.currentSurvey.survey.subjects) {
      //       return subjectTypeName[0]
      //     }
      //
      //     return state.currentSurvey.survey.subjects.map((subject) => {
      //       var index = subjectType.indexOf(subject.type)
      //       return subjectTypeName[index]
      //     })
      //   }
      })
    },
    components: {
      question,
      surveyItem
    },
    methods: {
      ...mapMutations([
        'initConclusion',
        'updateCurrentSurvey'
      ]),
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
      toEditPage () {
        wx.navigateTo({
          url: '../surveyTitleAndIntro/main'
        })
      }
    },
    onLoad (option) {
      let that = this
      if (option.source) {
        this.source = option.source
      }
      this.$store.dispatch('retrieveSurveyById', option.id)
        .then((survey) => {
          if (survey.subjects.length) {
            survey.subjects.map(item => {
              item.imageUrl = item.imageUrl ? item.imageUrl : ''
              item.answers.map(item => {
                item.imageUrl = item.imageUrl ? item.imageUrl : ''
              })
            })
          }
          that.hasLoaded = true
          that.updateCurrentSurvey(survey)
          console.log(survey)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    onUnload () {
      this.hasLoaded = false
    }
  }
</script>

<style lang="less" scoped>
  @import "../../../static/base.less";
  .list-wrap {
    width: 100%;
    background: @background-color;
    padding-bottom: 30rpx;
    padding-top: 30rpx;
    top: 100rpx;
  }
  .list-item {
    background: #fff;
    margin-bottom: 30rpx;
  }
  .list-item:last-child {
    margin: 0;
  }
  .item {
    flex: 1;
  }
  /*.desc-highlight {*/
    /*font-size: 24rpx;*/
    /*height: 38rpx;*/
    /*padding: 0 22rpx;*/
    /*border: 1px solid #f5342f;*/
    /*border-radius: 20rpx;*/
    /*color: #f5342f;*/
    /*line-height: 38rpx;*/
  /*}*/
  .title {
    padding-left: 20rpx;
    padding-right: 20rpx;
    padding-top: 20rpx;
    padding-bottom: 20rpx;
  }
  .button-container {
    width: 100%;
    text-align: center;
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-sizing: border-box;
  }
  .button-small-wrap {
    margin:10rpx;
    float: left;
  }
</style>
