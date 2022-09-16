<template>
  <component :is="componentBtn" :init-data="initValue" v-bind="componentAttrs">
    <template v-slot="{ closeDialog, data }">
      <cu-form
        :namespace="conf.namespace"
        :value="data"
        :action-method="actionMethod"
        :form-rules="formRules"
        v-on="$listeners"
        @closeDialog="closeDialog"
      >
        <template v-slot="{ errorMessage }">
          <row-span-slot>
            <template v-slot="{ span }">
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
          </row-span-slot>
        </template>
      </cu-form>
    </template>
  </component>
</template>

<script>
import { mapGetters } from 'vuex'
import * as conf from './api'
import CurdMixin from '@/components/CURD/curd.mixin'
import { baseApiPostMethod, baseApiPutMethod } from '@/components/CURD/baseApi'
export default {
  name: 'HfBaseRightRoleCu',
  mixins: [CurdMixin],
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
      conf: conf,
      formRules: null
    }
  },
  computed: {
    ...mapGetters([
      'tenantId'
    ]),
    existId() {
      return this.value[this.conf.primaryKeyField]
    },
    initValue() {
      return this.existId ? undefined : this.value
    },
    actionMethod() {
      return (data) => {
        if (this.existId) {
          return baseApiPutMethod(this.templateUrl(this.conf.urlMethods.updateUrl, data), data)
        } else {
          return baseApiPostMethod(this.conf.urlMethods.addUrl, data)
        }
      }
    },
    /**
     * 主键按钮的类型
     */
    componentBtn() {
      // 如果主键的值存在，则为修改，否则为新增
      if (this.existId) {
        return 'update-btn'
      } else {
        return 'add-btn'
      }
    },
    /**
     * componentAttrs的属性
     */
    componentAttrs() {
      // 如果主键的值存在，则为修改，否则为新增
      if (this.existId) {
        return {
          type: 'text',
          url: this.templateUrl(this.conf.urlMethods.queryUrl, this.value)
        }
      } else {
        return {}
      }
    }
  },
  created() {
    this.formRules = conf.formRules(this)
  },
  methods: {
    selectHandler(value, row) {
      value.productAddress = row.companyAddress
    }
  }
}
</script>

<style scoped>
</style>
