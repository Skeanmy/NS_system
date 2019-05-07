<template>
  <div>
    <tables ref="tables" editable searchable search-place="top" :data="tableData1" :columns="tableColumns1" :total="total" :title="title" :intro="intro" @changePage='getNewData'/>
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
  name: 'log360',
  components: {
    Tables
  },
  data () {
    return {
      tableData1: [],
      title: '360',
      intro: '360',
      total: 1
    }
  },
  computed: {
    tableColumns1() {
      let columns = [{
          title: '恶意URL',
          key: 'url'
        },
        {
          title: '有效时间',
          key: 'created_time',
        },
        {
          title: '时效时间',
          key: 'dead_time',
        },
      ]
      return columns
    },
  },
  methods: {
    getNewData (page) {
      const time = new Date()
      const formatTime = formatDate(time)
      getTableData(baseURL + '/black_url', { page:page, current_time:formatDate })
        .then(res => {
          console.log(res)
          this.tableData1 = res.data.black_data
          this.total = res.data.data_count
        })
        .catch(err => {
          console.log(err)
        })
      }
  },
  mounted () {
    const time = new Date()
    const formatTime = formatDate(time)
    getTableData(baseURL + '/black_url', { page:1, current_time:formatDate })
      .then(res => {
        console.log(res)
        this.tableData1 = res.data.black_data
        this.total = res.data.data_count
      })
      .catch(err => {
        console.log(err)
      })
  }
}

</script>
