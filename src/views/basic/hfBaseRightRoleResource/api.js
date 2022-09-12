import { defaultUrlMethod } from '@/components/CURD/defaultUrl'
/**
 * 单点登录认证管理模块基础地址
 * @type {string}
 */
export const baseUrl = '/api/hfBaseRightRoleResource'
/**
 * 基础查询地址
 * @type {{pageUrl: string}}
 */
export const urlMethods = defaultUrlMethod(baseUrl, 'id', {
  pageUrl: baseUrl + '/pageQuery'
})
/**
 * 定义模块的命名空间
 * @type {string}
 */
const modelName = 'hfBaseRightRoleResource'
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
const tableFields = ['roleIdName', 'resourceKey', 'label', 'value', 'enableState']

export default exportTableFields(tableFields)

/**
 * 字段的验证规则
 * @param vm
 * @returns {{clientId: {trigger: string, message: *, required: boolean}[]}}
 */
export function formRules(vm) {
  return {
        roleId: [
          { required: true, message: vm.$t(getI18nName('roleId')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
        ],
        resourceId: [
          { required: true, message: vm.$t(getI18nName('resourceId')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
        ],
        resourceKey: [
          { required: true, message: vm.$t(getI18nName('resourceKey')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
        ],
        label: [
          { required: true, message: vm.$t(getI18nName('label')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
        ],
        value: [
          { required: true, message: vm.$t(getI18nName('value')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
        ],
        enableState: [
          { required: true, message: vm.$t(getI18nName('enableState')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
        ]
  }
}
