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
        <template v-slot:btns>
          <el-button type="primary" @click="mergerFields">查询合并字段</el-button>
          <el-button type="primary" @click="loadFromHistory">从历史记录查询</el-button>
        </template>
      </simple-search>
    </div>
    <div>
      <generator-prefence-setting-api-solt ref="generatorSetting" v-model="tableInfo" :preference-alias="searchForm.tableName">
        <template v-slot="{ preferenceData, doSave }">
          <div>
            <el-button style="float:right" @click="doSave(tableInfo)">保存</el-button>
          </div>
          <el-tabs v-model="activeName">
            <el-tab-pane label="表信息" name="first">
              <first-setting :value="tableInfo" />
            </el-tab-pane>
            <el-tab-pane label="功能列表" name="third">
              <function-setting :value="tableInfo" />
            </el-tab-pane>
            <el-tab-pane label="字段信息" name="second">
              <hf-table
                v-loading="loading"
                :table-data="tableInfo.fields"
                row-key="columnName"
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
                    <el-checkbox v-model="scopeRow.row.supportSearch" />
                  </template>
                </el-table-column>
                <el-table-column
                  prop="supportAdd"
                  :label="$t(conf.namespace + '.supportAdd')"
                  min-width="130"
                >
                  <template slot-scope="scopeRow">
                    <el-checkbox v-model="scopeRow.row.supportAdd" />
                  </template>
                </el-table-column>
                <el-table-column
                  prop="supportUpdate"
                  :label="$t(conf.namespace + '.supportUpdate')"
                  min-width="130"
                >
                  <template slot-scope="scopeRow">
                    <el-checkbox v-model="scopeRow.row.supportUpdate" />
                  </template>
                </el-table-column>
                <el-table-column
                  prop="supportExport"
                  :label="$t(conf.namespace + '.supportExport')"
                  min-width="130"
                >
                  <template slot-scope="scopeRow">
                    <el-checkbox v-model="scopeRow.row.supportExport" />
                  </template>
                </el-table-column>
                <el-table-column
                  prop="supportImport"
                  :label="$t(conf.namespace + '.supportImport')"
                  min-width="130"
                >
                  <template slot-scope="scopeRow">
                    <el-checkbox v-model="scopeRow.row.supportImport" />
                  </template>
                </el-table-column>
                <el-table-column
                  prop="supportEmpty"
                  :label="$t(conf.namespace + '.supportEmpty')"
                  min-width="130"
                >
                  <template slot-scope="scopeRow">
                    <el-checkbox v-model="scopeRow.row.supportEmpty" />
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
                      />
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
                <el-table-column
                  prop="regexReferType"
                  :label="$t(conf.namespace + '.regexReferType')"
                  min-width="130"
                >
                  <template slot-scope="scopeRow">
                    <base-regex-rule-input-refer
                      v-if="scopeRow.row.referType === 'regex'"
                      v-model="scopeRow.row"
                      value-refer-id="regexReferType"
                      value-refer-name="regexReferTypeName"
                    />
                  </template>
                </el-table-column>
              </hf-table>
            </el-tab-pane>
          </el-tabs>
        </template>
      </generator-prefence-setting-api-solt>
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
import FirstSetting from './FirstSetting'
import FunctionSetting from './FunctionSetting'
import BaseBusinessCodeInputRefer from '../baseBusinessCode/inputRefer'
import BaseDictTypeInputRefer from '../baseDictType/inputRefer'
import BaseRegexRuleInputRefer from '../baseRegexRule/inputRefer'
import GeneratorPrefenceSettingApiSolt from '../preferenceSetting/GeneratorPrefenceSettingApiSolt.vue'
/**
 * 代码生成器
 */
export default {
    name: 'Generator',
    components: {
    BaseDictTypeInputRefer,
    BaseBusinessCodeInputRefer,
    BaseRegexRuleInputRefer,
    FunctionSetting,
    FirstSetting,
    HfTable,
    FormItemCol,
    SimpleSearch,
    GeneratorPrefenceSettingApiSolt
},
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
                },
                {
                    label: '正则',
                    value: 'regex'
                }
            ]
        }
    },
    created() {
      this.doSearch()
    },
    methods: {
        doSearch() {
            this.readyDoSearch((val) => {
              this.tableInfo = val
            })
        },
        readyDoSearch(cb) {
            this.loading = true
            baseApiPostMethod(this.conf.urlMethods.originUrl + this.searchForm.tableName).then(resp => {
                this.loading = false
                if (isSuccessResult(resp)) {
                    cb(getData(resp))
                } else {
                    this.$message.error(getMessage(resp))
                }
            }).catch(e => {
                this.loading = false
            })
        },
        mergerFields() {
            this.readyDoSearch((val) => {
              const fieldNames = this.tableInfo.fields.map(t => t.columnName)
              for (const field in val.feilds) {
                if (fieldNames.indexOf(field.columnName) < 0) {
                  this.tableInfo.fields.push(field)
                }
              }
            })
        },
        loadFromHistory() {
          this.$refs.generatorSetting.doQuery()
        }
    }
}
</script>

<style scoped>

</style>
