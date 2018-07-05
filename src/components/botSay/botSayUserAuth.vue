<template>
  <view class="authContainer">
    <view class="incoming">{{content}}</view>
    <view class="authBox">
      <button class="height-line-height authBtn">拒绝</button>
      <button class="height-line-height authBtn green" open-type="getUserInfo" @getuserinfo="updateUserInfo">允许</button>
    </view>
  </view>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    name: 'botSayUserAuth',
    props: ['content'],
    computed: {
      ...mapState({
        userId: state => {
          console.log(state.id)
          return state.id.id
        }
      })
    },
    methods: {
      updateUserInfo (ev) {
        this.$store.dispatch('updateUserInfo').then(res => {
          this.$store.dispatch('start', this.userId)
        })
      }
    }
  }
</script>

<style scoped>
  .authBox{
    display: flex;
    margin-top: 20rpx;
  }
  .authBtn{
    width:120rpx;
    margin:0;
    background:#fff;
    border-radius:20rpx;
    padding:0;
    font-size:28rpx;
    margin-right:20rpx;
  }
  .authBtn:after{
    border:none
  }
  .height-line-height{
    height:80rpx;
    line-height: 80rpx;
  }
  .authContainer{
    -webkit-border-radius: 10rpx;
    -moz-border-radius: 10rpx;
    border-radius: 10rpx;
  }
  .authWord{
    padding: 30rpx;
    font-size: 28rpx;
  }
  .incoming {
    padding: 10px;
    border: solid #dddee1 1px;
    border-radius: 15px 15px 15px 0;
    background-color: #f8f8f9;
    width: auto!important;
    display: inline-block;
    font-size: 28rpx;
    max-width: 90%;
  }
  .green{
    color: #62ff12;
  }
</style>
