<template>
  <div style="width: 100%">
    <Row style="margin-bottom: 10px;">
      <Card>
        <p slot="title" :title="title">{{ title }}</p>
        <p :intro="intro">{{ intro }}</p>
      </Card>
    </Row>
    <Card>
      <div class="search-con search-con-top">
        <Select v-model="searchKey" class="search-col">
          <Option v-for="item in columns" v-if="item.key !== 'handle'" :value="item.key" :key="`search-col-${item.key}`">{{ item.title }}</Option>
        </Select>
        <Input @on-change="handleClear" clearable placeholder="输入关键字搜索" class="search-input" v-model="searchValue"/>
        <Button @click="handleSearch" class="search-btn" type="primary"><Icon type="search"/>&nbsp;&nbsp;搜索</Button>
      </div>
      <Table :data="insideTableData" :columns="insideColumns" stripe :loading="loading"></Table>
      <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
          <Page :total="totalData" :page-size="pageSize" :current="current" @on-change="changePage" show-total></Page>
        </div>
      </div>
  </Card>
  </div>
</template>
<script>
import './index.less'
export default {
  name: 'Tables',
  props: {
    total: {
      type: Number,
      // default: 1
    },
    columns: {
      type: Array,
      default: () => []
    },
    data: {
      type: Array,
      default: () => []
    },
    title: {
      type: String,
      default: ''
    },
    intro: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      pageSize: 50,
      // loading:true,
      current: 1,
      totalData: 1,
      searchKey: [],
      searchValue: '',
      insideTableData: [],
      insideColumns: [],
      pageData: [],
    }
  },
  methods: {
    // handleData() {
    //   this.totalData = this.pageData.length
    //   this.insideTableData = this.pageSize < this.totalData ? Object.assign([], this.pageData.slice(0, this.pageSize)) : Object.assign([], this.pageData)
    //   this.current = 1
    // },
    // handleColumns(data) {
    //   this.insideColumns = Object.assign([], data)
    // },
    // handleClear (e) {
    //   if (e.target.value === '') {
    //     this.pageData = this.data
    //   }
    // },
    // handleSearch () {
    //   this.pageData = this.data.filter(item => item[this.searchKey].indexOf(this.searchValue) > -1)
    // },
    // setDefaultSearchKey () {
    //   this.searchKey = this.columns[0].key !== 'handle' ? this.columns[0].key : (this.columns.length > 1 ? this.columns[1].key : '')
    // },
    // changePage (e) {
    //   this.$emit('changePage', e)
    //   this.current = e
    //   let _start = ( e - 1) * this.pageSize
    //   let _end = e * this.pageSize
    //   this.insideTableData = Object.assign([], this.pageData.slice(_start, _end))
    handleData() {
      this.pageData = Object.assign([], this.data)
      this.totalData = this.total
      this.insideTableData = Object.assign([], this.data)
    },
    handleColumns(data) {
      this.insideColumns = Object.assign([], data)
    },
    handleClear (e) {
      if (e.target.value === '') {
        this.insideTableData = this.data
        this.totalData = this.total
      }
    },
    handleSearch () {
      this.insideTableData = this.data.filter(item => item[this.searchKey].indexOf(this.searchValue) > -1)
      this.totalData = this.insideTableData.length
    },
    setDefaultSearchKey () {
      this.searchKey = this.columns[0].key !== 'handle' ? this.columns[0].key : (this.columns.length > 1 ? this.columns[1].key : '')
    },
    changePage (e) {
      this.pageData = []
      this.$emit('changePage', e)
    }
  },
  watch: {
    // pageData (val) {
    //   this.handleData()
    // },
    data () {
      this.handleData()
    }
  },
  computed: {
    loading () {
      return this.pageData.length === 0
    }
  },
  mounted () {
    // this.$nextTick(() => {
    // this.pageData = Object.assign([], this.data)
    this.handleData()
    this.handleColumns(this.columns)
    this.setDefaultSearchKey()
    // })
  }
}

</script>
