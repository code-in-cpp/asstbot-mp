<template>
  <view class="page" v-if="hasLoaded">
    <title-bar title=" "/>
    <wxc-cc class="survey-avatar-wrap">
        <wxc-avatar class="survey-avatar" :src="displayAvatar"></wxc-avatar>
    </wxc-cc>
    <wxc-elip class="survey-title" line="2">{{survey.title}}</wxc-elip>
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
  .survey-avatar-wrap {
    display: block;
    width: 100%;
    height: 200rpx;
  }
  .survey-avatar {
    width: 160rpx;
    height: 160rpx;
    display: inline-block;
  }
  .survey-title {
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;
  }
  /*.list-wrap {*/
    /*width: 100%;*/
    /*background: @background-color;*/
    /*padding-bottom: 30rpx;*/
    /*padding-top: 30rpx;*/
    /*top: 100rpx;*/
  /*}*/
  /*.list-item {*/
    /*background: #fff;*/
    /*margin-bottom: 30rpx;*/
  /*}*/
  /*.list-item:last-child {*/
    /*margin: 0;*/
  /*}*/
  /*.item {*/
    /*flex: 1;*/
  /*}*/
  /*!*.desc-highlight {*!*/
    /*!*font-size: 24rpx;*!*/
    /*!*height: 38rpx;*!*/
    /*!*padding: 0 22rpx;*!*/
    /*!*border: 1px solid #f5342f;*!*/
    /*!*border-radius: 20rpx;*!*/
    /*!*color: #f5342f;*!*/
    /*!*line-height: 38rpx;*!*/
  /*!*}*!*/
  /*.title {*/
    /*padding-left: 20rpx;*/
    /*padding-right: 20rpx;*/
    /*padding-top: 20rpx;*/
    /*padding-bottom: 20rpx;*/
  /*}*/
  /*.button-container {*/
    /*width: 100%;*/
    /*text-align: center;*/
    /*align-items: center;*/
    /*display: flex;*/
    /*flex-direction: column;*/
    /*justify-content: space-between;*/
    /*box-sizing: border-box;*/
  /*}*/
  /*.button-small-wrap {*/
    /*margin:10rpx;*/
    /*float: left;*/
  /*}*/
</style>
