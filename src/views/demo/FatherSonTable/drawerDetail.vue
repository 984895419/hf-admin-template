<template>
  <div>
    <el-button @click="openDialog()" v-show="false"></el-button>
    <el-dialog width="75%" :visible.sync="isshowdetail" :direction="direction">
      <div class="el-dialog__title">详情</div>
      <el-card>
        <slot />
      </el-card>
      <div class="demo-drawer__footer">
        <el-button @click="cancelForm">取 消</el-button>
        <el-button type="primary" @click="cancelForm" :loading="loading">{{ loading ? '提交中...' : '确 定' }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import * as conf from './api'

export default {
  data() {
    return {
      direction: 'rtl',
      loading: false,
      conf: conf,
      isshowdetail: false,
      rowdata: {
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
  methods: {

    cancelForm() {
      this.isshowdetail = false
    },
    openDialog(row) {
      this.rowdata = row
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
