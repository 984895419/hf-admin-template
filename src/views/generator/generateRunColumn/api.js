/**
* 运行时字段管理模块基础地址
* @type {string}
*/
export const baseUrl = '/api/generateRunColumn'
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
export const namespace = 'generate_run_column'

/**
* curd的配置， TODO 后续改成从后台查询返回这些配置
*/
const tableConfig = {"tableItemOption":{"showIndex":true,"showSelected":true,"showItemOperate":true},"searchOption":{"returnType":"fields"},"referOption":{"referId":"columnId","referName":"columnName"},"fields":[{"label":"","i18nLabel":"GENERATE_RUN_COLUMN_COLUMN_ID","value":"columnId","columnName":"column_id","type":"text","primaryKey":true,"searchConfig":{"immediately":false,"keywordSearch":true,"searchable":false},"tableConfig":{"expand":true},"required":false,"createConfig":{"addable":false,"addShowable":false},"updateConfig":{"updatable":false,"updateShowable":false},"selectChecked":false},{"label":"名称","i18nLabel":"GENERATE_RUN_COLUMN_LABEL","value":"label","columnName":"label","type":"text","primaryKey":false,"searchConfig":{"immediately":false,"keywordSearch":true,"searchable":true},"tableConfig":{"expand":false},"required":false,"createConfig":{"addable":true,"addShowable":true},"updateConfig":{"updatable":true,"updateShowable":true},"selectChecked":true},{"label":"国际化名称","i18nLabel":"GENERATE_RUN_COLUMN_I18N_LABEL","value":"i18nLabel","columnName":"i18n_Label","type":"text","primaryKey":false,"searchConfig":{"immediately":false,"keywordSearch":true,"searchable":true},"tableConfig":{"expand":false},"required":false,"createConfig":{"addable":true,"addShowable":true},"updateConfig":{"updatable":true,"updateShowable":true},"selectChecked":true},{"label":"字段名","i18nLabel":"GENERATE_RUN_COLUMN_VALUE","value":"value","columnName":"value","type":"text","primaryKey":false,"searchConfig":{"immediately":false,"keywordSearch":true,"searchable":true},"tableConfig":{"expand":false},"required":false,"createConfig":{"addable":true,"addShowable":true},"updateConfig":{"updatable":true,"updateShowable":true},"selectChecked":true},{"label":"查询操作符","i18nLabel":"GENERATE_RUN_COLUMN_OPERATE","value":"operate","columnName":"operate","type":"text","primaryKey":false,"searchConfig":{"immediately":false,"keywordSearch":true,"searchable":true},"tableConfig":{"expand":false},"required":false,"createConfig":{"addable":true,"addShowable":true},"updateConfig":{"updatable":true,"updateShowable":true},"selectChecked":true},{"label":"字段名称","i18nLabel":"GENERATE_RUN_COLUMN_COLUMN_NAME","value":"columnName","columnName":"column_name","type":"text","primaryKey":false,"searchConfig":{"immediately":false,"keywordSearch":true,"searchable":true},"tableConfig":{"expand":false},"required":false,"createConfig":{"addable":true,"addShowable":true},"updateConfig":{"updatable":true,"updateShowable":true},"selectChecked":true},{"label":"字段对应的类型","i18nLabel":"GENERATE_RUN_COLUMN_TYPE","value":"type","columnName":"type","type":"text","primaryKey":false,"searchConfig":{"immediately":false,"keywordSearch":true,"searchable":true},"tableConfig":{"expand":false},"required":false,"createConfig":{"addable":true,"addShowable":true},"updateConfig":{"updatable":true,"updateShowable":true},"selectChecked":true},{"label":"格式化类型","i18nLabel":"GENERATE_RUN_COLUMN_FORMAT_TYPE","value":"formatType","columnName":"format_type","type":"text","primaryKey":false,"searchConfig":{"immediately":false,"keywordSearch":true,"searchable":true},"tableConfig":{"expand":false},"required":false,"createConfig":{"addable":true,"addShowable":true},"updateConfig":{"updatable":true,"updateShowable":true},"selectChecked":true},{"label":"格式化字符串","i18nLabel":"GENERATE_RUN_COLUMN_FORMAT_STR","value":"formatStr","columnName":"format_str","type":"text","primaryKey":false,"searchConfig":{"immediately":false,"keywordSearch":true,"searchable":true},"tableConfig":{"expand":false},"required":false,"createConfig":{"addable":true,"addShowable":true},"updateConfig":{"updatable":true,"updateShowable":true},"selectChecked":true},{"label":"是否是主键","i18nLabel":"GENERATE_RUN_COLUMN_PRIMARY_KEY","value":"primaryKey","columnName":"primary_key","type":"text","primaryKey":false,"searchConfig":{"immediately":false,"keywordSearch":true,"searchable":true},"tableConfig":{"expand":false},"required":false,"createConfig":{"addable":true,"addShowable":true},"updateConfig":{"updatable":true,"updateShowable":true},"selectChecked":true},{"label":"数据字典的code","i18nLabel":"GENERATE_RUN_COLUMN_DICT_CODE","value":"dictCode","columnName":"dict_code","type":"text","primaryKey":false,"searchConfig":{"immediately":false,"keywordSearch":true,"searchable":true},"tableConfig":{"expand":false},"required":false,"createConfig":{"addable":true,"addShowable":true},"updateConfig":{"updatable":true,"updateShowable":true},"selectChecked":true},{"label":"是否可查询","i18nLabel":"GENERATE_RUN_COLUMN_SEARCHABLE","value":"searchable","columnName":"searchable","type":"text","primaryKey":false,"searchConfig":{"immediately":false,"keywordSearch":true,"searchable":true},"tableConfig":{"expand":false},"required":false,"createConfig":{"addable":true,"addShowable":true},"updateConfig":{"updatable":true,"updateShowable":true},"selectChecked":true},{"label":"是否支持关键字搜索","i18nLabel":"GENERATE_RUN_COLUMN_KEYWORD_SEARCH","value":"keywordSearch","columnName":"keyword_search","type":"text","primaryKey":false,"searchConfig":{"immediately":false,"keywordSearch":true,"searchable":true},"tableConfig":{"expand":false},"required":false,"createConfig":{"addable":true,"addShowable":true},"updateConfig":{"updatable":true,"updateShowable":true},"selectChecked":true},{"label":"是否马上相应","i18nLabel":"GENERATE_RUN_COLUMN_IMEDIATELY","value":"imediately","columnName":"imediately","type":"text","primaryKey":false,"searchConfig":{"immediately":false,"keywordSearch":true,"searchable":true},"tableConfig":{"expand":false},"required":false,"createConfig":{"addable":true,"addShowable":true},"updateConfig":{"updatable":true,"updateShowable":true},"selectChecked":true},{"label":"是否再列表中隐藏","i18nLabel":"GENERATE_RUN_COLUMN_EXPAND","value":"expand","columnName":"expand","type":"text","primaryKey":false,"searchConfig":{"immediately":false,"keywordSearch":true,"searchable":true},"tableConfig":{"expand":false},"required":false,"createConfig":{"addable":true,"addShowable":true},"updateConfig":{"updatable":true,"updateShowable":true},"selectChecked":true},{"label":"是否可添加","i18nLabel":"GENERATE_RUN_COLUMN_ADDABLE","value":"addable","columnName":"addable","type":"text","primaryKey":false,"searchConfig":{"immediately":false,"keywordSearch":true,"searchable":true},"tableConfig":{"expand":false},"required":false,"createConfig":{"addable":true,"addShowable":true},"updateConfig":{"updatable":true,"updateShowable":true},"selectChecked":true},{"label":"添加的时候是否可见","i18nLabel":"GENERATE_RUN_COLUMN_ADD_SHOWABLE","value":"addShowable","columnName":"add_Showable","type":"text","primaryKey":false,"searchConfig":{"immediately":false,"keywordSearch":true,"searchable":true},"tableConfig":{"expand":false},"required":false,"createConfig":{"addable":true,"addShowable":true},"updateConfig":{"updatable":true,"updateShowable":true},"selectChecked":true},{"label":"字段是否可修改","i18nLabel":"GENERATE_RUN_COLUMN_UPDATABLE","value":"updatable","columnName":"updatable","type":"text","primaryKey":false,"searchConfig":{"immediately":false,"keywordSearch":true,"searchable":true},"tableConfig":{"expand":false},"required":false,"createConfig":{"addable":true,"addShowable":true},"updateConfig":{"updatable":true,"updateShowable":true},"selectChecked":true},{"label":"修改的时候是否可见","i18nLabel":"GENERATE_RUN_COLUMN_UPDATE_SHOWABLE","value":"updateShowable","columnName":"update_Showable","type":"text","primaryKey":false,"searchConfig":{"immediately":false,"keywordSearch":true,"searchable":true},"tableConfig":{"expand":false},"required":false,"createConfig":{"addable":true,"addShowable":true},"updateConfig":{"updatable":true,"updateShowable":true},"selectChecked":true},{"label":"所属分组","i18nLabel":"GENERATE_RUN_COLUMN_BELONG_GROUP","value":"belongGroup","columnName":"belong_group","type":"text","primaryKey":false,"searchConfig":{"immediately":false,"keywordSearch":true,"searchable":true},"tableConfig":{"expand":false},"required":false,"createConfig":{"addable":true,"addShowable":true},"updateConfig":{"updatable":true,"updateShowable":true},"selectChecked":true},{"label":"所属分组-国际化","i18nLabel":"GENERATE_RUN_COLUMN_I18N_BELONG_GROUP","value":"i18nBelongGroup","columnName":"i18n_belong_group","type":"text","primaryKey":false,"searchConfig":{"immediately":false,"keywordSearch":true,"searchable":true},"tableConfig":{"expand":false},"required":false,"createConfig":{"addable":true,"addShowable":true},"updateConfig":{"updatable":true,"updateShowable":true},"selectChecked":true},{"label":"是否默认显示再列表上","i18nLabel":"GENERATE_RUN_COLUMN_SELECTCHECKED","value":"selectchecked","columnName":"selectChecked","type":"text","primaryKey":false,"searchConfig":{"immediately":false,"keywordSearch":true,"searchable":true},"tableConfig":{"expand":false},"required":false,"createConfig":{"addable":true,"addShowable":true},"updateConfig":{"updatable":true,"updateShowable":true},"selectChecked":true},{"label":"默认的显示值","i18nLabel":"GENERATE_RUN_COLUMN_DEFAULT_VAL","value":"defaultVal","columnName":"default_val","type":"text","primaryKey":false,"searchConfig":{"immediately":false,"keywordSearch":true,"searchable":true},"tableConfig":{"expand":false},"required":false,"createConfig":{"addable":true,"addShowable":true},"updateConfig":{"updatable":true,"updateShowable":true},"selectChecked":true},{"label":"所属的表ID","i18nLabel":"GENERATE_RUN_COLUMN_TABLE_ID","value":"tableId","columnName":"table_id","type":"text","primaryKey":false,"searchConfig":{"immediately":false,"keywordSearch":true,"searchable":true},"tableConfig":{"expand":false},"required":false,"createConfig":{"addable":true,"addShowable":true},"updateConfig":{"updatable":true,"updateShowable":true},"selectChecked":true},{"label":"table-column_item的选项","i18nLabel":"GENERATE_RUN_COLUMN_TABLE_COLUMN_OPTION","value":"tableColumnOption","columnName":"table_column_option","type":"text","primaryKey":false,"searchConfig":{"immediately":false,"keywordSearch":true,"searchable":true},"tableConfig":{"expand":false},"required":false,"createConfig":{"addable":true,"addShowable":true},"updateConfig":{"updatable":true,"updateShowable":true},"selectChecked":true},{"label":"参照的表id","i18nLabel":"GENERATE_RUN_COLUMN_REFER_TABLE_ID","value":"referTableId","columnName":"refer_table_id","type":"text","primaryKey":false,"searchConfig":{"immediately":false,"keywordSearch":true,"searchable":true},"tableConfig":{"expand":false},"required":false,"createConfig":{"addable":true,"addShowable":true},"updateConfig":{"updatable":true,"updateShowable":true},"selectChecked":true},{"label":"参照的表名","i18nLabel":"GENERATE_RUN_COLUMN_REFER_TABLE_NAME","value":"referTableName","columnName":"refer_table_name","type":"text","primaryKey":false,"searchConfig":{"immediately":false,"keywordSearch":true,"searchable":true},"tableConfig":{"expand":false},"required":false,"createConfig":{"addable":true,"addShowable":true},"updateConfig":{"updatable":true,"updateShowable":true},"selectChecked":true},{"label":"参照回填的字段","i18nLabel":"GENERATE_RUN_COLUMN_VALUE_REFER_NAME","value":"valueReferName","columnName":"value_refer_name","type":"text","primaryKey":false,"searchConfig":{"immediately":false,"keywordSearch":true,"searchable":true},"tableConfig":{"expand":false},"required":false,"createConfig":{"addable":true,"addShowable":true},"updateConfig":{"updatable":true,"updateShowable":true},"selectChecked":true},{"label":"扩展的回填字段","i18nLabel":"GENERATE_RUN_COLUMN_VALUE_EXPEND_REFERS","value":"valueExpendRefers","columnName":"value_expend_refers","type":"text","primaryKey":false,"searchConfig":{"immediately":false,"keywordSearch":true,"searchable":true},"tableConfig":{"expand":false},"required":false,"createConfig":{"addable":true,"addShowable":true},"updateConfig":{"updatable":true,"updateShowable":true},"selectChecked":true},{"label":"选项，仅type为select的时候使用","i18nLabel":"GENERATE_RUN_COLUMN_OPTIONS","value":"options","columnName":"options","type":"text","primaryKey":false,"searchConfig":{"immediately":false,"keywordSearch":true,"searchable":true},"tableConfig":{"expand":false},"required":false,"createConfig":{"addable":true,"addShowable":true},"updateConfig":{"updatable":true,"updateShowable":true},"selectChecked":true},{"label":"选项，从指定的url上查询","i18nLabel":"GENERATE_RUN_COLUMN_OPTION_URL","value":"optionUrl","columnName":"option_url","type":"text","primaryKey":false,"searchConfig":{"immediately":false,"keywordSearch":true,"searchable":true},"tableConfig":{"expand":false},"required":false,"createConfig":{"addable":true,"addShowable":true},"updateConfig":{"updatable":true,"updateShowable":true},"selectChecked":true},{"label":"自定义选项","i18nLabel":"GENERATE_RUN_COLUMN_PROPS","value":"props","columnName":"props","type":"text","primaryKey":false,"searchConfig":{"immediately":false,"keywordSearch":true,"searchable":true},"tableConfig":{"expand":false},"required":false,"createConfig":{"addable":true,"addShowable":true},"updateConfig":{"updatable":true,"updateShowable":true},"selectChecked":true},{"label":"创建人","i18nLabel":"GENERATE_RUN_COLUMN_CREATOR","value":"creator","columnName":"creator","type":"text","primaryKey":false,"searchConfig":{"immediately":false,"keywordSearch":true,"searchable":true},"tableConfig":{"expand":true},"required":false,"createConfig":{"addable":false,"addShowable":false},"updateConfig":{"updatable":false,"updateShowable":true},"selectChecked":false},{"label":"创建时间","i18nLabel":"GENERATE_RUN_COLUMN_CREATE_TIME","value":"createTime","columnName":"create_time","type":"text","primaryKey":false,"searchConfig":{"immediately":false,"keywordSearch":true,"searchable":true},"tableConfig":{"expand":true},"required":false,"createConfig":{"addable":false,"addShowable":false},"updateConfig":{"updatable":false,"updateShowable":true},"selectChecked":false},{"label":"修改人","i18nLabel":"GENERATE_RUN_COLUMN_MODIFIER","value":"modifier","columnName":"modifier","type":"text","primaryKey":false,"searchConfig":{"immediately":false,"keywordSearch":true,"searchable":true},"tableConfig":{"expand":true},"required":false,"createConfig":{"addable":false,"addShowable":false},"updateConfig":{"updatable":false,"updateShowable":true},"selectChecked":false},{"label":"修改时间","i18nLabel":"GENERATE_RUN_COLUMN_MODIFY_TIME","value":"modifyTime","columnName":"modify_time","type":"text","primaryKey":false,"searchConfig":{"immediately":false,"keywordSearch":true,"searchable":true},"tableConfig":{"expand":true},"required":false,"createConfig":{"addable":false,"addShowable":false},"updateConfig":{"updatable":false,"updateShowable":true},"selectChecked":false},{"label":"启用/禁用","i18nLabel":"GENERATE_RUN_COLUMN_ENABLE_STATE","value":"enableState","columnName":"enable_state","type":"switch","primaryKey":false,"props":{"activeValue":1,"activeText":"启用","inactiveValue":0,"inactiveText":"禁用"},"searchConfig":{"immediately":false,"keywordSearch":true,"searchable":true},"tableConfig":{"expand":false},"required":false,"createConfig":{"addable":true,"addShowable":true},"updateConfig":{"updatable":true,"updateShowable":true},"selectChecked":true},{"label":"是否必填","i18nLabel":"GENERATE_RUN_COLUMN_REQUIRED","value":"required","columnName":"required","type":"text","primaryKey":false,"searchConfig":{"immediately":false,"keywordSearch":true,"searchable":true},"tableConfig":{"expand":false},"required":false,"createConfig":{"addable":true,"addShowable":true},"updateConfig":{"updatable":true,"updateShowable":true},"selectChecked":true},{"label":"正则ID","i18nLabel":"GENERATE_RUN_COLUMN_REGEX_ID","value":"regexId","columnName":"regex_id","type":"text","primaryKey":false,"searchConfig":{"immediately":false,"keywordSearch":true,"searchable":true},"tableConfig":{"expand":false},"required":false,"createConfig":{"addable":true,"addShowable":true},"updateConfig":{"updatable":true,"updateShowable":true},"selectChecked":true}]}

export default tableConfig
