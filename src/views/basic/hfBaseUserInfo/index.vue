<template>
  <el-card class="app-container">
    <!-- 查询框 -->
    <div>
      <simple-search v-model="searchForm" :inline="true" @search="doSearch">
        <template v-slot="{ span }">
          <!-- 新增的的字段配置 -->
          <form-item-col :value="searchForm" style="width:auto" :span="span" prop="userCode"
            :namespace="conf.namespace" />
          <form-item-col :value="searchForm" style="width:auto" :span="span" prop="userName"
            :namespace="conf.namespace" />
          <!-- 字典字段字段设置方法如下
          <form-item-col-dict
            :value="data"
            :error="errorMessage('clientMethod')"
            :span="span"
            prop="clientMethod"
            :dict-code="'CLIENT_METHOD_TYPES'"
            :namespace="conf.namespace"
          /> -->
        </template>
      </simple-search>
    </div>
    <!-- 说明tip -->
    <div>
      <explain-tip />
    </div>
    <!-- 操作栏-->
    <div style="margin-bottom: 10px" class="col-btn-display ">
      <!--      <hf-base-user-info-add v-permission="['hfBaseUserInfo:save']" :action-url="conf.urlMethods.addUrl" @success="doSearch" />-->
      <div
        style="display: flex;align-items: center;justify-content: space-between;padding-left: 12px; box-sizing: border-box;"
        class="col-btn-display">
        <!--        <del-btn-->
        <!--          v-if="conf.urlMethods.deleteUrl-->
        <!--            && toggleRowSelectionArray.length > 0"-->
        <!--          :url="templateUrl(conf.urlMethods.deleteUrl, toggleRowSelectionArray)"-->
        <!--          :value="toggleRowSelectionArray"-->
        <!--          :label="$t('common.batchDelete')"-->
        <!--          @success="doSearch"-->
        <!--        />-->
        <!--        <template-confirm-btn-->
        <!--          v-if="conf.urlMethods.enableUrl-->
        <!--            && toggleRowSelectionArray.length > 0"-->
        <!--          :url="templateUrl(conf.urlMethods.enableUrl, toggleRowSelectionArray)"-->
        <!--          :btn-type="'primary'"-->
        <!--          :label="$t('common.batchEnable')"-->
        <!--          :value="toggleRowSelectionArray"-->
        <!--          @success="doSearch"-->
        <!--        />-->
        <!--        <template-confirm-btn-->
        <!--          v-if="conf.urlMethods.disableUrl-->
        <!--            && toggleRowSelectionArray.length > 0"-->
        <!--          :url="templateUrl(conf.urlMethods.disableUrl, toggleRowSelectionArray)"-->
        <!--          :btn-type="'primary'"-->
        <!--          :value="toggleRowSelectionArray"-->
        <!--          :label="$t('common.batchDisable')"-->
        <!--          @success="doSearch"-->
        <!--        />-->
        <div>
          <el-checkbox v-if="$route.path == '/role/role-list'" v-model="alreadychecked">筛选已绑定</el-checkbox>
        </div>
        <template-confirm-btn v-if="conf.urlMethods.syncUrl" :http-method="'post'" :url="conf.urlMethods.syncUrl"
          :btn-type="'primary'" :label="$t('common.sync')" @success="doSearch" />
      </div>

    </div>
    <!-- 列表-->
    <table-column-preference-setting-api-slot v-model="showFields" :init-data="tableFields"
      :preference-alias="conf.namespace">
      <template v-slot="{ doSave, preferenceData, headerDragend }">
        <hf-table v-if="showFields" ref="hfMainTable" v-loading="loading" :maxheight="maxheight"
          :table-data="jsonData.list" row-key="id" @selection-change="handleSelectionChange" @sort-change="sortChange"
          @header-dragend="headerDragend">
          <el-table-column fixed="left" type="selection" width="40" />
          <!-- 显示的字段-->
          <hf-base-user-info-columns :show-fields="showFields" :url-methods="conf.urlMethods" @success="doSearch" />
          <el-table-column fixed="right" :label="$t('common.operate')" width="150">
            <template v-slot:header>
              {{ $t('common.operate') }}
              <curd-table-column-select v-model="showFields" :preference-alias="conf.namespace"
                :table-fields="preferenceData" style="float: right" @selectedChange="reRenderTable" @doSave="doSave" />
            </template>
            <template slot-scope="scopeRow">
              <div class="col-btn-display">
                <!-- 更新 -->
                <!--                <hf-base-user-info-update-->
                <!--                  v-permission="['hfBaseUserInfo:update']"-->
                <!--                  :value="scopeRow.row"-->
                <!--                  :query-url="conf.urlMethods.queryUrl"-->
                <!--                  :update-url="conf.urlMethods.updateUrl"-->
                <!--                  @success="doSearch"-->
                <!--                />-->
                <!-- 删除-->
                <!--                <del-btn-->
                <!--                  v-permission="['hfBaseUserInfo:delete']"-->
                <!--                  :url="templateUrl(conf.urlMethods.deleteUrl, scopeRow.row)"-->
                <!--                  :btn-type="'text'"-->
                <!--                  :value="scopeRow.row"-->
                <!--                  @success="doSearch"-->
                <!--                />-->
                <!-- 查看 -->
                <hf-base-user-info-detail :value="scopeRow.row" />
                <!-- 设置角色 -->
                <!-- {{ $store.state.permission.routesMethods }} -->
                <common-dialog-btn v-show="$route.path === '/oa/account'" v-permission="['hfBaseUserInfo:bindRoles']"
                  :label="'设置角色'" :type="'text'">
                  <template slot-scope="{ closeDialog }">
                    <role-settings :data="scopeRow.row" @closeDialog="closeDialog" />
                  </template>
                </common-dialog-btn>
              </div>
            </template>
          </el-table-column>
        </hf-table>
      </template>
    </table-column-preference-setting-api-slot>
    <!-- 分页信息 -->
    <curd-pagination :current-page.sync="searchForm.pageInfo.pageNo" :page-size.sync="searchForm.pageInfo.pageSize"
      :total="jsonData.total" @size-change="doSearch" @current-change="doSearch" />
  </el-card>
