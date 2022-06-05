import { defaultUrlMethod } from '@/components/CURD/defaultUrl'
/**
 * 单点登录认证管理模块基础地址
 * @type {string}
 */
export const baseUrl = '/api/ssoAuthClient'
/**
 * 基础查询地址
 * @type {{pageUrl: string}}
 */
export const urlMethods = defaultUrlMethod(baseUrl, {
  pageUrl: baseUrl + '/pageQuery'
})
/**
 * 定义模块的命名空间
 * @type {string}
 */
export const namespace = 'sso_auth_client'

/**
 * curd的配置， TODO 后续改成从后台查询返回这些配置
 */
const tableConfig = {
  'tableItemOption': {'showIndex': true, 'showSelected': true, 'showItemOperate': true},
  'searchOption': {'returnType': 'fields'},
  'referOption': {'referId': 'id'},
  'fields': [{
    'label': '主键',
    'i18nLabel': 'SSO_AUTH_CLIENT_ID',
    'value': 'id',
    'columnName': 'id',
    'type': 'text',
    'primaryKey': true,
    'searchConfig': {'immediately': false, 'keywordSearch': true, 'searchable': false},
    'required': false,
    'createConfig': {'addable': false, 'addShowable': false},
    'updateConfig': {'updatable': false, 'updateShowable': false},
    'selectChecked': false
  }, {
    'label': '客户端ID',
    'i18nLabel': 'SSO_AUTH_CLIENT_CLIENT_ID',
    'value': 'clientId',
    'columnName': 'client_id',
    'type': 'text',
    'primaryKey': false,
    'searchConfig': {'immediately': false, 'keywordSearch': true, 'searchable': true},
    'required': false,
    'createConfig': {'addable': true, 'addShowable': true},
    'updateConfig': {'updatable': true, 'updateShowable': true},
    'selectChecked': true
  }, {
    'label': '客户端密钥',
    'i18nLabel': 'SSO_AUTH_CLIENT_CLIENT_SECRET',
    'value': 'clientSecret',
    'columnName': 'client_secret',
    'type': 'text',
    'primaryKey': false,
    'searchConfig': {'immediately': false, 'keywordSearch': true, 'searchable': true},
    'required': false,
    'createConfig': {'addable': true, 'addShowable': true},
    'updateConfig': {'updatable': true, 'updateShowable': true},
    'selectChecked': true
  }, {
    'label': '描述',
    'i18nLabel': 'SSO_AUTH_CLIENT_DESCRIPTION',
    'value': 'description',
    'columnName': 'description',
    'type': 'text',
    'primaryKey': false,
    'searchConfig': {'immediately': false, 'keywordSearch': true, 'searchable': true},
    'required': false,
    'createConfig': {'addable': true, 'addShowable': true},
    'updateConfig': {'updatable': true, 'updateShowable': true},
    'selectChecked': true
  }, {
    'label': '重定向地址',
    'i18nLabel': 'SSO_AUTH_CLIENT_REDIRECT_URI',
    'value': 'redirectUri',
    'columnName': 'redirect_uri',
    'type': 'text',
    'primaryKey': false,
    'searchConfig': {'immediately': false, 'keywordSearch': true, 'searchable': true},
    'required': false,
    'createConfig': {'addable': true, 'addShowable': true},
    'updateConfig': {'updatable': true, 'updateShowable': true},
    'selectChecked': true
  }, {
    'label': '创建人',
    'i18nLabel': 'SSO_AUTH_CLIENT_CREATOR',
    'value': 'creator',
    'columnName': 'creator',
    'type': 'text',
    'primaryKey': false,
    'searchConfig': {'immediately': false, 'keywordSearch': true, 'searchable': true},
    'required': false,
    'createConfig': {'addable': false, 'addShowable': false},
    'updateConfig': {'updatable': false, 'updateShowable': true},
    'selectChecked': false
  }, {
    'label': '创建时间',
    'i18nLabel': 'SSO_AUTH_CLIENT_CREATE_TIME',
    'value': 'createTime',
    'columnName': 'create_time',
    'type': 'text',
    'primaryKey': false,
    'searchConfig': {'immediately': false, 'keywordSearch': true, 'searchable': true},
    'required': false,
    'createConfig': {'addable': false, 'addShowable': false},
    'updateConfig': {'updatable': false, 'updateShowable': true},
    'selectChecked': false
  }, {
    'label': '修改人',
    'i18nLabel': 'SSO_AUTH_CLIENT_MODIFIER',
    'value': 'modifier',
    'columnName': 'modifier',
    'type': 'text',
    'primaryKey': false,
    'searchConfig': {'immediately': false, 'keywordSearch': true, 'searchable': true},
    'required': false,
    'createConfig': {'addable': false, 'addShowable': false},
    'updateConfig': {'updatable': false, 'updateShowable': true},
    'selectChecked': false
  }, {
    'label': '修改时间',
    'i18nLabel': 'SSO_AUTH_CLIENT_MODIFY_TIME',
    'value': 'modifyTime',
    'columnName': 'modify_time',
    'type': 'text',
    'primaryKey': false,
    'searchConfig': {'immediately': false, 'keywordSearch': true, 'searchable': true},
    'required': false,
    'createConfig': {'addable': false, 'addShowable': false},
    'updateConfig': {'updatable': false, 'updateShowable': true},
    'selectChecked': false
  }, {
    'label': '启用/禁用',
    'i18nLabel': 'SSO_AUTH_CLIENT_ENABLE_STATE',
    'value': 'enableState',
    'columnName': 'enable_state',
    'type': 'switch',
    'primaryKey': false,
    'props': {'activeValue': 1, 'activeText': '启用', 'inactiveValue': 0, 'inactiveText': '禁用'},
    'searchConfig': {'immediately': false, 'keywordSearch': true, 'searchable': true},
    'required': false,
    'createConfig': {'addable': true, 'addShowable': true},
    'updateConfig': {'updatable': true, 'updateShowable': true},
    'selectChecked': true
  }, {
    'label': '客户端支持的认证方式',
    'i18nLabel': 'SSO_AUTH_CLIENT_CLIENT_METHOD',
    'value': 'clientMethod',
    'columnName': 'client_method',
    'type': 'text',
    'primaryKey': false,
    'searchConfig': {'immediately': false, 'keywordSearch': true, 'searchable': true},
    'required': false,
    'createConfig': {'addable': true, 'addShowable': true},
    'updateConfig': {'updatable': true, 'updateShowable': true},
    'selectChecked': true
  }, {
    'label': '支持认证方式',
    'i18nLabel': 'SSO_AUTH_CLIENT_AUTHORIZATION_GRANT_TYPES',
    'value': 'authorizationGrantTypes',
    'columnName': 'authorization_grant_types',
    'type': 'text',
    'primaryKey': false,
    'searchConfig': {'immediately': false, 'keywordSearch': true, 'searchable': true},
    'required': false,
    'createConfig': {'addable': true, 'addShowable': true},
    'updateConfig': {'updatable': true, 'updateShowable': true},
    'selectChecked': true
  }, {
    'label': 'accessToken存活时间（秒）',
    'i18nLabel': 'SSO_AUTH_CLIENT_ACCESS_TOKEN_LIVE',
    'value': 'accessTokenLive',
    'columnName': 'access_token_live',
    'type': 'text',
    'primaryKey': false,
    'searchConfig': {'immediately': false, 'keywordSearch': true, 'searchable': true},
    'required': false,
    'createConfig': {'addable': true, 'addShowable': true},
    'updateConfig': {'updatable': true, 'updateShowable': true},
    'selectChecked': true
  }, {
    'label': 'refreshToken存活时间（秒）',
    'i18nLabel': 'SSO_AUTH_CLIENT_REFRESH_TOKEN_LIVE',
    'value': 'refreshTokenLive',
    'columnName': 'refresh_token_live',
    'type': 'text',
    'primaryKey': false,
    'searchConfig': {'immediately': false, 'keywordSearch': true, 'searchable': true},
    'required': false,
    'createConfig': {'addable': true, 'addShowable': true},
    'updateConfig': {'updatable': true, 'updateShowable': true},
    'selectChecked': true
  }]
}

export default tableConfig
