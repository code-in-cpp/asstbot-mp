<template>
  <block>
    <block v-if="outgoing">
      <block v-for="msg in msgs" :key="msg">
        <user-say :content="msg.data.query" v-if="msg.type=='text'"></user-say>
      </block>
    </block>
    <block v-else>
      <block  v-for="(msg, i) in msgs" :key="i">
        <i-row i-class="message-wrapper">
          <i-col span="3" >
            <view style="padding: 3px 10px">
              <i-avatar :src="bodAvatar" v-if="i == receivingMsgId || i == msgs.length-1"></i-avatar>
            </view>
          </i-col>
          <i-col span="18">
            <bot-say-text :content="msg.reply" v-if="msg.type=='text'"></bot-say-text> 
          </i-col>
        </i-row>
      </block>
    </block>
  </block>
</template>

<script>
import userSay from '@/components/userSay'
import botSayText from '@/components/botSay/botSayText'
import { mapState } from 'vuex'

export default {
  data () {
    return {
      receivingMsgId: this.msgs.length
    }
  },

  props: {
    receiving: {
      type: Boolean,
      default: false
    },

    msgs: {
      type: Array,
      default: []
    },

    outgoing: {
      type: Boolean,
      default: true
    }
  },

  computed: {
    ...mapState({
      bodAvatar: state => state.bodProfile.avatar
    })
  },

  components: {
    userSay,
    botSayText
  },

  mounted () {
    console.log('mounted')
  }
}
</script>

<style>
.card {
  padding: 10px;
}
.message-wrapper{
  margin-bottom: 10px;
}
</style>