</template>

<script>
import * as conf from './api'
import HfBaseUserInfoAdd from './add'
import HfTable from '@/components/CURD/Table/HfTable'
import { baseApiGetMethod } from '@/components/CURD/baseApi'
import { isSuccessResult } from '@/utils/ajaxResultUtil'
import CurdPagination from '@/components/CURD/pagination/Pagination'
import HfBaseUserInfoUpdate from './update'
import DelBtn from '@/components/CURD/Btns/DelBtn'
import CurdMixin from '@/components/CURD/curd.mixin'
import CurdTableColumnSelect from '@/components/CURD/Table/select/TableColumnSelect'
import HfBaseUserInfoDetail from './detail'
import HfBaseUserInfoColumns from './hfBaseUserInfoColumns'
import TemplateConfirmBtn from '@/components/CURD/Btns/TemplateConfirmBtn'
import FormItemColDict from '@/components/CURD/Form/formItemColDict.vue'
import FormItemCol from '@/components/CURD/Form/formItemCol.vue'
import SimpleSearch from '@/components/CURD/Query/search'
import TableColumnPreferenceSettingApiSlot from '@/views/basic/preferenceSetting/TableColumnPrefenceSettingApiSlot'
import RoleSettings from '@/views/oa/role-settings.vue'
import CommonDialogBtn from '@/components/CURD/Btns/CommonDialogBtn'
import ExplainTip from '@/components/ExplainTip'

