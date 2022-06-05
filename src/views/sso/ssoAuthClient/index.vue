<template>
    <el-card class="app-container">
        <div>
          <sso-client-search :inline="true" v-model="searchForm" @search="doSearch">
            <el-form-item label="客户端ID">
              <el-input v-model="searchForm.clientId" placeholder="请输入客户端ID"></el-input>
            </el-form-item>
          </sso-client-search>
        </div>
        <div style="margin-bottom: 10px">
          <sso-client-add :action-url="conf.urlMethods.addUrl"/>
        </div>
      <hf-table :table-data="jsonData.list" v-loading="loading">
        <el-table-column prop="clientId"  label="客户端ID" width="130"> </el-table-column>
        <el-table-column prop="clientSecret"  label="客户端密钥" width="180"> </el-table-column>
        <el-table-column prop="redirectUri"  label="重定向地址" width="180"> </el-table-column>
        <enable-state-table-column
            :operate="true"
            :enable-url="conf.urlMethods.enableUrl"
            :disable-url="conf.urlMethods.disableUrl"
            @success="doSearch"/>
        <tag-table-column prop="clientMethodName"  label="客户端支持的认证方式" width="180"></tag-table-column>
        <tag-table-column prop="authorizationGrantTypesNames"  label="支持认证方式" width="180"> </tag-table-column>
        <el-table-column prop="description"  label="描述"> </el-table-column>
        <create-audit-table-column/>
        <el-table-column
          fixed="right"
          label="操作"
          width="150"
        >
          <template slot-scope="scopeRow">
            <sso-client-update :value="scopeRow.row"
                               @success="doSearch"
                               :query-url="conf.urlMethods.queryUrl"
                               :update-url="conf.urlMethods.updateUrl">

            </sso-client-update>
          </template>
        </el-table-column>
      </hf-table>
      <curd-pagination
        :current-page="searchForm.pageInfo.pageNo"
        :page-size="searchForm.pageInfo.pageSize"
        :total="jsonData.total"
        @size-change="doSearch"
        @current-change="doSearch"
      />
    </el-card>
</template>

<script>
import * as conf from './api'
import SsoClientAdd from "./add";
import HfTable from "../../../components/CURD/Table/HfTable";
import {baseApiGetMethod} from "../../../components/CURD/baseApi";
import {isSuccessResult} from "../../../utils/ajaxResultUtil";
import SsoClientSearch from "./search";
import RowSpanSlot from "../../../components/CURD/Slot/RowSpanSlot";
import FormItemCol from "../../../components/CURD/Form/formItemCol";
import EnableStateTableColumn from "../../../components/CURD/Table/column/EnableStateTableColumn";
import CurdPagination from "../../../components/CURD/pagination/Pagination";
import SsoClientUpdate from "./update";
import TagTableColumn from "../../../components/CURD/Table/column/TagTableColumn";
import CreateAuditTableColumn from "../../../components/CURD/Table/column/CreateAuditTableColumn";

export default {
    name: 'SsoAuthClientIndexVue',
    components: {
        CreateAuditTableColumn,
        TagTableColumn,
        SsoClientUpdate,
        CurdPagination, EnableStateTableColumn, FormItemCol, RowSpanSlot, SsoClientSearch, HfTable, SsoClientAdd },
    data() {
        return {
            loading: false,
            /**
             * 查询的表单信息
             */
            searchForm: {
                clientId: null,
                /**
                 * 分页信息
                 */
                pageInfo: {
                    pageNo: 1,
                    pageSize: 100
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
            }
        }
    },
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
            console.log(column, prop, order)
            // 设置排序字段信息
            this.searchForm.sortInfo = [{
                sort: order === 'ascending' ? 0 : 1,
                fieldName: prop
            }]
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

</style>
