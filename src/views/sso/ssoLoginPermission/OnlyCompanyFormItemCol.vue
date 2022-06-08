<template>
  <form-item-col
    :value="value"
    :error="errorMessage('permissionValue')"
    :span="24"
    :label="$t(conf.getI18nName('userInfo'))"
    prop="permissionValue"
    :namespace="conf.namespace"
  >
    <company-id-api-slot :pk-corps="permissionValue">
      <template v-slot="{data}">
        <hf-base-company-info-multiple-refer :value="data" @success="successHandler">
        </hf-base-company-info-multiple-refer>
      </template>
    </company-id-api-slot>
  </form-item-col>
</template>

<script>
    import * as conf from './api'
    import FormItemCol from '@/components/CURD/Form/formItemCol'
    import CompanyIdApiSlot from "../../basic/hfBaseCompanyInfo/CompanyIdApiSlot";
    import HfBaseCompanyInfoMultipleRefer from "../../basic/hfBaseCompanyInfo/multipleRefer";
    /**
     * 指定用户类型字段
     */
    export default {
        name: 'OnlyCompanyFormItemCol',
        components: {
            HfBaseCompanyInfoMultipleRefer,
            CompanyIdApiSlot, FormItemCol },
        props: {
            value: {
                type: [Object, Array],
                required: true
            },
            errorMessage: {
                type: Function
            }
        },
        data() {
            return {
                conf: conf
            }
        },
        computed: {
            permissionValue() {
                if (this.value.permissionValue) {
                  return this.value.permissionValue.map(t => t.permissionValue).join(',')
                }
                return undefined
            }
        },
        methods: {
            successHandler(val) {
                debugger
                if (val && val.length > 0) {
                    this.value['permissionValue'] = val.map(t => {
                        return {
                            permissionValue: t.pkCorp
                        }
                    })
                } else {
                    this.value['permissionValue'] = []
                }
            }
        }
    }
</script>

<style scoped>

</style>
