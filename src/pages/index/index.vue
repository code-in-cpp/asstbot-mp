<template>
  <div class="page">
    <view class="content">
      <scroll-view scroll-y='true' style="height: 100%" :scroll-into-view="scrollToView">
        <header-area :surveyData="survey"/>
        <block v-for="(messages, i) in messagesList" :key="i">
          <view :id="i">
          <msg-list :receiving="i==(messagesList.length-1)&&messages.to!==undefined"
              :messages="messages"/>
          </view>
          <view :id="'bottom'+i"></view>
        </block>
      </scroll-view>
    </view>
    <view class="sustainBox" :class="{'height_40': falg }"></view>
    <view class="footer">
      <command-area/>
    </view>
    <!--<box-float></box-float>-->
    <!--<upload-avatar></upload-avatar>-->
    <float-index></float-index>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import commandArea from '@/components/commandArea'
import headerArea from '@/components/headerArea'
// import boxFloat from '@/components/boxFloat'
import msgList from '@/components/msgList'
// import uploadAvatar from '@/components/uploadAvatar'
import floatIndex from '@/components/floatIndex'

export default {
  data () {
    return {
      survey: {}
    }
  },
  computed: {
    ...mapState({
      messagesList: state => state.messages.data,
      scrollToView: state => `bottom${state.messages.data.length - 1}`,
      userAuthed: state => state.userProfile.authed
    }),
    ...mapGetters({
      falg: 'activeAction'
    })
  },
  components: {
    headerArea,
    commandArea,
    // boxFloat,
    floatIndex,
    msgList
    // uploadAvatar,
  },

  methods: {
    bindViewTap () {
      const url = '../logs/main'
      wx.navigateTo({ url })
    },
    getUserInfo () {
      // 调用登录接口
      wx.login({
        success: () => {
          wx.getUserInfo({
            success: (res) => {
              this.userInfo = res.userInfo
            }
          })
        }
      })
    },

    clickHandle (msg, ev) {
      console.log('clickHandle:', msg, ev)
    }
  },

  created () {
    // 调用应用实例的方法获取全局数据
    this.getUserInfo()
  },

  onShow () {
  },

  onLoad (option) {
    // const complate = wx.getStorageSync('complate')
    // if (complate === 'success') {
    //   wx.navigateTo({
    //     url: '../display/main'
    //   })
    // }
    if (option.id) {
      this.$store.dispatch('setId', option.id)
      this.$store.dispatch('retrieveSurveyById', option.id)
        .then((survey) => {
          this.survey = survey
        })
        .catch((err) => {
          console.log(err)
        })
      this.$store.dispatch('updateUserInfo').then((res) => {
        if (this.userAuthed) {
          this.$store.dispatch('start', option.id)
        } else {
          this.$store.dispatch('getUserinfo', {content: '获取你的公开信息（昵称、头像等)', type: 'getUserinfo'})
        }
      }).catch((err) => {
        this.$store.dispatch('getUserinfo', {content: '获取你的公开信息（昵称、头像等)', type: 'getUserinfo'})
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>
  .sustainBox{
    width:100%;
    height:0;
    background: transparent;
    /*transition: height .5s linear .5s;*/
  }
  .height_40{
    height:540rpx;
  }
  .footer{
    /*position: fixed;*/
    /*bottom: 0*/
  }
</style>
