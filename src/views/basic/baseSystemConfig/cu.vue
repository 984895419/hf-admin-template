<template>
  <quit-cu :value="value" :conf="conf" v-bind="$attrs" v-on="$listeners">
    <template v-slot="{ span, errorMessage, data }">
      <!-- 新增的的字段配置 -->
      <form-item-col
        :value="data"
        :error="errorMessage('configKey')"
        :span="span"
        prop="configKey"
        :namespace="conf.namespace"
      />
      <form-item-col
        :value="data"
        :error="errorMessage('configValue')"
        :span="span"
        prop="configValue"
        :namespace="conf.namespace"
      />
      <form-item-col
        :value="data"
        :error="errorMessage('configDescription')"
        :span="span"
        prop="configDescription"
        :namespace="conf.namespace"
      />
      <form-item-col-dict
        :value="data"
        :error="errorMessage('terminal')"
        :span="span"
        prop="terminal"
        :dict-code="'CONFIG_TERMINAL'"
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
  name: 'BaseSystemCu',
  props: {
    value: {
      type: Object,
      default: function() {
        return { enableState: 1 }
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
