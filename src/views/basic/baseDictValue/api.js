/**
 * 数据字典值模块基础地址
 * @type {string}
 */
export const baseUrl = '/api/baseDictValue'
/**
 * 基础查询地址
 * @type {{pageUrl: string}}
 */
export const urlMethods = {
  pageUrl: baseUrl + '/nameQuery'
}
/**
 * 定义模块的命名空间
 * @type {string}
 */
export const namespace = 'base_dict_value'

/**
 * curd的配置， TODO 后续改成从后台查询返回这些配置
 */
const tableConfig = {
  'tableItemOption': { 'showSelected': true, 'showItemOperate': true },
  'searchOption': { 'returnType': 'fields' },
  'referOption': { 'referId': 'valueId', 'referName': 'name' },
  'fields': [{
    'label': '字典值主键',
    'i18nLabel': 'BASE_DICT_VALUE_VALUE_ID',
    'value': 'valueId',
    'columnName': 'value_id',
    'type': 'text',
    'primaryKey': true,
    'searchConfig': { 'immediately': false, 'keywordSearch': true, 'searchable': false },
    'tableConfig': { 'expand': true },
    'required': false,
    'createConfig': { 'addable': false, 'addShowable': false },
    'updateConfig': { 'updatable': false, 'updateShowable': false },
    'selectChecked': false
  }, {
    'label': '字典类型code',
    'i18nLabel': 'BASE_DICT_VALUE_TYPE_CODE',
    'value': 'typeCode',
    'columnName': 'type_code',
    'type': 'text',
    'primaryKey': false,
    'searchConfig': { 'immediately': false, 'keywordSearch': true, 'searchable': true },
    'tableConfig': { 'expand': false },
    'required': false,
    'createConfig': { 'addable': false, 'addShowable': true },
    'updateConfig': { 'updatable': false, 'updateShowable': true },
    'selectChecked': false
  }, {
    'label': '字典类型名称',
    'i18nLabel': 'BASE_DICT_VALUE_NAME',
    'value': 'name',
    'columnName': 'name',
    'type': 'text',
    'primaryKey': false,
    'searchConfig': { 'immediately': false, 'keywordSearch': true, 'searchable': true },
    'tableConfig': { 'expand': false },
    'required': false,
    'createConfig': { 'addable': false, 'addShowable': true },
    'updateConfig': { 'updatable': false, 'updateShowable': true },
    'selectChecked': true
  }, {
    'label': '字典的key',
    'i18nLabel': 'BASE_DICT_VALUE_DICT_KEY',
    'value': 'dictKey',
    'columnName': 'dict_key',
    'type': 'text',
    'primaryKey': false,
    'searchConfig': { 'immediately': false, 'keywordSearch': true, 'searchable': true },
    'tableConfig': { 'expand': false },
    'required': false,
    'createConfig': { 'addable': true, 'addShowable': true },
    'updateConfig': { 'updatable': true, 'updateShowable': true },
    'selectChecked': true
  }, {
    'label': '字典值',
    'i18nLabel': 'BASE_DICT_VALUE_DICT_VALUE',
    'value': 'dictValue',
    'columnName': 'dict_value',
    'type': 'text',
    'primaryKey': false,
    'searchConfig': { 'immediately': false, 'keywordSearch': true, 'searchable': true },
    'tableConfig': { 'expand': false },
    'required': false,
    'createConfig': { 'addable': true, 'addShowable': true },
    'updateConfig': { 'updatable': true, 'updateShowable': true },
    'selectChecked': true
  }, {
    'label': '启用/禁用',
    'i18nLabel': 'BASE_DICT_VALUE_ENABLE_STATE',
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
