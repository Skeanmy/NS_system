import axios from '@/libs/api.request'

// export const dataURL = 'http://192.168.2.190:10005/black_data'
// export const data360 = 'http://192.168.2.190:10005/black_url'
export const baseURL = 'http://192.168.2.190:10005'

export const getTableData = (url, { page, source, current_time }) => {
  let data = { page, source, current_time }
  return axios.request({
    url,
    data,
    method: 'post'
  })
}