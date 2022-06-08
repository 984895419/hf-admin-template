<template>
  <div>
    <update-btn btn-type="text" :url="templateUrl(queryUrl, value)">
      <template v-slot="{ closeDialog, data }">
        <cu-form :form-rules="formRules" :value="data" :action-method="updateMethod"  @success="actionSuccess" @closeDialog="closeDialog">
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
    import OnlyUserFormItemCol from './OnlyUserFormItemCol'
    import OnlyCompanyFormItemCol from './OnlyCompanyFormItemCol'
    import OnlyDeptFormItemCol from './OnlyDeptFormItemCol'
    import OnlyUserTypeFormItemCol from './OnlyUserTypeFormItemCol'
    export default {
        name: 'SsoLoginPermissionUpdate',
        components: {
            OnlyUserTypeFormItemCol,
            OnlyUserFormItemCol, OnlyCompanyFormItemCol, OnlyDeptFormItemCol, FormItemColDict, FormItemCol, RowSpanSlot, CuForm, UpdateBtn, FormItemColEnableState },
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
