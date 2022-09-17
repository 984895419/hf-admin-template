<template>
    <div v-if="tableData">
        <!-- 底部 -->
        <hf-table :table-data="tableData">
            <default-column-list :Rowlist='tableData' />
        </hf-table>
        <!-- 弹窗 -->
        <drawer-detail ref="detail">
            <template>
                <hf-table :table-data="tableData">
                    <default-column-list :Rowlist='tableData' />
                </hf-table>
            </template>
        </drawer-detail>
    </div>
</template>
<script>
import HfTable from '@/components/CURD/Table/HfTable'// 单表组件
import defaultColumnList from './defaultColumnList.vue'
import DrawerDetail from './drawerDetail.vue'// 双击抽屉详情页
export default {
    data() {
        return {

        }
    },
    props: {
        tableData: {
            type: Array
        }
    },
    components: {
        HfTable,
        defaultColumnList,
        DrawerDetail
    }
}
</script>