export default {
  name: 'HfBaseUserInfoIndexVue',
  components: {
    TemplateConfirmBtn,
    HfBaseUserInfoColumns,
    HfBaseUserInfoDetail,
    CurdTableColumnSelect,
    DelBtn,
    HfBaseUserInfoUpdate,
    CurdPagination,
    HfTable, HfBaseUserInfoAdd,
    FormItemColDict,
    FormItemCol,
    SimpleSearch,
    TableColumnPreferenceSettingApiSlot,
    RoleSettings,
    CommonDialogBtn,
    ExplainTip
  },
  mixins: [CurdMixin],
  props: {
    // 'binduserlist': Array,
    'postBaseUserInfoParam': {},
    dataList: {}
  },
  data() {
    return {
      db: {},
      showFields: null,
      loading: false,
      /**
       * 查询的表单信息
       */
      searchForm: {
        userCode: null,
        userName: null,
        pkOrg: null,
        pkDept: null,
        /**
         * 分页信息
         */
        pageInfo: {
          pageNo: 1,
          pageSize: this.$store.getters.pageSize
        },
        /**
         * 排序信息
         */
        sortInfo: []
      },
      conf: conf,
      jsonData: {
        list: [],
        total: 0
      },
      tableFields: conf.default,
      toggleRowSelectionArray: [],
      roleBindList: [],
      maxheight: 565,
      alreadychecked: false,
      // 查找多选框
      pageData1: {
        pageNo: 1,
        pageSize: 50
      },
      // binduserlist: null,
      hasSelectList: [],
    }
  },
  watch: {
    postBaseUserInfoParam(val, oldval) {
      this.searchForm.pkOrg = val.pkCorp
      this.doSearch()
    },
    alreadychecked(val, oldval) {
      if (val === true) {
        this.getAlreadyBindUser(val)
      } else {
        this.doSearch()
      }
    }
  },
  created() {
    this.doSearch()
  },
  mounted() {
    console.log(this.postBaseUserInfoParam, 'postBaseUserInfoParam');
    this.$nextTick(() => {
      this.getAlreadyBindUser()
    })
  },
  methods: {
    reRenderTable(res) {
      // 扩展显示的字段
      this.showFields = []
      // 标记为重新渲染中
      this.reRending = true
      setTimeout(() => {
        this.showFields = res
        // 标记为重新渲染中
        this.reRending = false
      }, 50)
    },
    /**
     * 排序发生变化的时候执行的排序变化
     * @param column
     * @param prop
     * @param order
     */
    sortChange({ column, prop, order }) {
      // 设置排序字段信息
      if (order) {
        this.searchForm.sortInfo = [{
          sort: order === 'ascending' ? 0 : (1),
          fieldName: prop
        }]
      } else {
        this.searchForm.sortInfo = []
      }
      // 执行排序
      this.doSearch()
    },
    /**
     * 查询条件变化
     */
    inquiryChangeSearch(query) {
      this.searchForm.query = query
      this.doSearch()
    },
    /**
     * 选中后处理的事件
     * @param section
     */
    handleSelectionChange(section) {
      this.toggleRowSelectionArray = section
      section.forEach((item, index) => {
        this.roleBindList.push(item.userId)
      })
      this.$emit('userbindlist', this.roleBindList)
    },
    /**
     * 执行查询操作
     */
    doSearch() {
      if (this.conf.urlMethods && this.conf.urlMethods.pageUrl) {
        this.loading = true
        baseApiGetMethod(this.conf.urlMethods.pageUrl, this.searchForm).then(resp => {
          if (isSuccessResult(resp)) {
            this.$set(this.jsonData, 'list', resp.data.list)
            this.$set(this.jsonData, 'total', resp.data.total)
            console.log(this.hasSelectList, "this.hasSelectList2")
            setTimeout(() => {
              if (this.hasSelectList && this.hasSelectList.length > 0) {
                this.$nextTick(() => {
                  this.$refs.hfMainTable.toggleRowSelection(this.jsonData.list.filter(row => this.hasSelectList.indexOf(row.id) >= 0), true)
                })
              } else {
                console.log()
              }
            }, 500)
          } else {
            this.$message.error(resp.message)
          }
          this.loading = false
        }).catch(e => {
          console.log(e)
          this.loading = false
        })
      } else {
        this.$message.error('请配置分页查询地址参数:{pageUrl: xxxx}')
      }
    },
    // 筛选已绑定
    filterBound(resp) {

    },
    // 从NC同步用户信息
    syncNcData() {
      this.listLoading = true
      baseApiGetMethod('/api//hfBaseUserInfo/sync').then(
        (resp) => {
          if (resp.retCode === '00001') {
            this.listLoading = false
            this.$message({ message: resp.message, type: 'success' })
          }
        }
      )
    },
    newArrFn(arr) {
      const newArr = []
      for (let i = 0; i < arr.length; i++) {
        newArr.includes(arr[i]) ? newArr : newArr.push(arr[i])
      }
      return newArr
    },
    // 数组对象去重
    fn1(tempArr) {
      for (let i = 0; i < tempArr.length; i++) {
        for (let j = i + 1; j < tempArr.length; j++) {
          if (tempArr[i].id == tempArr[j].id) {
            tempArr.splice(j, 1);
            j--;
          };
        };
      };
      return tempArr;
    },
    // 获取角色已绑定用户
    getAlreadyBindUser(val) {
      // console.log(this.dataList,123)
      baseApiGetMethod(`/api/hfBaseRightRole/bindUsers/${this.dataList.roleId}`, this.pageData1).then(
        (resp) => {
          if (resp.retCode === '00001') {
            this.binduserlist = resp.data.list
            this.binduserlist.forEach((item) => {
              this.hasSelectList.push(item.id)
            })
            this.hasSelectList = this.newArrFn(this.hasSelectList)
            if (val) {
              this.$set(this.jsonData, 'list', this.fn1(resp.data.list))
              this.$set(this.jsonData, 'total', resp.data.total)
              setTimeout(() => {
                if (this.hasSelectList && this.hasSelectList.length > 0) {
                  this.$nextTick(() => {
                    this.$refs.hfMainTable.toggleRowSelection(this.jsonData.list.filter(row => this.hasSelectList.indexOf(row.id) >= 0), true)
                  })
                } else {
                  console.log()
                }
              }, 500)
            } else {
              return
            }
          }
        }
      )
    }
  }
}
</script>

<style scoped>
/deep/ .col-btn-display>div,
.col-btn-display>.el-button {
  display: inline-block;
  margin-right: 10px;
}
</style>
