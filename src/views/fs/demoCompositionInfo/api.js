import { defaultUrlMethod } from '@/components/CURD/defaultUrl'
/**
 * 单点登录认证管理模块基础地址
 * @type {string}
 */
export const baseUrl = '/api/demoCompositionInfo'
/**
 * 基础查询地址
 * @type {{pageUrl: string}}
 */
export const urlMethods = defaultUrlMethod(baseUrl, 'compositionId', {
  pageUrl: baseUrl + '/pageQuery'
})
/**
 * 定义模块的命名空间
 * @type {string}
 */
const modelName = 'demoCompositionInfo'
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
const tableFields = ['compositionId', 'productIdName', 'compositionName', 'compositionRate', 'creatorUserName', 'createTime', 'modifierUserName', 'modifyTime', 'enableState', 'tenantId']

export default exportTableFields(tableFields)

/**
 * 字段的验证规则
 * @param vm
 * @returns {{clientId: {trigger: string, message: *, required: boolean}[]}}
 */
export function formRules(vm) {
  return {
        productId: [
          { required: true, message: vm.$t(getI18nName('productId')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
        ],
        compositionName: [
          { required: true, message: vm.$t(getI18nName('compositionName')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
        ],
        compositionRate: [
          { required: true, message: vm.$t(getI18nName('compositionRate')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
        ],
        enableState: [
          { required: true, message: vm.$t(getI18nName('enableState')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
        ],
  }
}
