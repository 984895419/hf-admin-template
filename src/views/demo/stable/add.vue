<template>
  <add-btn :init-data="value">
    <template v-slot="{ closeDialog, data }">
        <cu-form :namespace="conf.namespace" :value="data" :action-method="addUrl" :form-rules="formRules"
          v-on="$listeners" @closeDialog="closeDialog">
          <template v-slot="{ errorMessage }">
            <row-span-slot>
              <template v-slot="{ span }">
                <!-- 新增的的字段配置 -->
                <form-item-col :value="data" :error="errorMessage('orderNo')" :span="span" prop="orderNo"
                  :namespace="conf.namespace" :disabled="true" />
                <form-item-col :value="data" :error="errorMessage('ordertime')" :span="span" prop="ordertime"
                  :namespace="conf.namespace" />
                <form-item-col :value="data" :error="errorMessage('ordertotal')" :span="span" prop="ordertotal"
                  :namespace="conf.namespace" />
                <form-item-col :value="data" :error="errorMessage('consignee')" :span="span" prop="consignee"
                  :namespace="conf.namespace" />
                <form-item-col :value="data" :error="errorMessage('orderstatus')" :span="span" prop="orderstatus"
                  :namespace="conf.namespace" />
                <form-item-col :value="data" :error="errorMessage('paystatus')" :span="span" prop="paystatus"
                  :namespace="conf.namespace" />
                <form-item-col :value="data" :error="errorMessage('shipmentstatus')" :span="span" prop="shipmentstatus"
                  :namespace="conf.namespace" />
                <form-item-col :value="data" :error="errorMessage('paymethod')" :span="span" prop="paymethod"
                  :namespace="conf.namespace" :disabled="true" />
                <form-item-col :value="data" :error="errorMessage('customerphone')" :span="span" prop="customerphone"
                  :namespace="conf.namespace" />
                <form-item-col :value="data" :error="errorMessage('customeraddress')" :span="span"
                  prop="customeraddress" :namespace="conf.namespace" />
                <form-item-col :value="data" :error="errorMessage('customermail')" :span="span" prop="customermail"
                  :namespace="conf.namespace" />
              </template>
            </row-span-slot>
          </template>
        </cu-form>
    </template>
  </add-btn>
</template>

<script>
import { mapGetters } from 'vuex'
import * as conf from './api'
import AddBtn from '@/components/CURD/Btns/AddBtn'
import CuForm from '@/components/CURD/Form/cuFrom'
import RowSpanSlot from '@/components/CURD/Slot/RowSpanSlot'
import FormItemCol from '@/components/CURD/Form/formItemCol'
import FormItemColDict from '@/components/CURD/Form/formItemColDict'
import { baseApiPostMethod } from '@/components/CURD/baseApi'
import FormItemColEnableState from '@/components/CURD/Form/formItemColEnableState'
import BaseTenantInputRefer from '../../basic/baseTenant/inputRefer'
export default {
  name: 'HfBaseRightRoleAdd',
  components: { BaseTenantInputRefer, FormItemColDict, FormItemCol, RowSpanSlot, CuForm, AddBtn, FormItemColEnableState },
  props: {
    value: {
      type: Object,
      default: function () {
        return { enableState: 1 }
      }
    },
    actionUrl: String
  },
  data() {
    return {
      conf: conf,
      formRules: null
    }
  },
  computed: {
    ...mapGetters([
      'tenantId'
    ]),
    addUrl() {
      return (data) => {
        return baseApiPostMethod(this.actionUrl, data)
      }
    }
  },
  created() {
    this.formRules = conf.formRules(this)
  }
}
</script>

<style scoped>
</style>
