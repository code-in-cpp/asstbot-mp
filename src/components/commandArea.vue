<template>
  <form report-submit="true" @submit="sendMessage" class="footer">
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
         <record-button></record-button>
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
import recordButton from './widget/recordButton'

export default {
  data () {
    return {
      currentMessage: '请输入消息',
      rowHeight: '0rpx',
      focusFlag: true,
      voiceMode: false
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
    })
  },

  components: {
    recordButton
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
      this.$store.dispatch('sendQuery', e.mp.detail.value).then(res => {
        this.currentMessage = ''
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
  font-size: @font-size-big!important;
}
</style>
