<template>
    <div>
      <update-btn btn-type="text" :url="templateUrl(queryUrl, value)">
        <template v-slot="{ closeDialog, data }">
          <cu-form :value="data" :action-method="updateMethod" :inline="true" @success="actionSuccess" @closeDialog="closeDialog">
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
      </update-btn>
    </div>
</template>

<script>
    import UpdateBtn from '../../../components/CURD/Btns/UpdateBtn'
    import CuForm from '../../../components/CURD/Form/cuFrom'
    import RowSpanSlot from '../../../components/CURD/Slot/RowSpanSlot'
    import FormItemCol from '../../../components/CURD/Form/formItemCol'
    import CurdMixin from '@/components/CURD/curd.mixin'
    import {baseApiPutMethod} from "../../../components/CURD/baseApi";
    import FormItemColDict from "../../../components/CURD/Form/formItemColDict";
    export default {
        name: 'SsoClientUpdate',
        components: {FormItemColDict, FormItemCol, RowSpanSlot, CuForm, UpdateBtn },
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
        computed: {
            updateMethod() {
                return (data) => {
                    return baseApiPutMethod(this.templateUrl(this.updateUrl, data), data)
                }
            }
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
