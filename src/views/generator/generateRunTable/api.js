import { defaultUrlMethod } from '@/components/CURD/defaultUrl'

/**
 * 运行时表配置模块基础地址
 * @type {string}
 */
export const baseUrl = '/api/generateRunTable'
/**
 * 基础查询地址
 * @type {{pageUrl: string}}
 */
export const urlMethods = defaultUrlMethod(baseUrl)
/**
 * 定义模块的命名空间
 * @type {string}
 */
export const namespace = 'generate_run_table'

/**
 * curd的配置， TODO 后续改成从后台查询返回这些配置
 */
const tableConfig = {
  'tableItemOption': { 'showIndex': true, 'showSelected': true, 'showItemOperate': true },
  'searchOption': { 'returnType': 'fields' },
  'referOption': { 'referId': 'tableId', 'referName': 'tableName' },
  'fields': [{
    'label': '',
    'i18nLabel': 'GENERATE_RUN_TABLE_TABLE_ID',
    'value': 'tableId',
    'columnName': 'table_id',
    'type': 'text',
    'primaryKey': true,
    'searchConfig': { 'immediately': false, 'keywordSearch': true, 'searchable': false },
    'tableConfig': { 'expand': true },
    'required': false,
    'createConfig': { 'addable': false, 'addShowable': false },
    'updateConfig': { 'updatable': false, 'updateShowable': false },
    'selectChecked': false
  }, {
    'label': '表名',
    'i18nLabel': 'GENERATE_RUN_TABLE_TABLE_NAME',
    'value': 'tableName',
    'columnName': 'table_name',
    'type': 'text',
    'primaryKey': false,
    'searchConfig': { 'immediately': false, 'keywordSearch': true, 'searchable': true },
    'tableConfig': { 'expand': false },
    'required': false,
    'createConfig': { 'addable': true, 'addShowable': true },
    'updateConfig': { 'updatable': true, 'updateShowable': true },
    'selectChecked': true
  }, {
    'label': '备注',
    'i18nLabel': 'GENERATE_RUN_TABLE_TABLE_COMMENT',
    'value': 'tableComment',
    'columnName': 'table_comment',
    'type': 'text',
    'primaryKey': false,
    'searchConfig': { 'immediately': false, 'keywordSearch': true, 'searchable': true },
    'tableConfig': { 'expand': false },
    'required': false,
    'createConfig': { 'addable': true, 'addShowable': true },
    'updateConfig': { 'updatable': true, 'updateShowable': true },
    'selectChecked': true
  }, {
    'label': '是否显示序号',
    'i18nLabel': 'GENERATE_RUN_TABLE_SHOW_INDEX',
    'value': 'showIndex',
    'columnName': 'show_index',
    'type': 'text',
    'primaryKey': false,
    'searchConfig': { 'immediately': false, 'keywordSearch': true, 'searchable': true },
    'tableConfig': { 'expand': false },
    'required': false,
    'createConfig': { 'addable': true, 'addShowable': true },
    'updateConfig': { 'updatable': true, 'updateShowable': true },
    'selectChecked': true
  }, {
    'label': '默认搜索模式',
    'i18nLabel': 'GENERATE_RUN_TABLE_SEARCH_MODEL',
    'value': 'searchModel',
    'columnName': 'search_model',
    'type': 'text',
    'primaryKey': false,
    'searchConfig': { 'immediately': false, 'keywordSearch': true, 'searchable': true },
    'tableConfig': { 'expand': false },
    'required': false,
    'createConfig': { 'addable': true, 'addShowable': true },
    'updateConfig': { 'updatable': true, 'updateShowable': true },
    'selectChecked': true
  }, {
    'label': '默认的参照ID',
    'i18nLabel': 'GENERATE_RUN_TABLE_REFER_ID',
    'value': 'referId',
    'columnName': 'refer_id',
    'type': 'text',
    'primaryKey': false,
    'searchConfig': { 'immediately': false, 'keywordSearch': true, 'searchable': true },
    'tableConfig': { 'expand': false },
    'required': false,
    'createConfig': { 'addable': true, 'addShowable': true },
    'updateConfig': { 'updatable': true, 'updateShowable': true },
    'selectChecked': true
  }, {
    'label': '默认的参照名称',
    'i18nLabel': 'GENERATE_RUN_TABLE_REFER_NAME',
    'value': 'referName',
    'columnName': 'refer_name',
    'type': 'text',
    'primaryKey': false,
    'searchConfig': { 'immediately': false, 'keywordSearch': true, 'searchable': true },
    'tableConfig': { 'expand': false },
    'required': false,
    'createConfig': { 'addable': true, 'addShowable': true },
    'updateConfig': { 'updatable': true, 'updateShowable': true },
    'selectChecked': true
  }, {
    'label': '默认显示搜索框',
    'i18nLabel': 'GENERATE_RUN_TABLE_SHOW_SELECTED',
    'value': 'showSelected',
    'columnName': 'show_selected',
    'type': 'text',
    'primaryKey': false,
    'searchConfig': { 'immediately': false, 'keywordSearch': true, 'searchable': true },
    'tableConfig': { 'expand': false },
    'required': false,
    'createConfig': { 'addable': true, 'addShowable': true },
    'updateConfig': { 'updatable': true, 'updateShowable': true },
    'selectChecked': true
  }, {
    'label': '是否显示操作栏',
    'i18nLabel': 'GENERATE_RUN_TABLE_SHOW_ITEM_OPERATE',
    'value': 'showItemOperate',
    'columnName': 'show_item_operate',
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
    'i18nLabel': 'GENERATE_RUN_TABLE_CREATOR',
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
    'i18nLabel': 'GENERATE_RUN_TABLE_CREATE_TIME',
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
    'i18nLabel': 'GENERATE_RUN_TABLE_MODIFIER',
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
    'i18nLabel': 'GENERATE_RUN_TABLE_MODIFY_TIME',
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
    'i18nLabel': 'GENERATE_RUN_TABLE_ENABLE_STATE',
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
