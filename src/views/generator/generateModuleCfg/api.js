import { defaultUrlMethod } from '@/components/CURD/defaultUrl'

/**
 * 模块配置模块基础地址
 * @type {string}
 */
export const baseUrl = '/api/generateModuleCfg'
/**
 * 基础查询地址
 * @type {{pageUrl: string}}
 */
export const urlMethods = defaultUrlMethod(baseUrl)
/**
 * 定义模块的命名空间
 * @type {string}
 */
export const namespace = 'generate_module_cfg'

/**
 * curd的配置， TODO 后续改成从后台查询返回这些配置
 */
const tableConfig = {
  'tableItemOption': { 'showIndex': true, 'showSelected': true, 'showItemOperate': true },
  'searchOption': { 'returnType': 'fields' },
  'referOption': { 'referId': 'moduleId', 'referName': 'moduleName' },
  'fields': [{
    'label': '模块ID',
    'i18nLabel': 'GENERATE_MODULE_CFG_MODULE_ID',
    'value': 'moduleId',
    'columnName': 'module_id',
    'type': 'text',
    'primaryKey': true,
    'searchConfig': { 'immediately': false, 'keywordSearch': true, 'searchable': false },
    'tableConfig': { 'expand': true },
    'required': false,
    'createConfig': { 'addable': false, 'addShowable': false },
    'updateConfig': { 'updatable': false, 'updateShowable': false },
    'selectChecked': false
  }, {
    'label': '模块名称',
    'i18nLabel': 'GENERATE_MODULE_CFG_MODULE_NAME',
    'value': 'moduleName',
    'columnName': 'module_name',
    'type': 'text',
    'primaryKey': false,
    'searchConfig': { 'immediately': false, 'keywordSearch': true, 'searchable': true },
    'tableConfig': { 'expand': false },
    'required': false,
    'createConfig': { 'addable': true, 'addShowable': true },
    'updateConfig': { 'updatable': true, 'updateShowable': true },
    'selectChecked': true
  }, {
    'label': '模块备注',
    'i18nLabel': 'GENERATE_MODULE_CFG_MODULE_REMARK',
    'value': 'moduleRemark',
    'columnName': 'module_remark',
    'type': 'text',
    'primaryKey': false,
    'searchConfig': { 'immediately': false, 'keywordSearch': true, 'searchable': true },
    'tableConfig': { 'expand': false },
    'required': false,
    'createConfig': { 'addable': true, 'addShowable': true },
    'updateConfig': { 'updatable': true, 'updateShowable': true },
    'selectChecked': true
  }, {
    'label': '基础包名',
    'i18nLabel': 'GENERATE_MODULE_CFG_BASE_PACKAGE',
    'value': 'basePackage',
    'columnName': 'base_package',
    'type': 'text',
    'primaryKey': false,
    'searchConfig': { 'immediately': false, 'keywordSearch': true, 'searchable': true },
    'tableConfig': { 'expand': false },
    'required': false,
    'createConfig': { 'addable': true, 'addShowable': true },
    'updateConfig': { 'updatable': true, 'updateShowable': true },
    'selectChecked': true
  }, {
    'label': '创建人',
    'i18nLabel': 'GENERATE_MODULE_CFG_CREATOR',
    'value': 'creator',
    'columnName': 'creator',
    'type': 'text',
    'primaryKey': false,
    'searchConfig': { 'immediately': false, 'keywordSearch': true, 'searchable': true },
    'tableConfig': { 'expand': true },
    'required': false,
    'createConfig': { 'addable': false, 'addShowable': false },
    'updateConfig': { 'updatable': false, 'updateShowable': true },
    'selectChecked': false
  }, {
    'label': '创建时间',
    'i18nLabel': 'GENERATE_MODULE_CFG_CREATE_TIME',
    'value': 'createTime',
    'columnName': 'create_time',
    'type': 'text',
    'primaryKey': false,
    'searchConfig': { 'immediately': false, 'keywordSearch': true, 'searchable': true },
    'tableConfig': { 'expand': true },
    'required': false,
    'createConfig': { 'addable': false, 'addShowable': false },
    'updateConfig': { 'updatable': false, 'updateShowable': true },
    'selectChecked': false
  }, {
    'label': '修改人',
    'i18nLabel': 'GENERATE_MODULE_CFG_MODIFIER',
    'value': 'modifier',
    'columnName': 'modifier',
    'type': 'text',
    'primaryKey': false,
    'searchConfig': { 'immediately': false, 'keywordSearch': true, 'searchable': true },
    'tableConfig': { 'expand': true },
    'required': false,
    'createConfig': { 'addable': false, 'addShowable': false },
    'updateConfig': { 'updatable': false, 'updateShowable': true },
    'selectChecked': false
  }, {
    'label': '修改时间',
    'i18nLabel': 'GENERATE_MODULE_CFG_MODIFY_TIME',
    'value': 'modifyTime',
    'columnName': 'modify_time',
    'type': 'text',
    'primaryKey': false,
    'searchConfig': { 'immediately': false, 'keywordSearch': true, 'searchable': true },
    'tableConfig': { 'expand': true },
    'required': false,
    'createConfig': { 'addable': false, 'addShowable': false },
    'updateConfig': { 'updatable': false, 'updateShowable': true },
    'selectChecked': false
  }, {
    'label': '启用/禁用',
    'i18nLabel': 'GENERATE_MODULE_CFG_ENABLE_STATE',
    'value': 'enableState',
    'columnName': 'enable_state',
    'type': 'switch',
    'primaryKey': false,
    'props': { 'activeValue': 1, 'activeText': '启用', 'inactiveValue': 0, 'inactiveText': '禁用' },
    'searchConfig': { 'immediately': false, 'keywordSearch': true, 'searchable': true },
    'tableConfig': { 'expand': false },
    'required': false,
    'createConfig': { 'addable': true, 'addShowable': true },
    'updateConfig': { 'updatable': true, 'updateShowable': true },
    'selectChecked': true
  }]
}

export default tableConfig
