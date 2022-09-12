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

          <edit-table :tableData="propTableData" border @selection-change="selectionChange"
            @handleAddBtn="handleAddBtn">
            <section-table-column />
            <el-table-column label="id" type="index" fixed="left" align="center" width="50"></el-table-column>
            <default-table-column :prop="'GoodsCode'" :namespace="conf.namespace" :show-overflow-tooltip="true"
              min-width="130"></default-table-column>
            <default-table-column :prop="'GoodsName'" :namespace="conf.namespace" :show-overflow-tooltip="true"
              min-width="130"></default-table-column>
            <default-table-column :prop="'Specifications'" :namespace="conf.namespace" :show-overflow-tooltip="true"
              min-width="130"></default-table-column>
            <default-table-column :prop="'GoodsUnit'" :namespace="conf.namespace" :show-overflow-tooltip="true"
              min-width="130"></default-table-column>
            <default-table-column :prop="'QuantityRequired'" :namespace="conf.namespace" :show-overflow-tooltip="true"
              min-width="130"></default-table-column>
            <default-table-column :prop="'UnitPrice'" :namespace="conf.namespace" :show-overflow-tooltip="true"
              min-width="130"></default-table-column>
            <default-table-column :prop="'money'" :namespace="conf.namespace" :show-overflow-tooltip="true"
              min-width="130"></default-table-column>
            <default-table-column :prop="'stock'" :namespace="conf.namespace" :show-overflow-tooltip="true"
              min-width="130"></default-table-column>
            <el-table-column align="center" width="170px" fixed="right">
              <template slot-scope="scope">
                <el-button size="mini" type="primary" round plain v-if="!scope.row.editable"
                  @click="valChange(scope.row,scope.$index,true)">{{ $t('common.edit') }}</el-button>
                <el-button size="mini" type="primary" round plain v-else
                  @click="valChange(scope.row,scope.$index,true)">{{ $t('common.save') }}</el-button>
                <el-button size="mini" type="danger" round plain v-if="!scope.row.editable"
                  @click="handleDelete(scope.$index, scope.row)">{{ $t('common.delete') }}</el-button>
                <el-button size="mini" type="danger" round plain v-else
                  @click="valChange(scope.row,scope.$index,false)">{{ $t('common.cancel') }}</el-button>
              </template>
            </el-table-column>
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
import HfTable from '@/components/CURD/Table/HfTable'// 单表组件
import RowSpanSlot from '@/components/CURD/Slot/RowSpanSlot'
import FormItemCol from '@/components/CURD/Form/formItemCol'
import FormItemColDict from '@/components/CURD/Form/formItemColDict'
import { baseApiPostMethod, baseApiPutMethod } from '@/components/CURD/baseApi'
import FormItemColEnableState from '@/components/CURD/Form/formItemColEnableState'
import BaseTenantInputRefer from '../../basic/baseTenant/inputRefer'
import hfBaseSonColumns from './hfBaseSonColumns'// 表头
import SectionTableColumn from '@/components/CURD/Table/column/base/SectionTableColumn'
import DefaultTableColumn from '@/components/CURD/Table/column/DefaultTableColumn'

import UploadExcelComponent from '@/components/UploadExcel/index.vue'
import TemplateConfirmBtn from '@/components/CURD/Btns/TemplateConfirmBtn'// 按钮弹窗
import DialogBtnPage from '@/components/CURD/Btns/DialogBtnPage'// 按钮弹窗
import EditTable from '@/components/CURD/Table/EditTable.vue' //编辑表格
const defaultProp = {
  GoodsCode: '',
  GoodsName: '',
  Specifications: '',
  GoodsUnit: '',
  QuantityRequired: '',
  UnitPrice: '',
  money: '',
  stock: '',
}

