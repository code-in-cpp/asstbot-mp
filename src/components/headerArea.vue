<template>
  <view class="header">
    <view class="header-item">
      <bod-avatar :url="surveyData.avatarUrl" size="80"/>
    </view>
    <!-- <view class="header-item">
      <text class="title">{{bodName}}</text>
    </view> -->
    <!--<view class="header-item discription">-->
      <!--&lt;!&ndash;<view class="talking"></view>&ndash;&gt;-->
      <!--<view class="">-->
        <!--{{surveyData.title}}-->
      <!--</view>-->
    <!--</view>-->
  </view>
</template>

<script>
export default {
  props: {
    surveyData: {
      type: Object,
      default: {
      }
    }
  },
  computed: {
  }
}
</script>

<style>

.header {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-bottom: 10px;
}

.header-item {
  width: 100%;
  text-align: center;

}

.title {
  font-weight: bold;
}

.discription {
  font-size: 28rpx;
  display: flex;
  flex-direction: row;
  justify-content: center;
}

/* .talking {
  color: green;
  font-size: 20px;
  vertical-align: middle;
} */
.talking {
  background-color:green;
  display:inline-block;
  width:24rpx;
  height:24rpx;
  color:inherit;
  vertical-align:middle;
  pointer-events:none;
  border-radius:50%;
  -webkit-animation:loader-09 1.0s infinite ease-in-out;
  animation:loader-09 1.0s infinite ease-in-out;
  margin-top:10rpx;

}

@-webkit-keyframes loader-09 {
  0% {
    -webkit-transform: scale(0);
    transform: scale(0);
  }
  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
    opacity: 0;
  }
}

@keyframes loader-09 {
  0% {
    -webkit-transform: scale(0);
    transform: scale(0);
  }
  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
    opacity: 0;
  }
}
</style>
