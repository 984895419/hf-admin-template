import request from '@/connect/request'

export function fetchHfBaseArticleList(query) {
  return request({
    url: '/api/hfBaseArticle/queryHfBaseArticles',
    method: 'get',
    params: query
  })
}

export function addHfBaseArticle(data) {
  return request({
    url: '/api/hfBaseArticle/addHfBaseArticle',
    method: 'post',
    data
  })
}

export function updateHfBaseArticle(data) {
  return request({
    url: '/api/hfBaseArticle/updateHfBaseArticle',
    method: 'post',
    data
  })
}

export function loadAllArticle(query) {
  return request({
    url: '/api/hfBaseArticle/loadAllArticle',
    method: 'get',
    params: query
  })
}

export function deleteHfBaseArticles(data) {
  return request({
    url: '/api/hfBaseArticle/deleteHfBaseArticles',
    method: 'post',
    data
  })
}
export function approveHfBaseArticles(data) {
  return request({
    url: '/api/hfBaseArticle/approveHfBaseArticles',
    method: 'post',
    data
  })
}

export function approveNoHfBaseArticles(data) {
  return request({
    url: '/api/hfBaseArticle/approveNoHfBaseArticles',
    method: 'post',
    data
  })
}

