<template>
  <form report-submit="true" @submit="sendMessage" class="footer">
    <view class="weui-flex primary-color light">
      <view class="placeholder">
        <button class="input-widget form-control primary-color" size="small" @click="changeVoiceMode" v-if="!voiceMode">
          <i class="icon iconfont icon-translation"></i>
        </button>
        <button class="input-widget form-control primary-color" size="small" @click="voiceMode=false" v-else>
          <i class="icon iconfont .icon-keyboard"></i>
        </button>
      </view>
      <block>
        <view class="weui-flex__item"  v-if="!voiceMode">

          <input class="word-textarea primary-color revert textarea-style-2" type="text" adjust-position="true" :value="currentMessage" :cursorSpacing="14" :maxLength="textLength"
          :placeholder="placehodlerText" confirm-type="send" confirm-hold="true"
          @input="valueInput" @confirm="confirm" @focus="textFocus" @blur="textBlur"/>

</view>
<view class="weui-flex__item" v-else>
<record-button @msgSendStatus="msgSendStatus"></record-button>
</view>
</block>
<view class="placeholder">
<button class="input-widget form-control secondary-color buttonSend" size="small" formType="submit" :disabled="(currentMessage=='') && !items.length">
<i class="icon iconfont icon-arrows"></i>
</button>
      </view>
    </view>
    <device-padding></device-padding>
  </form>
</template>
<script>
import { mapState } from 'vuex'
import recordButton from './widget/recordButton'
import devicePadding from './view/devicePadding'

function getRecordAuth () {
  return new Promise((resolve, reject) => {
    wx.getSetting({
      success (res) {
        if (!res.authSetting['scope.record']) {
          wx.authorize({
            scope: 'scope.record',
            success () {
              resolve()
            },
            fail (err) {
              wx.hideLoading()
              wx.showToast({
                title: '请在设置页面打开“录音功能”',
                icon: 'none'
              })
              reject(err)
            }
          })
        } else {
          resolve()
        }
      }
    })
  })
}

export default {
  data () {
    return {
      currentMessage: '',
      voiceMode: false,
      pullUp: false
    }
  },
  computed: {
    ...mapState({
      userAuthed: state => state.userProfile.authed,
      items: state => {
        return state.inputValue.items
      },
      event: state => {
        return state.inputValue.event
      },
      globalShow: state => state.inputValue.globalShow
    }),
    displayText () {
      if (!this.items) {
        return ''
      }
      return this.items.filter(item => item.caption && item.caption.length > 1)
            .map((item) => item.caption).join(',')
    },
    textAreaFocus () {
      return this.needFocus && this.inputPromt.type && this.inputPromt.type === 'input-prompt'
    },
    textType () {
      return this.inputPromt.keyboard ? this.inputPromt.keyboard : 'text'
    },
    textLength () {
      return this.inputPromt.length ? this.inputPromt.length : 140
    },
    placehodlerText () {
      return this.inputPromt.prompt ? this.inputPromt.prompt : ' '
    }
  },
  props: {
    inputPromt: {
      type: Object,
      default: {}
    },
    needFocus: {
      type: Boolean,
      default: true
    },
    displayFinish: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    displayText: function (newVal, oldVal) {
      this.currentMessage = newVal
    }
  },
  components: {
    recordButton,
    devicePadding
  },
  methods: {
    valueInput (ev) {
      this.currentMessage = ev.mp.detail.value
    },
    valueChange (ev) {
      this.currentMessage = ev.mp.detail.value
    },
    sendMessage (ev) {
      if (this.currentMessage && this.currentMessage !== this.displayText) {
        this.$store.dispatch('sendQuery', this.currentMessage).then(res => {
          this.$store.commit('clearState')
        })
        this.currentMessage = ''
      } else {
        this.$store.dispatch('sentCheckBoxReply', {items: this.items, event: this.event}).then(res => {
          this.$store.commit('clearState')
        })
      }
    },
    confirm (e) {
      if (e.mp.detail.value) {
        this.$store.dispatch('sendQuery', e.mp.detail.value).then(res => {
          this.currentMessage = ''
        }).catch(error => {
          console.log('error:' + error)
          this.currentMessage = ''
        })
      }
    },
    setGlobalShow () {
      if (this.globalShow) {
        this.$store.commit('setGlobalFalse')
      } else {
        this.$store.commit('setGlobalTrue')
      }
    },
    msgSendStatus (event) {
      this.$emit('msgSendStatus', event)
    },
    textFocus (e) {
      console.log('textFocus')
      const that = this
      wx.getSystemInfo({
        success: function (res) {
          let dom = wx.createSelectorQuery().select('#bottom').boundingClientRect()
          dom.exec(function (resp) {
            if (res.screenHeight - resp[0].bottom - 40 > e.mp.detail.height) {
              that.pullUp = false
              that.$emit('keyBoardUp', e.mp.detail.height * 2 + 'rpx')
            } else {
              that.pullUp = true
              that.$emit('keyBoardUp', '0rpx')
            }
          })
        }
      })
    },
    textBlur (e) {
      this.pullUp = false
      this.$emit('keyBoardUp', '0rpx')
    },
    changeVoiceMode () {
      getRecordAuth()
        .then(() => {
          this.voiceMode = true
        })
        .catch((err) => {
          console.error(err)
        })
    }
  }
}
</script>

<style lang="less">
@import "../../static/base.less";

.input-widget {
  margin: 0!important;
  height: 100%;
  max-height: 80rpx;
  line-height: 80rpx;
  box-sizing: border-box;
}
.input-widget:disabled{
  padding-left: 20px;
}
  .height-line-height{
    /*height: 80rpx;*/
    line-height: 80rpx;
    box-sizing: border-box;
  }
  .container-box{
    align-items: flex-end;
    display: flex!important;
    background: #ccc;
  }
  .word-break{
    /*word-wrap: normal;*/
    word-break: break-word;
  }
  .word-textarea{
    height: auto;
    background: #fff;
    padding-left: 10rpx;
  }
  .buttonSend[disabled]{
    background: #999!important;
  }

   .default-widget {
    background: #999!important;
   }

   .button-talk-pressed {
     background-color: #FFF!important;
     color: #666!important;
   }

  .command-box{
    padding: 4rpx 8rpx;
  }
  .command-text{
    border: 1rpx solid #dadada;
    box-sizing: border-box;
    width:100%;
    height:100%;
  }



  .input-widget .iconfont{
    font-size: 40rpx!important;
  }

.word-textarea{
  /*height: auto;*/
  min-height: 74rpx;
  padding-left: 10rpx;
  line-height: 74rpx;
  word-break: break-word;
  border: 1rpx solid #dadada;
  box-sizing: border-box;
  width:100%;
  margin-top: 3rpx;
  /*height:100%;*/
  height: 80rpx;
}

.input-widget .iconfont{
  font-size: @font-size-big!important;
}
  .placeholder{
    display: flex;
    align-items: flex-end;
  }
  .textarea-style-2{
    line-height: 40rpx;
  }
  .textarea-style-1{
    line-height: 80rpx;
  }
</style>
