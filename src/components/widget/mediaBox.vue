<template>
    <view style="width: 100%;">
      <view class="mediaBox">
        <div class="mediaBtn" :class="mediaState==1?'btnActive':''" @click="setImageState(1)">图片</div>
        <div class="mediaBtn" :class="mediaState==2?'btnActive':''" @click="setImageState(2)">视频</div>
        <div class="mediaBtn" :class="mediaState==3?'btnActive':''" @click="setImageState(3)">音频</div>
      </view>
      <view class="uploadBox">
        <view class="flexBox" v-if="mediaState==1">
          <input maxlength="-1" class="uploadInput" type="text" placeholder="请输入图片链接" @blur="setNewUrl" @confirm="setNewUrl">
          <div class="mediaBtn" @click="selectFile">上传</div>
        </view>

        <view style="width: 100%;" v-else-if="mediaState==2">
          <view class="flexBox">
            <input maxlength="-1" class="uploadInput" type="text" placeholder="请输入视频链接" @blur="setNewUrl" @confirm="setNewUrl">
            <div class="mediaBtn" @click="selectFile">上传</div>
          </view>
          <progress :percent="progress" show-info  v-if="showProgress" />
          <div class="flexBox">
            <input class="uploadInput" maxlength="-1" type="text" placeholder="请输入封面地址或选择封面" @blur="setVideoPoster" @confirm="setVideoPoster" :value="videoInputValue">
            <div class="mediaBtn" @click="selectVideoPoster">上传</div>
          </div>
          <view class="mediaTip" v-if="videoTipShow">*请先上传视频文件</view>
        </view>

        <view style="width: 100%;" v-else>
          <view class="flexBox">
            <input maxlength="-1" class="uploadInput" type="text" placeholder="请输入音频链接" @blur="setNewUrl" @confirm="setNewUrl">
          </view>
          <div class="flexBox"><input class="uploadInput" type="text" placeholder="请输入音频名字" @blur="setAudioName" @confirm="setAudioName"></div>
          <div class="flexBox"><input class="uploadInput" type="text" placeholder="请输入作者名字" @blur="setAuthor" @confirm="setAuthor"></div>
          <div class="flexBox">
            <input class="uploadInput" maxlength="-1" type="text" placeholder="请输入封面地址或选择封面" @blur="setAudioPoster" @confirm="setAudioPoster" :value="audioInputValue">
            <div class="mediaBtn"  @click="selectAudioPoster">上传</div>
          </div>
          <view class="mediaTip" v-if="audioTipShow">*请先上传音频文件</view>
        </view>
      </view>
      <view>
        <view class="mediaShowBox" v-if="videoUrl">
          <icon class="icon" type="clear" @click="deleteMedia('video')"/>
          <da-video-for-edit :url="videoUrl" :poster="data.mediaInfo?data.mediaInfo.poster:''" @deleteVideo="deleteVideo"/>
          <!--<daVideoForEdit :url="videoUrl"/>-->
        </view>
        <view class="mediaShowBox" v-else-if="audioUrl">
          <icon class="icon" type="clear"  @click="deleteMedia('audio')"/>
          <audio :src="audioUrl" :name="data.mediaInfo?data.mediaInfo.name:''" :author="data.mediaInfo?data.mediaInfo.author:''" :poster="data.mediaInfo?data.mediaInfo.poster:''" controls></audio>
        </view>
        <view class="mediaShowBox" v-else-if="imageUrl">
          <icon class="icon" type="clear"  @click="deleteMedia('image')"/>
          <image class="image" mode="widthFix" @click="previewImage" :src="imageUrl"></image>
        </view>
      </view>
    </view>
</template>

