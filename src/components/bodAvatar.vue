<template>
  <image :src="url!=''?url:bodAvatar" class="" :style="'width: '+size+'px; height: '+size+'px;'"/>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: {
    size: {
      type: Number,
      default: 20
    },
    url: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapState({
      bodAvatar: state => state.bodProfile.avatar,
      bodName: state => state.bodProfile.name
    })
  }
}
</script>

<style>
.avatar {
  border-radius: 50%
}
</style>
