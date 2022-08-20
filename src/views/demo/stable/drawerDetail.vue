<template>
    <div>
        <el-drawer size="30%" :visible.sync="isshowdetail" :direction="direction" :before-close="handleClose">
            <div class="demo-drawer__content">
                <div class="table-tit">订单明细表</div>
            </div>
            <div class="demo-drawer__table">
                <el-form :model="rowdata" label-width="80px">
                    <el-col :span="12">
                        <el-form-item label="订单编号" v-if="rowdata">
                            <el-input :readonly=true v-model="rowdata.orderNo"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="下单时间" v-if="rowdata">
                            <el-input :readonly=true v-model="rowdata.ordertime"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="订单总额" v-if="rowdata">
                            <el-input :readonly=true v-model="rowdata.ordertotal"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="收货人" v-if="rowdata">
                            <el-input :readonly=true v-model="rowdata.consignee"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="订单状态" v-if="rowdata">
                            <el-input :readonly=true v-model="rowdata.orderstatus"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="订单编号" v-if="rowdata">
                            <el-input :readonly=true v-model="rowdata.orderNo"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="付款状态" v-if="rowdata">
                            <el-input :readonly=true v-model="rowdata.paystatus"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="发货状态" v-if="rowdata">
                            <el-input :readonly=true v-model="rowdata.shipmentstatus"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="支付方式" v-if="rowdata">
                            <el-input :readonly=true v-model="rowdata.paymethod"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="客户联系方式" v-if="rowdata">
                            <el-input :readonly=true v-model="rowdata.customerphone"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="客户地址" v-if="rowdata">
                            <el-input :readonly=true v-model="rowdata.customeraddress"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="客户邮件" v-if="rowdata">
                            <el-input :readonly=true v-model="rowdata.customermail"></el-input>
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
    data() {
        return {
            direction: 'rtl',
            loading: true,
            conf: conf
        }
    },

    props: {
        isshowdetail: {
            type: Boolean,
            default: false
        },
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
        }
    },
    methods: {
        handleClose(done) {
            this.$confirm('确认关闭？')
                .then(_ => {
                    this.$emit('getshowdetail', false)
                })
                .catch(_ => { })
        },
        cancelForm() {
            this.$emit('getshowdetail', false)
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