import { defaultUrlMethod } from '@/components/CURD/defaultUrl'
/**
 * 单点登录认证管理模块基础地址
 * @type {string}
 */
export const baseUrl = '/api/baseMicro'
/**
 * 基础查询地址
 * @type {{pageUrl: string}}
 */
export const urlMethods = defaultUrlMethod(baseUrl, 'microId', {
  pageUrl: baseUrl + '/pageQuery'
})
/**
 * 定义模块的命名空间
 * @type {string}
 */
const modelName = 'baseMicro'
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
const tableFields = ['microAppId', 'microId', 'microDescription', 'microSecret',
  'enableState']

export default exportTableFields(tableFields)

/**
 * 字段的验证规则
 * @param vm
 * @returns {{clientId: {trigger: string, message: *, required: boolean}[]}}
 */
export function formRules(vm) {
  return {
        microAppId: [
          { required: true, message: vm.$t(getI18nName('microAppId')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
        ],
        microName: [
          { required: true, message: vm.$t(getI18nName('microName')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
        ],
        microDescription: [
          { required: true, message: vm.$t(getI18nName('microDescription')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
        ],
        microSecret: [
          { required: true, message: vm.$t(getI18nName('microSecret')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
        ],
        enableState: [
          { required: true, message: vm.$t(getI18nName('enableState')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
        ]
  }
}
