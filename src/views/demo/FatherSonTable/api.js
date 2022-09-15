import {
  defaultUrlMethod
} from '@/components/CURD/defaultUrl'
/**
 * 单点登录认证管理模块基础地址
 * @type {string}
 */
export const baseUrl = '/api/baseFatherSonTable'

/**
 * 定义主键字段
 */
export const primaryKeyField = 'orderNo'
/**
 * 基础查询地址
 * @type {{pageUrl: string}}
 */
export const urlMethods = defaultUrlMethod(baseUrl, primaryKeyField, {
  pageUrl: baseUrl + '/pageQuery'
})
/**
 * 定义模块的命名空间
 * @type {string}
 */
const modelName = 'baseFatherSonTable'
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
    return {
      value: t
    }
  })
}

/**
 * 字段的配置，用在国际化及列表选择显示字段的时候
 * @type {*[]}
 */
// 主表
const tableFields = ['orderNo', 'ordertime', 'ordertotal', 'consignee', 'orderstatus', 'paystatus', 'shipmentstatus', 'paymethod', 'customerphone', 'customeraddress', 'customermail']
// 子表
const SonTableFields = ['GoodsCode', 'GoodsName', 'Specifications', 'GoodsUnit', 'QuantityRequired', 'UnitPrice', 'money', 'stock']
const exportSonTableFields = exportTableFields(SonTableFields)
export default exportTableFields(tableFields)
export {
  exportSonTableFields
}
/**
 * 字段的验证规则
 * @param vm
 * @returns {{clientId: {trigger: string, message: *, required: boolean}[]}}
 */
export function formRules(vm) {
  return {
    // 主表
    orderNo: [{
      message: vm.$t(getI18nName('orderNo')) + vm.$t('common.notAllowedNull'),
      trigger: 'blur'
    }],
    ordertime: [{
      message: vm.$t(getI18nName('ordertime')) + vm.$t('common.notAllowedNull'),
      trigger: 'blur',
      required: true

    }],
    ordertotal: [{
      message: vm.$t(getI18nName('ordertotal')) + vm.$t('common.notAllowedNull'),
      trigger: 'blur'
    }],
    consignee: [{
      required: true,
      message: vm.$t(getI18nName('consignee')) + vm.$t('common.notAllowedNull'),
      trigger: 'blur'
    }],
    orderstatus: [{
      message: vm.$t(getI18nName('orderstatus')) + vm.$t('common.notAllowedNull'),
      trigger: 'blur'
    }],
    paystatus: [{
      message: vm.$t(getI18nName('paystatus')) + vm.$t('common.notAllowedNull'),
      trigger: 'blur'
    }],
    shipmentstatus: [{
      message: vm.$t(getI18nName('shipmentstatus')) + vm.$t('common.notAllowedNull'),
      trigger: 'blur'
    }],
    paymethod: [{
      message: vm.$t(getI18nName('paymethod')) + vm.$t('common.notAllowedNull'),
      trigger: 'blur'
    }],
    customerphone: [{
      required: true,
      message: vm.$t(getI18nName('customerphone')) + vm.$t('common.notAllowedNull'),
      trigger: 'blur'
    }],
    customeraddress: [{
      message: vm.$t(getI18nName('customeraddress')) + vm.$t('common.notAllowedNull'),
      trigger: 'blur'
    }]
  }
}
