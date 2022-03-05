import request from '@/connect/request'

export function registerIp(query) {
  return request({
    url: '/api/register/ip',
    method: 'get',
    params: query
  })
}
