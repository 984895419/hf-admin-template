<template>
  <component :is="componentBtn" :init-data="value" v-bind="componentAttrs">
    <template v-slot="{ closeDialog, data }">
      <cu-form :namespace="conf.namespace" :value="data" :action-method="actionMethod" :form-rules="formRules"
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
              <form-item-col :value="data" :error="errorMessage('customeraddress')" :span="span" prop="customeraddress"
                :namespace="conf.namespace" />
              <form-item-col :value="data" :error="errorMessage('customermail')" :span="span" prop="customermail"
                :namespace="conf.namespace" />
            </template>
          </row-span-slot>
          <!--handleAddBtn 新增行按钮事件  -->
          <edit-table :tableData="data.propTableData" border @handleAddBtn="handleAddBtn" :conf="conf"
            @handleChangeBtn="handleChangeBtn" :rowData="rowData">
            <!-- 其他批量操作方法插槽 -->
            <template #dropdownList="{toggleRowSelectionArray}">
              <!-- 导入 -->
              <el-dropdown-item icon="el-icon-circle-check">
                <dialog-btn-page :type="'text'" :label="'导入'" :title="'导入'">
                  <upload-excel-component :on-success="handleSuccess" :before-upload="beforeUpload" />
                </dialog-btn-page>
              </el-dropdown-item>
            </template>
            <section-table-column />
            <default-table-column :prop="'GoodsCode'" :namespace="conf.namespace" :show-overflow-tooltip="true"
              min-width="130" />
            <default-table-column :prop="'GoodsName'" :namespace="conf.namespace" :show-overflow-tooltip="true"
              min-width="130" />
            <default-table-column :prop="'Specifications'" :namespace="conf.namespace" :show-overflow-tooltip="true"
              min-width="130" />
            <default-table-column :prop="'GoodsUnit'" :namespace="conf.namespace" :show-overflow-tooltip="true"
              min-width="130" />
            <default-table-column :prop="'QuantityRequired'" :namespace="conf.namespace" :show-overflow-tooltip="true"
              align="center" min-width="130" />
            <default-table-column :prop="'UnitPrice'" :namespace="conf.namespace" :show-overflow-tooltip="true"
              align="center" min-width="130" />
            <default-table-column :prop="'money'" :namespace="conf.namespace" :show-overflow-tooltip="true"
              align="center" min-width="130" />
            <default-table-column :prop="'stock'" :namespace="conf.namespace" :show-overflow-tooltip="true"
              align="center" min-width="130" />
          </edit-table>
        </template>
      </cu-form>
    </template>
  </component>
</template>

<script>
import { mapGetters } from 'vuex'
import * as conf from './api'
import AddBtn from '@/components/CURD/Btns/AddBtn'
import UpdateBtn from '@/components/CURD/Btns/UpdateBtn'
import CuForm from '@/components/CURD/Form/cuFrom'
import CurdMixin from '@/components/CURD/curd.mixin'
import RowSpanSlot from '@/components/CURD/Slot/RowSpanSlot'
import FormItemCol from '@/components/CURD/Form/formItemCol'
import FormItemColDict from '@/components/CURD/Form/formItemColDict'
import { baseApiPostMethod, baseApiPutMethod } from '@/components/CURD/baseApi'
import FormItemColEnableState from '@/components/CURD/Form/formItemColEnableState'
import BaseTenantInputRefer from '../../basic/baseTenant/inputRefer'
import hfBaseSonColumns from './hfBaseSonColumns'// 表头
import SectionTableColumn from '@/components/CURD/Table/column/base/SectionTableColumn'
import DefaultTableColumn from '@/components/CURD/Table/column/DefaultTableColumn'
import EditTable from '@/components/CURD/Table/EditTable.vue' //编辑表格
import UploadExcelComponent from '@/components/UploadExcel/index.vue'
import DialogBtnPage from '@/components/CURD/Btns/DialogBtnPage'// 按钮弹窗


