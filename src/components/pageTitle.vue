<template>
  <block>

  </block>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  },

  watch: {
    title: (newVal, oldVal) => {
      console.log(this)
      wx.setNavigationBarTitle({title: newVal})
    }
  },

  mounted () {
    console.log(this)
    wx.setNavigationBarTitle({title: this.title})
  }
}
</script>

<style>
.card {
  padding: 10px;
}
</style>
