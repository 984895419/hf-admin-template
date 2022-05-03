/**
 * 默认的url配置
 * @param baseUrl
 * @returns {{queryUrl: string, enableUrl: string, disableUrl: string, updateUrl: string, addUrl: string, listUrl: string, pageUrl: string, deleteUrl: string, batchUpdateUrl: string}|{}}
 */
export function defaultUrlMethod(baseUrl, customUrl) {
  if (baseUrl) {
    return {
      // 分页查询地址等
      pageUrl: baseUrl + '/nameQuery',
      addUrl: baseUrl + '/save',
      updateUrl: baseUrl + '/{id}',
      queryUrl: baseUrl + '/{id}',
      deleteUrl: baseUrl + '/{id}',
      enableUrl: baseUrl + '/enable/{id}',
      disableUrl: baseUrl + '/disable/{id}',
      listUrl: baseUrl + '/list',
      batchUpdateUrl: baseUrl + '/batch',
      ...customUrl
    }
  } else {
    return customUrl
  }
}
