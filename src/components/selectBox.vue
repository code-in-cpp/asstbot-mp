<template>
    <view class="select-box" :class="{'top_110': !haveImage, 'top_444': haveImage}">
      <radio-box v-if="list.type === 'radio' && !globalShow" :list="list"></radio-box>
      <checkbox-box v-if="list.type === 'checkbox' && !globalShow" :list="list"></checkbox-box>
      <avatar-box v-if="list.type === 'imageUploader' && !globalShow" :list="list"></avatar-box>
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
    data () {
      return {
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
          console.log(1111)
          console.log(state)
          return state.inputValue.globalShow
        }
      })
    },
    props: ['list', 'haveImage']
  }
</script>

<style scoped>
.select-box{
  /*background: #fff;*/
  width: 100%;
  overflow:auto;
}
.top_110{
  position: absolute;
  top: -110rpx;
}
.top_444{
  position: absolute;
  top: -444rpx;
}
</style>
