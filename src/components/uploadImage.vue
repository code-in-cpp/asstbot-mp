<!--<template>-->
  <!--<view @click="selectImage" class="imageCut">-->
      <!--1111-->
  <!--</view>-->
<!--</template>-->

<!--<script>-->
  <!--export default {-->
    <!--name: 'uploadImage',-->
    <!--methods: {-->
    <!--},-->
    <!--created () {-->
      <!--wx.chooseImage({-->
        <!--count: 1, // 默认9-->
        <!--sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有-->
        <!--sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有-->
        <!--success: function (res) {-->
          <!--console.log(res)-->
          <!--// console.log(res)-->
          <!--// 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片-->
          <!--// var tempFilePaths = res.tempFilePaths-->
        <!--}-->
      <!--})-->
    <!--}-->
  <!--}-->
<!--</script>-->

<!--<style scoped>-->
  <!--.imageCut{-->
    <!--display: flex;-->
    <!--height: 100vh;-->
    <!--background: aqua;-->
  <!--}-->
<!--</style>-->


<template>
  <view  class="boxFloat" :class="{'top_0':imgFlag}">
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
        class="upload"
        @tap="uploadTap">
        上传图片
      </div>
      <div
        class="getCropperImage"
        @tap="getCropperImage">
        生成图片
      </div>
    </div>
  </view>
</template>

<script>
  import { mapState } from 'vuex'
  import MpvueCropper from 'mpvue-cropper'

  let wecropper

  const device = wx.getSystemInfoSync()
  const width = device.windowWidth
  const height = device.windowHeight - 50

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
            y: (height - 300) / 2,
            width: 300,
            height: 300
          }
        },
        imgFlag: false
      }
    },
    name: 'uploadImage',

    components: {
      MpvueCropper
    },

    watch: {
      list: {
        handler: function (val, oldval) {
          this.optionObject = val.to ? val.msgs[val.msgs.length - 1] : ''
          if (val.to) {
            if ((this.optionObject.type === 'imageUploader')) {
              setTimeout(() => {
                this.imgFlag = true
              }, 1000)
            }
          }
        },
        deep: true
      }
    },
    computed: {
      ...mapState({
        list: state => state.messages.data[state.messages.data.length - 1]
      })
    },
    methods: {
      cropperReady (...args) {
        console.log('cropper ready!')
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
      uploadTap () {
        wx.chooseImage({
          count: 1, // 默认9
          sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
          success: (res) => {
            const src = res.tempFilePaths[0]
            //  获取裁剪图片资源后，给data添加src属性及其值

            wecropper.pushOrigin(src)
          }
        })
      },
      getCropperImage () {
        wecropper.getCropperImage()
          .then((src) => {
            this.$store.dispatch('uploadImage', src).then(res => {
              this.imgFlag = false
              console.log(this.imgFlag)
            }).catch(err => {
              this.imgFlag = false
              console.log(err)
            })
            // wx.previewImage({
            //   current: '', // 当前显示图片的http链接
            //   urls: [src] // 需要预览的图片http链接列表
            // })
          })
          .catch(e => {
            console.error('获取图片失败')
          })
      }
    },

    mounted () {
      wecropper = this.$refs.cropper
    }
  }
</script>

<style>
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
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50px;
    line-height: 50px;
  }

  .cropper-buttons .upload, .cropper-buttons .getCropperImage{
    width: 50%;
    text-align: center;
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
  .boxFloat{
    height:100vh;
    background:rgba(0,0,0,.5);
    position:fixed;
    z-index: 10;
    top:100vh;
    width:100%;
    transition:top .5s;
    /*display: none;*/
  }
  .top_0{
    top: 0;
    /*display: block;*/
  }
</style>
