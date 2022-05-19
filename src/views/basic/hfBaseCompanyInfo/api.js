/**
* 组织机构信息模块基础地址
* @type {string}
*/
export const baseUrl = '/api/hfBaseCompanyInfo'
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
export const namespace = 'hf_base_company_info'

/**
* curd的配置， TODO 后续改成从后台查询返回这些配置
*/
const tableConfig = {"tableItemOption":{"showIndex":true,"showSelected":true,"showItemOperate":true},"searchOption":{"returnType":"fields"},"referOption":{"referId":"pkCorp","referName":"name"},"fields":[{"label":"nc组织机构主键","i18nLabel":"HF_BASE_COMPANY_INFO_PK_CORP","value":"pkCorp","columnName":"pk_corp","type":"text","primaryKey":true,"searchConfig":{"immediately":false,"keywordSearch":true,"searchable":false},"required":false,"createConfig":{"addable":false,"addShowable":false},"updateConfig":{"updatable":false,"updateShowable":false},"selectChecked":false},{"label":"nc组织机构名称","i18nLabel":"HF_BASE_COMPANY_INFO_NAME","value":"name","columnName":"name","type":"text","primaryKey":false,"searchConfig":{"immediately":false,"keywordSearch":true,"searchable":true},"required":false,"createConfig":{"addable":true,"addShowable":true},"updateConfig":{"updatable":true,"updateShowable":true},"selectChecked":true},{"label":"nc上级组织机构主键","i18nLabel":"HF_BASE_COMPANY_INFO_PK_FATHERORG","value":"pkFatherorg","columnName":"pk_fatherorg","type":"text","primaryKey":false,"searchConfig":{"immediately":false,"keywordSearch":true,"searchable":true},"required":false,"createConfig":{"addable":true,"addShowable":true},"updateConfig":{"updatable":true,"updateShowable":true},"selectChecked":true},{"label":"创建人","i18nLabel":"HF_BASE_COMPANY_INFO_CREATOR","value":"creator","columnName":"creator","type":"text","primaryKey":false,"searchConfig":{"immediately":false,"keywordSearch":true,"searchable":true},"required":false,"createConfig":{"addable":false,"addShowable":false},"updateConfig":{"updatable":false,"updateShowable":true},"selectChecked":false},{"label":"创建时间","i18nLabel":"HF_BASE_COMPANY_INFO_CREATE_TIME","value":"createTime","columnName":"create_time","type":"text","primaryKey":false,"searchConfig":{"immediately":false,"keywordSearch":true,"searchable":true},"required":false,"createConfig":{"addable":false,"addShowable":false},"updateConfig":{"updatable":false,"updateShowable":true},"selectChecked":false},{"label":"修改人","i18nLabel":"HF_BASE_COMPANY_INFO_MODIFIER","value":"modifier","columnName":"modifier","type":"text","primaryKey":false,"searchConfig":{"immediately":false,"keywordSearch":true,"searchable":true},"required":false,"createConfig":{"addable":false,"addShowable":false},"updateConfig":{"updatable":false,"updateShowable":true},"selectChecked":false},{"label":"修改时间","i18nLabel":"HF_BASE_COMPANY_INFO_MODIFY_TIME","value":"modifyTime","columnName":"modify_time","type":"text","primaryKey":false,"searchConfig":{"immediately":false,"keywordSearch":true,"searchable":true},"required":false,"createConfig":{"addable":false,"addShowable":false},"updateConfig":{"updatable":false,"updateShowable":true},"selectChecked":false},{"label":"启用/禁用","i18nLabel":"HF_BASE_COMPANY_INFO_ENABLE_STATE","value":"enableState","columnName":"enable_state","type":"switch","primaryKey":false,"props":{"activeValue":1,"activeText":"启用","inactiveValue":0,"inactiveText":"禁用"},"searchConfig":{"immediately":false,"keywordSearch":true,"searchable":true},"required":false,"createConfig":{"addable":true,"addShowable":true},"updateConfig":{"updatable":true,"updateShowable":true},"selectChecked":true},{"label":"上级id","i18nLabel":"HF_BASE_COMPANY_INFO_PARENT_ID","value":"parentId","columnName":"parent_id","type":"text","primaryKey":false,"searchConfig":{"immediately":false,"keywordSearch":true,"searchable":true},"required":false,"createConfig":{"addable":true,"addShowable":true},"updateConfig":{"updatable":true,"updateShowable":true},"selectChecked":true},{"label":"层级","i18nLabel":"HF_BASE_COMPANY_INFO_LEVEL","value":"level","columnName":"level","type":"text","primaryKey":false,"searchConfig":{"immediately":false,"keywordSearch":true,"searchable":true},"required":false,"createConfig":{"addable":false,"addShowable":false},"updateConfig":{"updatable":false,"updateShowable":true},"selectChecked":false},{"label":"层级字符串","i18nLabel":"HF_BASE_COMPANY_INFO_LEVEL_STR","value":"levelStr","columnName":"level_str","type":"text","primaryKey":false,"searchConfig":{"immediately":false,"keywordSearch":true,"searchable":true},"required":false,"createConfig":{"addable":false,"addShowable":false},"updateConfig":{"updatable":false,"updateShowable":true},"selectChecked":false},{"label":"排序","i18nLabel":"HF_BASE_COMPANY_INFO_SORT","value":"sort","columnName":"sort","type":"text","primaryKey":false,"searchConfig":{"immediately":false,"keywordSearch":true,"searchable":true},"required":false,"createConfig":{"addable":true,"addShowable":true},"updateConfig":{"updatable":true,"updateShowable":true},"selectChecked":true}]}

export default tableConfig
