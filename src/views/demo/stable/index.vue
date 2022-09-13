<template>
  <simple-table-layout :conf="conf" :table-fields="tableFields">
    <!-- 查询框 -->
    <template #search>
      <simple-search v-model="searchForm" :inline="true" label-width="100px" @search="doSearch">
        <template v-slot="{ span }">
          <!-- 新增的的字段配置 -->
          <form-item-col :value="searchForm" :span="span" prop="orderNo" :namespace="conf.namespace" />
          <form-item-col-date-time :value="searchForm" :span="span" prop="ordertime" :namespace="conf.namespace" />
        </template>
        <template #advanced="{ span }">
          <form-item-col :value="searchForm" :span="span" prop="ordertotal" :namespace="conf.namespace" />
          <form-item-col :value="searchForm" :span="span" prop="consignee" :namespace="conf.namespace" />
          <form-item-col :value="searchForm" :span="span" prop="orderstatus" :namespace="conf.namespace" />
          <form-item-col :value="searchForm" :span="span" prop="paystatus" :namespace="conf.namespace" />
          <form-item-col :value="searchForm" :span="span" prop="shipmentstatus" :namespace="conf.namespace" />
          <form-item-col :value="searchForm" :span="span" prop="paymethod" :namespace="conf.namespace" />
          <form-item-col :value="searchForm" :span="span" prop="customerphone" :namespace="conf.namespace" />
          <form-item-col :value="searchForm" :span="span" prop="customeraddress" :namespace="conf.namespace" />
          <form-item-col :value="searchForm" :span="span" prop="customermail" :namespace="conf.namespace" />

          <form-item-col-date-time-range
            :value="searchForm"
            :span="span"
            prop="ordertime"
            :namespace="conf.namespace"
            :min-prop="'createTimeMin'"
            :max-prop="'createTimeMax'"
          />
        </template>
      </simple-search>
    </template>

    <!-- 操作栏-->
    <template #btnslist>
      <!-- 新增组件  -->
      <demo-cu style="margin-right:10px" :action-url="conf.urlMethods.addUrl" @success="doSearch" />
      <!-- 右边批量操作栏 只有选择checkbox时候 才显示 -->
      <div class="block">
        <el-dropdown
          v-if="conf.urlMethods.disableUrl
            && toggleRowSelectionArray.length > 0"
          :hide-on-click="false"
          trigger="click"
        >
          <el-button class="el-dropdown-link">
            批量操作<i class="el-icon-arrow-down el-icon--right" />
          </el-button>
          <!-- 下拉框 -->
          <el-dropdown-menu slot="dropdown">
            <!-- 启用 -->
            <el-dropdown-item icon="el-icon-plus">
              <template-confirm-btn
                :url="templateUrl(conf.urlMethods.enableUrl, toggleRowSelectionArray)"
                :btn-type="'text'"
                :label="$t('common.batchEnable')"
                :value="toggleRowSelectionArray"
                @success="doSearch"
              />
            </el-dropdown-item>
            <!-- 禁用 -->
            <el-dropdown-item icon="el-icon-circle-plus">
              <template-confirm-btn
                :url="templateUrl(conf.urlMethods.disableUrl, toggleRowSelectionArray)"
                :btn-type="'text'"
                :value="toggleRowSelectionArray"
                :label="$t('common.batchDisable')"
                @success="doSearch"
              />
            </el-dropdown-item>
            <!-- 删除 -->
            <el-dropdown-item icon="el-icon-circle-plus-outline">
              <del-btn
                :url="templateUrl(conf.urlMethods.deleteUrl, toggleRowSelectionArray)"
                :value="toggleRowSelectionArray"
                :label="$t('common.batchDelete')"
                :btn-type="'text'"
                @success="doSearch"
              />
            </el-dropdown-item>
            <!-- 审核 -->
            <el-dropdown-item icon="el-icon-check">
              <examine :auditstatus="auditstatus" />
            </el-dropdown-item>
            <!-- 导入 -->
            <el-dropdown-item icon="el-icon-circle-check">
              <dialog-btn-page :type="'text'" :label="'导入'" :title="'导入'">
                <upload-excel-component :on-success="handleSuccess" :before-upload="beforeUpload" />
              </dialog-btn-page>
            </el-dropdown-item>
            <!-- 导出集合 -->
            <el-dropdown-item icon="el-icon-circle-check">
              <el-dropdown :hide-on-click="false" placement="bottom">
                <span class="el-dropdown-link">
                  导出
                </span>
                <el-dropdown-menu slot="dropdown">
                  <!--批量导出 功能块-->
                  <el-dropdown-item icon="el-icon-plus">
                    <template-confirm-btn
                      :url="templateUrl(conf.urlMethods.batchExportSelectUrl, toggleRowSelectionArray)"
                      :btn-type="'text'"
                      :label="'选中导出'"
                      @success="doSearch"
                    />
                  </el-dropdown-item>
                  <el-dropdown-item icon="el-icon-circle-plus">
                    <template-confirm-btn
                      :url="templateUrl(conf.urlMethods.batchExportSinglePageUrl, toggleRowSelectionArray)"
                      :btn-type="'text'"
                      :label="'单页导出'"
                      @success="doSearch"
                    />
                  </el-dropdown-item>
                  <el-dropdown-item icon="el-icon-circle-plus-outline">
                    <template-confirm-btn
                      :url="templateUrl(conf.urlMethods.batchExportAllUrl, toggleRowSelectionArray)"
                      :btn-type="'text'"
                      :label="'全部导出'"
                      @success="doSearch"
                    />
                  </el-dropdown-item>
                  <el-dropdown-item icon="el-icon-check">
                    <template-confirm-btn
                      :url="templateUrl(conf.urlMethods.batchExportTemplateUrl, toggleRowSelectionArray)"
                      :btn-type="'text'"
                      :label="'模板导出'"
                      @success="doSearch"
                    />
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </template>

    <!-- 列表-->
    <template v-slot="{ doSave, headerDragend, showFields, heightTable }">
      <!-- 主表内容区域 table-data:数据list   maxheight:最大高度  row-dblclick:双击事件 sort-change:表头上出现一个上下箭头图标  headerDragend:拖动列改变宽度事件  handleSelectionChange:checkbox当选项发生变化时会触发该事件 -->
      <hf-table
        v-if="showFields"
        v-loading="loading"
        :table-data="jsonData.list"
        :maxheight="heightTable"
        @row-dblclick="(row) => { $refs.detail.openDialog(row) }"
        @selection-change="handleSelectionChange"
        @sort-change="sortChange"
        @header-dragend="headerDragend"
      >
        <section-table-column />
        <!-- 显示的字段-->
        <!-- table表中右侧操作栏 -->
        <!-- <hf-base-right-role-columns-dynamic :show-fields="showFields" /> -->
        <hf-base-right-role-columns :show-fields="showFields" />
        <operate-table-column>
          <template slot-scope="scopeRow">
            <div class="col-btn-display">
              <!-- 更新 -->
              <demo-cu
                v-if="scopeRow.row.initData !== 1"
                v-permission="['hfBaseRightRole:update']"
                :value="scopeRow.row"
                @success="doSearch"
              />
              <!-- 删除-->
              <del-btn
                v-if="scopeRow.row.initData !== 1"
                v-permission="['hfBaseRightRole:delete']"
                :url="templateUrl(conf.urlMethods.deleteUrl, scopeRow.row)"
                :btn-type="'text'"
                :value="scopeRow.row"
                @success="doSearch"
              />
            </div>
          </template>
        </operate-table-column>
      </hf-table>
      <!-- 双击查看抽屉明细表 rowdata:双击table行数据  -->
      <drawer-detail ref="detail" :title="'订单明细表'" />
    </template>

    <!-- 分页-->
    <template #pagination>
      <!-- 分页信息 -->
      <curd-pagination
        style="margin-top:10px"
        :current-page.sync="searchForm.pageInfo.pageNo"
        :page-size.sync="searchForm.pageInfo.pageSize"
        :total="jsonData.total"
        @size-change="doSearch"
        @current-change="doSearch"
      />
    </template>
  </simple-table-layout>
