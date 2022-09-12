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
          <!-- 子表内容 -->
            <el-button v-model="handleAdd" size="mini" style="margin:0px 10px 10px 0" type="success" round plain @click="handleAdd()">{{$t('common.add')}}</el-button>
            <el-dropdown :hide-on-click="false" trigger="click" v-if="toggleRowSelectionArray.len">
              <el-button>
                批量操作<i class="el-icon-arrow-down el-icon--right" />
              </el-button>
              <!-- 下拉框 -->
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item icon="el-icon-plus">
                  启用
                </el-dropdown-item>
                <el-dropdown-item icon="el-icon-circle-plus">
                  禁用
                </el-dropdown-item>
                <el-dropdown-item icon="el-icon-circle-plus-outline">
                  删除
                </el-dropdown-item>
                <el-dropdown-item icon="el-icon-check">
                  审核
                  <!-- <examine :auditstatus="auditstatus" /> -->
                </el-dropdown-item>
                <el-dropdown-item icon="el-icon-circle-check">
                  导入
                </el-dropdown-item>
                <!-- 导出集合 -->
                <el-dropdown-item icon="el-icon-circle-check">
                  <el-dropdown :hide-on-click="false" placement="bottom">
                    <span class="el-dropdown-link">
                      导出
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item icon="el-icon-plus">
                        选中导出
                      </el-dropdown-item>
                      <el-dropdown-item icon="el-icon-circle-plus">
                        单页导出
                      </el-dropdown-item>
                      <el-dropdown-item icon="el-icon-circle-plus-outline">
                        全部导出
                      </el-dropdown-item>
                      <el-dropdown-item icon="el-icon-check">
                        模板导出
                      </el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>

          <el-table max-height="300px" @selection-change="SelectionChange"
            :data="propTableData.col"
            border>
            <section-table-column />
            <el-table-column label="id" type="index" align="center" width="50"></el-table-column>
            <el-table-column label="货物编码" :show-overflow-tooltip="true" min-width="130">
              <template slot-scope="scope">
                <span v-if="scope.row.editable">
                  <el-input size="mini" v-model="scope.row.GoodsCode"></el-input>
                </span>
                <span v-else>{{ scope.row.GoodsCode }}</span>
              </template>
            </el-table-column>
            <el-table-column label="货物名称" :show-overflow-tooltip="true" min-width="130">
              <template slot-scope="scope">
                <pasn v-if="scope.row.editable">
                  <el-input size="mini" v-model="scope.row.GoodsName"></el-input>
                </pasn>
                <span v-else>{{ scope.row.GoodsName }}</span>
              </template>
            </el-table-column>
            <el-table-column label="货物规格" :show-overflow-tooltip="true" min-width="130">
              <template slot-scope="scope">
                <span v-if="scope.row.editable">
                  <el-input size="mini" v-model="scope.row.Specifications"></el-input>
                </span>
                <span v-else>{{ scope.row.Specifications }}</span>
              </template>
            </el-table-column>
            <el-table-column label="货物单位" :show-overflow-tooltip="true" min-width="130">
              <template slot-scope="scope">
                <span v-if="scope.row.editable">
                  <el-input size="mini" v-model="scope.row.GoodsUnit"></el-input>
                </span>
                <span v-else>{{ scope.row.GoodsUnit }}</span>
              </template>
            </el-table-column>
            <el-table-column label="所需数量" :show-overflow-tooltip="true" min-width="130">
              <template slot-scope="scope">
                <span v-if="scope.row.editable">
                  <el-input size="mini" v-model="scope.row.QuantityRequired"></el-input>
                </span>
                <span v-else>{{ scope.row.QuantityRequired }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" width="170px" :show-overflow-tooltip="true">
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
          </el-table>
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
    DialogBtnPage
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
      auditstatus: '1'
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
    // 添加
    handleAdd() {
      for (let i of this.propTableData.col) {
        if (i.editable) {
          return this.Message(
            this.$t('basicData.device.propDlg.pleSave'),
            'warning'
          )
        }
      }
      let row = {
        GoodsCode: '',
        GoodsName: '',
        Specifications: '',
        GoodsUnit: '',
        QuantityRequired: '',
        id: '',
        UnitPrice: '',
        money: '',
        stock: '',
        editable:true
      }
      this.propTableData.col.push(row)
      this.propTableData.sel = row
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
        console.log('this.propTableData.sel', this.propTableData.sel)
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
    /**
   * 选中后处理的事件
   * @param section
   */
   SelectionChange(section) {
      this.toggleRowSelectionArray = section
      console.log(section, 'section')
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
    }
  }
}
</script>

<style scoped lang="less">

</style>
