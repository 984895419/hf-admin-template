import { defaultUrlMethod } from '@/components/CURD/defaultUrl'
/**
 * 单点登录认证管理模块基础地址
 * @type {string}
 */
export const baseUrl = '/api/wx/wxServerConf'
/**
 * 基础查询地址
 * @type {{pageUrl: string}}
 */
export const urlMethods = defaultUrlMethod(baseUrl, 'wxId', {
  pageUrl: baseUrl + '/pageQuery',
  effectUrl: baseUrl + '/conf/effect'
})
/**
 * 定义模块的命名空间
 * @type {string}
 */
const modelName = 'wxServerConf'
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
const tableFields = ['wxId', 'name', 'appId', 'secret', 'token', 'aesKey', 'creator', 'createTime', 'modifier', 'modifyTime', 'enableState', 'creatorUserName', 'modifierUserName']

export default exportTableFields(tableFields)

/**
 * 字段的验证规则
 * @param vm
 * @returns {{clientId: {trigger: string, message: *, required: boolean}[]}}
 */
export function formRules(vm) {
  return {
        name: [
          { required: true, message: vm.$t(getI18nName('name')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
        ],
        appId: [
          { required: true, message: vm.$t(getI18nName('appId')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
        ],
        secret: [
          { required: true, message: vm.$t(getI18nName('secret')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
        ],
        token: [
          { required: true, message: vm.$t(getI18nName('token')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
        ],
        aesKey: [
          { required: true, message: vm.$t(getI18nName('aesKey')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
        ],
        enableState: [
          { required: true, message: vm.$t(getI18nName('enableState')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
        ],
  }
}