</template>

<script>
import * as conf from './api'
import HfTable from '@/components/CURD/Table/HfTable'// 单表组件
import { baseApiGetMethod } from '@/components/CURD/baseApi'// 统一请求方法
import { isSuccessResult } from '@/utils/ajaxResultUtil'// 统一请求方法
import CurdPagination from '@/components/CURD/pagination/Pagination'// 分页
import DemoCu from './cu'// 更新页面
import DelBtn from '@/components/CURD/Btns/DelBtn'// 删除按钮
import CurdMixin from '@/components/CURD/curd.mixin'
import HfBaseRightRoleColumns from './hfBaseRightRoleColumns'// 表头
import hfBaseRightRoleColumnsDynamic from './hfBaseRightRoleColumnsDynamic'// 表头
import TemplateConfirmBtn from '@/components/CURD/Btns/TemplateConfirmBtn'// 按钮弹窗
import FormItemColDict from '@/components/CURD/Form/formItemColDict.vue'// el-form 封装组件
import formItemColDateTime from '@/components/CURD/Form/formItemColDateTime.vue'// el-form 封装组件
import FormItemCol from '@/components/CURD/Form/formItemCol.vue'// 普通搜索
import SimpleSearch from '@/components/CURD/Query/search'
import SectionTableColumn from '@/components/CURD/Table/column/base/SectionTableColumn'
import OperateTableColumn from '@/components/CURD/Table/column/OperateTableColumn'
import DialogBtnPage from '@/components/CURD/Btns/DialogBtnPage'// 按钮弹窗
import DrawerDetail from './drawerDetail.vue'// 双击抽屉详情页
import UploadExcelComponent from '@/components/UploadExcel/index.vue' // 本是  excel 导出
import Examine from './examine.vue' // 审核页面
import SimpleTableLayout from '@/components/CURD/Layout/SimpleTableLayout.vue'
import FormItemColDateTimeRange from '@/components/CURD/Form/formItemColDateTimeRange.vue'

