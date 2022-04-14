const data = {
    retCode: '00001',
      message: '操作成功',
    'obj': '{"userId":"admin","userCode":"admin","sessionId":"80c3f255d3284525985571b8430b8361","lang":"zh"}'
  }
const infoData = {
    retCode: '00001',
    message: '操作成功',
    'obj': {
      'menuList': [],
      'isAdmin': true,
      'userId': 'admin',
      'userCode': 'admin',
      'operateList': [],
      'curCompanyId': '5025',
      'companyId': '5025',
      'menuTree': [],
      'username': 'admin'
    }
  }
  const logOutData = {
      retCode: '00001',
      message: '操作成功',
      data: null
  }
module.exports = [
    {
        url: '/api/login/auth',
        type: 'post',
        response: config => {
          return data
        }
    },
    {
        url: '/api/login/getInfo',
        type: 'post',
        response: config => {
          return infoData
        }
    },
    {
        url: '/api/login/logout',
        type: 'get',
        response: config => {
          return logOutData
        }
    }
]
