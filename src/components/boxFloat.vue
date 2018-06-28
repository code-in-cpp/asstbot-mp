<template v-if="type == 'radio'">
  <view class="boxFloat" :class="{'top_0':flag}">
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
<!--<template v-else-if="type == 'image'"></template>-->

<script>
  import { mapState } from 'vuex'
  import uploadImage from './uploadImage'
  export default {
    name: 'boxFloat',
    // props: [ 'list', 'type' ],
    data () {
      return {
        // list: this.list,
        // type: this.type,
        optionObject: {
          items: [],
          type: '',
          title: ''
        },
        flag: false
      }
    },
    watch: {
      list: {
        handler: function (val, oldval) {
          this.optionObject = val.to ? val.msgs[val.msgs.length - 1] : ''
          if (val.to) {
            if (this.optionObject.type === 'radio' || (this.optionObject.type === 'imageUploader' && this.optionObject.explicit === true)) {
              setTimeout(() => {
                this.flag = true
              }, 1000)
            }
          }
        },
        deep: true
      }
    },
    methods: {
      selectItem (value) {
        this.flag = false
        this.$store.dispatch('sendQuery', value)
      }
    },
    computed: {
      ...mapState({
        list: state => state.messages.data[state.messages.data.length - 1]
      })
    },
    components: {
      uploadImage
    },
    created () {
    },
    updated () {
      // if (this.list && this.list.to) {
      //   // console.log(this.list.msgs[this.list.msgs.length - 1])
      //   this.optionObject = this.list.msgs[this.list.msgs.length - 1]
      //   // console.log(this.optionObject)
      // }
    },
    mounted () {
    },
    onShow () {
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
