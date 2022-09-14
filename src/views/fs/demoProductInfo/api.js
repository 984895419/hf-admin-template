import { defaultUrlMethod } from '@/components/CURD/defaultUrl'
/**
 * 单点登录认证管理模块基础地址
 * @type {string}
 */
export const baseUrl = '/api/demoProductInfo'
/**
 * 基础查询地址
 * @type {{pageUrl: string}}
 */
export const urlMethods = defaultUrlMethod(baseUrl, 'productId', {
  pageUrl: baseUrl + '/pageQuery'
})
/**
 * 定义模块的命名空间
 * @type {string}
 */
const modelName = 'demoProductInfo'
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
const tableFields = ['productId', 'productName', 'productStyle', 'productAddress', 'companyIdName', 'storeIdName', 'productExpiredTime', 'creatorUserName', 'createTime', 'modifierUserName', 'modifyTime', 'enableState', 'tenantId']

export default exportTableFields(tableFields)

/**
 * 字段的验证规则
 * @param vm
 * @returns {{clientId: {trigger: string, message: *, required: boolean}[]}}
 */
export function formRules(vm) {
  return {
        productName: [
          { required: true, message: vm.$t(getI18nName('productName')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
        ],
        productStyle: [
          { required: true, message: vm.$t(getI18nName('productStyle')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
        ],
        productAddress: [
          { required: true, message: vm.$t(getI18nName('productAddress')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
        ],
        companyId: [
          { required: true, message: vm.$t(getI18nName('companyId')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
        ],
        storeId: [
          { required: true, message: vm.$t(getI18nName('storeId')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
        ],
        productExpiredTime: [
          { required: true, message: vm.$t(getI18nName('productExpiredTime')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
        ],
        enableState: [
          { required: true, message: vm.$t(getI18nName('enableState')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
        ],
  }
}
