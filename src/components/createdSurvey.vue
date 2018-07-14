<template>
  <view>
    <block v-for="(survey, i) in surveyList" :key="i">
      <view style="position: relative; overflow:hidden">
        <view class="weui-cell weui-cell_access" @click="toggleShortCut(i)" hover-class="weui-cell_active">
        </view>
        <view >
          <survey-item :surveyInfo="survey" ></survey-item>
          <view class="weui-cell__ft weui-cell__ft_in-access">
          </view>
        </view>
        <view class="short-cut weui-flex transited " :class="shortCutStatus[i]">
          <view class="weui-flex__item secondary-color  dark form-control" @click="deletesurvey(i)">
            <i class="icon iconfont icon-trash"></i>
            <view class="desc">删除</view>
          </view>
          <view class="weui-flex__item secondary-color dark form-control">
            <i class="icon iconfont icon-setup" @click="editsurvey(i)"></i>
            <view class="desc">编辑</view>
          </view>
          <view class="weui-flex__item secondary-color dark form-control">
            <i class="icon iconfont icon-browse" @click="browsesurvey(i)"></i>
            <view class="desc">查看</view>
          </view>
          <view class="weui-flex__item secondary-color dark form-control">
            <i class="icon iconfont icon-share" @click="toShareSurvey(i)"></i>
            <view class="desc">分享</view>
          </view>
          <view class="weui-flex__item share primary-color light">
            <button class="primary-color form-control" open-type="share">
              <view>
                <image src='../../static/image/weixin.png' />
              </view>
            </button>
          </view>
          <view class="weui-flex__item share primary-color light">
            <button class="primary-color form-control">
              <view>
                <image src='../../static/image/moment.png'/>
              </view>
            </button>
          </view>
        </view>
      </view>
    </block>
  </view>
</template>

<script>

import surveyItem from '@/components/viewSurvey/surveyItem'
import { mapState } from 'vuex'
// import { saveQrCodeToPhotosAlbum } from '@/utils/qrcode'

export default {
  data () {
    return {
      shortCutStatus: []
    }
  },
  computed: {
    ...mapState({
      surveyList: state => state.survey.surveyList
    })
  },

  components: {
    surveyItem
  },
  watch: {
    surveyList: function (val) {
      this.shortCutStatus = this.surveyList.map(() => {
        return 'hidden'
      })
    }
  },

  methods: {
    toggleShortCut (index) {
      this.shortCutStatus = this.shortCutStatus.map((val, i) => {
        if (index === i) {
          return val !== 'hidden' ? 'hidden' : 'show'
        } else {
          return 'hidden'
        }
      })
    },
    toShareSurvey (index) {
      this.shortCutStatus = this.shortCutStatus.map((val, i) => {
        if (index === i) {
          return val === 'show' ? 'show-more' : 'show'
        } else {
          return 'hidden'
        }
      })
      this.$emit('readtoshare', this.surveyList[index])
    },
    deletesurvey (index) {
      let that = this
      wx.showModal({
        title: '您确认要删除吗？',
        confirmText: '确认',
        cancelText: '取消',
        success: function (res) {
          if (res.confirm) {
            that.$store.dispatch('deleteSurvey', that.surveyList[index].id)
          } else {
            console.log('用户点击取消操作')
          }
        }
      })
    },
    editsurvey (index) {
      wx.navigateTo({
        url: `/pages/surveySubjects/main?id=${this.surveyList[index].id}`
      })
    },
    browsesurvey (index) {
      wx.navigateTo({
        url: `/pages/display/main?id=${this.surveyList[index].id}`
      })
    }
  },

  onLoad () {
    this.$store.dispatch('retrieveSurvey')
  }
}
</script>

<style lang="less">
@import "../../static/base.less";
.short-cut {
  width: 600rpx;
  position: absolute;
  right: 0;
  bottom: 0;
  height: 100%;
}

.short-cut.hidden {
  -webkit-transform: translateX(100%);
  transform: translateX(100%);
}

.short-cut.show {
  -webkit-transform: translateX(33%);
  transform: translateX(33%);
}

.short-cut.show-more {
  -webkit-transform: translateX(0%);
  transform: translateX(0%);
}

.short-cut .weui-flex__item{
  text-align: center;
  vertical-align: middle;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.short-cut .iconfont {
  font-size: @font-size-big ;
  color: white;
}

.short-cut .desc {
  font-size: @font-size-small;
  color: white;
}

.short-cut .weui-flex__item.share image{
  width: 70rpx;
  height: 70rpx;
}

.short-cut .weui-flex__item.share button{
  padding: 10rpx 12rpx !important;
  line-height: 1.6 !important;
}

.short-cut .weui-flex__item.share button .desc{
  color: black;
}
</style>
