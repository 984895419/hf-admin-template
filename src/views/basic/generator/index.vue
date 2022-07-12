<template>
  <el-card class="app-container">
    <div>
      <simple-search v-model="searchForm" :inline="true" @search="doSearch">
        <template v-slot="{ span }">
          <!-- 新增的的字段配置 -->
          <form-item-col
            :value="searchForm"
            :span="span"
            prop="tableName"
            :namespace="conf.namespace"
          />
          <!-- 字典字段字段设置方法如下 -->
        </template>
      </simple-search>
    </div>
    <div>
      <el-tabs v-model="activeName">
        <el-tab-pane label="表信息" name="first">
          <first-setting :value="tableInfo"/>
        </el-tab-pane>
        <el-tab-pane label="功能列表" name="third">
          <function-setting :value="tableInfo"></function-setting>
        </el-tab-pane>
        <el-tab-pane label="字段信息" name="second">
          <hf-table
            v-loading="loading"
            :table-data="tableInfo.fields"
            rowKey="columnName"
          >
            <el-table-column
              prop="columnName"
              fixed="left"
              :label="$t(conf.namespace + '.columnName')"
              min-width="130"
            />
            <el-table-column
              prop="columnType"
              :label="$t(conf.namespace + '.columnType')"
              min-width="130"
            />
            <el-table-column
              prop="comment"
              :label="$t(conf.namespace + '.comment')"
              min-width="130"
            />
            <el-table-column
              prop="propertyType"
              :label="$t(conf.namespace + '.propertyType')"
              min-width="130"
            />
            <el-table-column
              prop="type"
              :label="$t(conf.namespace + '.type')"
              fixed="left"
              min-width="130"
            />
            <el-table-column
              prop="keyFlag"
              :label="$t(conf.namespace + '.keyFlag')"
              min-width="130"
            >
              <template slot-scope="scopeRow">
                <div v-if="scopeRow.row.keyFlag === true">是</div>
                <div v-else>否</div>
              </template>
            </el-table-column>
            <el-table-column
              prop="keyIdentityFlag"
              :label="$t(conf.namespace + '.keyIdentityFlag')"
              min-width="130"
            >
              <template slot-scope="scopeRow">
                <div v-if="scopeRow.row.keyIdentityFlag === true">是</div>
                <div v-else>否</div>
              </template>
            </el-table-column>
            <el-table-column
              prop="keyWords"
              :label="$t(conf.namespace + '.keyWords')"
              min-width="130"
            >
              <template slot-scope="scopeRow">
                <div v-if="scopeRow.row.keyWords === true">是</div>
                <div v-else>否</div>
              </template>
            </el-table-column>
            <el-table-column
              prop="supportSearch"
              :label="$t(conf.namespace + '.supportSearch')"
              min-width="130"
            >
              <template slot-scope="scopeRow">
                <el-checkbox v-model="scopeRow.row.supportSearch"></el-checkbox>
              </template>
            </el-table-column>
            <el-table-column
              prop="supportAdd"
              :label="$t(conf.namespace + '.supportAdd')"
              min-width="130"
            >
              <template slot-scope="scopeRow">
                <el-checkbox v-model="scopeRow.row.supportAdd"></el-checkbox>
              </template>
            </el-table-column>
            <el-table-column
              prop="supportUpdate"
              :label="$t(conf.namespace + '.supportUpdate')"
              min-width="130"
            >
              <template slot-scope="scopeRow">
                <el-checkbox v-model="scopeRow.row.supportUpdate"></el-checkbox>
              </template>
            </el-table-column>
            <el-table-column
              prop="supportExport"
              :label="$t(conf.namespace + '.supportExport')"
              min-width="130"
            >
              <template slot-scope="scopeRow">
                <el-checkbox v-model="scopeRow.row.supportExport"></el-checkbox>
              </template>
            </el-table-column>
            <el-table-column
              prop="supportImport"
              :label="$t(conf.namespace + '.supportImport')"
              min-width="130"
            >
              <template slot-scope="scopeRow">
                <el-checkbox v-model="scopeRow.row.supportImport"></el-checkbox>
              </template>
            </el-table-column>
            <el-table-column
              prop="supportEmpty"
              :label="$t(conf.namespace + '.supportEmpty')"
              min-width="130"
            >
              <template slot-scope="scopeRow">
                <el-checkbox v-model="scopeRow.row.supportEmpty"></el-checkbox>
              </template>
            </el-table-column>
            <el-table-column
              prop="isRefer"
              :label="$t(conf.namespace + '.referType')"
              min-width="130"
            >
              <template slot-scope="scopeRow">
                <el-select v-model="scopeRow.row.referType">
                  <el-option
                    v-for="item in referTypes"
                     :key="item.value"
                     :value="item.value"
                    :label="item.label"
                  ></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column
              prop="codeReferKey"
              :label="$t(conf.namespace + '.codeReferKey')"
              min-width="130"
            >
              <template slot-scope="scopeRow">
                <base-business-code-input-refer
                  v-if="scopeRow.row.referType === 'code'"
                  v-model="scopeRow.row"
                  value-refer-id="businessKey"
                  value-refer-name="businessName"
                  />
              </template>
            </el-table-column>
            <el-table-column
              prop="dictReferType"
              :label="$t(conf.namespace + '.dictReferType')"
              min-width="130"
            >
              <template slot-scope="scopeRow">
                <base-dict-type-input-refer
                  v-if="scopeRow.row.referType === 'dict'"
                  v-model="scopeRow.row"
                  value-refer-id="dictReferType"
                  value-refer-name="dictReferTypeName"
                />
              </template>
            </el-table-column>
          </hf-table>
        </el-tab-pane>
      </el-tabs>
    </div>
  </el-card>
</template>

<script>
import * as conf from './api'
import SimpleSearch from '../../../components/CURD/Query/search'
import FormItemCol from '../../../components/CURD/Form/formItemCol'
import { baseApiPostMethod } from '../../../components/CURD/baseApi'
import { getData, getMessage, isSuccessResult } from '../../../utils/ajaxResultUtil'
import HfTable from '../../../components/CURD/Table/HfTable'
import FirstSetting from "./FirstSetting";
import FunctionSetting from "./FunctionSetting";
import BaseBusinessCodeInputRefer from "../baseBusinessCode/inputRefer";
import BaseDictTypeInputRefer from "../baseDictType/inputRefer";
/**
 * 代码生成器
 */
export default {
    name: 'Generator',
    components: {
        BaseDictTypeInputRefer,
        BaseBusinessCodeInputRefer, FunctionSetting, FirstSetting, HfTable, FormItemCol, SimpleSearch },
    data() {
        return {
            showFields: null,
            searchForm: {
                tableName: 'base_business_code'
            },
            conf: conf,
            tableInfo: {},
            loading: false,
            activeName: 'second',
            referTypes: [
                {
                    label: '编码',
                    value: 'code'
                },
                {
                    label: '字典',
                    value: 'dict'
                }
            ]
        }
    },
    created() {
      this.doSearch()
    },
    methods: {
        doSearch() {
            this.loading = true;
            baseApiPostMethod(this.conf.urlMethods.originUrl + this.searchForm.tableName).then(resp => {
                this.loading = false
                if (isSuccessResult(resp)) {
                    this.tableInfo = getData(resp)
                } else {
                    this.$message.error(getMessage(resp))
                }
            }).catch(e => {
                this.loading = false
            })
        }
    }
}
</script>

<style scoped>

</style>
