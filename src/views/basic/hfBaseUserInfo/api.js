import { defaultUrlMethod } from '@/components/CURD/defaultUrl'
/**
 * 用户信息模块基础地址
 * @type {string}
 */
export const baseUrl = '/api/hfBaseUserInfo'
/**
 * 基础查询地址
 * @type {{pageUrl: string}}
 */
export const urlMethods = defaultUrlMethod(baseUrl, 'userId', {
  pageUrl: baseUrl + '/nameQuery'
})
/**
 * 定义模块的命名空间
 * @type {string}
 */
export const namespace = 'hf_base_user_info'

/**
 * curd的配置， TODO 后续改成从后台查询返回这些配置
 */
const tableConfig = {
  "tableItemOption": {
    "showIndex": true,
    "showSelected": true,
    "showItemOperate": true
  },
  "searchOption": {
    "returnType": "fields"
  },
  "referOption": {
    "referId": "userId",
    "referName": "userName"
  },
  "fields": [{
    "label": "oa用户id",
    "i18nLabel": "HF_BASE_USER_INFO_USER_ID",
    "value": "userId",
    "columnName": "user_id",
    "type": "text",
    "primaryKey": true,
    "searchConfig": {
      "immediately": false,
      "keywordSearch": true,
      "searchable": false
    },
    "required": false,
    "createConfig": {
      "addable": false,
      "addShowable": false
    },
    "updateConfig": {
      "updatable": false,
      "updateShowable": false
    },
    "selectChecked": false
  }, {
    "label": "工号",
    "i18nLabel": "HF_BASE_USER_INFO_USER_CODE",
    "value": "userCode",
    "columnName": "user_code",
    "type": "text",
    "primaryKey": false,
    "searchConfig": {
      "immediately": false,
      "keywordSearch": true,
      "searchable": true
    },
    "required": false,
    "createConfig": {
      "addable": true,
      "addShowable": true
    },
    "updateConfig": {
      "updatable": true,
      "updateShowable": true
    },
    "selectChecked": true
  }, {
    "label": "姓名",
    "i18nLabel": "HF_BASE_USER_INFO_USER_NAME",
    "value": "userName",
    "columnName": "user_name",
    "type": "text",
    "primaryKey": false,
    "searchConfig": {
      "immediately": false,
      "keywordSearch": true,
      "searchable": true
    },
    "required": false,
    "createConfig": {
      "addable": true,
      "addShowable": true
    },
    "updateConfig": {
      "updatable": true,
      "updateShowable": true
    },
    "selectChecked": true
  }, {
    "label": "组织",
    "i18nLabel": "HF_BASE_USER_INFO_PK_ORG",
    "value": "pkOrg",
    "columnName": "pk_org",
    "type": "text",
    "primaryKey": false,
    "searchConfig": {
      "immediately": false,
      "keywordSearch": true,
      "searchable": true
    },
    "required": false,
    "createConfig": {
      "addable": true,
      "addShowable": true
    },
    "updateConfig": {
      "updatable": true,
      "updateShowable": true
    },
    "selectChecked": true
  }, {
    "label": "部门",
    "i18nLabel": "HF_BASE_USER_INFO_PK_DEPT",
    "value": "pkDept",
    "columnName": "pk_dept",
    "type": "text",
    "primaryKey": false,
    "searchConfig": {
      "immediately": false,
      "keywordSearch": true,
      "searchable": true
    },
    "required": false,
    "createConfig": {
      "addable": true,
      "addShowable": true
    },
    "updateConfig": {
      "updatable": true,
      "updateShowable": true
    },
    "selectChecked": true
  }, {
    "label": "性别",
    "i18nLabel": "HF_BASE_USER_INFO_GENDER",
    "value": "gender",
    "columnName": "gender",
    "type": "text",
    "primaryKey": false,
    "searchConfig": {
      "immediately": false,
      "keywordSearch": true,
      "searchable": true
    },
    "required": false,
    "createConfig": {
      "addable": true,
      "addShowable": true
    },
    "updateConfig": {
      "updatable": true,
      "updateShowable": true
    },
    "selectChecked": true
  }, {
    "label": "手机号",
    "i18nLabel": "HF_BASE_USER_INFO_MOBILE",
    "value": "mobile",
    "columnName": "mobile",
    "type": "text",
    "primaryKey": false,
    "searchConfig": {
      "immediately": false,
      "keywordSearch": true,
      "searchable": true
    },
    "required": false,
    "createConfig": {
      "addable": true,
      "addShowable": true
    },
    "updateConfig": {
      "updatable": true,
      "updateShowable": true
    },
    "selectChecked": true
  }, {
    "label": "邮箱",
    "i18nLabel": "HF_BASE_USER_INFO_EMAIL",
    "value": "email",
    "columnName": "email",
    "type": "text",
    "primaryKey": false,
    "searchConfig": {
      "immediately": false,
      "keywordSearch": true,
      "searchable": true
    },
    "required": false,
    "createConfig": {
      "addable": true,
      "addShowable": true
    },
    "updateConfig": {
      "updatable": true,
      "updateShowable": true
    },
    "selectChecked": true
  }, {
    "label": "nc用户id",
    "i18nLabel": "HF_BASE_USER_INFO_NC_USER_ID",
    "value": "ncUserId",
    "columnName": "nc_user_id",
    "type": "text",
    "primaryKey": false,
    "searchConfig": {
      "immediately": false,
      "keywordSearch": true,
      "searchable": true
    },
    "required": false,
    "createConfig": {
      "addable": true,
      "addShowable": true
    },
    "updateConfig": {
      "updatable": true,
      "updateShowable": true
    },
    "selectChecked": true
  }, {
    "label": "用户来源：1、oa获取，2、供应商",
    "i18nLabel": "HF_BASE_USER_INFO_USER_FROM",
    "value": "userFrom",
    "columnName": "user_from",
    "type": "text",
    "primaryKey": false,
    "searchConfig": {
      "immediately": false,
      "keywordSearch": true,
      "searchable": true
    },
    "required": false,
    "createConfig": {
      "addable": true,
      "addShowable": true
    },
    "updateConfig": {
      "updatable": true,
      "updateShowable": true
    },
    "selectChecked": true
  }, {
    "label": "创建人",
    "i18nLabel": "HF_BASE_USER_INFO_CREATOR",
    "value": "creator",
    "columnName": "creator",
    "type": "text",
    "primaryKey": false,
    "searchConfig": {
      "immediately": false,
      "keywordSearch": true,
      "searchable": true
    },
    "required": false,
    "createConfig": {
      "addable": false,
      "addShowable": false
    },
    "updateConfig": {
      "updatable": false,
      "updateShowable": true
    },
    "selectChecked": false
  }, {
    "label": "创建时间",
    "i18nLabel": "HF_BASE_USER_INFO_CREATE_TIME",
    "value": "createTime",
    "columnName": "create_time",
    "type": "text",
    "primaryKey": false,
    "searchConfig": {
      "immediately": false,
      "keywordSearch": true,
      "searchable": true
    },
    "required": false,
    "createConfig": {
      "addable": false,
      "addShowable": false
    },
    "updateConfig": {
      "updatable": false,
      "updateShowable": true
    },
    "selectChecked": false
  }, {
    "label": "修改人",
    "i18nLabel": "HF_BASE_USER_INFO_MODIFIER",
    "value": "modifier",
    "columnName": "modifier",
    "type": "text",
    "primaryKey": false,
    "searchConfig": {
      "immediately": false,
      "keywordSearch": true,
      "searchable": true
    },
    "required": false,
    "createConfig": {
      "addable": false,
      "addShowable": false
    },
    "updateConfig": {
      "updatable": false,
      "updateShowable": true
    },
    "selectChecked": false
  }, {
    "label": "修改时间",
    "i18nLabel": "HF_BASE_USER_INFO_MODIFY_TIME",
    "value": "modifyTime",
    "columnName": "modify_time",
    "type": "text",
    "primaryKey": false,
    "searchConfig": {
      "immediately": false,
      "keywordSearch": true,
      "searchable": true
    },
    "required": false,
    "createConfig": {
      "addable": false,
      "addShowable": false
    },
    "updateConfig": {
      "updatable": false,
      "updateShowable": true
    },
    "selectChecked": false
  }, {
    "label": "启用/禁用",
    "i18nLabel": "HF_BASE_USER_INFO_ENABLE_STATE",
    "value": "enableState",
    "columnName": "enable_state",
    "type": "switch",
    "primaryKey": false,
    "props": {
      "activeValue": 1,
      "activeText": "启用",
      "inactiveValue": 0,
      "inactiveText": "禁用"
    },
    "searchConfig": {
      "immediately": false,
      "keywordSearch": true,
      "searchable": true
    },
    "required": false,
    "createConfig": {
      "addable": true,
      "addShowable": true
    },
    "updateConfig": {
      "updatable": true,
      "updateShowable": true
    },
    "selectChecked": true
  }, {
    "label": "头像",
    "i18nLabel": "HF_BASE_USER_INFO_HEAD_PIC",
    "value": "headPic",
    "columnName": "head_pic",
    "type": "text",
    "primaryKey": false,
    "searchConfig": {
      "immediately": false,
      "keywordSearch": true,
      "searchable": true
    },
    "required": false,
    "createConfig": {
      "addable": true,
      "addShowable": true
    },
    "updateConfig": {
      "updatable": true,
      "updateShowable": true
    },
    "selectChecked": true
  }, {
    "label": "身份证号",
    "i18nLabel": "HF_BASE_USER_INFO_ID",
    "value": "id",
    "columnName": "id",
    "type": "text",
    "primaryKey": false,
    "searchConfig": {
      "immediately": false,
      "keywordSearch": true,
      "searchable": true
    },
    "required": false,
    "createConfig": {
      "addable": true,
      "addShowable": true
    },
    "updateConfig": {
      "updatable": true,
      "updateShowable": true
    },
    "selectChecked": true
  }, {
    "label": "用户有效时间(单位s)",
    "i18nLabel": "HF_BASE_USER_INFO_EFFECT_TIME",
    "value": "effectTime",
    "columnName": "effect_time",
    "type": "text",
    "primaryKey": false,
    "searchConfig": {
      "immediately": false,
      "keywordSearch": true,
      "searchable": true
    },
    "required": false,
    "createConfig": {
      "addable": true,
      "addShowable": true
    },
    "updateConfig": {
      "updatable": true,
      "updateShowable": true
    },
    "selectChecked": true
  }]
}

export default tableConfig
