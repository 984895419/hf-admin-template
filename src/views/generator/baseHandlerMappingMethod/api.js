import { defaultUrlMethod } from '@/components/CURD/defaultUrl'

/**
 * 基础控制器方法名称模块基础地址
 * @type {string}
 */
export const baseUrl = '/api/baseHandlerMappingMethod'
/**
 * 基础查询地址
 * @type {{pageUrl: string}}
 */
export const urlMethods = defaultUrlMethod(baseUrl)
/**
 * 定义模块的命名空间
 * @type {string}
 */
export const namespace = 'base_handler_mapping_method'

/**
 * curd的配置， TODO 后续改成从后台查询返回这些配置
 */
const tableConfig = {
  'tableItemOption': { 'showIndex': true, 'showSelected': true, 'showItemOperate': true },
  'searchOption': { 'returnType': 'fields' },
  'referOption': { 'referId': 'methodId', 'referName': 'btnName' },
  'fields': [{
    'label': '方法ID',
    'i18nLabel': 'BASE_HANDLER_MAPPING_METHOD_METHOD_ID',
    'value': 'methodId',
    'columnName': 'method_id',
    'type': 'text',
    'primaryKey': true,
    'searchConfig': { 'immediately': false, 'keywordSearch': true, 'searchable': false },
    'tableConfig': { 'expand': true },
    'required': false,
    'createConfig': { 'addable': false, 'addShowable': false },
    'updateConfig': { 'updatable': false, 'updateShowable': false },
    'selectChecked': false
  }, {
    'label': '命名空间ID',
    'i18nLabel': 'BASE_HANDLER_MAPPING_METHOD_CONTROLLER_ID',
    'value': 'controllerId',
    'columnName': 'controller_id',
    'type': 'text',
    'primaryKey': false,
    'searchConfig': { 'immediately': false, 'keywordSearch': true, 'searchable': true },
    'tableConfig': { 'expand': false },
    'required': false,
    'createConfig': { 'addable': true, 'addShowable': true },
    'updateConfig': { 'updatable': true, 'updateShowable': true },
    'selectChecked': true
  }, {
    'label': '参照',
    'i18nLabel': 'BASE_HANDLER_MAPPING_METHOD_REF',
    'value': 'ref',
    'columnName': 'ref',
    'type': 'text',
    'primaryKey': false,
    'searchConfig': { 'immediately': false, 'keywordSearch': true, 'searchable': true },
    'tableConfig': { 'expand': false },
    'required': false,
    'createConfig': { 'addable': true, 'addShowable': true },
    'updateConfig': { 'updatable': true, 'updateShowable': true },
    'selectChecked': true
  }, {
    'label': '值',
    'i18nLabel': 'BASE_HANDLER_MAPPING_METHOD_VALUE',
    'value': 'value',
    'columnName': 'value',
    'type': 'text',
    'primaryKey': false,
    'searchConfig': { 'immediately': false, 'keywordSearch': true, 'searchable': true },
    'tableConfig': { 'expand': false },
    'required': false,
    'createConfig': { 'addable': true, 'addShowable': true },
    'updateConfig': { 'updatable': true, 'updateShowable': true },
    'selectChecked': true
  }, {
    'label': '描述',
    'i18nLabel': 'BASE_HANDLER_MAPPING_METHOD_DESCRIPTION',
    'value': 'description',
    'columnName': 'description',
    'type': 'text',
    'primaryKey': false,
    'searchConfig': { 'immediately': false, 'keywordSearch': true, 'searchable': true },
    'tableConfig': { 'expand': false },
    'required': false,
    'createConfig': { 'addable': true, 'addShowable': true },
    'updateConfig': { 'updatable': true, 'updateShowable': true },
    'selectChecked': true
  }, {
    'label': '按钮名称',
    'i18nLabel': 'BASE_HANDLER_MAPPING_METHOD_BTN_NAME',
    'value': 'btnName',
    'columnName': 'btn_name',
    'type': 'text',
    'primaryKey': false,
    'searchConfig': { 'immediately': false, 'keywordSearch': true, 'searchable': true },
    'tableConfig': { 'expand': false },
    'required': false,
    'createConfig': { 'addable': true, 'addShowable': true },
    'updateConfig': { 'updatable': true, 'updateShowable': true },
    'selectChecked': true
  }, {
    'label': '操作',
    'i18nLabel': 'BASE_HANDLER_MAPPING_METHOD_OPERATE',
    'value': 'operate',
    'columnName': 'operate',
    'type': 'text',
    'primaryKey': false,
    'searchConfig': { 'immediately': false, 'keywordSearch': true, 'searchable': true },
    'tableConfig': { 'expand': false },
    'required': false,
    'createConfig': { 'addable': true, 'addShowable': true },
    'updateConfig': { 'updatable': true, 'updateShowable': true },
    'selectChecked': true
  }, {
    'label': '方法名称',
    'i18nLabel': 'BASE_HANDLER_MAPPING_METHOD_METHO_NAME',
    'value': 'methoName',
    'columnName': 'metho_name',
    'type': 'text',
    'primaryKey': false,
    'searchConfig': { 'immediately': false, 'keywordSearch': true, 'searchable': true },
    'tableConfig': { 'expand': false },
    'required': false,
    'createConfig': { 'addable': true, 'addShowable': true },
    'updateConfig': { 'updatable': true, 'updateShowable': true },
    'selectChecked': true
  }, {
    'label': '请求方式',
    'i18nLabel': 'BASE_HANDLER_MAPPING_METHOD_REF_TYPE',
    'value': 'refType',
    'columnName': 'ref_type',
    'type': 'text',
    'primaryKey': false,
    'searchConfig': { 'immediately': false, 'keywordSearch': true, 'searchable': true },
    'tableConfig': { 'expand': false },
    'required': false,
    'createConfig': { 'addable': true, 'addShowable': true },
    'updateConfig': { 'updatable': true, 'updateShowable': true },
    'selectChecked': true
  }, {
    'label': '所属的分组',
    'i18nLabel': 'BASE_HANDLER_MAPPING_METHOD_SUIT_GROUP',
    'value': 'suitGroup',
    'columnName': 'suit_group',
    'type': 'text',
    'primaryKey': false,
    'searchConfig': { 'immediately': false, 'keywordSearch': true, 'searchable': true },
    'tableConfig': { 'expand': false },
    'required': false,
    'createConfig': { 'addable': true, 'addShowable': true },
    'updateConfig': { 'updatable': true, 'updateShowable': true },
    'selectChecked': true
  }, {
    'label': '表达式',
    'i18nLabel': 'BASE_HANDLER_MAPPING_METHOD_EXPRESSION',
    'value': 'expression',
    'columnName': 'expression',
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
    'i18nLabel': 'BASE_HANDLER_MAPPING_METHOD_CREATOR',
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
    'i18nLabel': 'BASE_HANDLER_MAPPING_METHOD_CREATE_TIME',
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
    'i18nLabel': 'BASE_HANDLER_MAPPING_METHOD_MODIFIER',
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
    'i18nLabel': 'BASE_HANDLER_MAPPING_METHOD_MODIFY_TIME',
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
    'i18nLabel': 'BASE_HANDLER_MAPPING_METHOD_ENABLE_STATE',
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
