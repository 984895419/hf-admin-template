<template>
  <quit-input-refer
    :conf="conf"
    :search-form-init="searchFormInit"
    id-prop="jobTypeId"
    name-prop="jobTypeName"
    v-bind="$attrs"
  >
    <template #search="{ span, searchForm}">
      <!-- 新增的的字段配置 -->
      <form-item-col
        :value="searchForm"
        :span="span"
        prop="jobTypeName"
        :namespace="conf.namespace"
      />
      <form-item-col
        :value="searchForm"
        :span="span"
        prop="jobTypeKey"
        :namespace="conf.namespace"
      />
      <form-item-col
        :value="searchForm"
        :span="span"
        prop="jobComponentPath"
        :namespace="conf.namespace"
      />
      <form-item-col
        :value="searchForm"
        :span="span"
        prop="enableState"
        :namespace="conf.namespace"
      />
    </template>
    <template v-slot="{showFields, doSearch}">
      <!-- 显示的字段-->
      <base-job-type-columns
        :show-fields="showFields"
        :url-methods="conf.urlMethods"
        @success="doSearch"
      />
    </template>
  </quit-input-refer>
</template>

<script>
    import * as conf from './api'
    import BaseJobTypeColumns from './baseJobTypeColumns'
    export default {
        name: 'BaseJobTypeInputRefer',
        components: { BaseJobTypeColumns },
        data() {
            return {
                conf: conf,
                /**
                 * 查询的表单信息
                 */
                 searchFormInit: {
                  jobTypeId: null,
                  jobTypeName: null,
                  jobTypeKey: null,
                  jobComponentPath: null,
                  creator: null,
                  createTime: null,
                  modifier: null,
                  modifyTime: null,
                  deleted: null,
                  tenantId: null,
                  enableState: 1
                }
            }
        }
    }
</script>
