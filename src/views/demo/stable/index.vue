<template>
  <el-card class="app-container">
    <!-- 查询框 -->
    <div>
      <simple-search v-model="searchForm" :inline="true" @search="doSearch">
        <template v-slot="{ span }">
          <!-- 新增的的字段配置 -->
          <form-item-col :value="searchForm" :span="span" prop="orderNo" :namespace="conf.namespace" />
          <form-item-col :value="searchForm" :span="span" prop="ordertime" :namespace="conf.namespace" />
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
    <!-- 操作栏-->
    <div class="btnslist">
      <hf-base-right-role-add style="margin-right:10px" :action-url="conf.urlMethods.addUrl" @success="doSearch" />
      <div class="block">
        <el-cascader v-model="batchVal" :options="options" placeholder="批量操作" :props="{ expandTrigger: 'hover' }"
          @change="handleChange" />
      </div>
      <div style="float: right;" class="col-btn-display">
        <del-btn v-if="conf.urlMethods.deleteUrl
        && toggleRowSelectionArray.length > 0" :url="templateUrl(conf.urlMethods.deleteUrl, toggleRowSelectionArray)"
          :value="toggleRowSelectionArray" :label="$t('common.batchDelete')" @success="doSearch" />
        <template-confirm-btn v-if="conf.urlMethods.enableUrl
        && toggleRowSelectionArray.length > 0" :url="templateUrl(conf.urlMethods.enableUrl, toggleRowSelectionArray)"
          :btn-type="'primary'" :label="$t('common.batchEnable')" :value="toggleRowSelectionArray"
          @success="doSearch" />
        <template-confirm-btn v-if="conf.urlMethods.disableUrl
        && toggleRowSelectionArray.length > 0" :url="templateUrl(conf.urlMethods.disableUrl, toggleRowSelectionArray)"
          :btn-type="'primary'" :value="toggleRowSelectionArray" :label="$t('common.batchDisable')"
          @success="doSearch" />
      </div>
    </div>


    <!-- 列表-->
    <table-column-preference-setting-api-slot v-model="showFields" :init-data="tableFields"
      :preference-alias="conf.namespace">
      <template v-slot="{ doSave, preferenceData, headerDragend }">

        <hf-table v-if="showFields" v-loading="loading" :table-data="jsonData.list" @row-dblclick="rowdbclick"
          @selection-change="handleSelectionChange" @sort-change="sortChange" @header-dragend="headerDragend">
          <section-table-column />

          <!-- 显示的字段-->
          <hf-base-right-role-columns :show-fields="showFields" :url-methods="conf.urlMethods" @success="doSearch" />
          <el-table-column fixed="right" :label="$t('common.operate')" width="150">
            <template v-slot:header>
              {{ $t('common.operate') }}
              <curd-table-column-select v-model="showFields" :preference-alias="conf.namespace"
                :table-fields="preferenceData" style="float: right" @selectedChange="reRenderTable" @doSave="doSave" />
            </template>
            <template slot-scope="scopeRow">
              <div class="col-btn-display">
                <!-- 更新 -->
                <hf-base-right-role-update v-if="scopeRow.row.initData !== 1" v-permission="['hfBaseRightRole:update']"
                  :value="scopeRow.row" :query-url="conf.urlMethods.queryUrl" :update-url="conf.urlMethods.updateUrl"
                  @success="doSearch" />
                <!-- 删除-->
                <del-btn v-if="scopeRow.row.initData !== 1" v-permission="['hfBaseRightRole:delete']"
                  :url="templateUrl(conf.urlMethods.deleteUrl, scopeRow.row)" :btn-type="'text'" :value="scopeRow.row"
                  @success="doSearch" />
                <!-- 查看 -->
                <!-- <hf-base-right-role-detail :value="scopeRow.row" /> -->
              </div>
            </template>
          </el-table-column>
        </hf-table>
      </template>
    </table-column-preference-setting-api-slot>
    <!-- 抽屉 -->
    <drawer-detail @getshowdetail="getshowdetail" :isshowdetail="isshowdetail" />
    <!-- 总计 -->
    <div class="total">订单总额：1,200,2542.21元，已付款数量：35643条，已付款金额：954,5224,03元</div>
    <!-- 分页信息 -->
    <curd-pagination :current-page.sync="searchForm.pageInfo.pageNo" :page-size.sync="searchForm.pageInfo.pageSize"
      :total="jsonData.total" @size-change="doSearch" @current-change="doSearch" />
  </el-card>
</template>

