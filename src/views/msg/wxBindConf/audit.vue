<template>
  <div>
    <update-btn btn-type="text" :label="$t('common.audit')" :title="$t('common.audit')" :url="templateUrl(queryUrl, value)" @loadSuccess="postInit">
      <template v-slot="{ closeDialog, data }">
        <cu-form :label-width="'120'" :form-rules="formRules" :value="data" :action-method="updateMethod"  @success="actionSuccess" @closeDialog="closeDialog">
          <template v-slot="{ errorMessage }">
            <row-span-slot>
              <template v-slot="{ span }">
                <!-- 修改的字段配置 -->
                <form-item-text
                  :value="data"
                  :error="errorMessage('bindHeadpic')"
                  :span="8"
                  prop="bindHeadpic"
                  :namespace="conf.namespace"
                >
                  <el-image :src="data.bindHeadpic" style="max-width: 150px"></el-image>
                </form-item-text>
                <el-col :span="16">
                  <el-row>
                    <!-- 修改的字段配置 -->
                    <form-item-text
                      :value="data"
                      :error="errorMessage('bindMobile')"
                      :span="24"
                      prop="bindMobile"
                      :namespace="conf.namespace"
                    />
                    <!-- 修改的字段配置 -->
                    <form-item-col
                      :value="data"
                      :error="errorMessage('bindCompany')"
                      :span="24"
                      prop="bindCompany"
                      :namespace="conf.namespace"
                    />
                    <!-- 修改的字段配置 -->
                    <form-item-text
                      :value="data"
                      :error="errorMessage('bindNickName')"
                      :span="24"
                      prop="bindNickName"
                      :namespace="conf.namespace"
                    />
                    <!-- 修改的字段配置 -->
                    <form-item-text
                      :value="data"
                      :error="errorMessage('wxIdName')"
                      :span="24"
                      prop="wxIdName"
                      :namespace="conf.namespace"
                    />
                  </el-row>
                </el-col>
                <!-- 字段字段设置方法如下
                <form-item-col-dict
                  :value="data"
                  :error="errorMessage('clientMethod')"
                  :span="span"
                  prop="clientMethod"
                  :dict-code="'CLIENT_METHOD_TYPES'"
                  :namespace="conf.namespace"
                /> -->
                <form-item-col-radio
                  :value="data"
                  :error="errorMessage('auditState')"
                  :span="24"
                  prop="auditState"
                  :radio-list="conf.auditStates"
                  :namespace="conf.namespace"/>
                <!-- 修改的字段配置 -->
                <form-item-col-text-area
                  v-if="data.auditState === 'fail'"
                  :value="data"
                  :error="errorMessage('reason')"
                  :span="24"
                  prop="reason"
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
    import UpdateBtn from '@/components/CURD/Btns/UpdateBtn'
    import CuForm from '@/components/CURD/Form/cuFrom'
    import RowSpanSlot from '@/components/CURD/Slot/RowSpanSlot'
    import FormItemCol from '@/components/CURD/Form/formItemCol'
    import CurdMixin from '@/components/CURD/curd.mixin'
    import { baseApiPutMethod } from '@/components/CURD/baseApi'
    import FormItemColDict from '@/components/CURD/Form/formItemColDict'
    import FormItemColEnableState from '@/components/CURD/Form/formItemColEnableState'
    import WxServerConfInputRefer from '@/views/msg/wxServerConf/inputRefer'
    import FormItemText from "../../../components/CURD/Form/formItemText";
    import FormItemColTextArea from "../../../components/CURD/Form/formItemColTextarea";
    import FormItemColRadio from "../../../components/CURD/Form/formItemColRadio";
    export default {
        name: 'WxBindConfAudit',
        components: {
            FormItemColRadio,
            FormItemColTextArea,
            FormItemText,
      WxServerConfInputRefer,
      FormItemColDict, FormItemCol, RowSpanSlot, CuForm, UpdateBtn, FormItemColEnableState },
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
            },
            postInit(postData) {
                postData.auditState = 'pass'
            }
        }
    }
</script>

<style scoped>

</style>
