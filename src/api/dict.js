import request from '@/connect/request'
export function getCodeMap(query) {
  return request({
    url: '/api/dict/queryCodeMap',
    method: 'get',
    params: query
  })
}

export function queryCodeKinds(query) {
  return request({
    url: '/api/codeKind/queryCodeKinds',
    method: 'get',
    params: query
  })
}
export function addCodeKind(data) {
  return request({
    url: '/api/codeKind/addCodeKind',
    method: 'post',
    data
  })
}

export function updateCodeKind(data) {
  return request({
    url: '/api/codeKind/updateCodeKind',
    method: 'post',
    data
  })
}
export function deleteCodeKinds(data) {
  return request({
    url: '/api/codeKind/deleteCodeKinds',
    method: 'post',
    data
  })
}

export function queryCodeValues(query) {
  return request({
    url: '/api/codeValue/queryCodeValues',
    method: 'get',
    params: query
  })
}
export function addCodeValue(data) {
  return request({
    url: '/api/codeValue/addCodeValue',
    method: 'post',
    data
  })
}

export function updateCodeValue(data) {
  return request({
    url: '/api/codeValue/updateCodeValue',
    method: 'post',
    data
  })
}
export function deleteCodeValues(data) {
  return request({
    url: '/api/codeValue/deleteCodeValues',
    method: 'post',
    data
  })
}
