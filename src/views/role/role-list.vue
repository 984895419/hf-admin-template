<template>
  <div class="app-container">
    <div class="container-main">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column fixed prop="roleName" label="角色名称" width="150" />
        <el-table-column prop="roleDesc" label="创建人" width="120" />
        <el-table-column prop="tenantId" label="状态" width="120" />
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleClick(scope.row)">查看</el-button>
            <el-button type="text" size="small">编辑</el-button>
            <el-button type="danger" size="small" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { baseApiGetMethod } from '@/components/CURD/baseApi'
export default {
  data() {
    return {
      tableData: [],
      pageData: {
        pageNum: 1,
        pageSize: 10
      }
    }
  },
  created() {
    let param = {}
    const pageInfos = {
        pageInfo: {
          pageNo: this.pageData.pageNum,
          pageSize: this.pageData.pageSize
        }
      }
    param = Object.assign(pageInfos)
    baseApiGetMethod('/api/hfBaseRightRole/nameQuery', param).then(
        (resp) => {
          if (resp.retCode === '00001') {
            this.tableData = resp.data.list
            console.log(resp, 'resp')
          }
        }
      )
  },
  methods: {
    handleClick(row) {
      console.log(row)
    },
    handleDelete(index, row) {
      console.log(index, row)
    },

    handleEdit(index, row) {
      console.log(index, row)
    }
  }

}
</script>

<style lang="scss" scoped>
.container-main {}
</style>
