<template>
  <div>
    <update-btn btn-type="text" :url="templateUrl(queryUrl, value)">
      <template v-slot="{ closeDialog, data }">
        <cu-form :form-rules="formRules" :value="data" :action-method="updateMethod" @success="actionSuccess" @closeDialog="closeDialog">
          <template v-slot="{ errorMessage }">
            <row-span-slot>
              <template v-slot="{ span }">
                <form-item-col
                  :value="data"
                  :error="errorMessage('clientId')"
                  :span="span"
                  prop="clientId"
                  :namespace="conf.namespace"
                />
                <form-item-col
                  :value="data"
                  :error="errorMessage('clientSecret')"
                  :span="span"
                  prop="clientSecret"
                  :namespace="conf.namespace"
                />
                <form-item-col
                  :value="data"
                  type="input"
                  :error="errorMessage('clientSecret')"
                  :span="span"
                  prop="redirectUri"
                  :namespace="conf.namespace"
                />
                <form-item-col-dict
                  :value="data"
                  :error="errorMessage('clientMethod')"
                  :span="span"
                  prop="clientMethod"
                  :dict-code="'CLIENT_METHOD_TYPES'"
                  :namespace="conf.namespace"
                />
                <form-item-col-dict
                  :value="data"
                  :error="errorMessage('authorizationGrantTypes')"
                  :span="span"
                  multiple
                  prop="authorizationGrantTypes"
                  :dict-code="'AUTHORIZATION_GRANT_TYPES'"
                  :namespace="conf.namespace"
                />
                <form-item-col
                  :value="data"
                  :type="'number'"
                  :error="errorMessage('accessTokenLive')"
                  :span="span"
                  :min="1"
                  prop="accessTokenLive"
                  :namespace="conf.namespace"
                />
                <form-item-col
                  :value="data"
                  :type="'number'"
                  :error="errorMessage('refreshTokenLive')"
                  :span="span"
                  :min="1"
                  prop="refreshTokenLive"
                  :namespace="conf.namespace"
                />
                <form-item-col
                  :value="data"
                  :type="'textarea'"
                  :error="errorMessage('description')"
                  :span="24"
                  :rows="4"
                  :min="1"
                  prop="description"
                  :namespace="conf.namespace"
                />
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
    import UpdateBtn from '../../../components/CURD/Btns/UpdateBtn'
    import CuForm from '../../../components/CURD/Form/cuFrom'
    import RowSpanSlot from '../../../components/CURD/Slot/RowSpanSlot'
    import FormItemCol from '../../../components/CURD/Form/formItemCol'
    import CurdMixin from '@/components/CURD/curd.mixin'
    import { baseApiPutMethod } from '../../../components/CURD/baseApi'
    import FormItemColDict from '../../../components/CURD/Form/formItemColDict'
    export default {
        name: 'SsoClientUpdate',
        components: { FormItemColDict, FormItemCol, RowSpanSlot, CuForm, UpdateBtn },
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
