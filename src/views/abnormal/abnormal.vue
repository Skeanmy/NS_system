<template>
  <div>
    <tables ref="tables" editable searchable search-place="top" :data="tableData1" :columns="tableColumns1" :total="total" :title="title" :intro="intro"/>
  </div>
</template>
<style lang="less">
.count-style {
  font-size: 50px;
}

</style>
<script>
import Tables from '_c/tables'
import { formatDate } from '@/libs/tools'
import { getTableData, baseURL } from '@/api/data'
export default {
  name: 'abnormal',
  components: {
    Tables
  },
  data () {
    return {
      tableData1: [],
      title: '异常检测',
      intro: '异常检测是',
      total: 1
    }
  },
  computed: {
    tableColumns1() {
      let columns = [
        {
          title: '异常IP',
          key: 'ip'
        },
        {
          title: '时间',
          key: 'flow_time',
        },
      ]
      return columns
    },
  },
  methods: {
    getNewData (page) {
      const time = new Date()
      const formatTime = formatDate(time)
      getTableData(baseURL + '/ip_anom', { current_time:formatTime })
        .then(res => {
          console.log(res)
          this.tableData1 = res.data.black_data
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
    getTableData(baseURL + '/ip_anom', { current_time:formatTime })
      .then(res => {
        console.log(res)
        this.tableData1 = res.data.ip_anom
        this.total = this.tableData1.length
      })
      .catch(err => {
        console.log(err)
      })
  }
}

</script>
