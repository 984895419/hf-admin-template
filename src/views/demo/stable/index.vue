<template>
  <div v-resize="handleResize" class="stable">
    <!-- 查询框 -->
    <div>
      <simple-search v-model="searchForm" :inline="true" @search="doSearch">
        <template v-slot="{ span }">
          <!-- 新增的的字段配置 -->
          <form-item-col :value="searchForm" :span="6" prop="orderNo" :namespace="conf.namespace" />
          <form-item-col :value="searchForm" :span="8" prop="ordertime" :namespace="conf.namespace">
            <el-date-picker v-model="datatimeVal" style="width:100%" type="datetime" placeholder="选择日期时间"
              :picker-options="pickerOptions" />
          </form-item-col>
        </template>
        <template slot="advanced">
          <advanced :conf="conf" :searchForm="searchForm" />
        </template>
      </simple-search>
    </div>
    <!-- 操作栏-->
    <div class="btnslist">
      <!-- 新增组件  -->
      <hf-base-stable-add style="margin-right:10px" :action-url="conf.urlMethods.addUrl" @success="doSearch" />
      <!-- 右边批量操作栏 只有选择checkbox时候 才显示 -->
      <div class="block">
        <el-dropdown v-if="conf.urlMethods.disableUrl
        && toggleRowSelectionArray.length > 0" :hide-on-click="false" trigger="click">
          <span class="el-dropdown-link">
            批量操作<i class="el-icon-arrow-down el-icon--right" />
          </span>
          <!-- 下拉框 -->
          <el-dropdown-menu slot="dropdown">
            <!-- 启用 -->
            <el-dropdown-item icon="el-icon-plus">
              <template-confirm-btn :url="templateUrl(conf.urlMethods.enableUrl, toggleRowSelectionArray)"
                :btn-type="'text'" :label="$t('common.batchEnable')" :value="toggleRowSelectionArray"
                @success="doSearch" />
            </el-dropdown-item>
            <!-- 禁用 -->
            <el-dropdown-item icon="el-icon-circle-plus">
              <template-confirm-btn :url="templateUrl(conf.urlMethods.disableUrl, toggleRowSelectionArray)"
                :btn-type="'text'" :value="toggleRowSelectionArray" :label="$t('common.batchDisable')"
                @success="doSearch" />
            </el-dropdown-item>
            <!-- 删除 -->
            <el-dropdown-item icon="el-icon-circle-plus-outline">
              <del-btn :url="templateUrl(conf.urlMethods.deleteUrl, toggleRowSelectionArray)"
                :value="toggleRowSelectionArray" :label="$t('common.batchDelete')" :btn-type="'text'"
                @success="doSearch" />
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
                      :btn-type="'text'" :label="'选中导出'" @success="doSearch" />
                  </el-dropdown-item>
                  <el-dropdown-item icon="el-icon-circle-plus">
                    <template-confirm-btn
                      :url="templateUrl(conf.urlMethods.batchExportSinglePageUrl, toggleRowSelectionArray)"
                      :btn-type="'text'" :label="'单页导出'" @success="doSearch" />
                  </el-dropdown-item>
                  <el-dropdown-item icon="el-icon-circle-plus-outline">
                    <template-confirm-btn :url="templateUrl(conf.urlMethods.batchExportAllUrl, toggleRowSelectionArray)"
                      :btn-type="'text'" :label="'全部导出'" @success="doSearch" />
                  </el-dropdown-item>
                  <el-dropdown-item icon="el-icon-check">
                    <template-confirm-btn
                      :url="templateUrl(conf.urlMethods.batchExportTemplateUrl, toggleRowSelectionArray)"
                      :btn-type="'text'" :label="'模板导出'" @success="doSearch" />
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div style="float: right;" class="col-btn-display" />
    </div>
    <!-- 主内容区 -->
    <el-card>
      <!-- 列表-->
      <table-column-preference-setting-api-slot v-model="showFields" :init-data="tableFields"
        :preference-alias="conf.namespace">
        <template v-slot="{ doSave, preferenceData, headerDragend }">
          <!-- 主表内容区域 table-data:数据list   maxheight:最大高度  row-dblclick:双击事件 sort-change:表头上出现一个上下箭头图标  headerDragend:拖动列改变宽度事件  handleSelectionChange:checkbox当选项发生变化时会触发该事件 -->
          <hf-table v-if="showFields" v-loading="loading" :table-data="jsonData.list" :maxheight="heightTable"
            @row-dblclick="(row) => { $refs.detail.openDialog(row) }" @selection-change="handleSelectionChange"
            @sort-change="sortChange" @header-dragend="headerDragend">
            <section-table-column />
            <!-- 显示的字段-->
            <!-- table表中右侧操作栏 -->
            <hf-base-right-role-columns :show-fields="showFields" :url-methods="conf.urlMethods" @success="doSearch" />
            <el-table-column fixed="right" :label="$t('common.operate')" width="150">
              <template v-slot:header>
                {{ $t('common.operate') }}
                <curd-table-column-select v-model="showFields" :preference-alias="conf.namespace"
                  :table-fields="preferenceData" style="float: right" @selectedChange="reRenderTable"
                  @doSave="doSave" />
              </template>
              <template slot-scope="scopeRow">
                <div class="col-btn-display">
                  <!-- 更新 -->
                  <hf-base-right-role-update v-if="scopeRow.row.initData !== 1"
                    v-permission="['hfBaseRightRole:update']" :value="scopeRow.row"
                    :query-url="conf.urlMethods.queryUrl" :update-url="conf.urlMethods.updateUrl" @success="doSearch" />
                  <!-- 删除-->
                  <del-btn v-if="scopeRow.row.initData !== 1" v-permission="['hfBaseRightRole:delete']"
                    :url="templateUrl(conf.urlMethods.deleteUrl, scopeRow.row)" :btn-type="'text'" :value="scopeRow.row"
                    @success="doSearch" />
                </div>
              </template>
            </el-table-column>
          </hf-table>
        </template>
      </table-column-preference-setting-api-slot>
      <!-- 双击查看抽屉明细表 rowdata:双击table行数据  -->
      <drawer-detail ref="detail" :title="'订单明细表'" />
    </el-card>
    <!-- 分页信息 -->
    <curd-pagination style="margin-top:10px" :current-page.sync="searchForm.pageInfo.pageNo"
      :page-size.sync="searchForm.pageInfo.pageSize" :total="jsonData.total" @size-change="doSearch"
      @current-change="doSearch" />
  </div>
