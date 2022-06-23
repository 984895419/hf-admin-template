<template>
  <common-dialog-btn :label="$t('common.look')" type="text">
    <el-form ref="form" :model="value">
      <row-span-slot>
        <template v-slot="{ span }">
                    <form-item-text :span="span" :namespace="conf.namespace" :value="value" prop="id" />
          <form-item-text :span="span" :namespace="conf.namespace" :value="value" prop="appId" />
          <form-item-text :span="span" :namespace="conf.namespace" :value="value" prop="loginIp" />
          <form-item-text :span="span" :namespace="conf.namespace" :value="value" prop="creator" />
          <form-item-text :span="span" :namespace="conf.namespace" :value="value" prop="createTime" />
          <form-item-text :span="24" :namespace="conf.namespace" :value="value" prop="requestHeaders">
            <json-views copyable :expand-depth="0" :data="JSON.parse(value.requestHeaders)"/>
          </form-item-text>
        </template>
      </row-span-slot>
    </el-form>
  </common-dialog-btn>
</template>

<script>
    import * as conf from './api'
    import CommonDialogBtn from '@/components/CURD/Btns/CommonDialogBtn'
    import FormItemText from '@/components/CURD/Form/formItemText'
    import EnableStateFormItemText from '@/components/CURD/Form/EnableStateformItemText'
    import RowSpanSlot from '@/components/CURD/Slot/RowSpanSlot'
    import JsonViews from 'vue-json-views'
    export default {
        name: 'SsoLoginAppLogDetail',
        components: { RowSpanSlot, EnableStateFormItemText, FormItemText, CommonDialogBtn, JsonViews },
        props: {
            value: {
                type: Object,
                default: function() {
                    return {}
                }
            }
        },
        data() {
            return {
                conf: conf
            }
        }
    }
</script>

<style scoped>

</style>
