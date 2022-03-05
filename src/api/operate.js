import request from '@/connect/request'

export function fetchOperateList(query) {
  return request({
    url: '/api/operate/queryOperates',
    method: 'get',
    params: query
  })
}
export function addOperate(data) {
  return request({
    url: '/api/operate/addOperate',
    method: 'post',
    data
  })
}

export function updateOperate(data) {
  return request({
    url: '/api/operate/updateOperate',
    method: 'post',
    data
  })
}
export function delteOperates(data) {
  return request({
    url: '/api/operate/deleteOperates',
    method: 'post',
    data
  })
}
export function exportCurPage(data) {
  return request({
    url: '/api/operate/exportPageOperates',
    method: 'post',
    responseType: 'blob', // 二进制流
    data
  })
}
export function exportAll(data) {
  return request({
    url: '/api/operate/exportAllOperates',
    method: 'post',
    responseType: 'blob', // 二进制流
    data
  })
}
export function exportSelect(data) {
  return request({
    url: '/api/operate/exportSelectOperates',
    method: 'post',
    responseType: 'blob', // 二进制流
    data
  })
}
export function upload(params) {
  return request({
    url: '/api/operate/uploadOperates',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    params
  })
}
