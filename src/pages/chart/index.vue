<template>
    <view class="container">
         <canvas canvas-id="pieCanvas" class="canvas" style="height:300px" @touchstart="touchStart"></canvas>
         <canvas canvas-id="columnCanvas" class="canvas" style="height:300px" @touchstart="touchEnd"></canvas>
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
    touchStart(e) {
      console.log(e)
      this.startTime = e.timeStamp;
    },
    touchEnd(e) {
      console.log(e)
      this.endTime = e.timeStamp;
    }
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
        categories: ['2012'],
        series: [{
            name: '成交量1',
            data: [20]
        }, {
            name: '成交量2',
            data: [30]
        }, {
            name: '成交量3',
            data: [40]
        }, {
            name: '成交量4',
            data: [70]
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
