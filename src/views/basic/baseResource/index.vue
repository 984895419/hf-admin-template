<template>
  <simple-table-layout :table-fields="conf.default" :conf="conf">
    <template #search>
      <simple-search v-model="searchForm" :inline="true" @search="doSearch">
        <template v-slot="{ span }">
          <!-- 新增的的字段配置 -->
          <form-item-col
            :value="searchForm"
            :span="span"
            prop="resourceKey"
            :namespace="conf.namespace"
          />
          <form-item-col
            :value="searchForm"
            :span="span"
            prop="resourceName"
            :namespace="conf.namespace"
          />
          <form-item-col-dict
            :value="searchForm"
            :span="span"
            prop="micro"
            :dict-code="'YES_OR_NO'"
            :namespace="conf.namespace"
          />
          <form-item-col-enable-state
            :value="searchForm"
            :span="span"
            :show-by="'select'"
            prop="enableState"
            :namespace="conf.namespace"
          />
          <form-item-col
            :value="searchForm"
            :span="span"
            prop="microId"
            :namespace="conf.namespace"
          >
            <base-micro-input-refer
              :value="searchForm"
              value-refer-id="microId"
              value-refer-name="microIdName"
            />
          </form-item-col>
          <!-- 字典字段字段设置方法如下
          <form-item-col-dict
            :value="searchForm"
            :span="span"
            prop="menuType"
            :dict-code="'MENU_TYPE'"
            :namespace="conf.namespace"
          /> -->
        </template>
      </simple-search>
    </template>
    <template #btnslist>
      <base-resource-add v-permission="[conf.namespace + ':save']" :action-url="conf.urlMethods.addUrl" @success="doSearch" />
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
    <template v-slot="{ showFields, headerDragend }">
      <hf-table
        ref="mainTable"
        v-loading="loading"
        :table-data="jsonData.list"
        @selection-change="handleSelectionChange"
        @sort-change="sortChange"
        @header-dragend="headerDragend"
      >
        <section-table-column />
        <!-- 显示的字段-->
        <base-resource-columns :show-fields="showFields" :url-methods="conf.urlMethods" @success="doSearch" />
        <el-table-column
          fixed="right"
          :label="$t('common.operate')"
          width="150"
        >
          <template slot-scope="scopeRow">
            <div class="col-btn-display">
              <!-- 更新 -->
              <base-resource-update
                v-permission="[conf.namespace + ':update']"
                :value="scopeRow.row"
                :query-url="conf.urlMethods.queryUrl"
                :update-url="conf.urlMethods.updateUrl"
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
              <base-resource-detail
                :value="scopeRow.row"
              />
            </div>
          </template>
        </el-table-column>
      </hf-table>
    </template>
    <!-- 分页信息 -->
    <template #pagination>
      <curd-pagination
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
    import SimpleTableLayout from '@/components/CURD/Layout/SimpleTableLayout.vue'
    import BaseResourceAdd from './add'
    import HfTable from '@/components/CURD/Table/HfTable'
    import { baseApiGetMethod } from '@/components/CURD/baseApi'
    import { isSuccessResult } from '@/utils/ajaxResultUtil'
    import CurdPagination from '@/components/CURD/pagination/Pagination'
    import BaseResourceUpdate from './update'
    import DelBtn from '@/components/CURD/Btns/DelBtn'
    import CurdMixin from '@/components/CURD/curd.mixin'
    import CurdTableColumnSelect from '@/components/CURD/Table/select/TableColumnSelect'
    import BaseResourceDetail from './detail'
    import BaseResourceColumns from './baseResourceColumns'
    import TemplateConfirmBtn from '@/components/CURD/Btns/TemplateConfirmBtn'
    import FormItemColDict from '@/components/CURD/Form/formItemColDict.vue'
    import FormItemCol from '@/components/CURD/Form/formItemCol.vue'
    import formItemColEnableState from '@/components/CURD/Form/formItemColEnableState.vue'
    import SimpleSearch from '@/components/CURD/Query/search'
    import SectionTableColumn from '@/components/CURD/Table/column/base/SectionTableColumn'
    import BaseMicroInputRefer from '@/views/basic/baseMicro/inputRefer'

    export default {
        name: 'BaseResourceIndexVue',
        components: {
          BaseMicroInputRefer,
          SectionTableColumn,
          TemplateConfirmBtn,
          BaseResourceColumns,
          BaseResourceDetail,
            CurdTableColumnSelect,
            DelBtn,
          BaseResourceUpdate,
            CurdPagination,
            HfTable, BaseResourceAdd,
          FormItemColDict,
          formItemColEnableState,
          FormItemCol,
          SimpleSearch,
          SimpleTableLayout
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
                    resourceId: null,
                    resourceKey: null,
                    resourceName: null,
                    micro: null,
                    providerUrl: null,
                    feignUrl: null,
                    enableState: null,
                    microId: null,
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
                // this.showFields = []
                // // 标记为重新渲染中
                // this.reRending = true
                // setTimeout(() => {
                //     this.showFields = res
                //     // 标记为重新渲染中
                //     this.reRending = false
                // }, 50)
                this.$nextTick(this.$refs['hf-table']?.doLayout())
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
