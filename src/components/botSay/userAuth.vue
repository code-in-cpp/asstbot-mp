<template>
  <view class="authContainer">
    <view class="incoming">{{content}}</view>
    <view class="authBox">
      <button @click="refuse" class="height-line-height authBtn primary-color light form-control">拒绝</button>
      <button class="height-line-height authBtn secondary-color light form-control" open-type="getUserInfo" @getuserinfo="updateUserInfo">允许</button>
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
          return state.id.id
        }
      })
    },
    methods: {
      updateUserInfo (ev) {
        this.$store.dispatch('updateUserInfo').then(res => {
          this.$store.dispatch('allowPermise', {query: '允许'})
          this.$store.dispatch('start', this.userId)
        }).catch(err => {
          this.$store.dispatch('start', this.userId)
          console.error(err)
        })
      },
      refuse () {
        this.$store.dispatch('start', this.userId)
      }
    }
  }
</script>

<style lang="less" scoped>
@import "../../../static/base.less";

.authBox{
  display: flex;
  margin-top: 20rpx;
}

.authBtn{
  width:120rpx;
  margin:0;
  padding:0;
  font-size:@font-size-small;
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
  font-size: @font-size-small;
}
</style>