<script>
import * as conf from './api'
import HfBaseRightRoleAdd from './add'
import HfTable from '@/components/CURD/Table/HfTable'
import { baseApiGetMethod } from '@/components/CURD/baseApi'
import { isSuccessResult } from '@/utils/ajaxResultUtil'
import CurdPagination from '@/components/CURD/pagination/Pagination'
import HfBaseRightRoleUpdate from './update'
import DelBtn from '@/components/CURD/Btns/DelBtn'
import CurdMixin from '@/components/CURD/curd.mixin'
import CurdTableColumnSelect from '@/components/CURD/Table/select/TableColumnSelect'
import HfBaseRightRoleDetail from './detail'
import HfBaseRightRoleColumns from './hfBaseRightRoleColumns'
import TemplateConfirmBtn from '@/components/CURD/Btns/TemplateConfirmBtn'
import FormItemColDict from '@/components/CURD/Form/formItemColDict.vue'
import FormItemCol from '@/components/CURD/Form/formItemCol.vue'
import SimpleSearch from '@/components/CURD/Query/search'
import TableColumnPreferenceSettingApiSlot from '@/views/basic/preferenceSetting/TableColumnPrefenceSettingApiSlot'
import SectionTableColumn from '@/components/CURD/Table/column/base/SectionTableColumn'
import UserBind from '@/views/role/user-bind.vue'
import RoleSettings from '@/views/role/permission-setting.vue'
import DialogBtnPage from '@/components/CURD/Btns/DialogBtnPage'
import PermissionSetting from '@/views/role/permission-setting.vue'
import DrawerDetail from './drawerDetail.vue'

