<template>
  <div ref="dom" class="charts chart-bar"></div>
</template>
<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme

export default {
  name: 'ChartPie',
  props: {
    value: {
      type: Array,
      default: () => {}
    },
    text: {
      type: String,
      default: ''
    },
    subtext: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    }
  },
  data() {
    return {
      dom: null
    }
  },
  methods: {
    resize() {
      this.dom.resize()
    },
    initChart() {
      let legend = this.value.map(_ => _.name)
      let seriesData = Object.values(this.value)
	    let option = {
        title : {
            text: this.text,
            subtext: this.subtext,
            x:'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data:legend
        },
        calculable : true,
        series : [
          {
            type: 'pie',
            roseType: 'radius',
            radius: [15, 95],
            center: ['50%', '50%'],
            data: this.value
          }
        ]
      };
    	this.dom = echarts.init(this.$refs.dom, 'macarons')
    	this.dom.setOption(option)
    }
  },
  mounted() {
  	this.initChart()
  	window.addEventListener('resize', this.resize)
  },
  beforeDestroy() {
    if (!this.dom) {
      return
    }
    window.removeEventListener('resize', this.resize)
    this.dom = null
  },
}

</script>
