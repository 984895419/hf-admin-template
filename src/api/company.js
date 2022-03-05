
import request from '@/connect/request'

export function fetchCompanyList() {
  return request({
    url: '/api/getCompanyList',
    method: 'get'
  })
}
