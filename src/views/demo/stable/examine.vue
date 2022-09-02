<template>
    <div>
        <dialog-btn-page :type="'text'" :label="'批量审核'" :title="'批量审核'">
            <template slot-scope="{ closeDialog }">
                <div @closeDialog="closeDialog">
                    <el-card>
                        <el-form>
                            <el-form-item label="审核状态">
                                <el-radio v-model="auditstatus" label="1" border size="medium">通过</el-radio>
                                <el-radio v-model="auditstatus" label="2" border size="medium">不通过</el-radio>
                            </el-form-item>
                        </el-form>
                    </el-card>
                    <div style="float:right;margin:10px 0">
                        <el-button type="primary" @click="onSubmit">确定</el-button>
                        <el-button @click="closeDialog">取消</el-button>
                    </div>
                </div>
            </template>
        </dialog-btn-page>

    </div>
</template>

<script>
import DialogBtnPage from '@/components/CURD/Btns/DialogBtnPage'
export default {
    components: {
        DialogBtnPage
    },
    props: {
        auditstatus: {
            type: String,
            default: '1'
        }
    },
    methods: {
        // 提交查询表单
        onSubmit() {
            console.log('submit!')
        },
    }
}
</script>

<style>
</style>