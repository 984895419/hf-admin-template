<template>
  <form-item-col
    :value="value"
    :error="errorMessage('permissionValue')"
    :span="24"
    :label="$t(conf.getI18nName('userInfo'))"
    prop="permissionValue"
    :namespace="conf.namespace"
  >
    <dept-id-api-slot :pk-depts="permissionValue">
      <template v-slot="{data}">
        <hf-base-depart-info-multiple-refer :value="data" @success="successHandler">
        </hf-base-depart-info-multiple-refer>
      </template>
    </dept-id-api-slot>
  </form-item-col>
</template>

<script>
    import * as conf from './api'
    import FormItemCol from '@/components/CURD/Form/formItemCol'
    import DeptIdApiSlot from "../../basic/hfBaseDepartInfo/DeptIdApiSlot";
    import HfBaseDepartInfoMultipleRefer from "../../basic/hfBaseDepartInfo/multipleRefer";
    /**
     * 指定用户类型字段
     */
    export default {
        name: 'OnlyDeptFormItemCol',
        components: {
            HfBaseDepartInfoMultipleRefer,
            DeptIdApiSlot, FormItemCol },
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

                if (val && val.length > 0) {
                    this.value['permissionValue'] = val.map(t => {
                        return {
                            permissionValue: t.pkDept
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
