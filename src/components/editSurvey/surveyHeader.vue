<template>
  <view>

  </view>
</template>

<script>
  import viewAvatar from '@/components/viewSurvey/viewAvatar'
  import Badge from '@/components/viewSurvey/Badge'
  export default {
    props: {
      surveyInfo: {
        type: Object,
        default: {}
      },
      isActive: {
        default: false,
        type: Boolean
      }
    },
    components: {
      viewAvatar,
      Badge
    }
  }
</script>

<style scoped>

</style>
