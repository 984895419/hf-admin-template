<template>
  <div id="singletable" class="single">
    <div class="search">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="订单编号">
          <el-input v-model="formInline.user" placeholder="订单编号" />
        </el-form-item>
        <el-form-item label="订单总额">
          <el-input v-model="formInline.user" placeholder="订单总额" />
        </el-form-item>
        <el-form-item label="收货人">
          <el-input v-model="formInline.user" placeholder="收货人" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="onSubmit">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="danger" @click="onSubmit">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="btnslist">
      <el-button type="primary" style="margin-right:20px">新增</el-button>
      <div class="block">
        <el-cascader
          v-model="value"
          :options="options"
          placeholder="批量操作"
          :props="{ expandTrigger: 'hover' }"
          @change="handleChange"
        />
      </div>
    </div>
    <el-card class="box-card">
      <div class="table">
        <el-table highlight-current-row stripe :data="tableData" border style="width: 100%" max-height="600">
          <el-table-column type="selection" width="55" />
          <el-table-column prop="orderNo" label="订单编号" width="150" sortable />
          <el-table-column prop="ordertime" label="下单时间" width="120" />
          <el-table-column prop="ordertotal" label="订单总额" width="120" />
          <el-table-column prop="consignee" label="收货人" width="120" />
          <el-table-column prop="orderstatus" label="订单状态" width="300" />
          <el-table-column prop="paystatus" label="付款状态" width="120" />
          <el-table-column prop="shipmentstatus" label="发货状态" width="100" />
          <el-table-column prop="paymethod" label="支付方式" width="100" />
          <el-table-column prop="customerphone" label="客户联系方式" width="100" />
          <el-table-column prop="customeraddress" label="客户地址" width="100" />
          <el-table-column prop="customermail" label="客户邮件" width="100" />
          <el-table-column fixed="right" width="100">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="handleClick(scope.row)">查看</el-button>
              <el-button type="text" size="small">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="total">
        订单总额：1,200,2542.21元，已付款数量：35643条，已付款金额：954,5224,03元
      </div>
      <div class="pagination">
        <el-pagination
          :current-page="currentPage4"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>

  </div>
</template>

