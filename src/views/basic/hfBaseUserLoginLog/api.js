/**
* 用户登录日志模块基础地址
* @type {string}
*/
export const baseUrl = '/api/hfBaseUserLoginLog'
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
export const namespace = 'hf_base_user_login_log'

/**
* curd的配置， TODO 后续改成从后台查询返回这些配置
*/
const tableConfig = {"tableItemOption":{"showIndex":true,"showSelected":true,"showItemOperate":true},"searchOption":{"returnType":"fields"},"referOption":{"referId":"id"},"fields":[{"label":"","i18nLabel":"HF_BASE_USER_LOGIN_LOG_ID","value":"id","columnName":"id","type":"text","primaryKey":true,"searchConfig":{"immediately":false,"keywordSearch":true,"searchable":false},"required":false,"createConfig":{"addable":false,"addShowable":false},"updateConfig":{"updatable":false,"updateShowable":false},"selectChecked":false},{"label":"用户id","i18nLabel":"HF_BASE_USER_LOGIN_LOG_USER_ID","value":"userId","columnName":"user_id","type":"text","primaryKey":false,"searchConfig":{"immediately":false,"keywordSearch":true,"searchable":true},"required":false,"createConfig":{"addable":true,"addShowable":true},"updateConfig":{"updatable":true,"updateShowable":true},"selectChecked":true},{"label":"登录方式","i18nLabel":"HF_BASE_USER_LOGIN_LOG_LOGIN_TYPE","value":"loginType","columnName":"login_type","type":"text","primaryKey":false,"searchConfig":{"immediately":false,"keywordSearch":true,"searchable":true},"required":false,"createConfig":{"addable":true,"addShowable":true},"updateConfig":{"updatable":true,"updateShowable":true},"selectChecked":true},{"label":"登录时间","i18nLabel":"HF_BASE_USER_LOGIN_LOG_LOGIN_TIME","value":"loginTime","columnName":"login_time","type":"text","primaryKey":false,"searchConfig":{"immediately":false,"keywordSearch":true,"searchable":true},"required":false,"createConfig":{"addable":true,"addShowable":true},"updateConfig":{"updatable":true,"updateShowable":true},"selectChecked":true},{"label":"登录的ip","i18nLabel":"HF_BASE_USER_LOGIN_LOG_LAST_LOGIN_IP","value":"lastLoginIp","columnName":"last_login_ip","type":"text","primaryKey":false,"searchConfig":{"immediately":false,"keywordSearch":true,"searchable":true},"required":false,"createConfig":{"addable":true,"addShowable":true},"updateConfig":{"updatable":true,"updateShowable":true},"selectChecked":true},{"label":"登录的浏览器指纹","i18nLabel":"HF_BASE_USER_LOGIN_LOG_LAST_LOGIN_FINGER","value":"lastLoginFinger","columnName":"last_login_finger","type":"text","primaryKey":false,"searchConfig":{"immediately":false,"keywordSearch":true,"searchable":true},"required":false,"createConfig":{"addable":true,"addShowable":true},"updateConfig":{"updatable":true,"updateShowable":true},"selectChecked":true}]}

export default tableConfig
