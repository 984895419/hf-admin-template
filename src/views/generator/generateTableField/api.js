/**
 * 模块基础地址
 * @type {string}
 */
export const baseUrl = '/api/generateTableField'
/**
 * 基础查询地址
 * @type {{pageUrl: string}}
 */
export const urlMethods = {
  pageUrl: baseUrl + '/nameQuery',
  listUrl: baseUrl + '/list'
}
/**
 * 定义模块的命名空间
 * @type {string}
 */
export const namespace = 'generate_table_field'

/**
 * curd的配置， TODO 后续改成从后台查询返回这些配置
 */
const tableConfig = {
  'tableItemOption': { 'showIndex': true, 'showSelected': false, 'showItemOperate': true },
  'searchOption': { 'returnType': 'fields' },
  'referOption': { 'referId': 'fieldId', 'referName': 'fieldName' },
  'fields': [{
    'label': '字段ID',
    'i18nLabel': 'GENERATE_TABLE_FIELD_FIELD_ID',
    'value': 'fieldId',
    'columnName': 'field_id',
    'type': 'text',
    'primaryKey': true,
    'searchConfig': { 'immediately': false, 'keywordSearch': true, 'searchable': true },
    'tableConfig': { 'expand': true },
    'required': false,
    'createConfig': { 'addable': false, 'addShowable': false },
    'updateConfig': { 'updatable': false, 'updateShowable': false },
    'selectChecked': false
  }, {
    'label': '所属表',
    'i18nLabel': 'GENERATE_TABLE_FIELD_TABLE_ID',
    'value': 'tableId',
    'columnName': 'table_id',
    'type': 'text',
    'primaryKey': false,
    'searchConfig': { 'immediately': false, 'keywordSearch': true, 'searchable': true },
    'tableConfig': { 'expand': false },
    'required': false,
    'createConfig': { 'addable': true, 'addShowable': true },
    'updateConfig': { 'updatable': true, 'updateShowable': true },
    'selectChecked': true
  }, {
    'label': '是否是主键',
    'i18nLabel': 'GENERATE_TABLE_FIELD_KEY_FLAG',
    'value': 'keyFlag',
    'columnName': 'key_flag',
    'type': 'text',
    'primaryKey': false,
    'searchConfig': { 'immediately': false, 'keywordSearch': true, 'searchable': true },
    'tableConfig': { 'expand': false },
    'required': false,
    'createConfig': { 'addable': true, 'addShowable': true },
    'updateConfig': { 'updatable': true, 'updateShowable': true },
    'selectChecked': true
  }, {
    'label': '是否为自增类型',
    'i18nLabel': 'GENERATE_TABLE_FIELD_KEY_IDENTITY_FLAG',
    'value': 'keyIdentityFlag',
    'columnName': 'key_identity_flag',
    'type': 'text',
    'primaryKey': false,
    'searchConfig': { 'immediately': false, 'keywordSearch': true, 'searchable': true },
    'tableConfig': { 'expand': false },
    'required': false,
    'createConfig': { 'addable': true, 'addShowable': true },
    'updateConfig': { 'updatable': true, 'updateShowable': true },
    'selectChecked': true
  }, {
    'label': '字段名称',
    'i18nLabel': 'GENERATE_TABLE_FIELD_FIELD_NAME',
    'value': 'fieldName',
    'columnName': 'field_name',
    'type': 'text',
    'primaryKey': false,
    'searchConfig': { 'immediately': false, 'keywordSearch': true, 'searchable': true },
    'tableConfig': { 'expand': false },
    'required': false,
    'createConfig': { 'addable': true, 'addShowable': true },
    'updateConfig': { 'updatable': true, 'updateShowable': true },
    'selectChecked': true
  }, {
    'label': '字段数据库类型',
    'i18nLabel': 'GENERATE_TABLE_FIELD_FIELD_TYPE',
    'value': 'fieldType',
    'columnName': 'field_type',
    'type': 'text',
    'primaryKey': false,
    'searchConfig': { 'immediately': false, 'keywordSearch': true, 'searchable': true },
    'tableConfig': { 'expand': false },
    'required': false,
    'createConfig': { 'addable': true, 'addShowable': true },
    'updateConfig': { 'updatable': true, 'updateShowable': true },
    'selectChecked': true
  }, {
    'label': '字段备注',
    'i18nLabel': 'GENERATE_TABLE_FIELD_COMMENT',
    'value': 'comment',
    'columnName': 'comment',
    'type': 'text',
    'primaryKey': false,
    'searchConfig': { 'immediately': false, 'keywordSearch': true, 'searchable': true },
    'tableConfig': { 'expand': false },
    'required': false,
    'createConfig': { 'addable': true, 'addShowable': true },
    'updateConfig': { 'updatable': true, 'updateShowable': true },
    'selectChecked': true
  }, {
    'label': '字段属性名称名称',
    'i18nLabel': 'GENERATE_TABLE_FIELD_PROPERTY_NAME',
    'value': 'propertyName',
    'columnName': 'property_name',
    'type': 'text',
    'primaryKey': false,
    'searchConfig': { 'immediately': false, 'keywordSearch': true, 'searchable': true },
    'tableConfig': { 'expand': false },
    'required': false,
    'createConfig': { 'addable': true, 'addShowable': true },
    'updateConfig': { 'updatable': true, 'updateShowable': true },
    'selectChecked': true
  }, {
    'label': '字段类型',
    'i18nLabel': 'GENERATE_TABLE_FIELD_COLUMN_TYPE',
    'value': 'columnType',
    'columnName': 'column_type',
    'type': 'text',
    'primaryKey': false,
    'searchConfig': { 'immediately': false, 'keywordSearch': true, 'searchable': true },
    'tableConfig': { 'expand': false },
    'required': false,
    'createConfig': { 'addable': true, 'addShowable': true },
    'updateConfig': { 'updatable': true, 'updateShowable': true },
    'selectChecked': true
  }, {
    'label': '填充类型',
    'i18nLabel': 'GENERATE_TABLE_FIELD_FILL',
    'value': 'fill',
    'columnName': 'fill',
    'type': 'text',
    'primaryKey': false,
    'searchConfig': { 'immediately': false, 'keywordSearch': true, 'searchable': true },
    'tableConfig': { 'expand': false },
    'required': false,
    'createConfig': { 'addable': true, 'addShowable': true },
    'updateConfig': { 'updatable': true, 'updateShowable': true },
    'selectChecked': true
  }]
}

export default tableConfig
