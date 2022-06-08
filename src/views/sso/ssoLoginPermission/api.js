import { defaultUrlMethod } from '@/components/CURD/defaultUrl'
/**
 * 单点登录认证管理模块基础地址
 * @type {string}
 */
export const baseUrl = '/api/ssoLoginPermission'
/**
 * 基础查询地址
 * @type {{pageUrl: string}}
 */
export const urlMethods = defaultUrlMethod(baseUrl, 'permissionId', {
  pageUrl: baseUrl + '/pageQuery',
  appPermissionUrl: baseUrl + '/app/{permissionId}',
  appPermissionSaveUrl: baseUrl + '/app/bind'
})
/**
 * 定义模块的命名空间
 * @type {string}
 */
const modelName = 'ssoLoginPermission'
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
const tableFields = ['permissionId', 'permissionName', 'permissionType', 'appCnt', 'permissionCnt', 'creator', 'createTime', 'modifier', 'modifyTime', 'enableState', 'deleted']

export default exportTableFields(tableFields)

/**
 * 字段的验证规则
 * @param vm
 * @returns {{clientId: {trigger: string, message: *, required: boolean}[]}}
 */
export function formRules(vm) {
  return {
    permissionId: [
      { required: true, message: vm.$t(getI18nName('permissionId')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
    ],
    permissionName: [
      { required: true, message: vm.$t(getI18nName('permissionName')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
    ],
    permissionType: [
      { required: true, message: vm.$t(getI18nName('permissionType')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
    ],
    permissionCnt: [
      { required: true, message: vm.$t(getI18nName('permissionCnt')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
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
    ]
  }
}
