<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'

}
</script>

<style>

.sortable-ghost {
  opacity: 50%;
  color: #fff !important;
  background: #42b983 !important;
}

/* 表头对齐*/
.el-table th.gutter {
  display: table-cell !important;
}

.el-table th > .cell span {
  overflow: hidden; /*设置超出的部分进行影藏*/
  text-overflow: ellipsis; /*设置超出部分使用省略号*/
  white-space: nowrap; /*设置为单行*/
}

.el-table input {
  padding: 0;
}

/*滚动条覆盖 固定列不能选中滚动*/
.el-table--scrollable-x .el-table__body-wrapper {
  z-index: 2;
}

/*表格行内编辑样式*/
.tableForm .el-form-item {
  margin-bottom: 0px !important;
}

.el-table--striped .el-table__body tr.el-table__row--striped.current-row td,
.el-table__body tr.current-row > td {
  background-color: #93c6fa !important;
}

.el-dialog__body {
  padding: 8px 20px !important;
  margin-top: -10px;
}

.tableForm .hide .el-upload--picture-card {
  display: none;
}

.tableForm .el-upload--picture-card {
  width: 80px;
  height: 60px;
}

.tableForm .el-upload-list--picture-card .el-upload-list__item {
  width: 80px;
  height: 60px;
}

/*识别换行*/
.text-wrapper .cell {
  white-space: pre-wrap;
}

.el-button + .el-button {
  margin-left: 10px;
}
</style>