<script>
export default {
  name: 'SingleTable',
  data() {
    return {
      tableData: [{
        orderNo: '20210121000001', // 订单编号
        ordertime: '王小虎', // 下单时间
        ordertotal: '上海', // 订单总额
        consignee: '普陀区', // 收货人
        orderstatus: '上海市普陀区金沙江路 1518 弄', // 订单状态
        paystatus: 200333, // 付款状态
        shipmentstatus: 200333, // 发货状态
        paymethod: 200333, // 支付方式
        customerphone: 200333, // 客户联系方式
        customeraddress: 200333, // 客户地址
        customermail: 200333 // 客户邮件
      }, {
        orderNo: '20210121000001', // 订单编号
        ordertime: '王小虎', // 下单时间
        ordertotal: '上海', // 订单总额
        consignee: '普陀区', // 收货人
        orderstatus: '上海市普陀区金沙江路 1518 弄', // 订单状态
        paystatus: 200333, // 付款状态
        shipmentstatus: 200333, // 发货状态
        paymethod: 200333, // 支付方式
        customerphone: 200333, // 客户联系方式
        customeraddress: 200333, // 客户地址
        customermail: 200333 // 客户邮件
      }, {
        orderNo: '20210121000001', // 订单编号
        ordertime: '王小虎', // 下单时间
        ordertotal: '上海', // 订单总额
        consignee: '普陀区', // 收货人
        orderstatus: '上海市普陀区金沙江路 1518 弄', // 订单状态
        paystatus: 200333, // 付款状态
        shipmentstatus: 200333, // 发货状态
        paymethod: 200333, // 支付方式
        customerphone: 200333, // 客户联系方式
        customeraddress: 200333, // 客户地址
        customermail: 200333 // 客户邮件
      }, {
        orderNo: '20210121000001', // 订单编号
        ordertime: '王小虎', // 下单时间
        ordertotal: '上海', // 订单总额
        consignee: '普陀区', // 收货人
        orderstatus: '上海市普陀区金沙江路 1518 弄', // 订单状态
        paystatus: 200333, // 付款状态
        shipmentstatus: 200333, // 发货状态
        paymethod: 200333, // 支付方式
        customerphone: 200333, // 客户联系方式
        customeraddress: 200333, // 客户地址
        customermail: 200333 // 客户邮件
      }, {
        orderNo: '20210121000001', // 订单编号
        ordertime: '王小虎', // 下单时间
        ordertotal: '上海', // 订单总额
        consignee: '普陀区', // 收货人
        orderstatus: '上海市普陀区金沙江路 1518 弄', // 订单状态
        paystatus: 200333, // 付款状态
        shipmentstatus: 200333, // 发货状态
        paymethod: 200333, // 支付方式
        customerphone: 200333, // 客户联系方式
        customeraddress: 200333, // 客户地址
        customermail: 200333 // 客户邮件
      }, {
        orderNo: '20210121000001', // 订单编号
        ordertime: '王小虎', // 下单时间
        ordertotal: '上海', // 订单总额
        consignee: '普陀区', // 收货人
        orderstatus: '上海市普陀区金沙江路 1518 弄', // 订单状态
        paystatus: 200333, // 付款状态
        shipmentstatus: 200333, // 发货状态
        paymethod: 200333, // 支付方式
        customerphone: 200333, // 客户联系方式
        customeraddress: 200333, // 客户地址
        customermail: 200333 // 客户邮件
      }, {
        orderNo: '20210121000001', // 订单编号
        ordertime: '王小虎', // 下单时间
        ordertotal: '上海', // 订单总额
        consignee: '普陀区', // 收货人
        orderstatus: '上海市普陀区金沙江路 1518 弄', // 订单状态
        paystatus: 200333, // 付款状态
        shipmentstatus: 200333, // 发货状态
        paymethod: 200333, // 支付方式
        customerphone: 200333, // 客户联系方式
        customeraddress: 200333, // 客户地址
        customermail: 200333 // 客户邮件
      }, {
        orderNo: '20210121000001', // 订单编号
        ordertime: '王小虎', // 下单时间
        ordertotal: '上海', // 订单总额
        consignee: '普陀区', // 收货人
        orderstatus: '上海市普陀区金沙江路 1518 弄', // 订单状态
        paystatus: 200333, // 付款状态
        shipmentstatus: 200333, // 发货状态
        paymethod: 200333, // 支付方式
        customerphone: 200333, // 客户联系方式
        customeraddress: 200333, // 客户地址
        customermail: 200333 // 客户邮件
      }, {
        orderNo: '20210121000001', // 订单编号
        ordertime: '王小虎', // 下单时间
        ordertotal: '上海', // 订单总额
        consignee: '普陀区', // 收货人
        orderstatus: '上海市普陀区金沙江路 1518 弄', // 订单状态
        paystatus: 200333, // 付款状态
        shipmentstatus: 200333, // 发货状态
        paymethod: 200333, // 支付方式
        customerphone: 200333, // 客户联系方式
        customeraddress: 200333, // 客户地址
        customermail: 200333 // 客户邮件
      }, {
        orderNo: '20210121000001', // 订单编号
        ordertime: '王小虎', // 下单时间
        ordertotal: '上海', // 订单总额
        consignee: '普陀区', // 收货人
        orderstatus: '上海市普陀区金沙江路 1518 弄', // 订单状态
        paystatus: 200333, // 付款状态
        shipmentstatus: 200333, // 发货状态
        paymethod: 200333, // 支付方式
        customerphone: 200333, // 客户联系方式
        customeraddress: 200333, // 客户地址
        customermail: 200333 // 客户邮件
      }, {
        orderNo: '20210121000001', // 订单编号
        ordertime: '王小虎', // 下单时间
        ordertotal: '上海', // 订单总额
        consignee: '普陀区', // 收货人
        orderstatus: '上海市普陀区金沙江路 1518 弄', // 订单状态
        paystatus: 200333, // 付款状态
        shipmentstatus: 200333, // 发货状态
        paymethod: 200333, // 支付方式
        customerphone: 200333, // 客户联系方式
        customeraddress: 200333, // 客户地址
        customermail: 200333 // 客户邮件
      }, {
        orderNo: '20210121000001', // 订单编号
        ordertime: '王小虎', // 下单时间
        ordertotal: '上海', // 订单总额
        consignee: '普陀区', // 收货人
        orderstatus: '上海市普陀区金沙江路 1518 弄', // 订单状态
        paystatus: 200333, // 付款状态
        shipmentstatus: 200333, // 发货状态
        paymethod: 200333, // 支付方式
        customerphone: 200333, // 客户联系方式
        customeraddress: 200333, // 客户地址
        customermail: 200333 // 客户邮件
      }, {
        orderNo: '20210121000001', // 订单编号
        ordertime: '王小虎', // 下单时间
        ordertotal: '上海', // 订单总额
        consignee: '普陀区', // 收货人
        orderstatus: '上海市普陀区金沙江路 1518 弄', // 订单状态
        paystatus: 200333, // 付款状态
        shipmentstatus: 200333, // 发货状态
        paymethod: 200333, // 支付方式
        customerphone: 200333, // 客户联系方式
        customeraddress: 200333, // 客户地址
        customermail: 200333 // 客户邮件
      }, {
        orderNo: '20210121000001', // 订单编号
        ordertime: '王小虎', // 下单时间
        ordertotal: '上海', // 订单总额
        consignee: '普陀区', // 收货人
        orderstatus: '上海市普陀区金沙江路 1518 弄', // 订单状态
        paystatus: 200333, // 付款状态
        shipmentstatus: 200333, // 发货状态
        paymethod: 200333, // 支付方式
        customerphone: 200333, // 客户联系方式
        customeraddress: 200333, // 客户地址
        customermail: 200333 // 客户邮件
      }, {
        orderNo: '20210121000001', // 订单编号
        ordertime: '王小虎', // 下单时间
        ordertotal: '上海', // 订单总额
        consignee: '普陀区', // 收货人
        orderstatus: '上海市普陀区金沙江路 1518 弄', // 订单状态
        paystatus: 200333, // 付款状态
        shipmentstatus: 200333, // 发货状态
        paymethod: 200333, // 支付方式
        customerphone: 200333, // 客户联系方式
        customeraddress: 200333, // 客户地址
        customermail: 200333 // 客户邮件
      }, {
        orderNo: '20210121000001', // 订单编号
        ordertime: '王小虎', // 下单时间
        ordertotal: '上海', // 订单总额
        consignee: '普陀区', // 收货人
        orderstatus: '上海市普陀区金沙江路 1518 弄', // 订单状态
        paystatus: 200333, // 付款状态
        shipmentstatus: 200333, // 发货状态
        paymethod: 200333, // 支付方式
        customerphone: 200333, // 客户联系方式
        customeraddress: 200333, // 客户地址
        customermail: 200333 // 客户邮件
      }, {
        orderNo: '20210121000001', // 订单编号
        ordertime: '王小虎', // 下单时间
        ordertotal: '上海', // 订单总额
        consignee: '普陀区', // 收货人
        orderstatus: '上海市普陀区金沙江路 1518 弄', // 订单状态
        paystatus: 200333, // 付款状态
        shipmentstatus: 200333, // 发货状态
        paymethod: 200333, // 支付方式
        customerphone: 200333, // 客户联系方式
        customeraddress: 200333, // 客户地址
        customermail: 200333 // 客户邮件
      }, {
        orderNo: '20210121000001', // 订单编号
        ordertime: '王小虎', // 下单时间
        ordertotal: '上海', // 订单总额
        consignee: '普陀区', // 收货人
        orderstatus: '上海市普陀区金沙江路 1518 弄', // 订单状态
        paystatus: 200333, // 付款状态
        shipmentstatus: 200333, // 发货状态
        paymethod: 200333, // 支付方式
        customerphone: 200333, // 客户联系方式
        customeraddress: 200333, // 客户地址
        customermail: 200333 // 客户邮件
      }, {
        orderNo: '20210121000001', // 订单编号
        ordertime: '王小虎', // 下单时间
        ordertotal: '上海', // 订单总额
        consignee: '普陀区', // 收货人
        orderstatus: '上海市普陀区金沙江路 1518 弄', // 订单状态
        paystatus: 200333, // 付款状态
        shipmentstatus: 200333, // 发货状态
        paymethod: 200333, // 支付方式
        customerphone: 200333, // 客户联系方式
        customeraddress: 200333, // 客户地址
        customermail: 200333 // 客户邮件
      }, {
        orderNo: '20210121000001', // 订单编号
        ordertime: '王小虎', // 下单时间
        ordertotal: '上海', // 订单总额
        consignee: '普陀区', // 收货人
        orderstatus: '上海市普陀区金沙江路 1518 弄', // 订单状态
        paystatus: 200333, // 付款状态
        shipmentstatus: 200333, // 发货状态
        paymethod: 200333, // 支付方式
        customerphone: 200333, // 客户联系方式
        customeraddress: 200333, // 客户地址
        customermail: 200333 // 客户邮件
      }, {
        orderNo: '20210121000001', // 订单编号
        ordertime: '王小虎', // 下单时间
        ordertotal: '上海', // 订单总额
        consignee: '普陀区', // 收货人
        orderstatus: '上海市普陀区金沙江路 1518 弄', // 订单状态
        paystatus: 200333, // 付款状态
        shipmentstatus: 200333, // 发货状态
        paymethod: 200333, // 支付方式
        customerphone: 200333, // 客户联系方式
        customeraddress: 200333, // 客户地址
        customermail: 200333 // 客户邮件
      }, {
        orderNo: '20210121000001', // 订单编号
        ordertime: '王小虎', // 下单时间
        ordertotal: '上海', // 订单总额
        consignee: '普陀区', // 收货人
        orderstatus: '上海市普陀区金沙江路 1518 弄', // 订单状态
        paystatus: 200333, // 付款状态
        shipmentstatus: 200333, // 发货状态
        paymethod: 200333, // 支付方式
        customerphone: 200333, // 客户联系方式
        customeraddress: 200333, // 客户地址
        customermail: 200333 // 客户邮件
      }, {
        orderNo: '20210121000001', // 订单编号
        ordertime: '王小虎', // 下单时间
        ordertotal: '上海', // 订单总额
        consignee: '普陀区', // 收货人
        orderstatus: '上海市普陀区金沙江路 1518 弄', // 订单状态
        paystatus: 200333, // 付款状态
        shipmentstatus: 200333, // 发货状态
        paymethod: 200333, // 支付方式
        customerphone: 200333, // 客户联系方式
        customeraddress: 200333, // 客户地址
        customermail: 200333 // 客户邮件
      }, {
        orderNo: '20210121000001', // 订单编号
        ordertime: '王小虎', // 下单时间
        ordertotal: '上海', // 订单总额
        consignee: '普陀区', // 收货人
        orderstatus: '上海市普陀区金沙江路 1518 弄', // 订单状态
        paystatus: 200333, // 付款状态
        shipmentstatus: 200333, // 发货状态
        paymethod: 200333, // 支付方式
        customerphone: 200333, // 客户联系方式
        customeraddress: 200333, // 客户地址
        customermail: 200333 // 客户邮件
      }],
      formInline: {
        user: '',
        region: ''
      },
      currentPage4: 4,
      options: [
        {
          value: 'config',
          label: '设置'
        },
        {
          value: 'markascatalog',
          label: '标记为目录册'
        },
        {
          value: 'del',
          label: '删除'
        }, {
          value: 'import',
          label: '导入'
        }, {
          value: 'export',
          label: '导出',
          children: [{
            value: 'select',
            label: '选中导出'
          }, {
            value: 'singlepage',
            label: '单页导出'
          }, {
            value: 'all',
            label: '全部导出'
          }]
        }]
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!')
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    },
    handleChange(value) {
      console.log(value, '按钮层')
    }
  }
}
</script>

<style scoped lang="less">
.single {
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;

  .btnslist {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-bottom: 20px;
  }

  .total {
    display: flex;
    margin: 10px 0;
    justify-content: center;
  }

  .pagination {
    display: flex;
    justify-content: center;
  }
}
</style>
