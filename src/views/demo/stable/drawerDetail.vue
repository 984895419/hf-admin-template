<template>
    <div>
        <el-drawer :visible.sync="isshowdetail" :direction="direction" :before-close="handleClose">
            <div class="demo-drawer__content">
                <div class="table-tit">订单明细表</div>
            </div>
            <div></div>
            <div class="demo-drawer__content">
                <div class="table-tit">客户明细表</div>
            </div>
            <div class="demo-drawer__footer">
                <el-button @click="cancelForm">取 消</el-button>
                <el-button type="primary" :loading="loading">{{ loading ? '提交中...' : '确 定' }}</el-button>
            </div>
        </el-drawer>
    </div>
</template>

<script>

export default {
    data() {
        return {
            direction: 'rtl',
            loading: true
        }
    },
    props: {
        isshowdetail: {
            type: Boolean,
            default: false
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
.table-tit {
    font-size: 24px;
    padding: 15px 0;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgb(242, 242, 242);
}

.demo-drawer__footer {
    position: fixed;
    bottom: 0;
    right: 0;
    margin: 10px 10px 10px 0;
}
</style>