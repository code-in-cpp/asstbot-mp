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
      wx.setNavigationBarTitle({title: newVal})
    }
  },

  mounted () {
    wx.setNavigationBarTitle({title: this.title})
  }
}
</script>

<style>
.card {
  padding: 10px;
}
</style>
