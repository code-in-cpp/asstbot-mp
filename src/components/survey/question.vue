<template>
  <view>
    <wxc-list
      class="item"
      :src="getIcon"
      :arrow="arrowType"
      :title="question.question"
      @itemClicked="clicked">
    </wxc-list>
    <block v-if="showDetail">

    </block>
  </view>
</template>


<script>
  export default {
    data () {
      return {
        arrowType: 'arrow-right'
      }
    },
    props: {
      question: {
        type: Object,
        default: {}
      },
      showDetail: {
        default: false,
        type: Boolean
      }
    },
    watch: {
      showDetail: function (newValue, oldValue) {
        if (newValue) {
          this.arrowType = 'arrow-down'
        } else {
          this.arrowType = 'arrow-right'
        }
      }
    },
    computed: {
      getIcon () {
        if (this.question === undefined || this.question === null || this.question.type === undefined || this.question.type === null) {
          return '/static/image/radiao.png'
        }
        return '/static/image/' + this.question.type + '.png'
      }
    },
    // components: {
    //   viewAvatar,
    //   Badge
    // },
    methods: {
      // changeInfo () {
      //   console.log('survey item, try to change info')
      //   this.$emit('changeInfo')
      // },
      // changeAvatar () {
      //   console.log('survey item, try to change avatar')
      //   this.$emit('changeAvatar')
      // }
      clicked () {
        this.showDetail = !this.showDetail
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../../static/base.less";
  .list-wrap {
    width: 100%;
    background: #efefef;
    padding-bottom: 30rpx;
    padding-top: 30rpx;
    top: 100rpx;
  }
  .list-item {
    background: #fff;
    margin-bottom: 30rpx;
  }
  .list-item:last-child {
    margin: 0;
  }
  .item {
    flex: 1;
  }
  .item:last-of-type {
    /*mode="none"*/
  }
</style>
