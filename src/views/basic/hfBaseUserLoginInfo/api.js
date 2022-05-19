/**
* 用户登录信息模块基础地址
* @type {string}
*/
export const baseUrl = '/api/hfBaseUserLoginInfo'
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
export const namespace = 'hf_base_user_login_info'

/**
* curd的配置， TODO 后续改成从后台查询返回这些配置
*/
const tableConfig = {"tableItemOption":{"showIndex":true,"showSelected":true,"showItemOperate":true},"searchOption":{"returnType":"fields"},"referOption":{"referId":"userId"},"fields":[{"label":"用户id","i18nLabel":"HF_BASE_USER_LOGIN_INFO_USER_ID","value":"userId","columnName":"user_id","type":"text","primaryKey":true,"searchConfig":{"immediately":false,"keywordSearch":true,"searchable":false},"required":false,"createConfig":{"addable":false,"addShowable":false},"updateConfig":{"updatable":false,"updateShowable":false},"selectChecked":false},{"label":"密码","i18nLabel":"HF_BASE_USER_LOGIN_INFO_PWD","value":"pwd","columnName":"pwd","type":"text","primaryKey":false,"searchConfig":{"immediately":false,"keywordSearch":true,"searchable":true},"required":false,"createConfig":{"addable":true,"addShowable":true},"updateConfig":{"updatable":true,"updateShowable":true},"selectChecked":true},{"label":"盐值","i18nLabel":"HF_BASE_USER_LOGIN_INFO_SALT","value":"salt","columnName":"salt","type":"text","primaryKey":false,"searchConfig":{"immediately":false,"keywordSearch":true,"searchable":true},"required":false,"createConfig":{"addable":true,"addShowable":true},"updateConfig":{"updatable":true,"updateShowable":true},"selectChecked":true},{"label":"最后一次登录方式","i18nLabel":"HF_BASE_USER_LOGIN_INFO_LAST_LOGIN_TYPE","value":"lastLoginType","columnName":"last_login_type","type":"text","primaryKey":false,"searchConfig":{"immediately":false,"keywordSearch":true,"searchable":true},"required":false,"createConfig":{"addable":true,"addShowable":true},"updateConfig":{"updatable":true,"updateShowable":true},"selectChecked":true},{"label":"最后一次登录时间","i18nLabel":"HF_BASE_USER_LOGIN_INFO_LAST_LOGIN_TIME","value":"lastLoginTime","columnName":"last_login_time","type":"text","primaryKey":false,"searchConfig":{"immediately":false,"keywordSearch":true,"searchable":true},"required":false,"createConfig":{"addable":true,"addShowable":true},"updateConfig":{"updatable":true,"updateShowable":true},"selectChecked":true},{"label":"登录状态","i18nLabel":"HF_BASE_USER_LOGIN_INFO_LOGIN_STATE","value":"loginState","columnName":"login_state","type":"text","primaryKey":false,"searchConfig":{"immediately":false,"keywordSearch":true,"searchable":true},"required":false,"createConfig":{"addable":true,"addShowable":true},"updateConfig":{"updatable":true,"updateShowable":true},"selectChecked":true},{"label":"首次登录更改密码了？","i18nLabel":"HF_BASE_USER_LOGIN_INFO_NO_CHANGE_PWD","value":"noChangePwd","columnName":"no_change_pwd","type":"text","primaryKey":false,"searchConfig":{"immediately":false,"keywordSearch":true,"searchable":true},"required":false,"createConfig":{"addable":true,"addShowable":true},"updateConfig":{"updatable":true,"updateShowable":true},"selectChecked":true},{"label":"最后一次登录的ip","i18nLabel":"HF_BASE_USER_LOGIN_INFO_LAST_LOGIN_IP","value":"lastLoginIp","columnName":"last_login_ip","type":"text","primaryKey":false,"searchConfig":{"immediately":false,"keywordSearch":true,"searchable":true},"required":false,"createConfig":{"addable":true,"addShowable":true},"updateConfig":{"updatable":true,"updateShowable":true},"selectChecked":true},{"label":"最后一次登录的浏览器指纹","i18nLabel":"HF_BASE_USER_LOGIN_INFO_LAST_LOGIN_FINGER","value":"lastLoginFinger","columnName":"last_login_finger","type":"text","primaryKey":false,"searchConfig":{"immediately":false,"keywordSearch":true,"searchable":true},"required":false,"createConfig":{"addable":true,"addShowable":true},"updateConfig":{"updatable":true,"updateShowable":true},"selectChecked":true}]}

export default tableConfig
