<template>
  <div class="page">
    <view class="content">
      <scroll-view scroll-y='true' style="height: 100%">
        <header-area/>
        <block v-for="(messages, i) in messagesList" :key="i">
          <view>
          <msg-list :receiving="i==(messagesList.length-1)&&messages.to!==undefined"
              :messages="messages"/>
          </view>

        </block>
      </scroll-view>
    </view>
    <view class="footer">
      <command-area/>
    </view>
    <!--<box-float :list="dataArray" :type="type"></box-float>-->
    <box-float></box-float>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import commandArea from '@/components/commandArea'
import headerArea from '@/components/headerArea'
import boxFloat from '@/components/boxFloat'
import msgList from '@/components/msgList'

export default {
  data () {
    return {
      motto: 'Hello World',
      userInfo: {},
      dataArray: [
        {
          type: 'radio',
          title: '您是男的还是女的呢？',
          items: [
            {caption: '男', value: '我是男的'},
            {caption: '女', value: '我是女的'}
          ]
        }
      ],
      type: 'radio'
    }
  },

  computed: {
    ...mapState({
      messagesList: state => state.messages.data
    })
  },

  components: {
    headerArea,
    commandArea,
    boxFloat,
    msgList
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
    this.$store.dispatch('login')
  }
}
</script>

<style scoped>
.page {
  display: flex;
  height: 100% !important;
  flex-direction: column;
}

.content {
  flex: 1;
  display: flex;
  background-color: rgb(249, 249, 249);
}

.footer {
  background-color: rgb(249, 249, 249);
}
</style>
