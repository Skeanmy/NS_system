<template>
  <div>
    <tables ref="tables" editable searchable search-place="top" :data="tableData1" :columns="tableColumns1" :total="total" :title="title" :intro="intro"/>
     <Row style="margin-top: 10px;">
      <Card shadow>
         <chart-line style="height: 800px;" :value="lineData" :legend="legendData" :text="name" :subtext="subname"/>
      </Card>
    </Row>
  </div>
</template>
<style lang="less">
.count-style {
  font-size: 50px;
}

</style>
<script>
import { ChartPie, ChartBar, ChartLine } from '_c/charts'
import Tables from '_c/tables'
import { formatDate } from '@/libs/tools'
import { getTableData, baseURL } from '@/api/data'
export default {
  name: 'firstFilter',
  components: {
    Tables,
    ChartLine
  },
  data () {
    return {
      tableData1: [],
      title: '初次筛选',
      intro: '初次筛选是',
      total: 1,
      lineData: [],
      legendData: [],
      name: '数据异常统计',
      subname: ''
    }
  },
  computed: {
    tableColumns1() {
      let columns = [{
          title: 'IP',
          key: 'ip'
        },
        {
          title: '目的IP',
          key: 'dst_ip',
        },
        {
          title: '发现时间',
          key: 'created_time',
        },
        {
          title: '异常原因',
          key: 'reason',
          render: (h, params) => {
            return h('Tag', {
                props: {
                  type: 'dot',
                  color: 'error'
                }
            }, params.row.reason);
          }
        },
      ]
      return columns
    },
  },
  methods: {
    getNewData (page) {
      const time = new Date()
      const formatTime = formatDate(time)
      getTableData(baseURL + '/feature_detect', { current_time:formatTime })
        .then(res => {
          console.log(res)
          this.tableData1 = res.data.ip_anom
          this.legendData = Object.keys(res.data.feature_detect[0])
          this.lineData = res.data.feature_detect
          this.total = this.tableData1.length
        })
        .catch(err => {
          console.log(err)
        })
      }
  },
  mounted () {
    const time = new Date()
    const formatTime = formatDate(time)
    getTableData(baseURL + '/feature_detect', { current_time:formatTime })
      .then(res => {
        console.log(res)
        this.tableData1 = res.data.ip_anom
        this.legendData = Object.keys(res.data.feature_detect[0])
        this.lineData = res.data.feature_detect
        this.total = this.tableData1.length
      })
      .catch(err => {
        console.log(err)
      })
  }
}

</script>
