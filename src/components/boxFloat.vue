<template v-if="optionObject.type === 'radio'">
  <view class="boxFloat" :class="{'top_0':optionObject.type === 'radio'}">
    <view class="boxItems">
      <view class="boxItemTitle">{{optionObject.title}}</view>
      <scroll-view scroll-y=true class="ulBox">
        <ul class="boxItemBox">
          <li class="item" v-for="(option, value) in optionObject.items" :key="item" @click="selectItem(option.value)">{{option.caption}}</li>
        </ul>
      </scroll-view>
    </view>
  </view>
</template>

<script>
  import { mapState, mapGetters } from 'vuex'
  export default {
    name: 'boxFloat',
    methods: {
      selectItem (value) {
        this.$store.dispatch('sendQuery', value)
      }
    },
    computed: {
      ...mapState({
        list: state => state.messages.data[state.messages.data.length - 1]
      }),
      ...mapGetters({
        optionObject: 'messageAction'
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
