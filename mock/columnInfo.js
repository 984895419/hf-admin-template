const listData = {
  retCode: '00001',
  message: '操作成功',
  data: {
    tableItemOption: {
      showIndex: true
    },
    referOption: {
      referId: 'id',
      referName: 'name'
    },
    fields: [
      {
        label: '客户姓名',
        value: 'name',
        type: 'text',
        keyword: true,
        searchable: true,
        addable: true,
        addShowable: true,
        updateShowable: true,
        updatable: true,
        tableColumnOption: {
          'sortable': 'custom'
        }
      },
      {
        label: '申请编号',
        value: 'applyNum',
        type: 'text',
        keyword: true,
        searchable: true,
        addable: true,
        updatable: true,
        addShowable: true,
        updateShowable: true,
        tableColumnOption: {
          'sortable': 'custom'
        }
      },
      {
        label: '客户手机号',
        value: 'customTel',
        searchable: true,
        addable: true,
        updatable: true,
        addShowable: true,
        updateShowable: true,
        type: 'text'
      },
      {
        label: '状态',
        value: 'status',
        type: 'select',
        updateShowable: true,
        children: [
          {
            label: '待征信授权审批',
            value: 1
          },
          {
            label: '已提交审批',
            value: 2
          }
        ]
      },
      {
        type: 'picker',
        label: '提交时间',
        updateShowable: true,
        value: 'picker'
      },
      {
        label: '产品',
        value: 'product',
        type: 'select',
        updateShowable: true,
        children: [
          {
            label: '农资贷001',
            value: 1
          },
          {
            label: '农地贷001',
            value: 2
          }
        ]
      },
      {
        label: '是否新客户',
        value: 'newOrOld',
        type: 'select',
        children: [
          {
            label: '是',
            value: 1
          },
          {
            label: '否',
            value: 2
          }
        ]
      },
      {
        label: '增信方式',
        value: 'belongTo',
        type: 'select',
        children: [
          {
            label: '无',
            value: 1
          },
          {
            label: '自然人保证',
            value: 2
          },
          {
            label: '担保公司保证',
            value: 3
          },
          {
            label: '法人保证',
            value: 4
          },
          {
            label: '资产抵押',
            value: 5
          },
          {
            label: '资产质押',
            value: 6
          }
        ]
      },
      {
        label: '所属MAP',
        value: 'belongToMAP',
        type: 'select',
        children: [
          {
            label: '农资贷001',
            value: 1
          },
          {
            label: '农地贷001',
            value: 2
          }
        ]
      }
    ]
  }
}

const saveData = {
  retCode: '00001',
  message: '操作成功',
  data: []
}
module.exports = [
  {
    url: '/api/columnInfo/my/list',
    type: 'get',
    response: config => {
      return listData
    }
  },
  {
    url: '/api/columnInfo/my/save',
    type: 'post',
    response: config => {
      return saveData
    }
  }
]
