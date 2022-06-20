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
    import FormItemColUploadImage from '../../../components/CURD/Form/formItemColUploadImage'
    import FormItemColEnableState from '../../../components/CURD/Form/formItemColEnableState'
    export default {
        name: 'SsoLoginAppUpdate',
        components: {
            FormItemColEnableState,
            FormItemColUploadImage, FormItemColDict, FormItemCol, RowSpanSlot, CuForm, UpdateBtn },
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
