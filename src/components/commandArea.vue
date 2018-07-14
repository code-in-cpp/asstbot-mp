<template>
  <form report-submit="true" @submit="sendMessage" class="footer">
    <record-status :recordStatus="recordStatus"></record-status>
    <view class="weui-flex primary-color light" :class="{iphonex_padding : is_iphonex}">
      <view class="placeholder">
        <button class="input-widget .form-control .primary-color" size="small" @click="voiceMode=true" v-if="!voiceMode">
          <i class="icon iconfont icon-translation"></i>
        </button>
        <button class="input-widget .form-control .primary-color" size="small" @click="voiceMode=false" v-else>
          <i class="icon iconfont .icon-keyboard"></i>
        </button>
      </view>

      <view class="weui-flex__item"  v-if="!voiceMode">
        <textarea class=" word-textarea primary-color revert" :value="currentMessage" @input="valueChange" @change="valueChange" @linechange="rowChange" adjust-position auto-height @focus="focusActive" cursor-spacing="12" :style="{color: focusFlag ? '#999' : '#333'}"  @confirm="keyEvnet($event)"/>
      </view>
      <view class="weui-flex__item "  v-else>
         <button class="input-widget .form-control .secondary-color" :class="recordStatus=='readyToRecord'?'':'dark'"
            @touchstart="startRecord"
            @touchcancel="cancelRecord"
            @touchmove="recordOperation"
            @touchend="stopRecord">{{recordOperationText}}</button>
      </view>
      <view class="placeholder" v-if="!voiceMode">
        <button class="input-widget .form-control .secondary-color buttonSend" size="small" formType="submit" :disabled="(currentMessage=='' || focusFlag) && !items.length">
          <i class="icon iconfont icon-arrows"></i>
        </button>
      </view>
    </view>
  </form>
</template>
<script>
import { mapState } from 'vuex'

const recorderManager = wx.getRecorderManager()

export default {
  data () {
    return {
      currentMessage: '请输入消息',
      rowHeight: '0rpx',
      focusFlag: true,
      voiceMode: false,
      recordStatus: 'readyToRecord',
      startRecordPageY: 0,
      endRecordPageY: 0
    }
  },
  computed: {
    ...mapState({
      userAuthed: state => state.userProfile.authed,
      is_iphonex: state => state.iphonex.is_iphonex,
      flag: state => {
        let data = state.messages.data.slice(-1)
        if (data[0] && data[0].to) {
          let type = data[0].msgs.slice(-1)[0].type
          return (type === 'text')
        }
        return false
      },
      items: state => {
        return state.inputValue.items
      }
    }),
    recordOperationText () {
      if (this.recordStatus === 'readyToRecord') {
        return '按住 说话'
      } else if (this.recordStatus === 'readyToCancel') {
        return '松开手指，取消发送'
      } else {
        return '松开 结束'
      }
    }
  },
  updated () {
  },
  methods: {
    updateUserInfo (ev) {
      this.$store.dispatch('updateUserInfo')
    },
    valueChange (ev) {
      this.currentMessage = ev.mp.detail.value
      console.log('当前的值change：' + this.currentMessage)
    },
    sendMessage (ev) {
      if (this.currentMessage && !this.focusFlag) {
        this.$store.dispatch('sendQuery', this.currentMessage).then(res => {
          this.$store.commit('clearState')
        })
        this.currentMessage = ''
      } else {
        this.$store.dispatch('sentCheckBoxReply', {items: this.items}).then(res => {
          this.$store.commit('clearState')
        })
      }
    },
    rowChange (e) {
      this.rowHeight = e.mp.detail.heightRpx + 'rpx'
    },
    focusActive () {
      if (this.focusFlag) {
        this.currentMessage = ''
        this.focusFlag = false
      }
    },
    keyEvnet (e) {
      // console.log(this)
      this.$store.dispatch('sendQuery', e.mp.detail.value).then(res => {
        this.currentMessage = ''
      })
      // this.currentMessage = ''
    },
    startRecord (e) {
      this.startRecordPageY = e.clientY
      this.endRecordPageY = e.clientY
      this.recordStatus = 'inRecording'
      this.startRecordOperation()
    },
    stopRecord (e) {
      recorderManager.stop()
    },
    cancelRecord (e) {
      recorderManager.stop()
    },
    recordOperation (e) {
      this.endRecordPageY = e.clientY
      if (this.endRecordPageY - this.startRecordPageY < -50) {
        this.recordStatus = 'readyToCancel'
      } else {
        this.recordStatus = 'inRecording'
      }
    },
    clearRecordStatus () {
      this.recordStatus = 'readyToRecord'
      this.startRecordPageY = 0
      this.endRecordPageY = 0
    },
    startRecordOperation () {
      let that = this
      recorderManager.onStart(() => {
        console.log('recorder start')
      })
      recorderManager.onPause(() => {
        console.log('recorder pause')
      })
      recorderManager.onStop((res) => {
        console.log('recorder stop', res)
        // const { tempFilePath } = res
        if (that.recordStatus === 'inRecording') {
          wx.showLoading({
            title: '认真理解中',
            mask: true
          })
          that.$store.dispatch('getAsrResult', res.tempFilePath)
            .then(() => {
              that.$store.commit('clearState')
              that.items = []
              wx.hideLoading()
            })
            .catch(() => {
              wx.hideLoading()
              wx.showToast({
                title: '没听懂:(',
                icon: 'none'
              })
            })
        }
        that.clearRecordStatus()
      })
      recorderManager.onFrameRecorded((res) => {
        const { frameBuffer } = res
        console.log('frameBuffer.byteLength', frameBuffer.byteLength)
      })

      const options = {
        duration: 60000,
        sampleRate: 16000,
        numberOfChannels: 1,
        encodeBitRate: 64000,
        format: 'mp3'
      }

      recorderManager.start(options)
    }
  }
}
</script>

<style lang="less">

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

.word-textarea{
  height: auto;
  min-height: 74rpx;
  padding-left: 10rpx;
  line-height: 74rpx;
  word-break: break-word;
  border: 1rpx solid #dadada;
  box-sizing: border-box;
  width:100%;
  height:100%;
}

.iphonex_padding{
  margin-bottom: 68rpx;
}

.input-widget .iconfont{
  font-size: 40rpx!important;
}
</style>
