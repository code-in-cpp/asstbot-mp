<template>
  <view class="weui-cell__bd">
    <view class="weui-uploader">
      <view class="weui-uploader__bd">
        <view class="weui-uploader__file" v-if="url!==''">
          <image class="weui-uploader__img" :src="url" mode="aspectFill" @click="previewImage"/>
        </view>
        <view class="weui-uploader__input-box" v-if="url === ''">
          <view class="weui-uploader__input" @click="chooseImage"></view>
        </view>
        <view class="weui-uploader__delete-box" v-else>
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
      this.$store.dispatch('selectImageToUpload')
        .then((url) => {
          this.$emit('chooseImage', url)
        })
    },
    previewImage () {
      wx.previewImage({
        current: this.url,
        urls: [this.url]
      })
    }
  }
}
</script>

<style>
.weui-uploader__delete-box {
  float: left;
  position: relative;
  margin-right: 18rpx;
  margin-bottom: 18rpx;
  width: 154rpx;
  height: 154rpx;
  border: 2rpx solid #D9D9D9;
}


.weui-uploader__delete-box:after {
  content: " ";
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  background-color: red;
}

.weui-uploader__delete-box:after {
  width: 79rpx;
  height: 4rpx;
}

.weui-uploader__delete-box:active {
  border-color: #999999;
}

.weui-uploader__delete-box:active:after {
  background-color: #999999;
}
</style>