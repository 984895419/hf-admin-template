/**
 * 代码生成器-表信息模块基础地址
 * @type {string}
 */
export const baseUrl = '/api/generateTableInfo'
/**
 * 基础查询地址
 * @type {{pageUrl: string}}
 */
export const urlMethods = {
  pageUrl: baseUrl + '/nameQuery',
  // 同步操作
  checkUrl: '/api/plus/check',
  // 同步操作
  syncUrl: '/api/plus/sync',
  // 从原生url中查询表信息
  originUrl: '/api/plus/queryTableInfos'
}
/**
 * 定义模块的命名空间
 * @type {string}
 */
export const namespace = 'generate_table_info'

/**
 * curd的配置， TODO 后续改成从后台查询返回这些配置
 */
const tableConfig = {
  'tableItemOption': { 'showIndex': true, 'showSelected': true, 'showItemOperate': true },
  'searchOption': { 'returnType': 'fields' },
  'referOption': { 'referId': 'tableId', 'referName': 'tableName' },
  'fields': [{
    'label': '主键',
    'i18nLabel': 'GENERATE_TABLE_INFO_TABLE_ID',
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
    'label': '数据源id',
    'i18nLabel': 'GENERATE_TABLE_INFO_DATASOURCE_ID',
    'value': 'datasourceId',
    'columnName': 'datasource_id',
    'type': 'ref',
    'primaryKey': false,
    'searchConfig': { 'immediately': false, 'keywordSearch': true, 'searchable': true },
    'tableConfig': { 'expand': true },
    'required': true,
    'createConfig': { 'addable': true, 'addShowable': true },
    'updateConfig': { 'updatable': true, 'updateShowable': true },
    'referOption': {
      'refPath': 'GenerateDatasourceInputRefer',
      'valueReferName': 'datasourceName'
    }
  }, {
    'label': '数据源名称',
    'i18nLabel': 'GENERATE_TABLE_INFO_DATASOURCE_NAME',
    'value': 'datasourceName',
    'columnName': 'datasource_name',
    'type': 'text',
    'primaryKey': false,
    'searchConfig': { 'immediately': false, 'keywordSearch': true, 'searchable': false },
    'tableConfig': { 'expand': false },
    'required': false,
    'createConfig': { 'addable': false, 'addShowable': true },
    'updateConfig': { 'updatable': false, 'updateShowable': false },
    'selectChecked': true
  }, {
    'label': '表名',
    'i18nLabel': 'GENERATE_TABLE_INFO_TABLE_NAME',
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
    'label': '表备注',
    'i18nLabel': 'GENERATE_TABLE_INFO_TABLE_COMMENT',
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
    'label': '是否有主键',
    'i18nLabel': 'GENERATE_TABLE_INFO_HAVE_PRIMARY_KEY',
    'value': 'havePrimaryKey',
    'columnName': 'have_primary_key',
    'type': 'select',
    'primaryKey': false,
    'searchConfig': { 'immediately': false, 'keywordSearch': true, 'searchable': true },
    'tableConfig': { 'expand': false },
    'required': false,
    'createConfig': { 'addable': true, 'addShowable': true },
    'updateConfig': { 'updatable': true, 'updateShowable': true },
    'selectChecked': true,
    'children': [
      {
        label: '有',
        value: 1
      },
      {
        label: '无',
        value: 0
      }
    ]
  }, {
    'label': '修改人',
    'i18nLabel': 'GENERATE_TABLE_INFO_MODIFIER',
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
    'i18nLabel': 'GENERATE_TABLE_INFO_MODIFY_TIME',
    'value': 'modifyTime',
    'columnName': 'modify_time',
    'operate': 'EQ',
    'type': 'picker',
    'primaryKey': false,
    'searchConfig': { 'immediately': false, 'keywordSearch': true, 'searchable': true },
    'tableConfig': { 'expand': true },
    'required': false,
    'createConfig': { 'addable': false, 'addShowable': false },
    'updateConfig': { 'updatable': false, 'updateShowable': true },
    'selectChecked': false
  }, {
    'label': '启用/禁用状态',
    'i18nLabel': 'GENERATE_TABLE_INFO_ENABLE_STATE',
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
  }, {
    'label': '创建时间',
    'i18nLabel': 'GENERATE_TABLE_INFO_CREATE_TIME',
    'value': 'createTime',
    'columnName': 'create_time',
    'type': 'picker',
    'operate': 'BETWEEN',
    'primaryKey': false,
    'searchConfig': { 'immediately': false, 'keywordSearch': true, 'searchable': true },
    'tableConfig': { 'expand': true },
    'required': false,
    'createConfig': { 'addable': false, 'addShowable': false },
    'updateConfig': { 'updatable': false, 'updateShowable': true },
    'selectChecked': false
  }, {
    'label': '创建人',
    'i18nLabel': 'GENERATE_TABLE_INFO_CREATOR',
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
  }]
}

export default tableConfig
