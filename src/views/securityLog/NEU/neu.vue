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
  name: 'neu',
  components: {
    Tables
  },
  data () {
    return {
      tableData1: [],
      title: 'NEU',
      intro: 'NEU是',
      total: 1
    }
  },
  computed: {
    tableColumns1() {
      let columns = [{
          title: 'IP',
          key: 'ip'
        },
        {
          title: '物理地址',
          key: 'ip_address',
        },
        {
          title: '封禁开始时间',
          key: 'created_time',
        },
        {
          title: '封禁结束时间',
          key: 'dead_time',
        },
        {
          title: '封禁原因',
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
      getTableData(baseURL + '/black_data', { page:page, source:'neu', current_time:formatTime })
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
    getTableData(baseURL + '/black_data', { page:1, source:'neu', current_time:formatTime })
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
