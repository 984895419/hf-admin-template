<template>
  <quit-cu :value="value" :conf="conf" v-bind="$attrs" v-on="$listeners">
    <template v-slot="{ span, errorMessage, data }">
      <!-- 新增的的字段配置 -->
      <form-item-col
        :value="data"
        :error="errorMessage('tenantKey')"
        :span="span"
        prop="tenantKey"
        :namespace="conf.namespace"
      />
      <form-item-col
        :value="data"
        :error="errorMessage('tenantName')"
        :span="span"
        prop="tenantName"
        :namespace="conf.namespace"
      />
      <form-item-col
        :value="data"
        :error="errorMessage('tenantDescription')"
        :span="span"
        prop="tenantDescription"
        :namespace="conf.namespace"
      />
      <form-item-col-dict
        :value="data"
        :error="errorMessage('initData')"
        :span="span"
        prop="initData"
        :dict-code="'YES_OR_NO'"
        :namespace="conf.namespace"
      />
      <form-item-col
        :value="data"
        :error="errorMessage('parentId')"
        :span="span"
        prop="parentId"
        :namespace="conf.namespace"
      >
        <base-tenant-input-refer :value="data" value-refer-id="parentId" value-refer-name="parentName" />
      </form-item-col>
      <form-item-col
        :value="data"
        :error="errorMessage('sort')"
        :span="span"
        prop="sort"
        :namespace="conf.namespace"
      />
      <form-item-col-enable-state
        :value="data"
        :span="span"
        :namespace="conf.namespace"
      />
    </template>
  </quit-cu>
</template>

<script>
import * as conf from './api'
export default {
  name: 'BaseTenantCu',
  props: {
    value: {
      type: Object,
      default: function() {
        return { enableState: 1, compositions: [] }
      }
    }
  },
  data() {
    return {
      conf: conf
    }
  }
}
</script>

<style scoped>
</style>
