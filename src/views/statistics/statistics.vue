<template>
  <div>
     <Row>
      <Col span="24">
        <Card>
          <p slot="title">数据统计</p>
          <p>数据统计</p>
        </Card>
      </Col>
    </Row>
    <!-- <Row :gutter="20" style="margin-top: 10px;">
      <i-col :md="24" :lg="8" style="margin-bottom: 20px;">
        <Card shadow>
          <chart-pie style="height: 300px;" :value="pieData" text="用户访问来源"></chart-pie>
        </Card>
      </i-col>
      <i-col :md="24" :lg="16" style="margin-bottom: 20px;">
        <Card shadow>
          <chart-bar style="height: 300px;" :value="barData" text="每周用户活跃量"/>
        </Card>
      </i-col>
    </Row> -->
    <Row style="margin-top: 10px;">
      <Card shadow>
        <chart-line style="height: 800px;" :value="lineData" :legend="legendData" :text="name" :subtext="subname"/>
      </Card>
    </Row>
   <!--  <Row>
      <Card shadow>
        <example style="height: 310px;"/>
      </Card>
    </Row> -->
  </div>
</template>

<script>
import { ChartPie, ChartBar, ChartLine } from '_c/charts'
import { formatDate } from '@/libs/tools'
import { getTableData, baseURL } from '@/api/data'
import Example from './example.vue'
export default {
  name: 'home',
  components: {
    ChartPie,
    ChartBar,
    Example,
    ChartLine
  },
  data () {
    return {
      inforCardData: [
        { title: '新增用户', icon: 'md-person-add', count: 803, color: '#2d8cf0' },
        { title: '累计点击', icon: 'md-locate', count: 232, color: '#19be6b' },
        { title: '新增问答', icon: 'md-help-circle', count: 142, color: '#ff9900' },
        { title: '分享统计', icon: 'md-share', count: 657, color: '#ed3f14' },
        { title: '新增互动', icon: 'md-chatbubbles', count: 12, color: '#E46CBB' },
        { title: '新增页面', icon: 'md-map', count: 14, color: '#9A66E4' }
      ],
      pieData: [
        { value: 335, name: '直接访问' },
        { value: 310, name: '邮件营销' },
        { value: 234, name: '联盟广告' },
        { value: 135, name: '视频广告' },
        { value: 1548, name: '搜索引擎' }
      ],
      barData: {
        Mon: 13253,
        Tue: 34235,
        Wed: 26321,
        Thu: 12340,
        Fri: 24643,
        Sat: 1322,
        Sun: 1324
      },
      lineData: [],
      legendData: [],
      name: '数据流统计',
      subname: ''
    }
  },
  mounted () {
    const time = new Date()
    const formatTime = formatDate(time)
    this.$nextTick(() => {
      getTableData(baseURL + '/flow_feature', { current_time:formatTime })
        .then(res => {
          console.log(res)
          this.legendData = Object.keys(res.data.data_count[0])
          this.lineData = res.data.data_count
        })
        .catch(err => {
          console.log(err)
        })
    })
  }
}
</script>

<style lang="less">
.count-style{
  font-size: 50px;
}
</style>
