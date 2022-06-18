<template>
  <form-item-col
    :value="value"
    :error="errorMessage('permissionValue')"
    :span="24"
    :label="$t(conf.getI18nName('userInfo'))"
    prop="permissionValue"
    :namespace="conf.namespace"
  >
    <user-id-api-slot :user-ids="permissionValue">
      <template v-slot="{data}">
        <hf-base-user-info-multiple-refer :value="data" @success="successHandler">
        </hf-base-user-info-multiple-refer>
      </template>
    </user-id-api-slot>
  </form-item-col>
</template>

<script>
    import * as conf from './api'
    import HfBaseUserInfoMultipleRefer from '../../basic/hfBaseUserInfo/multipleRefer'
    import FormItemCol from '@/components/CURD/Form/formItemCol'
    import UserIdApiSlot from '../../basic/hfBaseUserInfo/UserIdApiSlot'
    /**
     * 指定用户类型字段
     */
    export default {
        name: 'OnlyUserFormItemCol',
        components: {UserIdApiSlot, FormItemCol, HfBaseUserInfoMultipleRefer },
        props: {
            value: {
                type: Object,
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
                            permissionValue: t.userId
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
