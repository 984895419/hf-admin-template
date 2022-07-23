// package/index.js
// 引入封装好的组件
// import ApiSlot from "../CURD/Api/ApiSlot.vue"; //插槽Api
// //  按钮
// import AddBtn from "../CURD/Btns/AddBtn.vue"; // 新增
// import CommonDialogBtn from "../CURD/Btns/CommonDialogBtn.vue"; // 基础弹窗
// import DelBtn from "../CURD/Btns/DelBtn.vue"; // 删除
// import DialogBtnPage from "../CURD/Btns/DialogBtnPage.vue"; // 基础弹窗
// import DropdownBtn from "../CURD/Btns/DropdownBtn.vue"; // 下拉
// import ExportBtn from "../CURD/Btns/ExportBtn.vue"; // 导出
// import TemplateConfirmBtn from '../CURD/Btns/TemplateConfirmBtn.vue'; // 引入封装好的组件
// import UpdateBtn from "../CURD/Btns/UpdateBtn.vue"; // 更新
// // developing
// import CopyBtn from "../CURD/developing/CopyBtn.vue";
// import CopyFormItemDict from "../CURD/developing/CopyFormItemDict.vue";
// // Form
// import cuFrom from "../CURD/Form/cuFrom.vue";
// import EnableStateformItemText from "../CURD/Form/EnableStateformItemText.vue";
// import formItemCol from "../CURD/Form/formItemCol.vue";
// import formItemColDict from "../CURD/Form/formItemColDict.vue";
// import formItemColEnableState from "../CURD/Form/formItemColEnableState.vue";
// import formItemColSelect from "../CURD/Form/formItemColSelect.vue";
// import formItemColTextarea from "../CURD/Form/formItemColTextarea.vue";
// import formItemColUploadImage from "../CURD/Form/formItemColUploadImage.vue";
// import formItemText from "../CURD/Form/formItemText.vue";
// // JsonEditor
// import JsonEditor from "../CURD/JsonEditor/index.vue";
// // Pagination
// import CurdPagination from "../CURD/pagination/Pagination.vue";
// // Query
// import SimpleSearch from "../CURD/Query/search.vue";
// // Slot
// import RowSpanSlot from "../CURD/Slot/RowSpanSlot.vue";
// // Table
// import HfTable from "../CURD/Table/HfTable.vue";
// // column base
// import DateTimeFormatTableColumn from "../CURD/Table/column/base/DateTimeFormatTableColumn.vue";
// import SectionTableColumn from "../CURD/Table/column/base/SectionTableColumn.vue";
// import TagTableColumn from "../CURD/Table/column/base/TagTableColumn.vue";
// // column other
// import CopierRender from "../CURD/Table/column/other/CopierRender.vue";
// // column
// import CreateTimeTableColumn from "../CURD/Table/column/CreateTimeTableColumn.vue";
// import CreatorTableColumn from "../CURD/Table/column/CreatorTableColumn.vue";
// import DefaultTableColumn from "../CURD/Table/column/DefaultTableColumn.vue";
// import EnableStateTableColumn from "../CURD/Table/column/EnableStateTableColumn.vue";
// import ImageTableColumn from "../CURD/Table/column/ImageTableColumn.vue";
// import ModifierTableColumn from "../CURD/Table/column/ModifierTableColumn.vue";
// import ModifyTimeTableColumn from "../CURD/Table/column/ModifyTimeTableColumn.vue";
// // select
// import TableColumnSelect from "../CURD/Table/select/TableColumnSelect.vue";
// import baseApi from '../CURD/baseApi.js'
// import curdmixin from '../CURD/curd.mixin.js'
// import defaultUrl from '../CURD/defaultUrl.js'

import TextBtns from '../CURD/TextBtns/index.vue'
import aa from '../CURD/aa/index.vue'

const coms = [
  // ApiSlot, AddBtn, CommonDialogBtn,
  // DelBtn, DialogBtnPage, DropdownBtn, ExportBtn,
  // TemplateConfirmBtn, UpdateBtn, CopyBtn,
  // CopyFormItemDict, cuFrom, EnableStateformItemText,
  // formItemCol, formItemColDict, formItemColEnableState,
  // formItemColSelect, formItemColTextarea, formItemColUploadImage,
  // formItemText, JsonEditor, CurdPagination, SimpleSearch, RowSpanSlot,
  // HfTable, DateTimeFormatTableColumn, SectionTableColumn, TagTableColumn,
  // CopierRender, CreateTimeTableColumn, CreatorTableColumn, DefaultTableColumn,
  // EnableStateTableColumn, ImageTableColumn, ModifierTableColumn,
  // ModifyTimeTableColumn, TableColumnSelect,
  TextBtns, aa
] // 将来如果有其它组件,都可以写到这个数组里

// 批量组件注册
const install = function(Vue) {
  coms.forEach((com) => {
    Vue.component(com.name, com)
  })
}

export default install
// 这个方法以后再使用的时候可以被use调用
// export {
//   baseApi,
//   curdmixin,
//   defaultUrl
// }
