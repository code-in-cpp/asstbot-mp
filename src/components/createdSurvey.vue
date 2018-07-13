<template>
  <view>
    <block v-for="(survey, i) in surveyList" :key="i">
      <view style="position: relative;">
        <view class="weui-cell weui-cell_access" @click="toggleShortCut(i)" hover-class="weui-cell_active">
          <view class="weui-cell__hd">
            <bod-avatar size="40" :url="survey.avatarUrl"></bod-avatar>
          </view>
          <view class="weui-cell__bd ">
            <view class="bot-info">
              <view class="weui-media-box__title">{{survey.title}}</view>
              <view class="weui-media-box__desc">{{survey.intro}}</view>
            </view>
          </view>
          <view class="weui-cell__ft weui-cell__ft_in-access">
          </view>
        </view>
        <view class="short-cut weui-flex transited" :class="shortCutStatus[i]">
          <view class="weui-flex__item" @click="deletesurvey(i)">
            <i class="icon iconfont icon-trash"></i>
            <view class="desc">删除</view>
          </view>
          <view class="weui-flex__item">
            <i class="icon iconfont icon-setup" @click="editsurvey(i)"></i>
            <view class="desc">编辑</view>
          </view>
          <view class="weui-flex__item">
            <i class="icon iconfont icon-browse" @click="browsesurvey(i)"></i>
            <view class="desc">查看</view>
          </view>
          <view class="weui-flex__item">
            <i class="icon iconfont icon-share" @click="toShareSurvey(i)"></i>
            <view class="desc">分享</view>
          </view>
          <view class="weui-flex__item share">
            <button open-type="share">
              <view>
                <image src='../../static/image/weixin.png' />
              </view>
            </button>
          </view>
          <view class="weui-flex__item share">
            <button>
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
          return 'hide'
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

<style>
.short-cut {
  width: 600rpx;
  position: absolute;
  right: 0;
  bottom: 0;
  height: 100%;
  background-color: #666
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
  font-size: 50rpx;
  color: white;
}

.short-cut .desc {
  font-size: 28rpx;
  color: white;
}

.short-cut .weui-flex__item:active{
  background-color: #333
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
