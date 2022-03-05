import request from '@/connect/request'

export function login(data) {
  return request({
    url: '/api/login/auth',
    method: 'post',
    data
  })
}

export function getInfo(query) {
  return request({
    url: '/api/login/getInfo',
    method: 'post',
    params: query
  })
}
export function logout() {
  return request({
    url: '/api/login/logout',
    method: 'get'
  })
}
export function loginResetMMdp(data) {
  return request({
    url: '/api/login/loginResetMMdp',
    method: 'post',
    data
  })
}
