<template>
  <view class="authContainer">
    <view class="authWord">{{content}}</view>
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
  }
  .authBtn{
    width:50%;
    margin:0;
    background: #fff;
  }
  .height-line-height{
    height:80rpx;
    line-height: 80rpx;
  }
  .authContainer{
    -webkit-border-radius: 10rpx;
    -moz-border-radius: 10rpx;
    border-radius: 10rpx;
    background: #fff;
  }
  .authWord{
    padding: 30rpx;
    font-size: 28rpx;
  }
  .green{
    color: #62ff12;
  }
</style>
