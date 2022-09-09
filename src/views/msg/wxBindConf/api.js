import { defaultUrlMethod } from '@/components/CURD/defaultUrl'
/**
 * 单点登录认证管理模块基础地址
 * @type {string}
 */
export const baseUrl = '/api/wx/wxBindConf'
/**
 * 基础查询地址
 * @type {{pageUrl: string}}
 */
export const urlMethods = defaultUrlMethod(baseUrl, 'bindId', {
  pageUrl: baseUrl + '/pageQuery',
  auditUrl: baseUrl + '/audit/{bindId}'
})
/**
 * 定义模块的命名空间
 * @type {string}
 */
const modelName = 'wxBindConf'
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
const tableFields = ['bindId', 'bindMobile', 'bindCompany', 'auditState', 'bindNickName', 'bindOpenId', 'bindHeadpic', 'modifier', 'modifyTime', 'enableState', 'version', 'wxId', 'wxIdName', 'reason', 'modifierUserName']

export default exportTableFields(tableFields)

/**
 * 字段的验证规则
 * @param vm
 * @returns {{clientId: {trigger: string, message: *, required: boolean}[]}}
 */
export function formRules(vm) {
  return {
        bindMobile: [
          { required: true, message: vm.$t(getI18nName('bindMobile')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
        ],
        bindCompany: [
          { required: true, message: vm.$t(getI18nName('bindCompany')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
        ],
        auditState: [
          { required: true, message: vm.$t(getI18nName('auditState')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
        ],
        bindNickName: [
          { required: true, message: vm.$t(getI18nName('bindNickName')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
        ],
        bindOpenId: [
          { required: true, message: vm.$t(getI18nName('bindOpenId')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
        ],
        bindHeadpic: [
          { required: true, message: vm.$t(getI18nName('bindHeadpic')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
        ],
        enableState: [
          { required: true, message: vm.$t(getI18nName('enableState')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
        ],
        wxId: [
          { required: true, message: vm.$t(getI18nName('wxId')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
        ],
        reason: [
          { required: true, message: vm.$t(getI18nName('reason')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
        ]
  }
}

export const auditStatesSelect = [
  {
    label: '全部',
    value: ''
  },
  {
    label: '等待审核',
    value: 'wait'
  },
  {
    label: '通过',
    value: 'pass'
  },
  {
    label: '不通过',
    value: 'fail'
  },
  {
    label: '取消',
    value: 'cancle'
  }
]

export const auditStates = [
  {
    label: '通过',
    value: 'pass'
  },
  {
    label: '不通过',
    value: 'fail'
  }
]
