<template>
  <view class="weui-cell__bd">
    <view class="weui-uploader">
      <view class="weui-uploader__bd  aaaaaa">
        <view class="weui-uploader__file" v-if="url!==''">
          <image class="weui-uploader__img" :src="url" mode="aspectFill" @click="previewImage"/>
        </view>
        <view class="weui-uploader__input-box" style="margin-top: 60rpx" v-if="url === ''">
          <view class="weui-uploader__input" @click="chooseImage"></view>
        </view>
        <view class="delete-box" v-else>
          <view class="weui-uploader__input" @click="deleteImage"></view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    url: {
      type: String,
      default: ''
    }
  },
  methods: {
    deleteImage () {
      this.$emit('deleteImage')
    },
    chooseImage () {
      console.log('image')
      this.$store.dispatch('selectImageToUpload')
        .then((url) => {
          this.$emit('chooseImage', url)
        })
      // console.log('selectVideoToUpload')
      // this.$store.dispatch('selectVideoToUpload')
    },
    previewImage () {
      wx.previewImage({
        current: this.url,
        urls: [this.url]
      })
    },
    switchChange (e) {
      console.log(e)
    }
  }
}
</script>

<style lang="less" scoped>
.delete-box {
  float: left;
  position: relative;
  margin-right: 9px;
  margin-bottom: 9px;
  width: 77px;
  height: 77px;
  border: 1px solid #D9D9D9;
}

.delete-box:before, .delete-box:after {
    content: " ";
    position: absolute;
    top: 50%!important;
    left: 50%!important;
    -webkit-transform: translate(-50%, -50%);
            transform: translate(-50%, -50%);
    background-color: red!important;
  }

.delete-box:after {
    width: 79rpx!important;
    height: 4rpx!important;
  }

.delete-box:before {
    width: 0rpx;
    height: 0rpx;
  }

.delete-box:active {
    border-color: #999999;
  }

.delete-box:active:before, .delete-box:active:after {
  background-color:  #999999;
}
</style>
