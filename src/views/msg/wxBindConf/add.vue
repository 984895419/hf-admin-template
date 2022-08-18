<template>
  <add-btn :init-data="value">
    <template v-slot="{ closeDialog, data }">
      <cu-form :value="data" :action-method="addUrl" :form-rules="formRules" v-on="$listeners" @closeDialog="closeDialog">
        <template v-slot="{ errorMessage }">
          <row-span-slot>
            <template v-slot="{ span }">
              <!-- 新增的的字段配置 -->
              <form-item-col
                :value="data"
                :error="errorMessage('bindMobile')"
                :span="span"
                prop="bindMobile"
                :namespace="conf.namespace"
              />
              <form-item-col
                :value="data"
                :error="errorMessage('bindCompany')"
                :span="span"
                prop="bindCompany"
                :namespace="conf.namespace"
              />
              <form-item-col
                :value="data"
                :error="errorMessage('auditState')"
                :span="span"
                prop="auditState"
                :namespace="conf.namespace"
              />
              <form-item-col
                :value="data"
                :error="errorMessage('bindNickName')"
                :span="span"
                prop="bindNickName"
                :namespace="conf.namespace"
              />
              <form-item-col-enable-state
                :value="data"
                :span="span"
                :namespace="conf.namespace"
              />
              <form-item-col
                :value="data"
                :error="errorMessage('wxId')"
                :span="span"
                prop="wxId"
                :namespace="conf.namespace"
              >
                <wx-server-conf-input-refer
                  :value="data"
                  value-refer-id="wxId"
                  value-refer-name="wxIdName"
                />
              </form-item-col>
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
    import { baseApiPostMethod } from '@/components/CURD/baseApi'
    import FormItemColEnableState from '@/components/CURD/Form/formItemColEnableState'
    import WxServerConfInputRefer from '@/views/msg/wxServerConf/inputRefer'
    export default {
        name: 'WxBindConfAdd',
        components: {
        WxServerConfInputRefer,
        FormItemColDict, FormItemCol, RowSpanSlot, CuForm, AddBtn, FormItemColEnableState },
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
