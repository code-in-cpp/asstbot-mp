<template>
  <image :src="url!='null'&&url!=''&&url!=null?url:bodAvatar" class="avatar" :style="'width: '+size*2+'rpx; height: '+size*2+'rpx;'"/>
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

<style scoped>
.avatar {
  border-radius: 50%
}
</style>
