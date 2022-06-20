<template>
  <add-btn :init-data="value">
    <template v-slot="{ closeDialog, data }">
      <cu-form :namespace="conf.namespace" :value="data" :action-method="addUrl" :form-rules="formRules" v-on="$listeners" @closeDialog="closeDialog">
        <template v-slot="{ errorMessage }">
          <row-span-slot>
            <template v-slot="{ span }">
              <!-- 新增的的字段配置 -->
              <form-item-col
                :value="data"
                :error="errorMessage('appName')"
                :span="span"
                prop="appName"
                :namespace="conf.namespace"
              />
              <form-item-col-dict
                :value="data"
                :span="span"
                prop="noLoginType"
                :dict-code="'NO_LOGIN_TYPE'"
                :namespace="conf.namespace"
              />
              <form-item-col-enable-state
                :value="data"
                :span="span"
                :namespace="conf.namespace"
              />
              <form-item-col
                :value="data"
                :error="errorMessage('sort')"
                :span="span"
                prop="sort"
                :namespace="conf.namespace"
              />
              <form-item-col
                :value="data"
                :error="errorMessage('homeUri')"
                :span="span"
                prop="homeUri"
                :namespace="conf.namespace"
              />
              <form-item-col
                :value="data"
                :error="errorMessage('internetHomeUri')"
                :span="span"
                prop="internetHomeUri"
                :namespace="conf.namespace"
              />
              <form-item-col
                :value="data"
                :error="errorMessage('tokenUri')"
                :span="span"
                prop="tokenUri"
                :namespace="conf.namespace"
              />
              <form-item-col
                :value="data"
                :error="errorMessage('protectUri')"
                :span="span"
                prop="protectUri"
                :namespace="conf.namespace"
              />
              <form-item-col-upload-image
                :value="data"
                :error="errorMessage('icon')"
                :span="span"
                prop="icon"
                :full-path-name="'iconPath'"
                :namespace="conf.namespace"
              />
              <!-- 字典字段字段设置方法如下
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
    import FormItemColUploadImage from '@/components/CURD/Form/formItemColUploadImage'
    import FormItemColEnableState from '@/components/CURD/Form/formItemColEnableState'
    export default {
        name: 'SsoLoginAppAdd',
        components: { FormItemColEnableState, FormItemColUploadImage, FormItemColDict, FormItemCol, RowSpanSlot, CuForm, AddBtn },
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
