<template>
    <view class="textarea-box">
      <text class="textarea-text" selectable="true" v-if="isText" @click="showTextarea">{{content || defaultValue}}</text>
      <textarea @blur="blur" class="textarea-item" v-if="!isText" :value="content" :focus="focusEnd"
                @change="$emit('getTextareaValue',{index: index,  value: $event.mp.detail.value})"
                @confirm="$emit('getTextareaValue',{index: index,  value: $event.mp.detail.value})"></textarea>
    </view>
</template>

<script>
  import { mapMutations } from 'vuex'
  export default {
    name: 'textOrArea',
    data () {
      return {
        isText: true,
        focusEnd: false
      }
    },
    props: [
      'content',
      'index',
      'defaultValue'
    ],
    methods: {
      ...mapMutations([
        'updateSubjectQuestion'
      ]),
      showTextarea () {
        const that = this
        this.isText = false
        setTimeout(function () {
          that.focusEnd = true
        }, 100)
      },
      blur () {
        this.isText = true
        this.focusEnd = false
      }
    }
  }
</script>

<style scoped>
  .textarea-box{
    background: #fff;
  }
  .textarea-text{
    /*width:100%;*/
    /*line-height:64rpx;*/
    /*display:block;*/
    /*padding-left:30rpx;*/
    /*overflow:hidden;*/
    /*text-overflow:ellipsis;*/
    /*box-sizing:border-box;*/
    /*-webkit-line-clamp: 3;*/
    /*line-clamp: 3;*/
    /*display:-webkit-box;*/
    /*max-height: 192rpx;*/
    /*-webkit-box-orient:vertical;*/

    width:100%;
    line-height:64rpx;
    display:block;
    padding-left:30rpx;
    box-sizing:border-box;


  }
  .textarea-item{
    width: 100%;
    line-height: 64rpx;
    height: 192rpx;
    overflow: auto;
    padding-left: 30rpx;
    padding-right: 30rpx;
    box-sizing: border-box;
  }
</style>