export default {
  name: 'HfBaseRightRoleIndexVue',
  components: {
    SectionTableColumn,
    TemplateConfirmBtn,
    HfBaseRightRoleColumns,
    hfBaseRightRoleColumnsDynamic,
    DelBtn,
    CurdPagination,
    HfTable,
    DemoCu,
    FormItemColDict,
    formItemColDateTime,
    FormItemCol,
    SimpleSearch,
    DialogBtnPage,
    DrawerDetail,
    UploadExcelComponent,
    Examine,
    SimpleTableLayout,
    FormItemColDateTimeRange,
    OperateTableColumn
  },

  mixins: [CurdMixin],

  data() {
    return {
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
      // 统一的配置
      conf: conf,
      // 表单数据初始化
      jsonData: {
        list: [],
        total: 0
      },
      // 表单表头项
      tableFields: conf.default,
      // 选中数据
      toggleRowSelectionArray: [],
      auditstatus: '1' // 审核状态
    }
  },

  mounted() { },
  created() {
    this.doSearch()
  },
  methods: {
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
      console.log(section, 'section')
    },
    /**
     * 执行查询操作
     */
    doSearch() {
      if (this.conf.urlMethods && this.conf.urlMethods.pageUrl) {
        console.log(this.conf, 'conf')
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
          retCode: '00001',
          data: {
            list: [{
              orderNo: 1,
              ordertime: '2022/08/19',
              ordertotal: 2000,
              consignee: '张三莆田华峰啥的那是你的啊骚大师莆田华峰啥的那是你的啊骚大师',
              orderstatus: '已完成',
              paystatus: '待付款',
              shipmentstatus: '已发货',
              paymethod: '支付宝',
              customerphone: '12345448484',
              customeraddress: '莆田华峰啥的那是你的啊骚大师asdasd',
              customermail: 'xxx@qq.com'
            }, {
              orderNo: 2,
              ordertime: '2022/08/19',
              ordertotal: 231231313123,
              consignee: '张三',
              orderstatus: '已完成',
              paystatus: '待付款',
              shipmentstatus: '已发货',
              paymethod: '支付宝',
              customerphone: '12345448484',
              customeraddress: '莆田华峰',
              customermail: 'xxx@qq.com'
            }, {
              orderNo: 3,
              ordertime: '2022/08/19',
              ordertotal: 2000,
              consignee: '张三',
              orderstatus: '已完成',
              paystatus: '待付款',
              shipmentstatus: '已发货',
              paymethod: '支付宝',
              customerphone: '12345448484',
              customeraddress: '莆田华峰',
              customermail: 'xxx@qq.com'
            }, {
              orderNo: 4,
              ordertime: '2022/08/19',
              ordertotal: 2000,
              consignee: '张三',
              orderstatus: '已完成',
              paystatus: '待付款',
              shipmentstatus: '已发货',
              paymethod: '支付宝',
              customerphone: '12345448484',
              customeraddress: '莆田华峰',
              customermail: 'xxx@qq.com'
            }, {
              orderNo: 5,
              ordertime: '2022/08/19',
              ordertotal: 2000,
              consignee: '张三',
              orderstatus: '已完成',
              paystatus: '待付款',
              shipmentstatus: '已发货',
              paymethod: '支付宝',
              customerphone: '12345448484',
              customeraddress: '莆田华峰',
              customermail: 'xxx@qq.com'
            }, {
              orderNo: 6,
              ordertime: '2022/08/19',
              ordertotal: 2000,
              consignee: '张三',
              orderstatus: '已完成',
              paystatus: '待付款',
              shipmentstatus: '已发货',
              paymethod: '支付宝',
              customerphone: '12345448484',
              customeraddress: '莆田华峰',
              customermail: 'xxx@qq.com'
            }, {
              orderNo: 7,
              ordertime: '2022/08/19',
              ordertotal: 2000,
              consignee: '张三',
              orderstatus: '已完成',
              paystatus: '待付款',
              shipmentstatus: '已发货',
              paymethod: '支付宝',
              customerphone: '12345448484',
              customeraddress: '莆田华峰',
              customermail: 'xxx@qq.com'
            }, {
              orderNo: 8,
              ordertime: '2022/08/19',
              ordertotal: 2000,
              consignee: '张三',
              orderstatus: '已完成',
              paystatus: '待付款',
              shipmentstatus: '已发货',
              paymethod: '支付宝',
              customerphone: '12345448484',
              customeraddress: '莆田华峰',
              customermail: 'xxx@qq.com'
            }, {
              orderNo: 9,
              ordertime: '2022/08/19',
              ordertotal: 2000,
              consignee: '张三',
              orderstatus: '已完成',
              paystatus: '待付款',
              shipmentstatus: '已发货',
              paymethod: '支付宝',
              customerphone: '12345448484',
              customeraddress: '莆田华峰',
              customermail: 'xxx@qq.com'
            }, {
              orderNo: 10,
              ordertime: '2022/08/19',
              ordertotal: 2000,
              consignee: '张三',
              orderstatus: '已完成',
              paystatus: '待付款',
              shipmentstatus: '已发货',
              paymethod: '支付宝',
              customerphone: '12345448484',
              customeraddress: '莆田华峰',
              customermail: 'xxx@qq.com'
            }, {
              orderNo: 11,
              ordertime: '2022/08/19',
              ordertotal: 2000,
              consignee: '张三',
              orderstatus: '已完成',
              paystatus: '待付款',
              shipmentstatus: '已发货',
              paymethod: '支付宝',
              customerphone: '12345448484',
              customeraddress: '莆田华峰',
              customermail: 'xxx@qq.com'
            }, {
              orderNo: 12,
              ordertime: '2022/08/19',
              ordertotal: 2000,
              consignee: '张三',
              orderstatus: '已完成',
              paystatus: '待付款',
              shipmentstatus: '已发货',
              paymethod: '支付宝',
              customerphone: '12345448484',
              customeraddress: '莆田华峰',
              customermail: 'xxx@qq.com'
            }, {
              orderNo: 13,
              ordertime: '2022/08/19',
              ordertotal: 2000,
              consignee: '张三',
              orderstatus: '已完成',
              paystatus: '待付款',
              shipmentstatus: '已发货',
              paymethod: '支付宝',
              customerphone: '12345448484',
              customeraddress: '莆田华峰',
              customermail: 'xxx@qq.com'
            }, {
              orderNo: 14,
              ordertime: '2022/08/19',
              ordertotal: 2000,
              consignee: '张三',
              orderstatus: '已完成',
              paystatus: '待付款',
              shipmentstatus: '已发货',
              paymethod: '支付宝',
              customerphone: '12345448484',
              customeraddress: '莆田华峰',
              customermail: 'xxx@qq.com'
            }, {
              orderNo: 10,
              ordertime: '2022/08/19',
              ordertotal: 2000,
              consignee: '张三',
              orderstatus: '已完成',
              paystatus: '待付款',
              shipmentstatus: '已发货',
              paymethod: '支付宝',
              customerphone: '12345448484',
              customeraddress: '莆田华峰',
              customermail: 'xxx@qq.com'
            }, {
              orderNo: 10,
              ordertime: '2022/08/19',
              ordertotal: 2000,
              consignee: '张三',
              orderstatus: '已完成',
              paystatus: '待付款',
              shipmentstatus: '已发货',
              paymethod: '支付宝',
              customerphone: '12345448484',
              customeraddress: '莆田华峰',
              customermail: 'xxx@qq.com'
            }, {
              orderNo: 10,
              ordertime: '2022/08/19',
              ordertotal: 2000,
              consignee: '张三',
              orderstatus: '已完成',
              paystatus: '待付款',
              shipmentstatus: '已发货',
              paymethod: '支付宝',
              customerphone: '12345448484',
              customeraddress: '莆田华峰',
              customermail: 'xxx@qq.com'
            }, {
              orderNo: 10,
              ordertime: '2022/08/19',
              ordertotal: 2000,
              consignee: '张三',
              orderstatus: '已完成',
              paystatus: '待付款',
              shipmentstatus: '已发货',
              paymethod: '支付宝',
              customerphone: '12345448484',
              customeraddress: '莆田华峰',
              customermail: 'xxx@qq.com'
            }, {
              orderNo: 10,
              ordertime: '2022/08/19',
              ordertotal: 2000,
              consignee: '张三',
              orderstatus: '已完成',
              paystatus: '待付款',
              shipmentstatus: '已发货',
              paymethod: '支付宝',
              customerphone: '12345448484',
              customeraddress: '莆田华峰',
              customermail: 'xxx@qq.com'
            }],
            page: 1,
            pageSize: 50,
            totalPage: 1,
            total: 4
          },
          message: 'OPERATE_SUCCESS',
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
    handleSuccess() {
      // 导入成功回调
    },
    // 导入前判断
    beforeUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 1
      if (isLt1M) {
        return true
      }
      this.$message({
        message: '文件大于1M 请重新上传',
        type: 'warning'
      })
      return false
    }
  }
}
</script>
<style lang="less" scoped>

.block /deep/ .el-dropdown-menu__item {
    display: flex!important;
    align-items: center;
  }
</style>
