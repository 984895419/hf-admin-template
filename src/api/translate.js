import request from '@/connect/request'

export function doTranslate(data) {
  return request({
    url: '/api/translate/doTranslate',
    method: 'post',
    data
  })
}
