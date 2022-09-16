<template>
  <!-- 父子表布局 -->
  <father-son-layout :table-fields="conf.default" :conf="conf">
    <template #search>

      <simple-search v-model="searchForm" :inline="true" @search="doSearch">
        <template v-slot="{ span }">
          <!-- 新增的的字段配置 -->
          <form-item-col
            :value="searchForm"
            :span="span"
            prop="productName"
            :namespace="conf.namespace"
          />
          <form-item-col
            :value="searchForm"
            :span="span"
            prop="productStyle"
            :namespace="conf.namespace"
          />
          <!-- 字典字段字段设置方法如下
          <form-item-col-dict
            :value="searchForm"
            :span="span"
            prop="menuType"
            :dict-code="'MENU_TYPE'"
            :namespace="conf.namespace"
          /> -->
        </template>
        <template #advanced="{span}">
          <form-item-col
            :value="searchForm"
            :span="span"
            prop="productAddress"
            :namespace="conf.namespace"
          />
          <form-item-col
            :value="searchForm"
            :span="span"
            prop="companyId"
            :namespace="conf.namespace"
          >
            <demo-company-info-input-refer
              :value="searchForm"
              value-refer-id="companyId"
              value-refer-name="companyIdName"
            />
          </form-item-col>
          <form-item-col
            :value="searchForm"
            :span="span"
            prop="storeId"
            :namespace="conf.namespace"
          >
            <demo-store-info-input-refer
              :value="searchForm"
              :company-id="searchForm.companyId"
              value-refer-id="storeId"
              value-refer-name="storeIdName"
            />
          </form-item-col>
          <form-item-col
            :value="searchForm"
            :span="span"
            prop="productExpiredTime"
            :namespace="conf.namespace"
          />
          <form-item-col-enable-state
            :value="searchForm"
            :span="span"
            prop="enableState"
            :namespace="conf.namespace"
            show-by="select"
          />
        </template>
      </simple-search>
    </template>
    <template #btnslist>
      <product-cu
        v-permission="[conf.namespace + ':save']"
        @success="doSearch"
      />
      <div style="float: right" class="col-btn-display">
        <del-btn
          v-if="conf.urlMethods.deleteUrl
            && toggleRowSelectionArray.length > 0"
          v-permission="[conf.namespace + ':delete']"
          :url="templateUrl(conf.urlMethods.deleteUrl, toggleRowSelectionArray)"
          :value="toggleRowSelectionArray"
          :label="$t('common.batchDelete')"
          @success="doSearch"
        />
        <template-confirm-btn
          v-if="conf.urlMethods.enableUrl
            && toggleRowSelectionArray.length > 0"
          v-permission="[conf.namespace + ':enable']"
          :url="templateUrl(conf.urlMethods.enableUrl, toggleRowSelectionArray)"
          :btn-type="'primary'"
          :label="$t('common.batchEnable')"
          :value="toggleRowSelectionArray"
          @success="doSearch"
        />
        <template-confirm-btn
          v-if="conf.urlMethods.disableUrl
            && toggleRowSelectionArray.length > 0"
          v-permission="[conf.namespace + ':disable']"
          :url="templateUrl(conf.urlMethods.disableUrl, toggleRowSelectionArray)"
          :btn-type="'primary'"
          :value="toggleRowSelectionArray"
          :label="$t('common.batchDisable')"
          @success="doSearch"
        />
      </div>
    </template>
    <template v-slot="{ showFields, headerDragend, rowClick}">
      <hf-table
        v-if="showFields"
        v-loading="loading"
        :table-data="jsonData.list"
        @selection-change="handleSelectionChange"
        @sort-change="sortChange"
        @header-dragend="headerDragend"
        @row-click="rowClick"
      >
        <section-table-column />
        <!-- 显示的字段-->
        <demo-product-info-columns :show-fields="showFields" :url-methods="conf.urlMethods" @success="doSearch" />
        <el-table-column
          fixed="right"
          :label="$t('common.operate')"
          width="150"
        >
          <template slot-scope="scopeRow">
            <div class="col-btn-display">
              <!-- 更新 -->
              <product-cu
                v-permission="[conf.namespace + ':update']"
                :value="scopeRow.row"
                @success="doSearch"
              />
              <!-- 删除-->
              <del-btn
                v-permission="[conf.namespace + ':delete']"
                :url="templateUrl(conf.urlMethods.deleteUrl, scopeRow.row)"
                :btn-type="'text'"
                :value="scopeRow.row"
                @success="doSearch"
              />
              <!-- 查看 -->
              <demo-product-info-detail
                :value="scopeRow.row"
              />
            </div>
          </template>
        </el-table-column>
      </hf-table>
    </template>
    <template #pagination>
      <curd-pagination
        :current-page.sync="searchForm.pageInfo.pageNo"
        :page-size.sync="searchForm.pageInfo.pageSize"
        :total="jsonData.total"
        @size-change="doSearch"
        @current-change="doSearch"
      />
    </template>
    <template #children="{ row}">
      <CompositionIndex v-if="row" :product-id="row.productId" />
    </template>
  </father-son-layout>
</template>

<script>
    import * as conf from './api'
    import HfTable from '@/components/CURD/Table/HfTable'
    import { baseApiGetMethod } from '@/components/CURD/baseApi'
    import { isSuccessResult } from '@/utils/ajaxResultUtil'
    import CurdPagination from '@/components/CURD/pagination/Pagination'
    import DelBtn from '@/components/CURD/Btns/DelBtn'
    import CurdMixin from '@/components/CURD/curd.mixin'
    import DemoProductInfoDetail from './detail'
    import DemoProductInfoColumns from './demoProductInfoColumns'
    import TemplateConfirmBtn from '@/components/CURD/Btns/TemplateConfirmBtn'
    import FormItemColDict from '@/components/CURD/Form/formItemColDict.vue'
    import FormItemCol from '@/components/CURD/Form/formItemCol.vue'
    import SimpleSearch from '@/components/CURD/Query/search'
    import DemoCompanyInfoInputRefer from '@/views/fs/demoCompanyInfo/inputRefer'
    import DemoStoreInfoInputRefer from '@/views/fs/demoStoreInfo/inputRefer'
    import ProductCu from './cu.vue'
    import CompositionIndex from '../demoCompositionInfo'

    export default {
        name: 'DemoProductInfoIndexVue',
        components: {
          CompositionIndex,
          DemoCompanyInfoInputRefer,
          DemoStoreInfoInputRefer,
          TemplateConfirmBtn,
          DemoProductInfoColumns,
          DemoProductInfoDetail,
            DelBtn,
          ProductCu,
            CurdPagination,
            HfTable,
          FormItemColDict,
          FormItemCol,
          SimpleSearch
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
                    productId: null,
                    productName: null,
                    productStyle: null,
                    productAddress: null,
                    companyId: null,
                    storeId: null,
                    productExpiredTime: null,
                    enableState: null,
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
                toggleRowSelectionArray: []
            }
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
            }
        }
    }
</script>

<style scoped>
  /deep/ .col-btn-display > div,
  .col-btn-display > .el-button {
    display: inline-block;
    margin-right: 10px;
  }
</style>
