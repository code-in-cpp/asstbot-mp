<template>
  <form report-submit="true" @submit="sendMessage" class="footer">
    <view class="weui-flex primary-color light">

      <view class="placeholder">
        <button class="input-widget .form-control .primary-color" size="small" @click="voiceMode=true" v-if="!voiceMode">
          <i class="icon iconfont icon-translation"></i>
        </button>
        <button class="input-widget .form-control .primary-color" size="small" @click="voiceMode=false" v-else>
          <i class="icon iconfont .icon-keyboard"></i>
        </button>
      </view>
      <view class="weui-flex__item"  v-if="!voiceMode">
        <!--<textarea class="word-textarea primary-color revert" :value="currentMessage" @input="valueInput" @change="valueChange" adjust-position @focus="focusActive" auto-height="true" @linechange="rowChange" cursor-spacing="14" :style="{color: focusFlag ? '#999' : '#333', height: rowHeight, lineHeight: lineHeight}"  @confirm="keyEvnet($event)"/>-->
        <textarea class="word-textarea primary-color revert" :value="currentMessage" @input="valueInput"  adjust-position @focus="focusActive" auto-height="true"  cursor-spacing="14" :style="{color: focusFlag ? '#999' : '#333'}"  @confirm="keyEvnet($event)"/>
      </view>
      <view class="weui-flex__item"  v-else>
        <record-button></record-button>
      </view>
      <view class="placeholder" v-if="!voiceMode">
        <button v-if="items.length || (currentMessage && !focusFlag)" class="input-widget .form-control .secondary-color buttonSend" size="small" formType="submit" :disabled="(currentMessage=='' || focusFlag) && !items.length">
          <i class="icon iconfont icon-arrows"></i>
        </button>
        <button v-if="(currentMessage=='' || focusFlag) && !items.length" class="input-widget .form-control buttonSend" @click="setGlobalShow">
          <i class="icon iconfont icon-addition"></i>
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

export default {
  data () {
    return {
      currentMessage: '请输入消息',
      rowHeight: '80rpx',
      lineHeightNum: '80rpx',
      focusFlag: true,
      voiceMode: false
    }
  },
  computed: {
    ...mapState({
      userAuthed: state => state.userProfile.authed,
      items: state => {
        return state.inputValue.items
      },
      globalShow: state => state.inputValue.globalShow
    })
  },

  components: {
    recordButton,
    devicePadding
  },

  methods: {
    updateUserInfo (ev) {
      this.$store.dispatch('updateUserInfo')
    },
    valueInput (ev) {
      this.currentMessage = ev.mp.detail.value
      // if (String.prototype.slice.apply(ev.mp.detail.value, [-1]) === '\n') {
      //   this.$store.dispatch('sendQuery', String.prototype.slice.apply(this.currentMessage, [0, -1])).then(res => {
      //     this.$store.commit('clearState')
      //   })
      //   this.currentMessage = ''
      // }
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
      let count = e.mp.detail.lineCount
      let heightNum = count === 1 ? count * 80 : count * 56
      this.rowHeight = heightNum + 'rpx'
      this.lineHeightNum = count <= 1 ? '80rpx' : '56rpx'
    },
    focusActive () {
      if (this.focusFlag) {
        this.currentMessage = ''
        this.focusFlag = false
      }
    },
    keyEvnet (e) {
      if (e.mp.detail.value) {
        this.$store.dispatch('sendQuery', e.mp.detail.value).then(res => {
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
  /*height:100%;*/
}

.input-widget .iconfont{
  font-size: @font-size-big!important;
}
  .placeholder{
    display: flex;
    align-items: flex-end;
  }
</style>
