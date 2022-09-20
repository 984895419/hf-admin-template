<template>
  <quit-input-refer
    :conf="conf"
    :search-form-init="searchFormInit"
    v-bind="$attrs"
    id-prop="userId"
    name-prop="userName"
  >
    <template #search="{ span, searchForm}">
      <!-- 查询的字段配置 -->
      <form-item-col
        :value="searchForm"
        :span="span"
        prop="userCode"
        :namespace="conf.namespace"
      />
      <form-item-col
        :value="searchForm"
        :span="span"
        prop="userName"
        :namespace="conf.namespace"
      />
    </template>
    <template v-slot="{showFields, doSearch}">
      <!-- 显示的字段-->
      <hf-base-user-info-columns
        :show-fields="showFields"
        :url-methods="conf.urlMethods"
        @success="doSearch"
      />
    </template>
  </quit-input-refer>
</template>

<script>
  import * as conf from './api'
  import HfBaseUserInfoColumns from './hfBaseUserInfoColumns'
  export default {
    name: 'HfBaseUserInfoInputRefer',
    components: { HfBaseUserInfoColumns },
    data() {
      return {
        conf: conf,
        /**
         * 查询的表单信息
         */
        searchFormInit: {
          userId: null,
          userCode: null,
          userName: null,
          enableState: 1
        }
      }
    }
  }
</script>
