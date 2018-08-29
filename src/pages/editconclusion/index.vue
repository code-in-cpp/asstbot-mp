<template>
  <view class="page">
    <title-bar :title="survey.title"/>
    <view class="content">
      <view class="weui-cells__title">{{title}}</view>
      <view class="weui-cells weui-cells_after-title">
        <block v-if="survey.type=='exam'">
          <view class="weui-cell">
              <view class="weui-cell__hd">
                  <view class="weui-label">最少答对题数</view>
              </view>
              <view class="weui-cell__bd">

              </view>
              <view class="weui-cell__ft">
                <da-counter :number="conclusion.scoreRange.min" min="0" :max="conclusion.scoreRange.max"
                  @changenumber="changeMinNumber"/>
              </view>
          </view>
          <view class="weui-cell">
              <view class="weui-cell__hd">
                  <view class="weui-label">最多答对题数</view>
              </view>
              <view class="weui-cell__bd">
              </view>
              <view class="weui-cell__ft">
                <da-counter :number="conclusion.scoreRange.max"
                  :min="conclusion.scoreRange.min" :max="survey.subjects.length"
                  @changenumber="changeMaxNumber"/>
              </view>
          </view>
        </block>
        <view class="weui-cell">
          <view class="weui-cell__bd">
            <textarea class="weui-textarea" @input="updateTitleValue" placeholder="请输入结论" :value="conclusion.text" style="height: 3.3em" />
          </view>
        </view>
        <view class="weui-cell">
          <mediaBox :data="conclusion" @inputUrl="getSourseUrl" @chooseVideo="chooseTitleVideo" @chooseImage="chooseTitleImage" @choosePoster="choosePoster" @deleteMedia="deleteMedia" @setAudioName="setAudioName" @setAudioAuthor="setAudioAuthor" @setPoster="setPoster"/>
        </view>
        <view class="weui-cell weui-cell_input weui-cell_warn" v-if="!isLegal">
          <view class="weui-cell__bd">
            文字和图片不能同时为空
          </view>
          <view class="weui-cell__ft">
              <icon type="warn" size="15" color="#E64340"></icon>
          </view>
        </view>
      </view>
    </view>
    <view class="footer bottom_button">
      <button class="weui-btn" type="primary" @tap="saveConclusion" >保存</button>
    </view>
  </view>
</template>

<script>
import { mapState } from 'vuex'
import imageUploader from '@/components/widget/imageUploader'

import daCounter from '@/components/uicomponent/daCounter'

import mediaBox from '@/components/widget/mediaBox'

function getInitArray (max, value) {
  let arr = new Array(max)
  for (let i = 0; i < max; i++) {
    arr[i] = value
  }
  return arr
}

function verifyRanges (max, ranges) {
  if (!ranges || ranges.length === 0) return true
  if (max <= 0) return false
  let arr = getInitArray(max, false)
  for (let range of ranges) {
    if (range[0] > range[1]) return false
    if (range[0] < 0 || range[0] >= max) return false
    if (range[1] < 0 || range[1] >= max) return false
    for (let i = range[0]; i <= range[1]; i++) {
      if (arr[i]) return false
      arr[i] = true
    }
  }
  return true
}

function getFreeRange (maxCount, occupiedRanges) {
  if (!verifyRanges(maxCount, occupiedRanges)) return { min: 0, max: 0 }
  let arr = getInitArray(maxCount, false)
  for (let range of occupiedRanges) {
    for (let i = range[0]; i <= range[1]; i++) {
      arr[i] = true
    }
  }
  for (let i = 0; i < maxCount; i++) {
    if (!arr[i]) {
      let j = i + 1
      while (j < maxCount) {
        if (arr[j]) {
          break
        }
        j++
      }
      return { min: i, max: j }
    }
  }

  return { min: 0, max: 0 }
}

