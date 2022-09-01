<template>
    <div>
        <div class="advanced-title">高级搜索</div>
        <el-form :model="searchForm" label-width="80px">
            <form-item-col :value="searchForm" :span="8" prop="orderNo" :namespace="conf.namespace" />
            <form-item-col :value="searchForm" :span="8" prop="ordertime" :namespace="conf.namespace">
                <el-date-picker v-model="datatimeVal" style="width:100%" type="datetime" placeholder="选择日期时间"
                    :picker-options="pickerOptions" />
            </form-item-col>
            <form-item-col :value="searchForm" :span="8" prop="ordertotal" :namespace="conf.namespace" />
            <form-item-col :value="searchForm" :span="8" prop="consignee" :namespace="conf.namespace" />
            <form-item-col :value="searchForm" :span="8" prop="orderstatus" :namespace="conf.namespace" />
            <form-item-col :value="searchForm" :span="8" prop="paystatus" :namespace="conf.namespace" />
            <form-item-col :value="searchForm" :span="8" prop="shipmentstatus" :namespace="conf.namespace" />
            <form-item-col :value="searchForm" :span="8" prop="paymethod" :namespace="conf.namespace" />
            <form-item-col :value="searchForm" :span="8" prop="customerphone" :namespace="conf.namespace" />
            <form-item-col :value="searchForm" :span="8" prop="customeraddress" :namespace="conf.namespace" />
            <form-item-col :value="searchForm" :span="8" prop="customermail" :namespace="conf.namespace" />
        </el-form>
        <div>
            <el-button type="primary" @click="onSubmit">立即搜索</el-button>
            <el-button @click="cancelAdvanced">重置查询条件</el-button>
        </div>
    </div>
</template>

<script>
import FormItemCol from '@/components/CURD/Form/formItemCol.vue'
export default {
    components: {
        FormItemCol
    },
    data() {
        return {
            // 带快捷时间
            pickerOptions: {
                shortcuts: [{
                    text: '今天',
                    onClick(picker) {
                        picker.$emit('pick', new Date())
                    }
                }, {
                    text: '昨天',
                    onClick(picker) {
                        const date = new Date()
                        date.setTime(date.getTime() - 3600 * 1000 * 24)
                        picker.$emit('pick', date)
                    }
                }, {
                    text: '一周前',
                    onClick(picker) {
                        const date = new Date()
                        date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
                        picker.$emit('pick', date)
                    }
                }]
            },
            datatimeVal: ''
        }
    },
    props: {
        searchForm: {
            type: Object
        },
        conf: {
            type: Object
        }
    },
    methods: {
        onSubmit() {
            this.$emit('success')
        },
        cancelAdvanced() {
            this.$emit('cancel')
        }

    }
}
</script>

<style lang="less" scoped>
.advanced-title {
    border-bottom: 1px solid rgb(25, 137, 250);
    padding: 0 0 10px 0;
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 10px;
}
</style>
