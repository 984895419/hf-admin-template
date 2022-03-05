import request from '@/connect/request'

export function fetchLogList(query) {
  return request({
    url: '/api/optLog/queryOptLogs',
    method: 'get',
    params: query
  })
}
