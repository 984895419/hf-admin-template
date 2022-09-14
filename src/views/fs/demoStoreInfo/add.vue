<template>
  <add-btn :init-data="value">
    <template v-slot="{ closeDialog, data, showState }">
      <cu-form v-if="showState" :value="data" :action-method="addUrl" :form-rules="formRules" v-on="$listeners" @closeDialog="closeDialog">
        <template v-slot="{ errorMessage }">
          <row-span-slot>
            <template v-slot="{ span }">
              <!-- 新增的的字段配置 -->
                              <form-item-col
                    :value="data"
                    :error="errorMessage('companyId')"
                    :span="span"
                    prop="companyId"
                    :namespace="conf.namespace"
                >
                   <demo-company-info-input-refer
                   :value="data"
                   value-refer-id="companyId"
                   value-refer-name="companyIdName"/>
                </form-item-col>
               <form-item-col
                :value="data"
                :error="errorMessage('storeName')"
                :span="span"
                prop="storeName"
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
    import DemoCompanyInfoInputRefer from '@/views/fs/demoCompanyInfo/inputRefer'
    export default {
        name: 'DemoStoreInfoAdd',
        components: {
        DemoCompanyInfoInputRefer,
        FormItemColDict, FormItemCol, RowSpanSlot, FormItemColDateTime,
        CuForm, AddBtn, FormItemColEnableState },
        props: {
            value: {
                type: Object,
                default: function() {
                    return { enableState: 1}
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
