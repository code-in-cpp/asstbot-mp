<template>
  <view class="header">
    <view class="header-item">
      <bod-avatar :url="surveyData.avatarUrl" size="80"/>
    </view>
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

</style>
