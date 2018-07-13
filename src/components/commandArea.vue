<template>
  <form report-submit="true" @submit="sendMessage" class="footer">
    <view class="record-status" v-if="recordStatus!='readyToRecord'">
      <block v-if="recordStatus=='inRecording'">
        <view class="weui-flex" style="width: 300rpx">
          <view class="weui-flex__item">
            <i class="icon iconfont icon-translation_fill" style="color: white; float:right;"></i>
          </view>
          <view class="weui-flex__item">
            <view class="spinner"></view>
          </view>
        </view>
        <view style="width: 300rpx;text-align: center">
          <text>
            手指上滑，取消发送
          </text>
        </view>
      </block>
      <block v-else>
        <view>
          <i class="icon iconfont icon-undo"></i>
        </view>
        <text style="background-color: red;">
          松开手指，取消发送
        </text>
      </block>
    </view>
    <view class="weui-flex container-box" :class="{iphonex_padding : is_iphonex}">
      <view class="placeholder">
        <button class="input-widget height-line-height default-widget" size="small" @click="voiceMode=true" v-if="!voiceMode">
          <i class="icon iconfont icon-translation"></i>
        </button>
        <button class="input-widget height-line-height default-widget" size="small" @click="voiceMode=false" v-else>
          <i class="icon iconfont .icon-keyboard"></i>
        </button>
      </view>

      <view class="weui-flex__item height-line-height command-box"  v-if="!voiceMode">
        <!--<i-input v-if="!activeAction" auto-height="auto" class="height-line-height word-break" type="textarea" :value="currentMessage" @change="valueChange" placeholder="请输入消息" />-->
        <!--<textarea v-if="!activeAction" class=" word-textarea  word-break command-text" :value="currentMessage" @input="valueChange" @change="valueChange" @linechange="rowChange" adjust-position auto-height @focus="focusActive" cursor-spacing="12" :style="{color: focusFlag ? '#999' : '#333'}"  @confirm="keyEvnet($event)"/>-->
        <textarea class=" word-textarea  word-break command-text" :value="currentMessage" @input="valueChange" @change="valueChange" @linechange="rowChange" adjust-position auto-height @focus="focusActive" cursor-spacing="12" :style="{color: focusFlag ? '#999' : '#333'}"  @confirm="keyEvnet($event)"/>
      </view>
      <view class="weui-flex__item height-line-height"  v-else>
        <!--<i-input v-if="!activeAction" auto-height="auto" class="height-line-height word-break" type="textarea" :value="currentMessage" @change="valueChange" placeholder="请输入消息" />-->
        <!--<textarea v-if="!activeAction" class=" word-textarea  word-break command-text" :value="currentMessage" @input="valueChange" @change="valueChange" @linechange="rowChange" adjust-position auto-height @focus="focusActive" cursor-spacing="12" :style="{color: focusFlag ? '#999' : '#333'}"  @confirm="keyEvnet($event)"/>-->
        <button class="input-widget height-line-height button-talk" :class="recordStatus=='readyToRecord'?'':'button-talk-pressed'"
            @touchstart="startRecord"
            @touchcancel="cancelRecord"
            @touchmove="recordOperation"
            @touchend="stopRecord">{{recordOperationText}}</button>
      </view>
      <view class="placeholder" v-if="!voiceMode">
        <button class="input-widget height-line-height buttonSend" size="small" formType="submit" :disabled="(currentMessage=='' || focusFlag) && !items.length">
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
      this.$store.dispatch('sendQuery', this.currentMessage)
      this.currentMessage = ''
      console.log(e)
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

<style>
.input-widget {
  margin: 0!important;
  height: 100%;
  max-height: 80rpx;
  color:#fff!important;
  background:#2d8cf0!important
}
.input-widget:disabled{
  background: rgba(168,167,165,0.09)!important;
  padding-left: 20px;
}
  .height-line-height{
    /*height: 80rpx;*/
    line-height: 80rpx;
    box-sizing: border-box;
  }
  .container-box{
    align-items: flex-end;
    background: #ccc;
  }
  .word-break{
    /*word-wrap: normal;*/
    word-break: break-word;
  }
  .word-textarea{
    height: auto;
    background: #fff;
    min-height: 72rpx;
    padding-left: 10rpx;
    line-height: 72rpx;
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

  .iphonex_padding{
    margin-bottom: 68rpx;
  }

  .input-widget .iconfont{
    font-size: 40rpx!important;
  }

  .record-status {
    position: fixed;
    top: 300rpx;
    left: 225rpx;
    width: 300rpx;
    height: 375rpx;
    background-color: rgba(0 , 0, 0, 0.5);
    text-align: center;
    color: white;
  }

  .record-status .iconfont {
    font-size: 200rpx;
  }

  .record-status text {
    font-size: 28rpx;
  }

  .spinner {
    margin-top: 150rpx;
    width: 80rpx;
    height: 80rpx;
    background-color: #fff;

    border-radius: 100%;
    -webkit-animation: scaleout 1.0s infinite ease-in-out;
    animation: scaleout 1.0s infinite ease-in-out;
  }

  @-webkit-keyframes scaleout {
    0% { -webkit-transform: scale(0.0) }
    100% {
      -webkit-transform: scale(1.0);
      opacity: 0;
    }
  }

@keyframes scaleout {
  0% {
    transform: scale(0.0);
    -webkit-transform: scale(0.0);
  } 100% {
    transform: scale(1.0);
    -webkit-transform: scale(1.0);
    opacity: 0;
  }
}
</style>
