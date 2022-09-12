import { defaultUrlMethod } from '@/components/CURD/defaultUrl'
/**
 * 单点登录认证管理模块基础地址
 * @type {string}
 */
export const baseUrl = '/api/baseResource'
/**
 * 基础查询地址
 * @type {{pageUrl: string}}
 */
export const urlMethods = defaultUrlMethod(baseUrl, 'resourceId', {
  pageUrl: baseUrl + '/pageQuery'
})
/**
 * 定义模块的命名空间
 * @type {string}
 */
const modelName = 'baseResource'
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
const tableFields = ['microIdName', 'resourceKey', 'resourceName', 'micro',
'providerUrl', 'feignUrl', 'enableState']

export default exportTableFields(tableFields)

/**
 * 字段的验证规则
 * @param vm
 * @returns {{clientId: {trigger: string, message: *, required: boolean}[]}}
 */
export function formRules(vm) {
  return {
        resourceKey: [
          { required: true, message: vm.$t(getI18nName('resourceKey')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
        ],
        resourceName: [
          { required: true, message: vm.$t(getI18nName('resourceName')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
        ],
        micro: [
          { required: true, message: vm.$t(getI18nName('micro')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
        ],
        providerUrl: [
          { required: true, message: vm.$t(getI18nName('providerUrl')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
        ],
        feignUrl: [
          { required: true, message: vm.$t(getI18nName('feignUrl')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
        ],
        enableState: [
          { required: true, message: vm.$t(getI18nName('enableState')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
        ],
        microId: [
          { required: true, message: vm.$t(getI18nName('microId')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
        ]
  }
}
