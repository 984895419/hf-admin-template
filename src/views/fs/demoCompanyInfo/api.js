import { defaultUrlMethod } from '@/components/CURD/defaultUrl'
/**
 * 单点登录认证管理模块基础地址
 * @type {string}
 */
export const baseUrl = '/api/demoCompanyInfo'
/**
 * 基础查询地址
 * @type {{pageUrl: string}}
 */
export const urlMethods = defaultUrlMethod(baseUrl, 'companyId', {
  pageUrl: baseUrl + '/pageQuery'
})
/**
 * 定义模块的命名空间
 * @type {string}
 */
const modelName = 'demoCompanyInfo'
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
const tableFields = ['companyId', 'companyName', 'companyTypeName', 'companyAddress', 'companyBelong', 'creatorUserName', 'createTime', 'modifierUserName', 'modifyTime', 'enableState', 'tenantId']

export default exportTableFields(tableFields)

/**
 * 字段的验证规则
 * @param vm
 * @returns {{clientId: {trigger: string, message: *, required: boolean}[]}}
 */
export function formRules(vm) {
  return {
        companyName: [
          { required: true, message: vm.$t(getI18nName('companyName')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
        ],
        companyType: [
          { required: true, message: vm.$t(getI18nName('companyType')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
        ],
        companyAddress: [
          { required: true, message: vm.$t(getI18nName('companyAddress')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
        ],
        companyBelong: [
          { required: true, message: vm.$t(getI18nName('companyBelong')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
        ],
        enableState: [
          { required: true, message: vm.$t(getI18nName('enableState')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
        ],
  }
}
