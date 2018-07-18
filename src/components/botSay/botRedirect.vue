<template>
  <block></block>
</template>

<script>

export default {
  props: {
    messageList: {
      type: Object,
      default: {}
    }
  },
  computed: {
    messageAction () {
      if (!this.messageList) {
        return undefined
      }
      var lastmsg = this.messageList.slice(-1)[0]
      if (!lastmsg || !lastmsg.to || !lastmsg.msgs || lastmsg.msgs.length === 0) {
        return undefined
      }

      return lastmsg.msgs.slice(-1)[0]
    }
  },
  watch: {
    messageAction: function (lastmsg) {
      if (!this.messageAction) {
        return
      }
      if (lastmsg.type === 'redirect') {
        if (lastmsg.url === 'view-survey') {
          if (lastmsg.option.id === 'created') {
            this.redirectTo(lastmsg, '/pages/createdSurvey/main')
          } else {
            this.redirectTo(lastmsg, '/pages/visitedSurvey/main')
          }
        } else if (lastmsg.url === 'create-survey') {
          if (lastmsg.option.id) {
            this.$store.dispatch('retrieveSurvey')
              .then(() => {
                this.redirectTo(lastmsg, `/pages/surveySubjects/main?id=${lastmsg.option.id}`)
              })
          }
        }
      }
    }
  },
  methods: {
    redirectTo (scene, url) {
      this.$emit('redirectTo', scene)
      wx.navigateTo({url})
    }
  }
}
</script>

<style>
.card {
  padding: 10px;
}
</style>