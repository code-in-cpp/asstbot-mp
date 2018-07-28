<template>
  <view class="box-padding" :class="[showDetail?'show-border':'']">
  <!--<view class="show-border">-->
    <wxc-list
      class="item"
      :src="getIcon"
      :arrow="arrowType"
      :title="question.question"
      @clickOnThis="questionClicked">
    </wxc-list>
    <block v-if="showDetail">
      <view class="answer-wrap">
        <view class="list-item">
          <block v-for="(answer, i) in question.answers" :key="i">
            <!--<question :question = "item"></question>-->
            <wxc-list
              class="item"
              :src=answer.imageUrl
              :title=answer.value
              arrow=""
              @clickOnThis="questionClicked">
            </wxc-list>
          </block>
        </view>
      </view>
    </block>
  </view>
</template>


<script>
  export default {
    data () {
      return {
        arrowType: 'arrow-right'
      }
    },
    props: {
      question: {
        type: Object,
        default: {}
      },
      showDetail: {
        default: false,
        type: Boolean
      }
    },
    watch: {
      showDetail: function (newValue, oldValue) {
        console.log('clicked, showDetail changed')
        if (newValue) {
          this.arrowType = 'arrow-down'
        } else {
          this.arrowType = 'arrow-right'
        }
      }
    },
    computed: {
      getIcon () {
        if (!this.question || !this.question.type) {
          return '/static/image/radiao.png'
        }
        return '/static/image/' + this.question.type + '.png'
      },
      getTitle () {
        if (this.showDetail) {
          return 'detatiled'
        }
        return 'hide'
      }
    },
    // components: {
    //   viewAvatar,
    //   Badge
    // },
    methods: {
      // changeInfo () {
      //   console.log('survey item, try to change info')
      //   this.$emit('changeInfo')
      // },
      // changeAvatar () {
      //   console.log('survey item, try to change avatar')
      //   this.$emit('changeAvatar')
      // }
      questionClicked () {
        console.log('questionClicked')
        this.showDetail = !this.showDetail
      },
      answerClicked () {
        console.log('answerClicked')
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../../static/base.less";
  .box-padding {
    margin: 10rpx;
  }
  .show-border {
    border: @s-color solid 2rpx;
    box-sizing: border-box;
  }
  .list-wrap {
    width: 100%;
    background: #efefef;
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
  .item:last-of-type {
    /*mode="none"*/
  }
  .answer-wrap {
    width: 690rpx;
    background: #efefef;
    margin-bottom: 10rpx;
    margin-top: 10rpx;
    margin-left: 30rpx;
    margin-right: 30rpx;
    /*border: @s-color solid 2rpx;*/
  }
</style>
