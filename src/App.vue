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
  margin-bottom: 80rpx;
  margin-left: 80rpx;
  margin-right: 80rpx;
}
.page__bd_spacing{
  padding-top  : 20rpx;
  padding-left : 40rpx;
  padding-right: 40rpx;
  border: 2rpx;
}

</style>