export default {
  name: 'HfBaseRightRoleCu',
  components: {
    BaseTenantInputRefer,
    FormItemColDict, FormItemCol, RowSpanSlot,
    CuForm, AddBtn, UpdateBtn, FormItemColEnableState,
    HfTable, hfBaseSonColumns, DefaultTableColumn,
    SectionTableColumn, UploadExcelComponent, TemplateConfirmBtn,
    DialogBtnPage, EditTable
  },
  props: {
    value: {
      type: Object,
      default: function () {
        return { enableState: 1 }
      }
    },
    isShow: Boolean,

  },
  data() {
    return {
      conf: conf,
      formRules: null,
      sonJsonData: null,
      propTableData: {
        sel: null, // 选中行
        col: []
      },
      toggleRowSelectionArray: [],
      auditstatus: '1',

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
    this.propTableData = {
      col: [{
        GoodsCode: 20210121000001,
        GoodsName: '2022/08/19',
        Specifications: 2000,
        GoodsUnit: '张三莆田华峰啥的那是你的啊骚大师莆田华峰啥的那是你的啊骚大师',
        QuantityRequired: '已完成',
        UnitPrice: '待付款',
        money: '已发货',
        stock: '支付宝',
        editable: false
      }, {
        GoodsCode: 20210121000001,
        GoodsName: '2022/08/19',
        Specifications: 2000,
        GoodsUnit: '张三莆田华峰啥的那是你的啊骚大师莆田华峰啥的那是你的啊骚大师',
        QuantityRequired: '已完成',
        UnitPrice: '待付款',
        money: '已发货',
        stock: '支付宝',
        editable: false
      }, {
        GoodsCode: 20210121000001,
        GoodsName: '2022/08/19',
        Specifications: 2000,
        GoodsUnit: '张三莆田华峰啥的那是你的啊骚大师莆田华峰啥的那是你的啊骚大师',
        QuantityRequired: '已完成',
        UnitPrice: '待付款',
        money: '已发货',
        stock: '支付宝',
        editable: false
      }, {
        GoodsCode: 20210121000001,
        GoodsName: '2022/08/19',
        Specifications: 2000,
        GoodsUnit: '张三莆田华峰啥的那是你的啊骚大师莆田华峰啥的那是你的啊骚大师',
        QuantityRequired: '已完成',
        UnitPrice: '待付款',
        money: '已发货',
        stock: '支付宝',
        editable: false
      }, {
        GoodsCode: 20210121000001,
        GoodsName: '2022/08/19',
        Specifications: 2000,
        GoodsUnit: '张三莆田华峰啥的那是你的啊骚大师莆田华峰啥的那是你的啊骚大师',
        QuantityRequired: '已完成',
        UnitPrice: '待付款',
        money: '已发货',
        stock: '支付宝',
        editable: false
      }],
    }
  },
  methods: {
    /**
   * 选中后处理的事件
   * @param section
   */
    selectionChange(section) {
      this.toggleRowSelectionArray = section
      console.log(section, "section")
    },
    handleAddBtn(data) {
      console.log(data, "handleAddBtn")
    },
    //修改
    valChange(row, index, qx) {
      console.log('edit', this.propTableData)
      //点击修改，判断是否已经保存所有操作
      for (let i of this.propTableData.col) {
        console.log('i.editable', i.editable, i.id, row.id)
        if (i.editable && i.id != row.id) {
          this.Message(this.$t('basicData.device.propDlg.pleSave'), 'warning')
          return false
        }
      }
      //是否是取消操作
      if (!qx) {
        console.log('qx', this.propTableData.sel.id)
        if (!this.propTableData.sel.id) {
          this.propTableData.col.splice(index, 1)
        }
        return (row.editable = !row.editable)
      }
      //提交数据
      if (row.editable) {
        console.log('tableData.sel', this.propTableData.sel)
        const v = this.propTableData.sel
        // 必填项判断
        if (v.code == '' || v.name == '') {
          this.Message(this.$t('common.pleEnter'), 'warning')
        } else {
          this.$emit('confirm', this.propTableData.sel)
          row.editable = false
        }
      } else {
        this.propTableData.sel = row
        row.editable = true
      }
    },
    // 删除
    handleDelete(index, row) {
      this.propTableData.col.splice(index, 1)
      // this.$emit('delete', row.id)
    },
    beforeClose() {
      this.$emit('cancel')
    },
    Message(msg, type) {
      this.$message({ type: type ? type : 'info', message: msg })
    },

  }
}
</script>

<style scoped lang="less">

</style>
