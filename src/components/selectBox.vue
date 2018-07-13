<template>
    <view class="select-box">
      <radio-box v-if="list.type === 'radio'" :list="list"></radio-box>
      <checkbox-box v-if="list.type === 'checkbox'" :list="list"></checkbox-box>
      <avatar-box v-if="list.type === 'imageUploader'" :list="list"></avatar-box>
    </view>
</template>

<script>
  import radioBox from '@/components/floatBox/radioBox'
  import checkboxBox from '@/components/floatBox/checkboxBox'
  import avatarBox from '@/components/floatBox/avatarBox'
  import { mapGetters } from 'vuex'
  export default {
    name: 'selectBox',
    components: {
      radioBox,
      checkboxBox,
      avatarBox
    },
    computed: {
      ...mapGetters({
        list: 'messageAction'
      })
    }
  }
</script>

<style scoped>
.select-box{
  background: #fff;
}
</style>
