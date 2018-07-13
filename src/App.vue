<script>
export default {
  created () {
    // 调用API从本地缓存中获取数据
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // console.log('app created and cache logs by setStorageSync')
  }
}
</script>

<style>


page{
  height: 100% !important;
  background-color:#F8F8F8;
  font-size:16px;
  font-family:-apple-system-font,Helvetica Neue,Helvetica,sans-serif;

}

.weui-flex {
    display: flex;
}
.weui-flex__item{
    flex: 1;
}

.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 200rpx 0;
  box-sizing: border-box;
}
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}

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

.small-avatar {
  width: 50rpx!important;
  height: 50rpx!important;
  border-radius: 50%;
}

.bottom_button{
  margin: 40rpx 80rpx;
}
.page__bd_spacing{
  padding-top  : 20rpx;
  padding-left : 40rpx;
  padding-right: 40rpx;
  padding-bottom: 40rpx;
  border: 2rpx;
}

.weui-btn .iconfont {
  margin-right: 20 rpx;
}

.button_icon{
  margin-right: 20rpx;
}

.incoming {
  padding: 20rpx;
  margin-left: 20rpx;
  border: solid #dddee1 1px;
  border-radius: 15px 15px 15px 0;
  /*background-color: #f8f8f9;*/
  width: auto!important;
  display: inline-block;
  font-size: 28rpx;
  max-width: 90%;
  background: #fff;
}
.boxFloat{
  width:100%;
  height: 0rpx;
  transition:height 0.5s;
  background: transparent;
}
.top_0{
  height: 700rpx;
}
  .font-color{
    color: #999;
  }
  .font-size{
    font-size: 28rpx;
  }

/* Bot Message Style  */
.bot-message {
  padding-bottom: 10px;
  display: flex;

}

.bot-message .avatar-wrapper {
  padding: 3px 10px;
  width: 40rpx
}

.bot-message .left-item{
    max-width: 80%;
    display: flex;
    width:100%;
  }

.bot-message .content{
    width:100%
  }


/* animation */
.transited {
  -webkit-transition: .3s; /* For Safari 3.1 to 6.0 */
  transition: .3s;
}
</style>
