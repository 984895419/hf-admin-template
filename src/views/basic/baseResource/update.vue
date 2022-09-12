<template>
  <div>
    <update-btn btn-type="text" :url="templateUrl(queryUrl, value)">
      <template v-slot="{ closeDialog, data, showState }">
        <cu-form v-if="showState" :form-rules="formRules" :value="data" :action-method="updateMethod" @success="actionSuccess" @closeDialog="closeDialog">
          <template v-slot="{ errorMessage }">
            <row-span-slot>
              <template v-slot="{ span }">
                <!-- 修改的字段配置 -->
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
                <form-item-col
                  :value="data"
                  :error="errorMessage('micro')"
                  :span="span"
                  prop="micro"
                  :namespace="conf.namespace"
                />
                <form-item-col
                  :value="data"
                  :error="errorMessage('providerUrl')"
                  :span="span"
                  prop="providerUrl"
                  :namespace="conf.namespace"
                />
                <form-item-col
                  :value="data"
                  :error="errorMessage('feignUrl')"
                  :span="span"
                  prop="feignUrl"
                  :namespace="conf.namespace"
                />
                <form-item-col-enable-state
                  :value="data"
                  :span="span"
                  :namespace="conf.namespace"
                />
                <form-item-col
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
    import FormItemColDateTime from '@/components/CURD/Form/formItemColDateTime'
    import FormItemColEnableState from '@/components/CURD/Form/formItemColEnableState'
    import BaseMicroInputRefer from '@/views/basic/baseMicro/inputRefer'
    export default {
        name: 'BaseResourceUpdate',
        components: {
      BaseMicroInputRefer,
      FormItemColDict, FormItemCol, RowSpanSlot, FormItemColDateTime,
      CuForm, UpdateBtn, FormItemColEnableState },
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
