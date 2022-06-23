<template>
  <common-dialog-btn :label="$t('common.look')" type="text">
    <el-form ref="form" :model="value">
      <row-span-slot>
        <template v-slot="{ span }">
                    <form-item-text :span="span" :namespace="conf.namespace" :value="value" prop="reqId" />
          <form-item-text :span="span" :namespace="conf.namespace" :value="value" prop="requestUrl" />
          <form-item-text :span="span" :namespace="conf.namespace" :value="value" prop="requestMethod" />
          <form-item-text :span="span" :namespace="conf.namespace" :value="value" prop="requestIp" />
          <form-item-text :span="span" :namespace="conf.namespace" :value="value" prop="requestParams" />
          <form-item-text :span="span" :namespace="conf.namespace" :value="value" prop="requestBody" />
          <form-item-text :span="span" :namespace="conf.namespace" :value="value" prop="responseBody" />
          <form-item-text :span="span" :namespace="conf.namespace" :value="value" prop="responseStatus" />
          <form-item-text :span="span" :namespace="conf.namespace" :value="value" prop="creator" />
          <form-item-text :span="span" :namespace="conf.namespace" :value="value" prop="createTime" />
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
    export default {
        name: 'BaseLogDetail',
        components: { RowSpanSlot, EnableStateFormItemText, FormItemText, CommonDialogBtn },
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
