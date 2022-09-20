<template>
  <quit-multiple-refer
    :value="value"
    v-bind="$attrs"
    :search-form-init="searchFormInit"
    :conf="conf"
    :unique-column="uniqueColumn"
    v-on="$listeners"
  >
    <template #search="{ span, searchForm }">
      <!-- 新增的的字段配置 -->
      <form-item-col
        :value="searchForm"
        :span="span"
        prop="userCode"
        :namespace="conf.namespace"
      />
    </template>
    <template v-slot="{showFields, doSearch}">
      <hf-base-user-info-columns :show-fields="showFields" :url-methods="conf.urlMethods" @success="doSearch" />
    </template>
  </quit-multiple-refer>
</template>

<script>
    import * as conf from './api'
    import HfBaseUserInfoColumns from './hfBaseUserInfoColumns'
    export default {
        name: 'HfBaseUserInfoMultipleRefer',
        components: { HfBaseUserInfoColumns },
        props: {
            value: {
                type: Array,
                require: true
            }
        },
        data() {
            return {
                conf: conf,
                uniqueColumn: 'userId',
                searchFormInit: {
                    userId: null,
                    userCode: null,
                    userName: null
                }
            }
        }
    }
</script>

<style scoped>

</style>
