<template>
  <add-btn :init-data="value">
    <template v-slot="{ closeDialog, data, showState }">
      <cu-form v-if="showState" :value="data" :action-method="addUrl" :form-rules="formRules" v-on="$listeners" @closeDialog="closeDialog">
        <template v-slot="{ errorMessage }">
          <el-divider content-position="left">{{ $t(conf.namespace + '.baseInfo') }}</el-divider>
          <row-span-slot>
            <template v-slot="{ span }">
              <!-- 新增的的字段配置 -->
              <form-item-col
                :value="data"
                :error="errorMessage('resourceKey')"
                :span="span"
                prop="resourceKey"
                :namespace="conf.namespace"
              />
              <form-item-col
                :value="data"
                :error="errorMessage('resourceName')"
                :span="span"
                prop="resourceName"
                :namespace="conf.namespace"
              />
              <form-item-col-enable-state
                :value="data"
                :span="span"
                :namespace="conf.namespace"
              />
            </template>
          </row-span-slot>
          <el-divider content-position="left">{{ $t(conf.namespace + '.microInfo') }}</el-divider>
          <row-span-slot>
            <template v-slot="{ span }">
              <form-item-col-dict
                :value="data"
                :dict-code="'YES_OR_NO'"
                :error="errorMessage('micro')"
                :span="span"
                prop="micro"
                :namespace="conf.namespace"
              />
              <form-item-col
                v-if="data.micro + '' === '1'"
                :value="data"
                :error="errorMessage('microId')"
                :span="span"
                prop="microId"
                :namespace="conf.namespace"
              >
                <base-micro-input-refer
                  :value="data"
                  value-refer-id="microId"
                  value-refer-name="microIdName"
                />
              </form-item-col>
              <form-item-col
                v-if="data.micro + '' === '1'"
                :value="data"
                :error="errorMessage('providerUrl')"
                :span="24"
                prop="providerUrl"
                :namespace="conf.namespace"
              />
              <form-item-col
                v-if="data.micro + '' === '1'"
                :value="data"
                :error="errorMessage('feignUrl')"
                :span="24"
                prop="feignUrl"
                :namespace="conf.namespace"
              />

            </template>
          </row-span-slot>
        </template>
      </cu-form>
    </template>
  </add-btn>
</template>

<script>
    import * as conf from './api'
    import AddBtn from '@/components/CURD/Btns/AddBtn'
    import CuForm from '@/components/CURD/Form/cuFrom'
    import RowSpanSlot from '@/components/CURD/Slot/RowSpanSlot'
    import FormItemCol from '@/components/CURD/Form/formItemCol'
    import FormItemColDict from '@/components/CURD/Form/formItemColDict'
    import FormItemColDateTime from '@/components/CURD/Form/formItemColDateTime'
    import { baseApiPostMethod } from '@/components/CURD/baseApi'
    import FormItemColEnableState from '@/components/CURD/Form/formItemColEnableState'
    import BaseMicroInputRefer from '@/views/basic/baseMicro/inputRefer'
    export default {
        name: 'BaseResourceAdd',
        components: {
        BaseMicroInputRefer,
        FormItemColDict, FormItemCol, RowSpanSlot, FormItemColDateTime,
        CuForm, AddBtn, FormItemColEnableState },
        props: {
            value: {
                type: Object,
                default: function() {
                    return { enableState: 1 }
                }
            },
            actionUrl: String
        },
        data() {
            return {
                conf: conf,
                formRules: null
            }
        },
        computed: {
            addUrl() {
              return (data) => {
                  return baseApiPostMethod(this.actionUrl, data)
              }
            }
        },
        created() {
          this.formRules = conf.formRules(this)
        }
    }
</script>

<style scoped>

</style>
