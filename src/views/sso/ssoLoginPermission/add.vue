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
                :error="errorMessage('permissionName')"
                :span="span"
                prop="permissionName"
                :namespace="conf.namespace"
               />
              <form-item-col-dict
                :value="data"
                :error="errorMessage('permissionType')"
                :span="span"
                prop="permissionType"
                :dict-code="'PERMISSION_TYPE'"
                :namespace="conf.namespace"
              />
              <form-item-col-enable-state
                :value="data"
                :span="span"
                :namespace="conf.namespace"
              />
              <!-- 指定用户类型可见 -->
              <only-user-type-form-item-col
                v-if="data.permissionType === 'ONLY_THE_TYPE'"
                :value="data"
                :span="span"
                :error-message="errorMessage"/>
              <!-- 指定用户 -->
               <only-user-form-item-col
                 v-if="data.permissionType === 'ONLY_USER'"
                 :value="data"
                 :error-message="errorMessage"
               >
               </only-user-form-item-col>
              <only-company-form-item-col
                v-if="data.permissionType === 'ONLY_COMPANY'"
                :value="data"
                :error-message="errorMessage"
              />
              <only-dept-form-item-col
                v-if="data.permissionType === 'ONLY_DEPT'"
                :value="data"
                :error-message="errorMessage"
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
    import FormItemColEnableState from '@/components/CURD/Form/formItemColEnableState'
    import OnlyUserFormItemCol from './OnlyUserFormItemCol'
    import OnlyCompanyFormItemCol from './OnlyCompanyFormItemCol'
    import OnlyDeptFormItemCol from './OnlyDeptFormItemCol'
    import OnlyUserTypeFormItemCol from './OnlyUserTypeFormItemCol'
    export default {
        name: 'SsoLoginPermissionAdd',
        components: {
            OnlyUserTypeFormItemCol,
            OnlyDeptFormItemCol,
            OnlyCompanyFormItemCol,
            OnlyUserFormItemCol, FormItemColDict, FormItemCol, RowSpanSlot, CuForm, AddBtn, FormItemColEnableState },
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
