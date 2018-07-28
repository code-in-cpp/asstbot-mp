<template>
  <view class="page">
    <title-bar title=" "/>
    <view class="title">
      <wxc-elip line="2">标题： {{survey.title}}</wxc-elip>
    </view>
    <view class="list-wrap">
      <view class="list-item">
        <block v-for="(item, i) in survey.subjects" :key="i">
          <question :question = "item"></question>
        </block>
      </view>
    </view>
  </view>
</template>

<script>
  import { mapMutations } from 'vuex'
  import question from '@/components/survey/question'
  export default {
    data () {
      return {
        survey: {}
      }
    },
    components: {
      question
    },
    methods: {
      ...mapMutations([
        'initConclusion',
        'updateCurrentSurvey'
      ]),
      commentClicked (event) {
        console.log('comment clicked')
      },

      helpClicked (event) {
        console.log('help clicked')
      }
    },
    onLoad (option) {
      let that = this
      console.log(option)
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
          console.log('comming here............')
          that.updateCurrentSurvey(survey)
          if (survey.type !== 'exam') {
            that.initConclusion()
          }
          that.survey = survey
          console.log(this.survey)
        })
        .catch((err) => {
          console.log(err)
        })
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
</style>
