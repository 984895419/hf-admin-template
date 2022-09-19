<template>
  <simple-table-layout :table-fields="conf.default" :conf="conf">
    <!-- 查询框 -->
    <template #search>
      <simple-search v-model="searchForm" :inline="true" @search="doSearch">
        <template v-slot="{ span }">
          <!-- 新增的的字段配置 -->
          <form-item-col
            :value="searchForm"
            :span="span"
            prop="configKey"
            :namespace="conf.namespace"
          />
          <form-item-col
            :value="searchForm"
            :span="span"
            prop="configValue"
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
      </simple-search>
    </template>
    <!-- 操作栏-->
    <template #btnslist>
      <system-config-cu @success="doSearch" />
      <del-btn
        v-if="conf.urlMethods.deleteUrl
          && toggleRowSelectionArray.length > 0"
        :url="templateUrl(conf.urlMethods.deleteUrl, toggleRowSelectionArray)"
        :value="toggleRowSelectionArray"
        :label="$t('common.batchDelete')"
        @success="doSearch"
      />
      <template-confirm-btn
        v-if="conf.urlMethods.enableUrl
          && toggleRowSelectionArray.length > 0"
        :url="templateUrl(conf.urlMethods.enableUrl, toggleRowSelectionArray)"
        :btn-type="'primary'"
        :label="$t('common.batchEnable')"
        :value="toggleRowSelectionArray"
        @success="doSearch"
      />
      <template-confirm-btn
        v-if="conf.urlMethods.disableUrl
          && toggleRowSelectionArray.length > 0"
        :url="templateUrl(conf.urlMethods.disableUrl, toggleRowSelectionArray)"
        :btn-type="'primary'"
        :value="toggleRowSelectionArray"
        :label="$t('common.batchDisable')"
        @success="doSearch"
      />
      <export-btn
        v-if="conf.urlMethods.exportDataUrl"
        v-model="searchForm"
        :url="conf.urlMethods.exportDataUrl"
        http-method="post"
        :btn-type="'primary'"
        :label="$t('导出')"
      />
    </template>
    <!-- 列表-->
    <template v-slot="{showFields, headerDragend, heightTable}">
      <hf-table
        v-if="showFields"
        v-loading="loading"
        :table-data="jsonData.list"
        :maxheight="heightTable"
        sort-change-selection-change="
        handle-selection-change-
        @sort-change="
        @header-dragend="headerDragend"
      >
        <section-table-column />
        <!-- 显示的字段-->
        <base-system-config-columns :show-fields="showFields" :url-methods="conf.urlMethods" @success="doSearch" />
        <el-table-column
          fixed="right"
          :label="$t('common.operate')"
          width="150"
        >
          <template slot-scope="scopeRow">
            <div class="col-btn-display">
              <!-- 更新 -->
              <system-config-cu
                v-permission="['baseSystemConfig:update']"
                :value="scopeRow.row"
                @success="doSearch"
              />
              <!-- 删除-->
              <del-btn
                v-if="scopeRow.row.initData !== '1'"
                v-permission="['baseSystemConfig:delete']"
                :url="templateUrl(conf.urlMethods.deleteUrl, scopeRow.row)"
                :btn-type="'text'"
                :value="scopeRow.row"
                @success="doSearch"
              />
              <!-- 查看 -->
              <base-system-config-detail
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
        import SystemConfigCu from './cu'
        import { isSuccessResult } from '@/utils/ajaxResultUtil'
        import CurdMixin from '@/components/CURD/curd.mixin'
        import BaseSystemConfigDetail from './detail'
        import BaseSystemConfigColumns from './baseSystemConfigColumns'
        import { baseApiGetMethod } from '@/components/CURD/baseApi'

        export default {
        name: 'BaseSystemConfigIndexVue',
        components: {
          BaseSystemConfigColumns,
          BaseSystemConfigDetail,
          SystemConfigCu
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
                    configKey: null,
                    configValue: null,
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
