<template>
  <simple-table-layout :table-fields="conf.default" :conf="conf">
    <!-- 查询框 -->

    <!-- 列表-->
    <template v-slot="{showFields, headerDragend}">
      <hf-table
        v-if="showFields"
        v-loading="loading"
        :table-data="jsonData.list"
        @selection-change="handleSelectionChange"
        @sort-change="sortChange"
        @header-dragend="headerDragend"
      >
        <section-table-column />
        <!-- 显示的字段-->
        <demo-composition-info-columns :show-fields="showFields" :url-methods="conf.urlMethods" @success="doSearch" />
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
    </single-table-layout>
  </simple-table-layout></template>

<script>
    import * as conf from './api'
    import { baseApiGetMethod } from '@/components/CURD/baseApi'
    import { isSuccessResult } from '@/utils/ajaxResultUtil'
    import CurdMixin from '@/components/CURD/curd.mixin'
    import DemoCompositionInfoColumns from './demoCompositionInfoColumns'
0
    export default {
        name: 'DemoCompositionInfoIndexVue',
        components: { DemoCompositionInfoColumns },
        mixins: [CurdMixin],
        props: {
          productId: {
            type: [String, Number]
          }
        },
        data() {
            return {
                loading: false,
                /**
                 * 查询的表单信息
                 */
                searchForm: {
                    compositionId: null,
                    productId: this.productId,
                    compositionName: null,
                    compositionRate: null,
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
        watch: {
          productId: {
            handler: function() {
              this.doSearch()
            },
            immediate: true
          }
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
            },
            /**
             * 执行查询操作
             */
            doSearch() {
                if (!this.productId) {
                  return
                }
                this.searchForm.productId = this.productId
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
