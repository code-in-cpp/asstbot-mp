<template>
  <view class="weui-flex bot-message">
    <view class="left-item">
      <view class="avatar-wrapper">
        
      </view>
      <view class="content">
        <view class="box incoming">
          <div class="loader-13">
          </div>
        </view>        
      </view>
    </view>
  </view>
</template>

<script>

export default {
  created () {
  }
}
</script>

<style>
.box {
  display: block;
  width: 160rpx;
  height: 30rpx;
  font-size: 30rpx;
  padding: 1em;
  position: relative;
  margin-bottom: .25em;
  -webkit-transition: .3s color, .3s border, .3s transform, .3s opacity;
  transition: .3s color, .3s border, .3s transform, .3s opacity;
}

.loader-13:before,
.loader-13:after,
.loader-13 {
  display: block;
  width: 30rpx;
  height: 30rpx;
  color: inherit;

  pointer-events: none;
  border-radius: 50%;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  -webkit-animation: loader-13 1.8s infinite ease-in-out;
  animation: loader-13 1.8s infinite ease-in-out;
}

.loader-13 {
  color: blue;
  position: relative;
  -webkit-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation-delay: -0.16s;
  animation-delay: -0.16s;
  top: -1em;
}

.loader-13:before {
  right: 100%;
  -webkit-animation-delay: -0.32s;
  animation-delay: -0.32s;
}

.loader-13:after {
  left: 100%;
}

.loader-13:before,
.loader-13:after {
  content: '';
  display: block;
  position: absolute;
  top: 0;
  width: inherit;
  height: inherit;
}

@-webkit-keyframes loader-13 {
  0%,
  80%,
  100% {
    box-shadow: 0 1em 0 -1em;
  }
  40% {
    box-shadow: 0 1em 0 -.2em;
  }
}

@keyframes loader-13 {
  0%,
  80%,
  100% {
    box-shadow: 0 1em 0 -1em;
  }
  40% {
    box-shadow: 0 1em 0 -.2em;
  }
}

</style>
