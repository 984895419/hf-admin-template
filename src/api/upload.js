import request from '@/connect/request'
export function upload(params, url, onUploadProgress) {
  return request({
    url: url,
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    onUploadProgress: onUploadProgress,
    data: params
  })
}

export function download(url) {
  return request({
    url: url,
    method: 'post',
    responseType: 'blob', // 二进制流
    data: []
  })
}
