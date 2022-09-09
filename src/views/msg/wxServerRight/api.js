import { defaultUrlMethod } from '@/components/CURD/defaultUrl'
/**
 * 单点登录认证管理模块基础地址
 * @type {string}
 */
export const baseUrl = '/api/wx/wxServerRight'
/**
 * 基础查询地址
 * @type {{pageUrl: string}}
 */
export const urlMethods = defaultUrlMethod(baseUrl, 'rightId', {
  pageUrl: baseUrl + '/pageQuery'
})
/**
 * 定义模块的命名空间
 * @type {string}
 */
const modelName = 'wxServerRight'
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
const tableFields = ['rightId', 'userId', 'userIdName', 'wxId', 'wxIdName', 'creator', 'createTime', 'creatorUserName']

export default exportTableFields(tableFields)

/**
 * 字段的验证规则
 * @param vm
 * @returns {{clientId: {trigger: string, message: *, required: boolean}[]}}
 */
export function formRules(vm) {
  return {
        userId: [
          { required: true, message: vm.$t(getI18nName('userId')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
        ],
        wxId: [
          { required: true, message: vm.$t(getI18nName('wxId')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
        ]
  }
}
