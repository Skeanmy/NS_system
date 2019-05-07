<template>
  <div ref="dom" class="charts chart-line"></div>
</template>

<script>
import echarts from 'echarts'
import { formatDate } from '@/libs/tools'
// import tdTheme from './theme.json'
import { on, off } from '@/libs/tools'
// echarts.registerTheme('tdTheme', tdTheme)
export default {
  name: 'ChartLine',
  props: {
    value: Array,
    text: String,
    legend: Array,
    subtext: String
  },
  data () {
    return {
      dom: null
    }
  },
  methods: {
    resize () {
      this.dom.resize()
    },
    initCharts () {
      let xAxisData = this.value.map(item => formatDate(new Date(item[this.legend[1]])))
      // let yAxisData1 = this.value.map(item => item.flow_count)
      // let yAxisData2 = this.value.map(item => item.ip_count)
      // let yAxisData3 = this.value.map(item => item.pkts_count)
      let yAxisData1 = this.value.map(item => item[this.legend[0]])
      let yAxisData2 = this.value.map(item => item[this.legend[2]])
      let yAxisData3 = this.value.map(item => item[this.legend[3]])
      let seriesData = this.yValue
      let option = {
          title: {
              text: this.text,
              subtext: this.subtext,
              x: 'center',
              textStyle: {
                fontSize: 30
              }
          },
          tooltip: {
              trigger: 'axis',
              axisPointer: {
                  animation: false
              },
              textStyle: {
                fontSize: 16
              }
          },
          legend: {
              data: this.legend,
              x: 'left',
              textStyle: {
                fontSize: 16
              }
          },
          axisPointer: {
              link: {xAxisIndex: 'all'}
          },
          dataZoom: [
              {
                  show: true,
                  realtime: true,
                  start: 70,
                  end: 100,
                  xAxisIndex: [0, 1, 2]
              },
              {
                  type: 'inside',
                  realtime: true,
                  start: 30,
                  end: 70,
                  xAxisIndex: [0, 1, 2]
              },
              {
                  type: 'inside',
                  realtime: true,
                  start: 30,
                  end: 70,
                  xAxisIndex: [0, 1, 2]
              }
          ],
          grid: [{
              left: 100,
              right: 100,
              top: '10%',
              height: '20%'
          }, {
              left: 100,
              right: 100,
              top: '40%',
              height: '20%'
          }, 
          {
              left: 100,
              right: 100,
              top: '70%',
              height: '20%'
          }],
          xAxis : [
              {
                  type : 'category',
                  boundaryGap : false,
                  axisLine: {onZero: true},
                  data: xAxisData,
                  axisLabel: {
                      show: true,
                      textStyle: {
                          fontSize: 16
                      }
                  }
              },
              {
                  gridIndex: 1,
                  type : 'category',
                  boundaryGap : false,
                  axisLine: {onZero: true},
                  data: xAxisData,
                  position: 'bottom',
                  axisLabel: {
                      show: true,
                      textStyle: {
                          fontSize: 16
                      }
                  }
              },
              {
                  gridIndex: 2,
                  type : 'category',
                  boundaryGap : false,
                  axisLine: {onZero: true},
                  data: xAxisData,
                  position: 'bottom',
                  axisLabel: {
                      show: true,
                      textStyle: {
                          fontSize: 16
                      }
                  }
              }
          ],
          yAxis : [
              {
                  // name : '数量',
                  type : 'value',
                  axisLabel: {
                      show: true,
                      textStyle: {
                          fontSize: 16
                      }
                  }
              },
              {
                  gridIndex: 1,
                  // name : '数量',
                  type : 'value',
                  inverse: false,
                  axisLabel: {
                      show: true,
                      textStyle: {
                          fontSize: 16
                      }
                  }
              },
              {
                  gridIndex: 2,
                  // name : '数量',
                  type : 'value',
                  inverse: false,
                  axisLabel: {
                      show: true,
                      textStyle: {
                          fontSize: 16
                      }
                  }
              }
          ],
          series : [
              {
                  name: this.legend[0],
                  type:'line',
                  symbolSize: 8,
                  hoverAnimation: false,
                  data:yAxisData1
              },
              {
                  name: this.legend[2],
                  type:'line',
                  xAxisIndex: 1,
                  yAxisIndex: 1,
                  symbolSize: 8,
                  hoverAnimation: false,
                  data: yAxisData2
              },
              {
                  name: this.legend[3],
                  type:'line',
                  xAxisIndex: 2,
                  yAxisIndex: 2,
                  symbolSize: 8,
                  hoverAnimation: false,
                  data: yAxisData3
              }
          ]
      };
      this.dom = echarts.init(this.$refs.dom, 'tdTheme')
      this.dom.setOption(option)
      on(window, 'resize', this.resize)
    }
  },
  watch: {
    value () {
      this.initCharts()
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.initCharts()
    })
  },
  beforeDestroy () {
    off(window, 'resize', this.resize)
  }
}
</script>
