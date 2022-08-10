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
                :error="errorMessage('notifyId')"
                :span="span"
                prop="notifyId"
                :namespace="conf.namespace"
              >
                <wx-notify-template-mapping-input-refer
                  :value="data"
                  value-refer-id="notifyId"
                  value-refer-name="notifyIdName"
                />
              </form-item-col>
              <form-item-col
                :value="data"
                :error="errorMessage('data')"
                :span="span"
                prop="data"
                :namespace="conf.namespace"
              />
              <form-item-col
                :value="data"
                :error="errorMessage('mapping')"
                :span="span"
                prop="mapping"
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
              <form-item-col
                :value="data"
                :error="errorMessage('bindId')"
                :span="span"
                prop="bindId"
                :namespace="conf.namespace"
              >
                <wx-bind-conf-input-refer
                  :value="data"
                  value-refer-id="bindId"
                  value-refer-name="bindIdName"
                />
              </form-item-col>
              <form-item-col
                :value="data"
                :error="errorMessage('sendState')"
                :span="span"
                prop="sendState"
                :namespace="conf.namespace"
              />
              <form-item-col
                :value="data"
                :error="errorMessage('reason')"
                :span="span"
                prop="reason"
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
    import { baseApiPostMethod } from '@/components/CURD/baseApi'
    import FormItemColEnableState from '@/components/CURD/Form/formItemColEnableState'
    import WxNotifyTemplateMappingInputRefer from '@/views/msg/wxNotifyTemplateMapping/inputRefer'
    import WxServerConfInputRefer from '@/views/msg/wxServerConf/inputRefer'
    import WxBindConfInputRefer from '@/views/msg/wxBindConf/inputRefer'
    export default {
        name: 'WxNotifyMessageAdd',
        components: {
        WxNotifyTemplateMappingInputRefer,
        WxServerConfInputRefer,
        WxBindConfInputRefer,
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
