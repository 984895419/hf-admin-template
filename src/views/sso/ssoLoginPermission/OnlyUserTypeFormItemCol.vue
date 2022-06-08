<template>
  <!-- 指定用户类型可见 -->
  <form-item-col-dict
    :value="permissionValue"
    :error="errorMessage('permissionValue')"
    :label="$t(conf.getI18nName('userType'))"
    :span="span"
    prop="permissionValue"
    :dict-code="'USER_TYPE'"
    :namespace="conf.namespace"
  />
</template>

<script>
    import * as conf from './api'
    import FormItemColDict from '@/components/CURD/Form/formItemColDict'
    /**
     * 指定用户类型字段
     */
    export default {
        name: 'OnlyUserTypeFormItemCol',
        components: { FormItemColDict },
        props: {
            value: {
                type: Object,
                required: true
            },
            errorMessage: {
                type: Function
            },
            span: {
                type: Number
            }
        },
        data() {
            return {
                conf: conf,
                permissionValue: {
                    permissionValue: null
                }
            }
        },
        created() {
            if (!this.value.permissionValue || this.value.permissionValue.length <= 0) {
                this.value.permissionValue = [this.permissionValue]
            } else {
                this.permissionValue = this.value.permissionValue[0]
            }
        }
    }
</script>

<style scoped>

</style>
