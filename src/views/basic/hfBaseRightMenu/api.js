/**
* 菜单管理模块基础地址
* @type {string}
*/
export const baseUrl = '/api/hfBaseRightMenu'
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
export const namespace = 'hf_base_right_menu'

/**
* curd的配置， TODO 后续改成从后台查询返回这些配置
*/
const tableConfig = {"tableItemOption":{"showIndex":true,"showSelected":true,"showItemOperate":true},"searchOption":{"returnType":"fields"},"referOption":{"referId":"menuId","referName":"menuName"},"fields":[{"label":"主键","i18nLabel":"HF_BASE_RIGHT_MENU_MENU_ID","value":"menuId","columnName":"menu_id","type":"text","primaryKey":true,"searchConfig":{"immediately":false,"keywordSearch":true,"searchable":false},"required":false,"createConfig":{"addable":false,"addShowable":false},"updateConfig":{"updatable":false,"updateShowable":false},"selectChecked":false},{"label":"菜单名称","i18nLabel":"HF_BASE_RIGHT_MENU_MENU_NAME","value":"menuName","columnName":"menu_name","type":"text","primaryKey":false,"searchConfig":{"immediately":false,"keywordSearch":true,"searchable":true},"required":false,"createConfig":{"addable":true,"addShowable":true},"updateConfig":{"updatable":true,"updateShowable":true},"selectChecked":true},{"label":"菜单类型","i18nLabel":"HF_BASE_RIGHT_MENU_MENU_TYPE","value":"menuType","columnName":"menu_type","type":"text","primaryKey":false,"searchConfig":{"immediately":false,"keywordSearch":true,"searchable":true},"required":false,"createConfig":{"addable":true,"addShowable":true},"updateConfig":{"updatable":true,"updateShowable":true},"selectChecked":true},{"label":"创建人","i18nLabel":"HF_BASE_RIGHT_MENU_CREATOR","value":"creator","columnName":"creator","type":"text","primaryKey":false,"searchConfig":{"immediately":false,"keywordSearch":true,"searchable":true},"required":false,"createConfig":{"addable":false,"addShowable":false},"updateConfig":{"updatable":false,"updateShowable":true},"selectChecked":false},{"label":"创建时间","i18nLabel":"HF_BASE_RIGHT_MENU_CREATE_TIME","value":"createTime","columnName":"create_time","type":"text","primaryKey":false,"searchConfig":{"immediately":false,"keywordSearch":true,"searchable":true},"required":false,"createConfig":{"addable":false,"addShowable":false},"updateConfig":{"updatable":false,"updateShowable":true},"selectChecked":false},{"label":"修改人","i18nLabel":"HF_BASE_RIGHT_MENU_MODIFIER","value":"modifier","columnName":"modifier","type":"text","primaryKey":false,"searchConfig":{"immediately":false,"keywordSearch":true,"searchable":true},"required":false,"createConfig":{"addable":false,"addShowable":false},"updateConfig":{"updatable":false,"updateShowable":true},"selectChecked":false},{"label":"修改时间","i18nLabel":"HF_BASE_RIGHT_MENU_MODIFY_TIME","value":"modifyTime","columnName":"modify_time","type":"text","primaryKey":false,"searchConfig":{"immediately":false,"keywordSearch":true,"searchable":true},"required":false,"createConfig":{"addable":false,"addShowable":false},"updateConfig":{"updatable":false,"updateShowable":true},"selectChecked":false},{"label":"启用/禁用","i18nLabel":"HF_BASE_RIGHT_MENU_ENABLE_STATE","value":"enableState","columnName":"enable_state","type":"switch","primaryKey":false,"props":{"activeValue":1,"activeText":"启用","inactiveValue":0,"inactiveText":"禁用"},"searchConfig":{"immediately":false,"keywordSearch":true,"searchable":true},"required":false,"createConfig":{"addable":true,"addShowable":true},"updateConfig":{"updatable":true,"updateShowable":true},"selectChecked":true},{"label":"上级id","i18nLabel":"HF_BASE_RIGHT_MENU_PARENT_ID","value":"parentId","columnName":"parent_id","type":"text","primaryKey":false,"searchConfig":{"immediately":false,"keywordSearch":true,"searchable":true},"required":false,"createConfig":{"addable":true,"addShowable":true},"updateConfig":{"updatable":true,"updateShowable":true},"selectChecked":true},{"label":"层级","i18nLabel":"HF_BASE_RIGHT_MENU_LEVEL","value":"level","columnName":"level","type":"text","primaryKey":false,"searchConfig":{"immediately":false,"keywordSearch":true,"searchable":true},"required":false,"createConfig":{"addable":false,"addShowable":false},"updateConfig":{"updatable":false,"updateShowable":true},"selectChecked":false},{"label":"层级字符串","i18nLabel":"HF_BASE_RIGHT_MENU_LEVEL_STR","value":"levelStr","columnName":"level_str","type":"text","primaryKey":false,"searchConfig":{"immediately":false,"keywordSearch":true,"searchable":true},"required":false,"createConfig":{"addable":false,"addShowable":false},"updateConfig":{"updatable":false,"updateShowable":true},"selectChecked":false},{"label":"排序","i18nLabel":"HF_BASE_RIGHT_MENU_SORT","value":"sort","columnName":"sort","type":"text","primaryKey":false,"searchConfig":{"immediately":false,"keywordSearch":true,"searchable":true},"required":false,"createConfig":{"addable":true,"addShowable":true},"updateConfig":{"updatable":true,"updateShowable":true},"selectChecked":true},{"label":"菜单国际化名称","i18nLabel":"HF_BASE_RIGHT_MENU_I18N_MENU_NAME","value":"i18nMenuName","columnName":"i18n_menu_name","type":"text","primaryKey":false,"searchConfig":{"immediately":false,"keywordSearch":true,"searchable":true},"required":false,"createConfig":{"addable":true,"addShowable":true},"updateConfig":{"updatable":true,"updateShowable":true},"selectChecked":true},{"label":"组件","i18nLabel":"HF_BASE_RIGHT_MENU_COMPONENT","value":"component","columnName":"component","type":"text","primaryKey":false,"searchConfig":{"immediately":false,"keywordSearch":true,"searchable":true},"required":false,"createConfig":{"addable":true,"addShowable":true},"updateConfig":{"updatable":true,"updateShowable":true},"selectChecked":true},{"label":"重定向","i18nLabel":"HF_BASE_RIGHT_MENU_REDIRECT","value":"redirect","columnName":"redirect","type":"text","primaryKey":false,"searchConfig":{"immediately":false,"keywordSearch":true,"searchable":true},"required":false,"createConfig":{"addable":true,"addShowable":true},"updateConfig":{"updatable":true,"updateShowable":true},"selectChecked":true},{"label":"图标","i18nLabel":"HF_BASE_RIGHT_MENU_ICON","value":"icon","columnName":"icon","type":"text","primaryKey":false,"searchConfig":{"immediately":false,"keywordSearch":true,"searchable":true},"required":false,"createConfig":{"addable":true,"addShowable":true},"updateConfig":{"updatable":true,"updateShowable":true},"selectChecked":true},{"label":"路径","i18nLabel":"HF_BASE_RIGHT_MENU_PATH","value":"path","columnName":"path","type":"text","primaryKey":false,"searchConfig":{"immediately":false,"keywordSearch":true,"searchable":true},"required":false,"createConfig":{"addable":true,"addShowable":true},"updateConfig":{"updatable":true,"updateShowable":true},"selectChecked":true},{"label":"控制器的id","i18nLabel":"HF_BASE_RIGHT_MENU_CONTROLLER_ID","value":"controllerId","columnName":"controller_id","type":"text","primaryKey":false,"searchConfig":{"immediately":false,"keywordSearch":true,"searchable":true},"required":false,"createConfig":{"addable":true,"addShowable":true},"updateConfig":{"updatable":true,"updateShowable":true},"selectChecked":true}]}

export default tableConfig
