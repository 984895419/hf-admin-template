import { defaultUrlMethod } from '@/components/CURD/defaultUrl'
/**
 * 单点登录认证管理模块基础地址
 * @type {string}
 */
export const baseUrl = '/api/wx/wxMenuConf'
/**
 * 基础查询地址
 * @type {{pageUrl: string}}
 */
export const urlMethods = defaultUrlMethod(baseUrl, 'menuId', {
  pageUrl: baseUrl + '/pageQuery',
  publishUrl: baseUrl + '/publish/{menuId}',
  cancelPublishUrl: baseUrl + '/cancelPublish/{menuId}',
  rePublishUrl: baseUrl + '/rePublish/{menuId}'
})
/**
 * 定义模块的命名空间
 * @type {string}
 */
const modelName = 'wxMenuConf'
export const namespace = modelName

/**
 * 正则
 * @param name
 * @returns {string}
 */
export function getI18nName(name) {
  return modelName + '.' + name
}

const exportTableFields = (fields) => {
  return fields.map(t => {
    return { value: t }
  })
}

/**
 * 字段的配置，用在国际化及列表选择显示字段的时候
 * @type {*[]}
 */
const tableFields = ['menuId', 'wxId', 'wxIdName', 'menuName', 'menuContentType', 'menuContent', 'creator', 'createTime', 'modifier', 'modifyTime', 'enableState', 'parentId', 'parentIdName', 'levelInd', 'levelStr', 'sort', 'publishState', 'creatorUserName', 'modifierUserName']

export default exportTableFields(tableFields)

/**
 * 字段的验证规则
 * @param vm
 * @returns {{clientId: {trigger: string, message: *, required: boolean}[]}}
 */
export function formRules(vm) {
  return {
        wxId: [
          { required: true, message: vm.$t(getI18nName('wxId')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
        ],
        menuName: [
          { required: true, message: vm.$t(getI18nName('menuName')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
        ],
        menuContentType: [
          { required: true, message: vm.$t(getI18nName('menuContentType')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
        ],
        menuContent: [
          { required: true, message: vm.$t(getI18nName('menuContent')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
        ],
        enableState: [
          { required: true, message: vm.$t(getI18nName('enableState')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
        ],
        publishState: [
          { required: true, message: vm.$t(getI18nName('publishState')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
        ]
  }
}

export const menuContentTypes = [
  {
    label: '发送消息',
    value: 'send'
  },
  {
    label: '跳转网页',
    value: 'redirect'
  },
  {
    label: '跳转小程序',
    value: 'program'
  }
]

export const publishState = [
  {
    label: '等待发布',
    value: '0'
  },
  {
    label: '已发布',
    value: '1'
  }
]
