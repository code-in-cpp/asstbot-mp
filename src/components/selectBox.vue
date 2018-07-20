<template>
    <view class="select-box" :class="{'top_110': !showImage, 'top_444': showImage}">
      <radio-box v-if="messageAction.type === 'radio' && !globalShow" :list="messageAction"></radio-box>
      <checkbox-box v-if="messageAction.type === 'checkbox' && !globalShow" :list="messageAction"></checkbox-box>
      <avatar-box v-if="messageAction.type === 'imageUploader' && !globalShow" :list="messageAction"></avatar-box>
      <global-component v-if="globalShow"></global-component>
    </view>
</template>

<script>
  import radioBox from '@/components/floatBox/radioBox'
  import checkboxBox from '@/components/floatBox/checkboxBox'
  import avatarBox from '@/components/floatBox/avatarBox'
  import globalComponent from '@/components/floatBox/globalComponent'
  import { mapState } from 'vuex'
  export default {
    name: 'selectBox',
    props: {
      messageAction: {
        type: Object,
        default: {}
      },
      showImage: {
        type: Boolean,
        default: {}
      }
    },
    components: {
      radioBox,
      checkboxBox,
      avatarBox,
      globalComponent
    },
    computed: {
      ...mapState({
        globalShow: state => {
          return state.inputValue.globalShow
        }
      })
    }
  }
</script>

<style scoped>
.select-box{
  /*background: #fff;*/
  width: 100%;
  overflow:auto;
}
.top_110{
  /*position: absolute;*/
  top: -110rpx;
}
.top_444{
  /*position: absolute;*/
  top: -444rpx;
}
</style>
