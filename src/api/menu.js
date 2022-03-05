import request from '@/connect/request'

export function fetchMenuTree(query) {
  return request({
    url: '/api/menu/queryMenuTree',
    method: 'get',
    params: query
  })
}
export function fetchMenuList(query) {
  return request({
    url: '/api/menu/queryMenus',
    method: 'get',
    params: query
  })
}
export function addMenu(data) {
  return request({
    url: '/api/menu/addMenu',
    method: 'post',
    data
  })
}

export function updateMenu(data) {
  return request({
    url: '/api/menu/updateMenu',
    method: 'post',
    data
  })
}
export function delteMenus(data) {
  return request({
    url: '/api/menu/deleteMenus',
    method: 'post',
    data
  })
}
