<script>
export default {
  created () {
  }
}
</script>

<style lang="less">
@import "../static/base.less";

page{
  height: 100% !important;
  background-color:#F8F8F8;
  font-size:@font-size-middle;
  font-family:-apple-system-font,Helvetica Neue,Helvetica,sans-serif;
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
  border: solid @p-light-color 1px;
  border-radius: 15px 15px 15px 0;
  /*background-color: #f8f8f9;*/
  width: auto!important;
  display: inline-block;
  font-size: @font-size-small;
  max-width: 90%;
  background: @incoming-color;
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
  font-size: @font-size-small;
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
.clear-border:before{
  border-top:none!important;
}
.clear-border:after{
  border-bottom:none!important;
}

/* animation */
.transited {
  -webkit-transition: .3s; /* For Safari 3.1 to 6.0 */
  transition: .3s;
}

.primary-color {
  background-color: @p-color !important;
  color: @text-on-p-color !important;
}

.primary-color.dark, .form-control.primary-color:active {
  background-color: @p-dark-color !important;
}

.primary-color.light,
.form-control.primary-color:disabled,
.form-control.secondary-color[disabled],
.form-control.secondary-color:disabled {
  background-color: @p-light-color !important;
}

.primary-color.revert {
  color: @p-color !important;
  background-color: @text-on-p-color !important;
}

.primary-color.light.revert {
  color: @p-light-color !important;
  background-color: @text-on-p-color !important;
}

.primary-color.dark.revert {
  color: @p-dark-color !important;
  background-color: @text-on-p-color !important;
}

.secondary-color,
.form-control.secondary-color.light:active {
  background-color: @s-color !important;
  color: @text-on-s-color !important;
}

.secondary-color.dark, .form-control.secondary-color:active {
  background-color: @s-dark-color !important;
}

.secondary-color.light{
  background-color: @s-light-color !important;
}

.secondary-color.revert {
  color: @s-color !important;
  background-color: @text-on-p-color !important;
}

.secondary-color.light.revert {
  color: @s-light-color !important;
  background-color: @text-on-p-color !important;
}

.secondary-color.dark.revert {
  color: @s-dark-color !important;
  background-color: @text-on-p-color !important;
}

.warn-color {
  background-color: @w-color !important;
  color: white;
}

.warn-color.light {
  background-color: @w-light-color !important;
}

.warn-color.black {
  background-color: @w-dark-color !important;
}

/* outgoing message style */
.outgoing {
  padding:20rpx;
  border:solid #81d4f4 1rpx;
  border-radius:30rpx 30rpx 0 30rpx;
  background-color: @s-light-color !important;
  color: @text-on-s-color !important;
  font-size: @font-size-small;
  margin-right:10rpx;
  text-align:left;
}
</style>
