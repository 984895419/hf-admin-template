import { defaultUrlMethod } from '@/components/CURD/defaultUrl'
/**
 * 单点登录认证管理模块基础地址
 * @type {string}
 */
export const baseUrl = '/api/ssoLoginApp'
/**
 * 基础查询地址
 * @type {{pageUrl: string}}
 */
export const urlMethods = defaultUrlMethod(baseUrl, 'appId', {
  pageUrl: baseUrl + '/pageQuery'
})
/**
 * 定义模块的命名空间
 * @type {string}
 */
const modelName = 'ssoLoginApp'
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
const tableFields = ['appId', 'appName', 'noLoginType', 'internetHomeUri', 'creator', 'createTime', 'modifier', 'modifyTime', 'enableState', 'deleted', 'sort', 'homeUri', 'tokenUri', 'icon', 'protectUri']

export default exportTableFields(tableFields)

/**
 * 字段的验证规则
 * @param vm
 * @returns {{clientId: {trigger: string, message: *, required: boolean}[]}}
 */
export function formRules(vm) {
  return {
    appId: [
      { required: true, message: vm.$t(getI18nName('appId')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
    ],
    appName: [
      { required: true, message: vm.$t(getI18nName('appName')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
    ],
    noLoginType: [
      { required: true, message: vm.$t(getI18nName('noLoginType')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
    ],
    creator: [
      { required: true, message: vm.$t(getI18nName('creator')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
    ],
    createTime: [
      { required: true, message: vm.$t(getI18nName('createTime')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
    ],
    modifier: [
      { required: true, message: vm.$t(getI18nName('modifier')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
    ],
    modifyTime: [
      { required: true, message: vm.$t(getI18nName('modifyTime')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
    ],
    enableState: [
      { required: true, message: vm.$t(getI18nName('enableState')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
    ],
    deleted: [
      { required: true, message: vm.$t(getI18nName('deleted')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
    ],
    sort: [
      { required: true, message: vm.$t(getI18nName('sort')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
    ],
    homeUri: [
      { required: true, message: vm.$t(getI18nName('homeUri')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
    ],
    tokenUri: [
      { required: true, message: vm.$t(getI18nName('tokenUri')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
    ],
    icon: [
      { required: true, message: vm.$t(getI18nName('icon')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
    ],
    protectUri: [
      { required: true, message: vm.$t(getI18nName('protectUri')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
    ]
  }
}
