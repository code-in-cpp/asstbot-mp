<template>
  <block></block>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      userAuthed: state => state.userProfile.authed,
      loginStatus: state => state.userProfile.loginStatus
    }),
    ...mapState({
      messageList: state => state.messages.creatorBotMsg
    }),
    hasLogin () {
      console.log(this.userAuthed, this.loginStatus)
      return this.userAuthed || this.loginStatus
    }
  },
  watch: {
    hasLogin: function (newVal, oldVal) {
      console.log('hasLogin change', newVal, oldVal)
      if (newVal) {
        this.$emit('haslogin')
      }
    }
  }
}
</script>

<style>
.card {
  padding: 10px;
}
</style>