<script>
  import daVideoForEdit from '@/components/view/daVideoForEdit'
  import config from '@/config.js'

  const videoUrl = config.service.videoPostUrl
  const hostRoot = config.service.hostRoot

  export default {
    data () {
      return {
        mediaState: 1,
        imageUrl: '',
        videoUrl: '',
        audioUrl: '',
        videoTipShow: false,
        audioTipShow: false,
        videoInputValue: '',
        audioInputValue: '',
        progress: 0,
        showProgress: false
      }
    },
    components: {
      daVideoForEdit
    },
    props: {
      data: {
        type: Object,
        default: {}
      }
    },
    name: 'mediaBox',
    methods: {
      setImageState (state) {
        this.videoTipShow = false
        this.audioTipShow = false
        this.mediaState = state
      },
      selectVideoPoster () {
        if (this.videoUrl) {
          this.$store.dispatch('selectImageToUpload')
            .then((url) => {
              this.$emit('choosePoster', url)
            })
        } else {
          this.videoTipShow = true
        }
      },
      selectAudioPoster () {
        if (this.audioUrl) {
          this.$store.dispatch('selectImageToUpload')
            .then((url) => {
              this.$emit('choosePoster', url)
            })
        } else {
          this.audioTipShow = true
        }
      },
      selectFile () {
        if (this.mediaState === 1) {
          this.$store.dispatch('selectImageToUpload')
            .then((url) => {
              this.imageUrl = url
              this.audioUrl = ''
              this.videoUrl = ''
              if (this.data.mediaInfo) {
                this.data.mediaInfo.poster = ''
                this.data.mediaInfo.name = ''
                this.data.mediaInfo.author = ''
              }
              this.$emit('chooseImage', url)
            })
        } else if (this.mediaState === 2) {
          const that = this
          wx.chooseVideo({
            sourceType: ['album', 'camera'],
            maxDuration: 60,
            camera: 'back',
            success: function (res) {
              if (res.size < 10 * 1024 * 1024) {
                that.showProgress = true
                const uploadTask = wx.uploadFile({
                  url: videoUrl,
                  filePath: res.tempFilePath,
                  name: 'vedio',
                  success: (res) => {
                    that.showProgress = false
                    const remoteUrl = `${hostRoot}/${JSON.parse(res.data).url}`
                    that.imageUrl = ''
                    that.audioUrl = ''
                    that.videoUrl = remoteUrl
                    if (that.data.mediaInfo) {
                      that.data.mediaInfo.poster = ''
                      that.data.mediaInfo.name = ''
                      that.data.mediaInfo.author = ''
                    }
                    that.$emit('chooseVideo', remoteUrl)
                  },
                  fail: (err) => {
                    // reject(err)
                    console.log(err)
                  }
                })

                uploadTask.onProgressUpdate((res) => {
                  console.log('上传进度', res.progress)
                  that.progress = res.progress
                })
              } else {
                console.log('视频文件过大')
              }
            }
          })
          // this.$store.dispatch('selectVideoToUpload')
          //   .then((url) => {
          //     this.imageUrl = ''
          //     this.audioUrl = ''
          //     this.videoUrl = url
          //     if (this.data.mediaInfo) {
          //       this.data.mediaInfo.poster = ''
          //       this.data.mediaInfo.name = ''
          //       this.data.mediaInfo.author = ''
          //     }
          //     this.$emit('chooseVideo', url)
          //   })
        } else {
          console.log('wrong state code')
        }
      },
      previewImage () {
        wx.previewImage({
          current: this.data.imageUrl,
          urls: [this.data.imageUrl]
        })
      },
      setNewUrl (event) {
        if (event.mp.detail.value) {
          this.imageUrl = ''
          this.videoUrl = ''
          this.audioUrl = ''
          if (this.data.mediaInfo) {
            this.data.mediaInfo.poster = ''
            this.data.mediaInfo.name = ''
            this.data.mediaInfo.author = ''
          }
          switch (this.mediaState) {
            case 1:
              this.imageUrl = event.mp.detail.value
              break
            case 2:
              this.videoUrl = event.mp.detail.value
              break
            case 3:
              this.audioUrl = event.mp.detail.value
              break
          }
          this.$emit('inputUrl', event.mp.detail.value, this.mediaState)
        }
      },
      setVideoPoster (e) {
        if (this.videoUrl) {
          this.videoInputValue = e.mp.detail.value
          this.$emit('setPoster', e.mp.detail.value)
        } else {
          this.videoTipShow = true
          this.videoInputValue = ''
        }
      },
      setAudioPoster (e) {
        if (this.audioUrl) {
          this.audioInputValue = e.mp.detail.value
          this.$emit('setPoster', e.mp.detail.value)
        } else {
          this.audioTipShow = true
          this.audioInputValue = ''
        }
      },
      setAudioName (e) {
        console.log(e.mp.detail.value)
        this.$emit('setAudioName', e.mp.detail.value)
      },
      setAuthor (e) {
        console.log(e.mp.detail.value)
        this.$emit('setAudioAuthor', e.mp.detail.value)
      },
      deleteVideo () {
        this.videoUrl = ''
        this.$emit('deleteVideo')
      },
      deleteMedia (state) {
        switch (state) {
          case 'video':
            this.videoUrl = ''
            this.$emit('deleteMedia', 'video')
            break
          case 'audio':
            this.audioUrl = ''
            this.$emit('deleteMedia', 'audio')
            break
          case 'image':
            this.imageUrl = ''
            this.$emit('deleteMedia', 'image')
            break
        }
      }
    },
    onLoad () {
      const that = this
      setTimeout(function () {
        switch (that.data.urlType) {
          case 'image':
            that.mediaState = 1
            that.imageUrl = that.data.imageUrl
            that.videoUrl = ''
            that.audioUrl = ''
            return 1
          case 'video':
            that.mediaState = 2
            that.videoUrl = that.data.imageUrl
            that.imageUrl = ''
            that.audioUrl = ''
            return 2
          case 'audio':
            that.mediaState = 3
            that.audioUrl = that.data.imageUrl
            that.videoUrl = ''
            that.imageUrl = ''
            return 3
          default:
            that.mediaState = 1
            that.imageUrl = that.data.imageUrl
            that.videoUrl = ''
            that.audioUrl = ''
            return 1
        }
      })
    }
  }
</script>

<style scoped>
  .mediaBox{
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  .uploadBox{
    display: flex;
    justify-content: space-between;
    margin: 30rpx 0;
  }
  .uploadInput{
    display:flex;
    border:1rpx solid #dadada;
    flex:1;
    margin-right:20rpx;
    height:76rpx;
    line-height: 76rpx;
    align-content: center;
    border-radius: 10rpx;
    padding-left: 20rpx;
    font-size: 28rpx;
  }
  .mediaBtn{
    width:25%;
    height:80rpx;
    line-height:80rpx;
    border-radius:10rpx;
    text-align:center;
    background:#f8f8f8;
  }
  .btnActive{
    background: #1AAD19;
    color: #fff
  }
  .mediaShowBox{
    text-align: center;
    font-size: 0;
    position: relative;
  }
  .image{
    display: block;
    width: auto;
  }
  .icon{
    position: absolute;
    top: 10rpx;
    right: 10rpx;
    z-index: 1;
  }
  .flexBox{
    display: flex;
    width: 100%;
    margin-bottom: 20rpx;
  }
  .mediaTip{
    color: red;
    font-size: 28rpx;
  }
</style>
