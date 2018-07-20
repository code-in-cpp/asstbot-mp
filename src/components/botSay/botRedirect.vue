// <template>
//   <block></block>
// </template>

// <script>
// const urlMaping = {'create-survey': '/pages/createdSurvey/main',
//   'visit-survey': '/pages/visitedSurvey/main',
//   'edit-survey': '/pages/surveySubjects/main',
//   'bot-creator': '/pages/index/main'}

// export default {
//   props: {
//     lastmsg: {
//       type: Object,
//       default: {}
//     }
//   },
//   computed: {
//     messageAction () {
//       if (!this.messageList) {
//         return undefined
//       }
//       var lastmsg = this.messageList.slice(-1)[0]
//       if (!lastmsg || !lastmsg.to || !lastmsg.msgs || lastmsg.msgs.length === 0) {
//         return undefined
//       }

//       return lastmsg.msgs.slice(-1)[0]
//     }
//   },
//   watch: {
//     messageAction: function (lastmsg) {
//       if (!this.messageAction) {
//         return
//       }
//       console.log('last msg is ', lastmsg)
//       let redirectUrl = urlMaping[lastmsg.url]
//       let headerParas = this.buildHeaderParas(lastmsg.option)
//       let urlWithParas = redirectUrl + headerParas

//       if (lastmsg.type === 'redirect') {
//         if (lastmsg.url === 'edit-survey') {
//           this.$store.dispatch('retrieveSurvey')
//             .then(() => {
//               this.redirectTo(lastmsg, urlWithParas)
//             })
//         } else {
//           this.redirectTo(lastmsg, urlWithParas)
//         }
//       } else if (lastmsg.type === 'reLaunch') {
//         if (lastmsg.url === 'edit-survey') {
//           this.$store.dispatch('retrieveSurvey')
//             .then(() => {
//               wx.reLaunch({url: urlWithParas})
//             })
//         } else {
//           wx.reLaunch({url: `${urlWithParas}?scene='relaunchFromBot'`})
//         }
//       }
//     }
//   },
//   methods: {
//     redirectTo (scene, url) {
//       this.$emit('redirectTo', scene)
//       wx.navigateTo({url})
//     },

//     buildHeaderParas (option) {
//       if (!option) {
//         return ''
//       }
//       let ret = '?'
//       for (let key in option) {
//         let para = key + '=' + option[key]
//         ret += (ret === '?') ? para : '&' + para
//       }
//       console.log('build para is', ret)
//       return ret
//     }
//   }
// }
// </script>

// <style>
// .card {
//   padding: 10px;
// }
// </style>