<template>
  <div>
    <update-btn btn-type="text" :url="templateUrl(queryUrl, value)">
      <template v-slot="{ closeDialog, data }">
        <cu-form :form-rules="formRules" :value="data" :action-method="updateMethod" @success="actionSuccess" @closeDialog="closeDialog">
          <template v-slot="{ errorMessage }">
            <row-span-slot>
              <template v-slot="{ span }">
                <!-- 修改的字段配置 -->
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
                <!-- 字段字段设置方法如下
                <form-item-col-dict
                  :value="data"
                  :error="errorMessage('clientMethod')"
                  :span="span"
                  prop="clientMethod"
                  :dict-code="'CLIENT_METHOD_TYPES'"
                  :namespace="conf.namespace"
                /> -->
              </template>
            </row-span-slot>
          </template>
        </cu-form>
      </template>
    </update-btn>
  </div>
</template>

<script>
    import * as conf from './api'
    import UpdateBtn from '@/components/CURD/Btns/UpdateBtn'
    import CuForm from '@/components/CURD/Form/cuFrom'
    import RowSpanSlot from '@/components/CURD/Slot/RowSpanSlot'
    import FormItemCol from '@/components/CURD/Form/formItemCol'
    import CurdMixin from '@/components/CURD/curd.mixin'
    import { baseApiPutMethod } from '@/components/CURD/baseApi'
    import FormItemColDict from '@/components/CURD/Form/formItemColDict'
    import FormItemColEnableState from '@/components/CURD/Form/formItemColEnableState'
    import WxNotifyTemplateMappingInputRefer from '@/views/msg/wxNotifyTemplateMapping/inputRefer'
    import WxServerConfInputRefer from '@/views/msg/wxServerConf/inputRefer'
    import WxBindConfInputRefer from '@/views/msg/wxBindConf/inputRefer'
    export default {
        name: 'WxNotifyMessageUpdate',
        components: {
      WxNotifyTemplateMappingInputRefer,
      WxServerConfInputRefer,
      WxBindConfInputRefer,
      FormItemColDict, FormItemCol, RowSpanSlot, CuForm, UpdateBtn, FormItemColEnableState },
        mixins: [CurdMixin],
        props: {
            value: {
                type: Object,
                default: function() {
                    return {}
                }
            },
            queryUrl: String,
            updateUrl: String
        },
        data() {
            return {
                conf: conf,
                formRules: null
            }
        },
        computed: {
            updateMethod() {
                return (data) => {
                    return baseApiPutMethod(this.templateUrl(this.updateUrl, data), data)
                }
            }
        },
        created() {
            this.formRules = conf.formRules(this)
        },
        methods: {
            actionSuccess() {
                this.$emit('success')
            }
        }
    }
</script>

<style scoped>

</style>
