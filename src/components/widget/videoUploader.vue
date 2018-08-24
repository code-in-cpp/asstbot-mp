<template>
  <view class="weui-cell__bd">
    <view class="weui-uploader">
      <view class="weui-uploader__bd  aaaaaa">
        <view class="weui-uploader__file" v-if="url!==''">
          <video class="weui-uploader__img" :src="url" objectFit="fill" controls/>
        </view>
        <view class="weui-uploader__input-box" style="margin-top: 60rpx" v-if="url === ''">
          <view class="weui-uploader__input" @click="chooseVideo"></view>
        </view>
        <view class="delete-box" v-else>
          <view class="weui-uploader__input" @click="deleteVideo"></view>
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
      deleteVideo () {
        this.$emit('deleteVideo')
      },
      chooseVideo () {
        console.log('video')
        this.$store.dispatch('selectVideoToUpload').then(url => {
          this.$emit('chooseVideo', url)
        })
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
