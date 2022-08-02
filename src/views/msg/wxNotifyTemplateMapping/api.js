import { defaultUrlMethod } from '@/components/CURD/defaultUrl'
/**
 * 单点登录认证管理模块基础地址
 * @type {string}
 */
export const baseUrl = '/api/wx/wxNotifyTemplateMapping'
/**
 * 基础查询地址
 * @type {{pageUrl: string}}
 */
export const urlMethods = defaultUrlMethod(baseUrl, 'notifyId', {
  pageUrl: baseUrl + '/pageQuery',
  templateListUrl: '/api/wx/wx/template/{appId}'
})
/**
 * 定义模块的命名空间
 * @type {string}
 */
const modelName = 'wxNotifyTemplateMapping'
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
const tableFields = ['notifyId', 'notifyKey', 'wxId', 'wxIdName', 'templateId', 'exampleData', 'templateContent', 'templateTitle', 'mapping', 'creator', 'createTime', 'modifier', 'modifyTime', 'enableState', 'CreatorUserName','ModifierUserName']

export default exportTableFields(tableFields)

/**
 * 字段的验证规则
 * @param vm
 * @returns {{clientId: {trigger: string, message: *, required: boolean}[]}}
 */
export function formRules(vm) {
  return {
        notifyKey: [
          { required: true, message: vm.$t(getI18nName('notifyKey')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
        ],
        wxId: [
          { required: true, message: vm.$t(getI18nName('wxId')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
        ],
        templateId: [
          { required: true, message: vm.$t(getI18nName('templateId')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
        ],
        exampleData: [
          { required: true, message: vm.$t(getI18nName('exampleData')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
        ],
        templateContent: [
          { required: true, message: vm.$t(getI18nName('templateContent')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
        ],
        templateTitle: [
          { required: true, message: vm.$t(getI18nName('templateTitle')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
        ],
        enableState: [
          { required: true, message: vm.$t(getI18nName('enableState')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
        ],
  }
}
