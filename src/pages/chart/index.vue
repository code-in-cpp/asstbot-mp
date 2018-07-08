<template>
    <view class="container">
         <canvas canvas-id="pieCanvas" class="canvas" style="height:300px" bindtouchstart="touchHandler"></canvas>
         <canvas canvas-id="columnCanvas" class="canvas" style="height:300px" bindtouchstart="touchHandler"></canvas>
   </view>
</template>


<script>
import WxCharts from '@/utils/wxcharts'
/* eslint-disable */
var pieChart = null
export default {
  data () {
    return {
    }
  },

  computed: {
  },

  methods: {
  },

  onLoad (option) {
    var windowWidth = 320
    try {
      var res = wx.getSystemInfoSync()
      windowWidth = res.windowWidth
    } catch (e) {
      console.error('getSystemInfoSync failed!')
    }
    pieChart = new WxCharts({
      animation: true,
      canvasId: 'pieCanvas',
      type: 'pie',
      series: [{
        name: '成交量1',
        data: 15
      },
      {
        name: '成交量2',
        data: 35
      },
      {
        name: '成交量3',
        data: 78
      }],
      width: windowWidth,
      height: 300,
      dataLabel: true
    })

    new WxCharts({
        canvasId: 'columnCanvas',
        type: 'column',
        categories: ['2012', '2013', '2014', '2015', '2016', '2017'],
        series: [{
            name: '成交量1',
            data: [15, 20, 45, 37, 4, 80]
        }, {
            name: '成交量2',
            data: [70, 40, 65, 100, 34, 18]
        }],
        yAxis: {
            format: function (val) {
                return val + '万';
            }
        },
        width: 320,
        height: 200
    });

    console.log("comming here............")
  }
}
</script>
