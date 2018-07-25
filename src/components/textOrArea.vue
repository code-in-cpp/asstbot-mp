<template>
    <view class="textarea-box">
      <text class="textarea-text" v-if="isText" @click="showTextarea">{{content || defaultValue}}</text>
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
    border-bottom: 1rpx solid #dadada;
  }
  .textarea-text{
    width:100%;
    height:92rpx;
    line-height:92rpx;
    display:block;
    padding-left:30rpx;
    overflow:hidden;
    text-overflow:ellipsis;
    box-sizing:border-box;
    white-space:nowrap;
  }
  .textarea-item{
    width: 100%;
    line-height: 92rpx;
    height: 276rpx;
    overflow: auto;
    padding-left: 30rpx;
  }
</style>
