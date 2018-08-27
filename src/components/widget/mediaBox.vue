<template>
    <view style="width: 100%;">
      <view class="mediaBox">
        <div class="mediaBtn" :class="mediaState==1?'btnActive':''" @click="setImageState(1)">图片</div>
        <div class="mediaBtn" :class="mediaState==2?'btnActive':''" @click="setImageState(2)">视频</div>
        <div class="mediaBtn" :class="mediaState==3?'btnActive':''" @click="setImageState(3)">音频</div>
      </view>
      <view class="uploadBox">
        <input maxlength="-1" v-if="mediaState==1" class="uploadInput" type="text" placeholder="请输入图片链接" @blur="setNewUrl" @confirm="setNewUrl">
        <input maxlength="-1" v-else-if="mediaState==2" class="uploadInput" type="text" placeholder="请输入视频链接" @blur="setNewUrl" @confirm="setNewUrl">
        <input maxlength="-1" v-else class="uploadInput" type="text" placeholder="请输入音频链接" @blur="setNewUrl" @confirm="setNewUrl">
        <div class="mediaBtn" @click="selectFile" v-if="mediaState!=3">上传</div>
      </view>
      <view>
        <view class="mediaShowBox" v-if="videoUrl">
          <icon class="icon" type="clear" @click="deleteMedia('video')"/>
          <da-video-for-edit :url="videoUrl" :poster="data.poster" @deleteVideo="deleteVideo"/>
          <!--<daVideoForEdit :url="videoUrl"/>-->
        </view>
        <view class="mediaShowBox" v-else-if="audioUrl">
          <icon class="icon" type="clear"  @click="deleteMedia('audio')"/>
          <audio :src="audioUrl" controls></audio>
          <!--<audio :src="audioUrl" controls></audio>-->
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

  export default {
    data () {
      return {
        mediaState: 1,
        imageUrl: '',
        videoUrl: '',
        audioUrl: ''
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
        this.mediaState = state
      },
      selectFile () {
        if (this.mediaState === 1) {
          this.$store.dispatch('selectImageToUpload')
            .then((url) => {
              this.imageUrl = url
              this.audioUrl = ''
              this.videoUrl = ''
              this.$emit('chooseImage', url)
            })
        } else if (this.mediaState === 2) {
          this.$store.dispatch('selectVideoToUpload')
            .then((url) => {
              this.imageUrl = ''
              this.audioUrl = ''
              this.videoUrl = url
              console.log('videoUrl:' + this.videoUrl)
              this.$emit('chooseVideo', url)
            })
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
    height:80rpx;
    align-content: center;
    border-radius: 10rpx;
    padding-left: 20rpx;
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
</style>