export default {
  data: {
    conclusion: {},
    title: '',
    isLegal: true
  },
  computed: {
    ...mapState({
      survey: state => state.curSurvey.survey
    })
  },
  components: {
    imageUploader,
    daCounter,
    mediaBox
  },
  methods: {
    updateTitleValue (event) {
      this.conclusion.text = event.mp.detail.value
      this.verifyConclusion()
    },
    deleteMedia (state) {
      this.conclusion.imageUrl = ''
      this.conclusion.urlType = ''
      if (this.conclusion.mediaInfo) {
        this.conclusion.mediaInfo.poster = ''
        this.conclusion.mediaInfo.name = ''
        this.conclusion.mediaInfo.author = ''
      }
      this.verifyConclusion()
    },
    getSourseUrl (url, state) {
      this.conclusion.imageUrl = url
      this.verifyConclusion()
      switch (state) {
        case 1:
          this.conclusion.urlType = 'image'
          break
        case 2:
          this.conclusion.urlType = 'video'
          break
        case 3:
          this.conclusion.urlType = 'audio'
          break
      }
    },
    chooseTitleImage (url) {
      this.conclusion.imageUrl = url
      this.conclusion.urlType = 'image'
      this.verifyConclusion()
    },
    chooseTitleVideo (url) {
      this.conclusion.imageUrl = url
      this.conclusion.urlType = 'video'
      this.verifyConclusion()
    },
    choosePoster (poster) {
      this.conclusion.mediaInfo = this.conclusion.mediaInfo ? this.conclusion.mediaInfo : {}
      this.conclusion = {...this.conclusion, mediaInfo: {...this.conclusion.mediaInfo, poster: poster}}
    },
    setAudioName (name) {
      this.conclusion.mediaInfo = this.conclusion.mediaInfo ? this.conclusion.mediaInfo : {}
      this.conclusion = {...this.conclusion, mediaInfo: {...this.conclusion.mediaInfo, name: name}}
    },
    setAudioAuthor (author) {
      this.conclusion.mediaInfo = this.conclusion.mediaInfo ? this.conclusion.mediaInfo : {}
      this.conclusion = {...this.conclusion, mediaInfo: {...this.conclusion.mediaInfo, author: author}}
    },
    setPoster (poster) {
      this.conclusion.mediaInfo = this.conclusion.mediaInfo ? this.conclusion.mediaInfo : {}
      this.conclusion = {...this.conclusion, mediaInfo: {...this.conclusion.mediaInfo, poster: poster}}
    },
    changeMinNumber (event) {
      this.conclusion.scoreRange.min = event.number
    },
    changeMaxNumber (event) {
      this.conclusion.scoreRange.max = event.number
    },
    verifyConclusion () {
      this.isLegal = (this.conclusion.text !== '' || this.conclusion.imageUrl !== '')
    },

    saveConclusion () {
      this.verifyConclusion()
      if (!this.isLegal) {
        return
      }
      const option = this.$root.$mp.query
      if (option.action === 'create') {
        this.$store.commit('appendCurConclusion', this.conclusion)
      } else {
        this.$store.commit('updateCurConcusion', {index: option.conclusion, conclusion: this.conclusion})
      }
      this.$store.dispatch('saveCurSurvey', this.survey)
        .then(() => {
          wx.navigateBack()
        })
    }
  },
  onLoad (option) {
    if (!option.action) {
      console.error('need to set parameter')
    }
    if (option.action === 'create') {
      let subjectCount = this.survey.subjects.length
      let range = this.survey.type === 'exam'
        ? getFreeRange(subjectCount, this.survey.conclusions.map((c) => { return [c.scoreRange.min, c.scoreRange.max] }))
        : {min: 0, max: 0}
      this.conclusion = {
        scoreRange: {
          min: range.min,
          max: range.max
        },
        text: '',
        imageUrl: '',
        videoUrl: ''
      }
      this.title = '新创建结论'
    } else {
      this.conclusion = JSON.parse(JSON.stringify(this.survey.conclusions[option.conclusion]))
      this.title = '结论 ' + (option.conclusion + 1)
    }
  }
}
</script>

<style lang="less" scoped>
.content {
  flex-direction: column;
}
.weui-label {
  color: #999;
}
</style>
