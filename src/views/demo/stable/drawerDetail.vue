<template>
  <div>
    <el-button @click="openDialog()" v-show="false"></el-button>
    <el-drawer size="30%" :visible.sync="isshowdetail" :direction="direction" :before-close="handleClose">
      <div class="demo-drawer__content">
        <div class="table-tit">{{ title }}</div>
      </div>
      <div class="demo-drawer__table">
        <el-form :model="rowdata" label-width="80px">
          <el-col :span="12">
            <el-form-item v-if="rowdata" label="订单编号">
              <el-input v-model="rowdata.orderNo" :readonly="true" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item v-if="rowdata" label="下单时间">
              <el-input v-model="rowdata.ordertime" :readonly="true" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item v-if="rowdata" label="订单总额">
              <el-input v-model="rowdata.ordertotal" :readonly="true" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item v-if="rowdata" label="收货人">
              <el-input v-model="rowdata.consignee" :readonly="true" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item v-if="rowdata" label="订单状态">
              <el-input v-model="rowdata.orderstatus" :readonly="true" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item v-if="rowdata" label="订单编号">
              <el-input v-model="rowdata.orderNo" :readonly="true" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item v-if="rowdata" label="付款状态">
              <el-input v-model="rowdata.paystatus" :readonly="true" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item v-if="rowdata" label="发货状态">
              <el-input v-model="rowdata.shipmentstatus" :readonly="true" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item v-if="rowdata" label="支付方式">
              <el-input v-model="rowdata.paymethod" :readonly="true" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item v-if="rowdata" label="客户联系方式">
              <el-input v-model="rowdata.customerphone" :readonly="true" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item v-if="rowdata" label="客户地址">
              <el-input v-model="rowdata.customeraddress" :readonly="true" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item v-if="rowdata" label="客户邮件">
              <el-input v-model="rowdata.customermail" :readonly="true" />
            </el-form-item>
          </el-col>

        </el-form>
      </div>
      <div class="demo-drawer__footer">
        <el-button @click="cancelForm">取 消</el-button>
        <el-button type="primary" :loading="loading">{{ loading ? '提交中...' : '确 定' }}</el-button>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import * as conf from './api'

export default {

  props: {
    rowdata: {
      type: Object,
      default: () => {
        return {
          orderNo: '',
          ordertime: '',
          ordertotal: '',
          consignee: '',
          orderstatus: '',
          paystatus: '',
          shipmentstatus: '',
          paymethod: '',
          customerphone: '',
          customeraddress: '',
          customermail: ''
        }
      }
    },
    title: {
      type: String,
      default: '订单明细表'
    }
  },
  data() {
    return {
      direction: 'rtl',
      loading: true,
      conf: conf,
      isshowdetail: false
    }
  },
  methods: {
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.isshowdetail = false
        })
        .catch(_ => { })
    },
    cancelForm() {
      this.isshowdetail = false
    },
    openDialog(row) {
      this.isshowdetail = true
    }
  }
}
</script>

<style  lang="less" scoped>
.demo-drawer__content {
  .table-tit {
    font-size: 24px;
    padding: 15px 0;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgb(242, 242, 242);
  }

}

.demo-drawer__table {
  padding: 20px 10px 0 10px;
  box-sizing: border-box;
}

.demo-drawer__footer {
  float: right;
  margin: 10px 10px 10px 0;
}
</style>
