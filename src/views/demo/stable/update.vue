<template>
  <div>
    <update-btn btn-type="text" :url="templateUrl(queryUrl, value)">
      <template v-slot="{ closeDialog, data }">
        <cu-form :form-rules="formRules" :value="data" :action-method="updateMethod" @success="actionSuccess"
          @closeDialog="closeDialog">
          <template v-slot="{ errorMessage }">
            <row-span-slot>
              <template v-slot="{ span }">
                <!-- 修改的字段配置 -->
                <form-item-col :value="data" :error="errorMessage('orderNo')" :span="span" prop="orderNo"
                  :namespace="conf.namespace" />
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
                  :namespace="conf.namespace" />
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
    </update-btn>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import * as conf from './api'
import UpdateBtn from '@/components/CURD/Btns/UpdateBtn'
import CuForm from '@/components/CURD/Form/cuFrom'
import RowSpanSlot from '@/components/CURD/Slot/RowSpanSlot'
import FormItemCol from '@/components/CURD/Form/formItemCol'
import CurdMixin from '@/components/CURD/curd.mixin'
import { baseApiPutMethod } from '@/components/CURD/baseApi'
import FormItemColDict from '@/components/CURD/Form/formItemColDict'
import FormItemColEnableState from '@/components/CURD/Form/formItemColEnableState'
import BaseTenantInputRefer from "../../basic/baseTenant/inputRefer";
export default {
  name: 'HfBaseRightRoleUpdate',
  components: { BaseTenantInputRefer, FormItemColDict, FormItemCol, RowSpanSlot, CuForm, UpdateBtn, FormItemColEnableState },
  mixins: [CurdMixin],
  props: {
    value: {
      type: Object,
      default: function () {
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
    ...mapGetters([
      'tenantId'
    ]),
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
    }
  }
}
</script>

<style scoped>
</style>
