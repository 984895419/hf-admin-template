<template>
  <add-btn :init-data="value">
    <template v-slot="{ closeDialog, data }">
      <cu-form :value="data" :action-method="addUrl" :form-rules="formRules" v-on="$listeners" @closeDialog="closeDialog">
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
  </add-btn>
</template>

<script>
    import * as conf from './api'
    import AddBtn from '../../../components/CURD/Btns/AddBtn'
    import CuForm from '../../../components/CURD/Form/cuFrom'
    import RowSpanSlot from '../../../components/CURD/Slot/RowSpanSlot'
    import FormItemCol from '../../../components/CURD/Form/formItemCol'
    import FormItemColDict from '../../../components/CURD/Form/formItemColDict'
    import { baseApiPostMethod } from '@/components/CURD/baseApi'
    export default {
        name: 'SsoClientAdd',
        components: { FormItemColDict, FormItemCol, RowSpanSlot, CuForm, AddBtn },
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
