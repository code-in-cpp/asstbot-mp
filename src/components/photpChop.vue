<template>
  <view  class="cropper-container" :class="{'top_0': flag}">
    <mpvue-cropper
      ref="cropper"
      :option="cropperOpt"
      @ready="cropperReady"
      @beforeDraw="cropperBeforeDraw"
      @beforeImageLoad="cropperBeforeImageLoad"
      @beforeLoad="cropperLoad"
    ></mpvue-cropper>
    <div class="cropper-buttons">
      <div
        class="getCropperImage"
        @tap="getCropperImage">
        生成图片
      </div>
    </div>
  </view>
</template>

<script>
  import MpvueCropper from 'mpvue-cropper'

  let wecropper

  const device = wx.getSystemInfoSync()
  const width = device.windowWidth
  const height = device.windowHeight

  export default {
    data () {
      return {
        cropperOpt: {
          id: 'cropper',
          width,
          height,
          scale: 2.5,
          zoom: 8,
          cut: {
            x: (width - 300) / 2,
            y: (height - 300) / 3,
            width: 300,
            height: 300
          }
        },
        flag: false
      }
    },
    components: {
      MpvueCropper
    },
    props: {
      src: {
        type: String
      },
      messageAction: {
        type: Object,
        default: {}
      }
    },
    methods: {
      cropperReady (...args) {
        const that = this
        setTimeout(function () {
          console.log(that.src)
          wecropper.pushOrigin(that.src)
        }, 300)
      },
      cropperBeforeImageLoad (...args) {
        console.log('before image load')
      },
      cropperLoad (...args) {
        console.log('image loaded')
      },
      cropperBeforeDraw (...args) {
        // Todo: 绘制水印等等
      },
      getCropperImage () {
        wecropper.getCropperImage()
          .then((filePath) => {
            this.$store.dispatch('uploadImageWithIndicator', {filePath, indicator: this.messageAction.indicator}).then(res => {
            }).catch(err => {
              console.log(err)
            })
          })
          .catch(e => {
            console.error('获取图片失败')
          })
      }
    },

    created () {
      // wecropper.pushOrigin(this.src)
      const that = this
      setTimeout(function () {
        that.flag = true
      }, 50)
    },

    mounted () {
      wecropper = this.$refs.cropper
    }
  }
</script>

<style>
  .cropper-container{
    position:fixed;
    height:100%;
    padding-bottom:180rpx;
    box-sizing:border-box;
    transition: top .5s;
    top:100%;
    overflow: hidden;
  }
  .top_0{
    top:0
  }
  .cropper-container canvas{
    height:100%!important;
    overflow: hidden;
  }

  .cropper-wrapper{
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    justify-content: center;
    height: 100%;
    background-color: #e5e5e5;
  }

  .cropper-buttons{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    justify-content: center;
    position: absolute;
    bottom: 80rpx;
    left: 0;
    width: 100%;
    height: 50px;
    line-height: 50px;
    z-index: 20;
  }

  .cropper-buttons .upload, .cropper-buttons .getCropperImage{
    width: 100%;
    text-align: center;
    background: #000;
    color: #fff;
  }

  .cropper{
    position: absolute;
    top: 0;
    left: 0;
  }

  .cropper-buttons{
    /*background-color: rgba(0, 0, 0, 0.95);*/
    /*color: #04b00f;*/
  }
</style>
