<template>
  <view>
    <radio-float v-if="list.type === 'radio'" :list="list"></radio-float>
    <checkbox-float v-else-if="list.type === 'checkbox'" :list="list"></checkbox-float>
    <avatar-float v-else-if="list.type === 'imageUploader'" :list="list"></avatar-float>
  </view>
</template>

<script>
  import checkboxFloat from '@/components/floatBox/checkboxFloat'
  import radioFloat from '@/components/floatBox/radioFloat'
  // import imageFloat from '@/components/floatBox/imageFloat'
  import avatarFloat from '@/components/floatBox/avatarFloat'
  import { mapGetters } from 'vuex'

  export default {
    name: 'floatIndex',
    components: {
      radioFloat,
      checkboxFloat,
      avatarFloat
    },
    computed: {
      ...mapGetters({
        list: 'messageAction'
      })
    }
  }
</script>

<style scoped>
  .boxFloat{
    height:100vh;
    background:rgba(0,0,0,.5);
    position:fixed;
    z-index: 10;
    top:100vh;
    width:100%;
    transition:top .5s;
    /*display: none;*/
  }
  .top_0{
    top: 0;
    /*display: block;*/
  }
  .boxItems{
    background: #fff;
    height: 50vh;
    margin-top: 50vh;
    padding-top: 40px;
    box-sizing: border-box;
    font-size: 16px;
  }
  .boxItemTitle{
    border-bottom: 1px solid #dadada;
    padding-left: 15px;
    line-height: 40px;
    margin-top: -40px;
  }
  .ulBox{
    height:100%;
  }
  .boxItemBox{

  }
  .item{
    padding-left: 15px;
    line-height: 40px;
  }
</style>