export default {
  name: 'HfBaseRightRoleIndexVue',
  components: {
    SectionTableColumn,
    TemplateConfirmBtn,
    HfBaseRightRoleColumns,
    HfBaseRightRoleDetail,
    CurdTableColumnSelect,
    DelBtn,
    HfBaseRightRoleUpdate,
    CurdPagination,
    HfTable, HfBaseRightRoleAdd,
    FormItemColDict,
    FormItemCol,
    SimpleSearch,
    TableColumnPreferenceSettingApiSlot,
    UserBind,
    RoleSettings,
    DialogBtnPage,
    PermissionSetting,
    DrawerDetail
  },
  mixins: [CurdMixin],

  data() {
    return {
      db: {},
      showFields: null,
      loading: false,
      /**
       * 查询的表单信息
       */
      searchForm: {
        orderNo: null,
        ordertime: null,
        ordertotal: null,
        consignee: null,
        orderstatus: null,
        paystatus: null,
        shipmentstatus: null,
        paymethod: null,
        customerphone: null,
        customeraddress: null,
        customermail: null,
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
      isshowdetail: false,
      // 批量操作
      options: [
        {
          batchVal: 'config',
          label: '设置'
        },
        {
          batchVal: 'markascatalog',
          label: '标记为目录册'
        },
        {
          batchVal: 'del',
          label: '删除'
        }, {
          batchVal: 'import',
          label: '导入'
        }, {
          batchVal: 'export',
          label: '导出',
          children: [{
            batchVal: 'select',
            label: '选中导出'
          }, {
            batchVal: 'singlepage',
            label: '单页导出'
          }, {
            batchVal: 'all',
            label: '全部导出'
          }]
        }],
      batchVal:'',//批量数组
    }
  },

  mounted() {
  },
  created() {
    this.doSearch()
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
    },
    checkboxHasSelect(val) {
      console.log(val)
    },
    /**
     * 执行查询操作
     */
    doSearch() {
      if (this.conf.urlMethods && this.conf.urlMethods.pageUrl) {
        console.log(this.conf, "conf")
        this.loading = true
        // baseApiGetMethod(this.conf.urlMethods.pageUrl, this.searchForm).then(resp => {
        //   if (isSuccessResult(resp)) {
        //     this.$set(this.jsonData, 'list', resp.data.list)
        //     this.$set(this.jsonData, 'total', resp.data.total)
        //   } else {
        //     this.$message.error(resp.message)
        //   }
        //   this.loading = false
        // }).catch(e => {
        //   console.log(e)
        //   this.loading = false
        // })
        const resp = {
          retCode: "00001",
          data: {
            list: [{
              orderNo: 1,
              ordertime: "2022/08/19",
              ordertotal: 2000,
              consignee: "张三莆田华峰啥的那是你的啊骚大师莆田华峰啥的那是你的啊骚大师",
              orderstatus: '已完成',
              paystatus: "待付款",
              shipmentstatus: "已发货",
              paymethod: "支付宝",
              customerphone: "12345448484",
              customeraddress: "莆田华峰啥的那是你的啊骚大师asdasd",
              customermail: "xxx@qq.com",
            }, {
              orderNo: 2,
              ordertime: "2022/08/19",
              ordertotal: 231231313123,
              consignee: "张三",
              orderstatus: '已完成',
              paystatus: "待付款",
              shipmentstatus: "已发货",
              paymethod: "支付宝",
              customerphone: "12345448484",
              customeraddress: "莆田华峰",
              customermail: "xxx@qq.com",
            }, {
              orderNo: 3,
              ordertime: "2022/08/19",
              ordertotal: 2000,
              consignee: "张三",
              orderstatus: '已完成',
              paystatus: "待付款",
              shipmentstatus: "已发货",
              paymethod: "支付宝",
              customerphone: "12345448484",
              customeraddress: "莆田华峰",
              customermail: "xxx@qq.com",
            }, {
              orderNo: 4,
              ordertime: "2022/08/19",
              ordertotal: 2000,
              consignee: "张三",
              orderstatus: '已完成',
              paystatus: "待付款",
              shipmentstatus: "已发货",
              paymethod: "支付宝",
              customerphone: "12345448484",
              customeraddress: "莆田华峰",
              customermail: "xxx@qq.com",
            }, {
              orderNo: 5,
              ordertime: "2022/08/19",
              ordertotal: 2000,
              consignee: "张三",
              orderstatus: '已完成',
              paystatus: "待付款",
              shipmentstatus: "已发货",
              paymethod: "支付宝",
              customerphone: "12345448484",
              customeraddress: "莆田华峰",
              customermail: "xxx@qq.com",
            }, {
              orderNo: 6,
              ordertime: "2022/08/19",
              ordertotal: 2000,
              consignee: "张三",
              orderstatus: '已完成',
              paystatus: "待付款",
              shipmentstatus: "已发货",
              paymethod: "支付宝",
              customerphone: "12345448484",
              customeraddress: "莆田华峰",
              customermail: "xxx@qq.com",
            }, {
              orderNo: 7,
              ordertime: "2022/08/19",
              ordertotal: 2000,
              consignee: "张三",
              orderstatus: '已完成',
              paystatus: "待付款",
              shipmentstatus: "已发货",
              paymethod: "支付宝",
              customerphone: "12345448484",
              customeraddress: "莆田华峰",
              customermail: "xxx@qq.com",
            }, {
              orderNo: 8,
              ordertime: "2022/08/19",
              ordertotal: 2000,
              consignee: "张三",
              orderstatus: '已完成',
              paystatus: "待付款",
              shipmentstatus: "已发货",
              paymethod: "支付宝",
              customerphone: "12345448484",
              customeraddress: "莆田华峰",
              customermail: "xxx@qq.com",
            }, {
              orderNo: 9,
              ordertime: "2022/08/19",
              ordertotal: 2000,
              consignee: "张三",
              orderstatus: '已完成',
              paystatus: "待付款",
              shipmentstatus: "已发货",
              paymethod: "支付宝",
              customerphone: "12345448484",
              customeraddress: "莆田华峰",
              customermail: "xxx@qq.com",
            }, {
              orderNo: 10,
              ordertime: "2022/08/19",
              ordertotal: 2000,
              consignee: "张三",
              orderstatus: '已完成',
              paystatus: "待付款",
              shipmentstatus: "已发货",
              paymethod: "支付宝",
              customerphone: "12345448484",
              customeraddress: "莆田华峰",
              customermail: "xxx@qq.com",
            }],
            page: 1,
            pageSize: 50,
            totalPage: 1,
            total: 4
          },
          message: "OPERATE_SUCCESS",
          success: true
        }
        if (resp) {
          this.$set(this.jsonData, 'list', resp.data.list)
          this.$set(this.jsonData, 'total', resp.data.total)
        } else {
          this.$message.error(resp.message)
        }
        this.loading = false
      } else {
        this.$message.error('请配置分页查询地址参数:{pageUrl: xxxx}')
      }
    },
    /**
     * 双击看详情
     */
    rowdbclick(row, column, event) {
      // 双击行
      this.isshowdetail = true
      console.log(row, "row")
    },
    /**
     * 抽屉子回显
     */
    getshowdetail(data) {
      this.isshowdetail = data
    },
    /**
   * 按钮层
   */
    handleChange(value) {
      console.log(value, '按钮层')
    },
  }
}
</script>

<style scoped lang="less">
/deep/ .col-btn-display>div,
.col-btn-display>.el-button {
  display: inline-block;
  margin-right: 10px;
}

.btnslist {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 20px;
}

.total {
  display: flex;
  justify-content: center;
  margin: 10px 0;
}
</style>
