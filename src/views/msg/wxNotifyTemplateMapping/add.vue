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
                    :error="errorMessage('wxId')"
                    :span="span"
                    prop="wxId"
                    :namespace="conf.namespace"
                >
                   <wx-server-conf-input-refer
                   :value="data"
                   value-refer-id="wxId"
                   value-refer-name="wxIdName"
                   :value-expend-refers="['appId']"
                   />
                </form-item-col>
              <template-list
                v-if="data.appId"
                :value="data"
                :error="errorMessage('templateId')"
                :span="span"
                prop="templateId"
                :namespace="conf.namespace"
                @change="selectHandler"
                :app-id="data.appId"/>
<!--               <form-item-col-->
<!--                :value="data"-->
<!--                :error="errorMessage('mapping')"-->
<!--                :span="span"-->
<!--                prop="mapping"-->
<!--                :namespace="conf.namespace"-->
<!--               />-->

              <form-item-text
                :value="data"
                :error="errorMessage('templateTitle')"
                :span="span"
                prop="templateTitle"
                :namespace="conf.namespace"
              />
              <form-item-col-enable-state
                :value="data"
                :span="span"
                :namespace="conf.namespace"
              />

              <form-item-text
                :value="data"
                :error="errorMessage('templateContent')"
                :span="24"
                prop="templateContent"
                :namespace="conf.namespace"
              />
              <form-item-col-text-area
                :value="data"
                :error="errorMessage('exampleData')"
                :span="24"
                prop="exampleData"
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
    import WxServerConfInputRefer from '@/views/msg/wxServerConf/inputRefer'
    import TemplateList from "./TemplateList";
    import FormItemText from "../../../components/CURD/Form/formItemText";
    import FormItemColTextArea from "../../../components/CURD/Form/formItemColTextarea";
    export default {
        name: 'WxNotifyTemplateMappingAdd',
        components: {
            FormItemColTextArea,
            FormItemText,
            TemplateList,
        WxServerConfInputRefer,
        FormItemColDict, FormItemCol, RowSpanSlot, CuForm, AddBtn, FormItemColEnableState },
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
        },
        methods: {
            selectHandler(data, obj) {
                this.$set(data, 'templateTitle', obj.title)
                this.$set(data, 'templateContent', obj.content)
            }
        }
    }
</script>

<style scoped>

</style>
