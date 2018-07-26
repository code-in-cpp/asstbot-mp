<template>
    <view class="select-box" :class="{'top_110': !showImage, 'top_444': showImage}">
      <global-component v-if="globalShow"></global-component>
      <block v-else>
        <radio-box v-if="messageAction.type === 'radio'" :list="messageAction"></radio-box>
        <checkbox-box v-if="messageAction.type === 'checkbox'" :list="messageAction"></checkbox-box>
        <avatar-box v-if="messageAction.type === 'imageUploader'" :list="messageAction"></avatar-box>
      </block>
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
  /*position: absolute;*/
  /*bottom:0*/
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
