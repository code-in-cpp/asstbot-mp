<template>
  <block></block>
</template>

<script>
const urlMaping = {'create-survey': '/pages/createdSurvey/main',
  'visit-survey': '/pages/visitedSurvey/main',
  'edit-survey': '/pages/surveySubjects/main',
  'bot-creater': '/pages/index/main'}

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
        let redirectUrl = urlMaping[lastmsg.url]
        let headerParas = this.buildHeaderParas(lastmsg.option)
        let urlWithParas = redirectUrl + headerParas
        if (lastmsg.url === 'edit-survey') {
          this.$store.dispatch('retrieveSurvey')
            .then(() => {
              this.redirectTo(lastmsg, urlWithParas)
            })
        } else {
          this.redirectTo(lastmsg, urlWithParas)
        }
      }
    }
  },
  methods: {
    redirectTo (scene, url) {
      this.$emit('redirectTo', scene)
      wx.navigateTo({url})
    },

    buildHeaderParas (option) {
      if (!option) {
        return ''
      }
      console.log(Object.entries(option))
      let ret = '?'
      for (let key in option) {
        ret = ret + key + '=' + option[key]
      }
      return ret
    }
  }
}
</script>

<style>
.card {
  padding: 10px;
}
</style>