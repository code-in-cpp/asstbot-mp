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
      },
      uploadAvatar () {
        const that = this
        wx.chooseImage({
          count: 1,
          sizeType: ['original', 'compressed'],
          sourceType: ['album', 'camera'],
          success: function (res) {
            that.src = res.tempFilePaths[0]
            that.showChopBox = true
          }
        })
      }
    },
    created () {
      const that = this
      wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: function (res) {
          that.src = res.tempFilePaths[0]
          that.showChopBox = true
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
