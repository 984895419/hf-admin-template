<template>
  <add-btn :init-data="value">
    <template v-slot="{ closeDialog, data }">
      <cu-form :value="data" :action-method="addUrl" :inline="true" @closeDialog="closeDialog">
        <template v-slot="{ errorMessage }">
          <row-span-slot>
            <template v-slot="{ span }">
              <form-item-col
                :value="data"
                :error="errorMessage('clientId')"
                :span="span"
                prop="clientId"
                placeholder="请输入客户端Id"
                label="客户端ID"
              />
              <form-item-col
                :value="data"
                :error="errorMessage('clientSecret')"
                :span="span"
                prop="clientSecret"
                placeholder="请输入客户端密钥"
                label="客户端密钥"
              />
              <form-item-col
                :value="data"
                type="input"
                :error="errorMessage('clientSecret')"
                :span="span"
                prop="redirectUri"
                placeholder="请输入重定向url"
                  label="重定向url"
              />
              <form-item-col-dict
                :value="data"
                :error="errorMessage('clientMethod')"
                :span="span"
                prop="clientMethod"
                placeholder="请选择客户端支持的认证方式"
                label="客户端认证方式"
                :dict-code="'CLIENT_METHOD_TYPES'"
              />
              <form-item-col-dict
                :value="data"
                :error="errorMessage('authorizationGrantTypes')"
                :span="span"
                multiple
                prop="authorizationGrantTypes"
                placeholder="请选择支持的授权认证方式"
                label="授权认证方式"
                :dict-code="'AUTHORIZATION_GRANT_TYPES'"
              />
              <form-item-col
                :value="data"
                :type="'number'"
                :error="errorMessage('accessTokenLive')"
                :span="span"
                :min="1"
                prop="accessTokenLive"
                placeholder="请输入accessToken存活时间"
                label="accessToken存活时间（秒）"
              />
              <form-item-col
                :value="data"
                :type="'number'"
                :error="errorMessage('refreshTokenLive')"
                :span="span"
                :min="1"
                prop="refreshTokenLive"
                placeholder="请输入accessToken存活时间"
                label="refreshToken存活时间（秒）"
              />
              <form-item-col
                :value="data"
                :type="'textarea'"
                :error="errorMessage('description')"
                :span="24"
                :rows="4"
                :min="1"
                prop="description"
                placeholder="描述"
                label="描述"
              />
            </template>
          </row-span-slot>
        </template>
      </cu-form>
    </template>
  </add-btn>
</template>

<script>
    import AddBtn from "../../../components/CURD/Btns/AddBtn";
    import CuForm from "../../../components/CURD/Form/cuFrom";
    import RowSpanSlot from "../../../components/CURD/Slot/RowSpanSlot";
    import FormItemCol from "../../../components/CURD/Form/formItemCol";
    import FormItemColDict from "../../../components/CURD/Form/formItemColDict";
    import { baseApiPostMethod } from '@/components/CURD/baseApi'
    export default {
        name: "SsoClientAdd",
        components: {FormItemColDict, FormItemCol, RowSpanSlot, CuForm, AddBtn },
        props: {
            value: {
                type: Object,
                default: function () {
                    return {}
                }
            },
            actionUrl: String
        },
        computed: {
            addUrl() {
              return (data) => {
                  return baseApiPostMethod(this.actionUrl, data)
              }
            }
        }
    }
</script>

<style scoped>

</style>
