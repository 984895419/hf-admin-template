/**
* 角色与操作权限模块基础地址
* @type {string}
*/
export const baseUrl = '/api/hfBaseRightRoleOperate'
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
export const namespace = 'hf_base_right_role_operate'

/**
* curd的配置， TODO 后续改成从后台查询返回这些配置
*/
const tableConfig = {"tableItemOption":{"showIndex":true,"showSelected":true,"showItemOperate":true},"searchOption":{"returnType":"fields"},"referOption":{"referId":"id"},"fields":[{"label":"","i18nLabel":"HF_BASE_RIGHT_ROLE_OPERATE_ID","value":"id","columnName":"id","type":"text","primaryKey":true,"searchConfig":{"immediately":false,"keywordSearch":true,"searchable":false},"required":false,"createConfig":{"addable":false,"addShowable":false},"updateConfig":{"updatable":false,"updateShowable":false},"selectChecked":false},{"label":"菜单id","i18nLabel":"HF_BASE_RIGHT_ROLE_OPERATE_MENU_ID","value":"menuId","columnName":"menu_id","type":"text","primaryKey":false,"searchConfig":{"immediately":false,"keywordSearch":true,"searchable":true},"required":false,"createConfig":{"addable":true,"addShowable":true},"updateConfig":{"updatable":true,"updateShowable":true},"selectChecked":true},{"label":"租户id","i18nLabel":"HF_BASE_RIGHT_ROLE_OPERATE_TENANT_ID","value":"tenantId","columnName":"tenant_id","type":"text","primaryKey":false,"searchConfig":{"immediately":false,"keywordSearch":true,"searchable":true},"required":false,"createConfig":{"addable":false,"addShowable":false},"updateConfig":{"updatable":false,"updateShowable":true},"selectChecked":false},{"label":"操作权限的id","i18nLabel":"HF_BASE_RIGHT_ROLE_OPERATE_METHOD_ID","value":"methodId","columnName":"method_id","type":"text","primaryKey":false,"searchConfig":{"immediately":false,"keywordSearch":true,"searchable":true},"required":false,"createConfig":{"addable":true,"addShowable":true},"updateConfig":{"updatable":true,"updateShowable":true},"selectChecked":true},{"label":"角色id","i18nLabel":"HF_BASE_RIGHT_ROLE_OPERATE_ROLE_ID","value":"roleId","columnName":"role_id","type":"text","primaryKey":false,"searchConfig":{"immediately":false,"keywordSearch":true,"searchable":true},"required":false,"createConfig":{"addable":true,"addShowable":true},"updateConfig":{"updatable":true,"updateShowable":true},"selectChecked":true}]}

export default tableConfig
