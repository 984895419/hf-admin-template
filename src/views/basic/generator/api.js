import { defaultUrlMethod } from '@/components/CURD/defaultUrl'
/**
 * 单点登录认证管理模块基础地址
 * @type {string}
 */
export const baseUrl = '/api/baseTenant'
/**
 * 基础查询地址
 * @type {{pageUrl: string}}
 */
export const urlMethods = defaultUrlMethod(baseUrl, 'id', {
  pageUrl: baseUrl + '/pageQuery',
  // 从原生url中查询表信息
  originUrl: '/api/plus/queryTableInfo/'
})
/**
 * 定义模块的命名空间
 * @type {string}
 */
const modelName = 'generateCode'

export const namespace = modelName

/**
 * 正则
 * @param name
 * @returns {string}
 */
export function getI18nName(name) {
  return modelName + '.' + name
}

/**
 * 字段的验证规则
 * @param vm
 * @returns {{clientId: {trigger: string, message: *, required: boolean}[]}}
 */
export function formRules(vm) {
  return {
    typeId: [
      { required: true, message: vm.$t(getI18nName('typeId')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
    ]
  }
}
