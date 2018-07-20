<template>
  <view>
    <photo-chop v-if="showChopBox" :src="src" :messageAction="list"></photo-chop>
  </view>
</template>

<script>
  import photoChop from '../photpChop'
  export default {
    name: 'avatarBox',
    data () {
      return {
        src: '',
        showChopBox: false
      }
    },
    props: {
      list: {
        type: Object
      }
    },
    components: {
      photoChop
    },
    methods: {
      updateUserInfo (ev) {
        this.$store.dispatch('updateUserInfo').then(res => {
          console.log(res)
        }).catch(err => {
          console.log(err)
        })
      }
    },
    created () {
      const that = this
      console.log('enter avatarBox created')
      wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: function (res) {
          console.log('avatarBox created, choose image success')
          that.src = res.tempFilePaths[0]
          that.showChopBox = true
        },
        fail: function (e) {
          // var path = ''
          console.log('avatarBox created, choose image failed')
          that.$store.dispatch('sendImage', {url: '', indicator: that.list.indicator})
        }
      })
    }
  }
</script>

<style lang="less">
  @import "../../../static/base";
  .btn-style{
    width:auto;
    font-size:@font-size-small;
    display:inline-block;
    margin-right: @btn-margin-right;
    background: @btn-background;
    border-color: @btn-border-color;
    color: @btn-color;
  }
</style>
