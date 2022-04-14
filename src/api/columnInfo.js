import request from '@/connect/request'

/**
 * 根据tableId, 及用户查询表单字段信息
 * @param query
 * @returns {*}
 */
export function fetchMyColumnInfos(query) {
  return request({
    url: '/api/columnInfo/my/list',
    method: 'get',
    params: query
  })
}

/**
 * 根据tableId, 及用户保存表单字段信息
 * @param data
 */
export function saveMyColumnInfos(data) {
  return request({
    url: '/api/columnInfo/my/save',
    method: 'post',
    data
  })
}
