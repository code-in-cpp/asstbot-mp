<template>
<block>
  <record-status :recordStatus="recordStatus"></record-status>
  <button class="input-widget form-control secondary-color" :class="recordStatus=='readyToRecord'?'':'dark'"
            @touchstart="startRecord"
            @touchcancel="cancelRecord"
            @touchmove="recordOperation"
            @touchend="stopRecord">{{recordOperationText}}</button>
</block>
</template>
<script>
const recorderManager = wx.getRecorderManager()
export default {
  data () {
    return {
      recordStatus: 'readyToRecord',
      startRecordPageY: 0,
      endRecordPageY: 0
    }
  },
  computed: {
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
  methods: {
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
          that.$emit('msgSendStatus', 'start')
          that.$store.dispatch('getAsrResult', res.tempFilePath)
            .then(() => {
              that.$store.commit('clearState')
              that.items = []
              that.$emit('msgSendStatus', 'end')
            })
            .catch(() => {
              that.$emit('msgSendStatus', 'end')
              wx.showToast({
                title: '没听懂:(',
                icon: 'none'
              })
            })
        }
        that.clearRecordStatus()
      })
      recorderManager.onError((error) => {
        console.log('录音停止，原因可能如下所示')
        console.log(error)
      })
      recorderManager.onFrameRecorded((res) => {
        const { frameBuffer } = res
        console.log('frameBuffer.byteLength', frameBuffer.byteLength)
      })
      recorderManager.onError((error) => {
        console.log('录音断开，可能是由于下面原因导致的')
        console.log(error)
        if (wx.getStorageSync('recordError')) {
          wx.setStorageSync('recordError', JSON.stringify(error) + wx.getStorageSync('recordError'))
        } else {
          wx.setStorageSync('recordError', JSON.stringify(error))
        }
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

<style>
.input-widget {
  margin: 0!important;
  height: 100%;
  max-height: 80rpx;
  line-height: 80rpx;
  box-sizing: border-box;
}
</style>