</template>

<script>
import * as conf from './api'
import HfBaseStableAdd from './add'
import HfTable from '@/components/CURD/Table/HfTable'//单表组件
import { baseApiGetMethod } from '@/components/CURD/baseApi'// 统一请求方法
import { isSuccessResult } from '@/utils/ajaxResultUtil'// 统一请求方法
import CurdPagination from '@/components/CURD/pagination/Pagination'// 分页
import HfBaseRightRoleUpdate from './update'// 更新页面
import DelBtn from '@/components/CURD/Btns/DelBtn'// 删除按钮
import CurdMixin from '@/components/CURD/curd.mixin'
import CurdTableColumnSelect from '@/components/CURD/Table/select/TableColumnSelect'
import HfBaseRightRoleColumns from './hfBaseRightRoleColumns'// 表头
import TemplateConfirmBtn from '@/components/CURD/Btns/TemplateConfirmBtn'// 按钮弹窗
import FormItemColDict from '@/components/CURD/Form/formItemColDict.vue'//el-form 封装组件
import FormItemCol from '@/components/CURD/Form/formItemCol.vue'//普通搜索
import SimpleSearch from '@/components/CURD/Query/search'
import TableColumnPreferenceSettingApiSlot from '@/views/basic/preferenceSetting/TableColumnPrefenceSettingApiSlot'
import SectionTableColumn from '@/components/CURD/Table/column/base/SectionTableColumn'
import DialogBtnPage from '@/components/CURD/Btns/DialogBtnPage'// 按钮弹窗
import DrawerDetail from './drawerDetail.vue'// 双击抽屉详情页
import UploadExcelComponent from '@/components/UploadExcel/index.vue' //本是  excel 导出
import Advanced from "./advanced.vue"//高级搜索弹窗
import Examine from "./examine.vue" //审核页面

export default {
  name: 'HfBaseRightRoleIndexVue',
  components: {
    SectionTableColumn,
    TemplateConfirmBtn,
    HfBaseRightRoleColumns,
    CurdTableColumnSelect,
    DelBtn,
    HfBaseRightRoleUpdate,
    CurdPagination,
    HfTable,
    HfBaseStableAdd,
    FormItemColDict,
    FormItemCol,
    SimpleSearch,
    TableColumnPreferenceSettingApiSlot,
    DialogBtnPage,
    DrawerDetail,
    UploadExcelComponent,
    Advanced,
    Examine
  },
  // 指令:  计算单表的高度 让他自适应高度
  directives: {
    resize: {
      bind(el, binding) {
        let width = ''; let height = ''
        function isReize() {
          const style = document.defaultView.getComputedStyle(el)
          if (width !== style.width || height !== style.height) {
            binding.value({ width: style.width, height: style.height })
          }
          width = style.width
          height = style.height
        }
        el.__vueSetInterval__ = setInterval(isReize, 100)
      },
      unbind(el) {
        clearInterval(el.__vueSetInterval__)
      }
    }
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
      rowdata: null, // 行数据
      heightTable: null, // 计算高度
      auditstatus: '1', // 审核状态
      // 带快捷时间
      pickerOptions: {
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date())
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            picker.$emit('pick', date)
          }
        }, {
          text: '一周前',
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', date)
          }
        }]
      },
      datatimeVal: ''//搜索时间值
    }
  },

  mounted() { },
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
    // 表格宽高
    handleResize({ width, height }) {
      this.heightTable = parseFloat(height) - 210
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

<style scoped lang="less">
/* 表内部分样式 */
.stable {
  margin: 20px 10px 10px 10px;
  height: 100%;
}

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

.advanced-title {
  border-bottom: 1px solid rgb(25, 137, 250);
  padding: 0 0 10px 0;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 10px;
}

.el-dropdown-link {
  cursor: pointer;
  color: #409EFF;
}

.el-icon-arrow-down {
  font-size: 12px;
}

.el-dropdown-menu--mini .el-dropdown-menu__item {
  display: flex;
  align-items: center;
}
</style>
