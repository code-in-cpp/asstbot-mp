
<template v-if="type == 'radio'">
  <view class="boxFloat" :class="{'top_0':flag}">
    <view v-for="(item, index) in list" v-if="item.type == 'radio'" class="boxItems">
      <view class="boxItemTitle">{{item.title}}</view>
      <scroll-view scroll-y=true class="ulBox">
        <ul class="boxItemBox">
          <li class="item" v-for="(option, value) in item.items" :key="item" @click="selectItem(option.value)">{{option.caption}}</li>
        </ul>
      </scroll-view>
    </view>
  </view>
</template>
<!--<template v-else-if="type == 'image'"></template>-->

<script>
  export default {
    name: 'boxFloat',
    props: [ 'list', 'type' ],
    data () {
      return {
        list: this.list,
        type: this.type,
        flag: false
      }
    },
    methods: {
      selectItem (caption) {
        console.log(caption)
        this.flag = false
      }
    },
    created () {
      console.log(this.list)
      setTimeout(() => {
        this.flag = true
        console.log(this.list)
      }, 2000)
    },
    onShow () {
      console.log(this.list)
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
    display: none;
  }
  .top_0{
    top: 0;
    display: block;
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