export default {
  name: 'HfBaseRightRoleCu',
  components: {
    BaseTenantInputRefer,
    FormItemColDict, FormItemCol, RowSpanSlot,
    CuForm, AddBtn, UpdateBtn, FormItemColEnableState,
    hfBaseSonColumns, DefaultTableColumn,
    SectionTableColumn,
    EditTable, UploadExcelComponent, DialogBtnPage
  },
  mixins: [CurdMixin],
  props: {
    value: {
      type: Object,
      default: function () {
        return { enableState: 1, propTableData: [] }
      }
    },
    isShow: Boolean,
  },


  data() {

    return {
      conf: conf,
      formRules: null,
      rowData: {
        GoodsCode: "",
        GoodsName: "",
        Specifications: "",
        GoodsUnit: "",
        QuantityRequired: "",
        UnitPrice: "",
        money: "",
        stock: "",
      }
    }
  },
  computed: {
    ...mapGetters([
      'tenantId'
    ]),
    actionMethod() {
      return (data) => {
        if (this.value[this.conf.primaryKeyField]) {
          return baseApiPutMethod(this.templateUrl(this.conf.urlMethods.updateUrl, data), data)
        } else {
          return baseApiPostMethod(this.conf.urlMethods.addUrl, data)
        }
      }
    },
    /**
     * 主键按钮的类型
     */
    componentBtn() {
      // 如果主键的值存在，则为修改，否则为新增
      if (this.value[this.conf.primaryKeyField]) {
        return 'update-btn'
      } else {
        return 'add-btn'
      }
    },
    /**
     * componentAttrs的属性
     */
    componentAttrs() {
      // 如果主键的值存在，则为修改，否则为新增
      if (this.value[this.conf.primaryKeyField]) {
        return {
          type: 'text'
        }
      } else {
        return {}
      }
    }
  },
  created() {
    this.formRules = conf.formRules(this)
  },

  mounted() {
    this.value.propTableData = [{
      GoodsCode: 20210121000001,
      GoodsName: '2022/08/19',
      Specifications: 2000,
      GoodsUnit: '张三莆田华峰啥的那是你的啊骚大师莆田华峰啥的那是你的啊骚大师',
      QuantityRequired: '已完成',
      UnitPrice: '待付款',
      money: '已发货',
      stock: '支付宝',
    }, {
      GoodsCode: 20210121000002,
      GoodsName: '2022/08/19',
      Specifications: 2000,
      GoodsUnit: '张三莆田华峰啥的那是你的啊骚大师莆田华峰啥的那是你的啊骚大师',
      QuantityRequired: '已完成',
      UnitPrice: '待付款',
      money: '已发货',
      stock: '支付宝'
    }, {
      GoodsCode: 20210121000003,
      GoodsName: '2022/08/19',
      Specifications: 2000,
      GoodsUnit: '张三莆田华峰啥的那是你的啊骚大师莆田华峰啥的那是你的啊骚大师',
      QuantityRequired: '已完成',
      UnitPrice: '待付款',
      money: '已发货',
      stock: '支付宝'
    }, {
      GoodsCode: 20210121000004,
      GoodsName: '2022/08/19',
      Specifications: 2000,
      GoodsUnit: '张三莆田华峰啥的那是你的啊骚大师莆田华峰啥的那是你的啊骚大师',
      QuantityRequired: '已完成',
      UnitPrice: '待付款',
      money: '已发货',
      stock: '支付宝'
    }, {
      GoodsCode: 20210121000005,
      GoodsName: '2022/08/19',
      Specifications: 2000,
      GoodsUnit: '张三莆田华峰啥的那是你的啊骚大师莆田华峰啥的那是你的啊骚大师',
      QuantityRequired: '已完成',
      UnitPrice: '待付款',
      money: '已发货',
      stock: '支付宝'
    }]
  },
  methods: {
    // 新增行数据
    handleAddBtn(data) {
      this.value.propTableData = data
    },
    handleChangeBtn(data) {
      this.$set(this.value,"propTableData",data)
      // this.value.propTableData = data
    },

    // 导入前判断
    beforeUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 1
      if (isLt1M) {
        return true
      }
      this.$message({
        message: '文件大于1M 请重新上传',
        type: 'warning'
      })
      return false
    },
    handleSuccess() {
      // 导入成功回调
    },
    // 对部分表单字段进行校验
    validateField(form, index) {
      let result = true
      for (const item of this.$refs[sonForm].fields) {
        if (item.prop.split('.')[1] === index.toString()) {
          this.$refs[form].validateField(item.prop, (error) => {
            if (error !== '') {
              result = false
            }
          })
        }
        if (!result) break
      }
      return result
    },
  }
}
</script>

<style scoped lang="less">

</style>
