import request from '@/connect/request'

export function fetchBaseParameList(query) {
  return request({
    url: '/api/baseParame/queryBaseParames',
    method: 'get',
    params: query
  })
}
export function queryIndexConfig(query) {
  return request({
    url: '/api/baseParame/queryIndexConfig',
    method: 'get',
    params: query
  })
}
export function fetchBaseParameByKey(query) {
  return request({
    url: '/api/baseParame/queryBaseParameByKey',
    method: 'get',
    params: query
  })
}
export function addBaseParame(data) {
  return request({
    url: '/api/baseParame/addBaseParame',
    method: 'post',
    data
  })
}

export function updateIndexConfig(data) {
  return request({
    url: '/api/baseParame/updateIndexConfig',
    method: 'post',
    data
  })
}
export function updateBaseParameByKey(data) {
  return request({
    url: '/api/baseParame/updateBaseParameByKey',
    method: 'post',
    data
  })
}
export function updateBaseParame(data) {
  return request({
    url: '/api/baseParame/updateBaseParame',
    method: 'post',
    data
  })
}

export function deleteBaseParames(data) {
  return request({
    url: '/api/baseParame/deleteBaseParames',
    method: 'post',
    data
  })
}
export function approveBaseParames(data) {
  return request({
    url: '/api/baseParame/approveBaseParames',
    method: 'post',
    data
  })
}

export function approveNoBaseParames(data) {
  return request({
    url: '/api/baseParame/approveNoBaseParames',
    method: 'post',
    data
  })
}
