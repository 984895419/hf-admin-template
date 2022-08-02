<template>
  <div>
    <update-btn btn-type="text" :url="templateUrl(queryUrl, value)">
      <template v-slot="{ closeDialog, data }">
        <cu-form :form-rules="formRules" :value="data" :action-method="updateMethod"  @success="actionSuccess" @closeDialog="closeDialog">
          <template v-slot="{ errorMessage }">
            <row-span-slot>
              <template v-slot="{ span }">
                <!-- 修改的字段配置 -->
                                <form-item-col
                  :value="data"
                  :error="errorMessage('notifyKey')"
                  :span="span"
                  prop="notifyKey"
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
                    value-refer-name="wxIdName"/>
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
                <form-item-col
                  :value="data"
                  :error="errorMessage('exampleData')"
                  :span="span"
                  prop="exampleData"
                  :namespace="conf.namespace"
                />
                <form-item-col
                  :value="data"
                  :error="errorMessage('templateContent')"
                  :span="span"
                  prop="templateContent"
                  :namespace="conf.namespace"
                />
                <form-item-col
                  :value="data"
                  :error="errorMessage('templateTitle')"
                  :span="span"
                  prop="templateTitle"
                  :namespace="conf.namespace"
                />
                <form-item-col
                  :value="data"
                  :error="errorMessage('mapping')"
                  :span="span"
                  prop="mapping"
                  :namespace="conf.namespace"
                />
                <form-item-col-enable-state
                  :value="data"
                  :span="span"
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
    import WxServerConfInputRefer from '@/views/msg/wxServerConf/inputRefer'
    import TemplateList from "./TemplateList";
    export default {
        name: 'WxNotifyTemplateMappingUpdate',
        components: {
            TemplateList,
      WxServerConfInputRefer,
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
            },
            selectHandler(data, obj) {
                this.$set(data, 'templateTitle', obj.title)
                this.$set(data, 'templateContent', obj.content)
            }
        }
    }
</script>

<style scoped>

</style>
