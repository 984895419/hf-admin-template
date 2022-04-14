const pageData = {
  retCode: '00001',
  message: '操作成功',
  data: {
    page: 1,
    pageSize: 100,
    total: 101,
    list: [
      {
        id: 1,
        applyNum: '001',
        name: '李阿龙1',
        customTel: '150591562351',
        status: 1,
        picker: '2021-02-10',
        product: 1,
        newOrOld: 1,
        belongTo: 1,
        belongToMAP: 1
      },
      {
        id: 2,
        applyNum: '002',
        name: '李阿龙2',
        customTel: '150591562352',
        status: 1,
        picker: '2021-02-10',
        product: 1,
        newOrOld: 1,
        belongTo: 1,
        belongToMAP: 1
      }
    ]
  }
}

const detailData = {
  retCode: '00001',
  message: '操作成功',
  data: {
    id: 2,
    applyNum: '002',
    name: '李阿龙2',
    customTel: '150591562352',
    status: 1,
    picker: '2021-02-10',
    product: 1,
    newOrOld: 1,
    belongTo: 1,
    belongToMAP: 1
  }
}

const saveData = {
  retCode: '00001',
  message: '操作成功',
  data: []
}
module.exports = [
  {
    url: '/api/consumer/page',
    type: 'get',
    response: config => {
      return pageData
    }
  },
  {
    url: '/api/consumer/\\d+',
    type: 'get',
    response: config => {
      return detailData
    }
  },
  {
    url: '/api/consumer/save',
    type: 'post',
    response: config => {
      return saveData
    }
  },
  {
    url: '/api/consumer/\\d+',
    type: 'put',
    response: config => {
      return saveData
    }
  },
  {
    url: '/api/consumer/\\d+',
    type: 'delete',
    response: config => {
      return detailData
    }
  }
]
