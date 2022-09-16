<template>
  <common-dialog-btn :label="$t('common.look')" type="text">
    <el-form ref="form" :model="value">
      <row-span-slot>
        <template v-slot="{ span }">
          <form-item-text :span="span" :namespace="conf.namespace" :value="value" prop="notifyId" />
          <form-item-text :span="span" :namespace="conf.namespace" :value="value" prop="notifyKey" />
          <form-item-text :span="span" :namespace="conf.namespace" :value="value" prop="wxId" />
          <form-item-text :span="span" :namespace="conf.namespace" :value="value" prop="templateId" />
          <form-item-text :span="span" :namespace="conf.namespace" :value="value" prop="exampleData" />
          <form-item-text :span="span" :namespace="conf.namespace" :value="value" prop="templateContent" />
          <form-item-text :span="span" :namespace="conf.namespace" :value="value" prop="templateTitle" />
          <form-item-text :span="span" :namespace="conf.namespace" :value="value" prop="mapping" />
            <form-item-text :span="span" namespace="common" :value="value" prop="creatorUserName" />
          <form-item-text :span="span" :namespace="conf.namespace" :value="value" prop="createTime" />
          <form-item-text :span="span" namespace="common" :value="value" prop="modifierUserName" />
          <form-item-text :span="span" :namespace="conf.namespace" :value="value" prop="modifyTime" />
          <enable-state-form-item-text :span="span" :namespace="conf.namespace" :value="value" prop="enableState" />
          <form-item-text :span="span" :namespace="conf.namespace" :value="value" prop="deleted" />
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
        name: 'WxNotifyTemplateMappingDetail',
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
