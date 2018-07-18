<template>
  <view>
    <radio-float v-if="list.type === 'radio' && list.items.length > 10" :list="list"></radio-float>
    <checkbox-float v-if="list.type === 'checkbox'" :list="list"></checkbox-float>
    <avatar-float v-else-if="list.type === 'imageUploader'" :list="list"></avatar-float>
  </view>
</template>

<script>
  import checkboxFloat from '@/components/floatBox/checkboxFloat'
  import radioFloat from '@/components/floatBox/radioFloat'
  import avatarFloat from '@/components/floatBox/avatarFloat'
  import { mapState, mapGetters } from 'vuex'

  export default {
    name: 'floatIndex',
    data: {

    },
    components: {
      radioFloat,
      checkboxFloat,
      avatarFloat
    },
    computed: {
      ...mapGetters({
        list: 'messageAction'
      })
    }
  }
</script>

<style scoped>
</style>
