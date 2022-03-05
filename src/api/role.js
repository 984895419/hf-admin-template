import request from '@/connect/request'

export function fetchOrgTree(query) {
  return request({
    url: '/api/role/queryOrgTree',
    method: 'post',
    params: query
  })
}
export function fetchRoleList(query) {
  return request({
    url: '/api/role/queryRoles',
    method: 'get',
    params: query
  })
}
export function addRole(data) {
  return request({
    url: '/api/role/addRole',
    method: 'post',
    data
  })
}

export function updateRole(data) {
  return request({
    url: '/api/role/updateRole',
    method: 'post',
    data
  })
}
export function delteRoles(data) {
  return request({
    url: '/api/role/deleteRoles',
    method: 'post',
    data
  })
}
