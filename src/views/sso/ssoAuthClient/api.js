import { defaultUrlMethod } from '@/components/CURD/defaultUrl'
/**
 * 单点登录认证管理模块基础地址
 * @type {string}
 */
export const baseUrl = '/api/ssoAuthClient'
/**
 * 基础查询地址
 * @type {{pageUrl: string}}
 */
export const urlMethods = defaultUrlMethod(baseUrl, {
  pageUrl: baseUrl + '/pageQuery'
})
/**
 * 定义模块的命名空间
 * @type {string}
 */
const modelName = 'ssoAuthClient'
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
const tableFields = ['clientId', 'clientSecret', 'redirectUri',
  'clientMethodName', 'authorizationGrantTypesNames', 'description', 'enableState',
  'modifier', 'modifyTime', 'creator', 'createTime']

export default exportTableFields(tableFields)

/**
 * 字段的验证规则
 * @param vm
 * @returns {{clientId: {trigger: string, message: *, required: boolean}[]}}
 */
export function formRules(vm) {
  return {
    clientId: [
      { required: true, message: vm.$t(getI18nName('clientId')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
    ],
    clientSecret: [
      { required: true, message: vm.$t(getI18nName('clientSecret')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
    ],
    redirectUri: [
      { required: true, message: vm.$t(getI18nName('redirectUri')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
    ],
    clientMethodName: [
      { required: true, message: vm.$t(getI18nName('clientMethodName')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
    ],
    authorizationGrantTypesNames: [
      { required: true, message: vm.$t(getI18nName('authorizationGrantTypesNames')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
    ],
    description: [
      { required: true, message: vm.$t(getI18nName('description')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
    ]
  }
}
