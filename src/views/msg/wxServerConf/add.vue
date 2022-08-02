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
                :error="errorMessage('name')"
                :span="span"
                prop="name"
                :namespace="conf.namespace"
               />
               <form-item-col
                :value="data"
                :error="errorMessage('appId')"
                :span="span"
                prop="appId"
                :namespace="conf.namespace"
               />
               <form-item-col
                :value="data"
                :error="errorMessage('secret')"
                :span="span"
                prop="secret"
                :namespace="conf.namespace"
               />
               <form-item-col
                :value="data"
                :error="errorMessage('token')"
                :span="span"
                prop="token"
                :namespace="conf.namespace"
               />
               <form-item-col
                :value="data"
                :error="errorMessage('aesKey')"
                :span="span"
                prop="aesKey"
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
    import { baseApiPostMethod } from '@/components/CURD/baseApi'
    import FormItemColEnableState from '@/components/CURD/Form/formItemColEnableState'
    export default {
        name: 'WxServerConfAdd',
        components: {
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
        }
    }
</script>

<style scoped>

</style>
