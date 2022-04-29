<template>
  <el-button
    :type="btnType"
    :size="$store.size"
    :style="{ color: btnType !== 'text' ? '' : 'red'}"
    @click="openDialog"
  >
    {{ label }}
  </el-button>
</template>

<script>

import { getMessage, isSuccessResult } from '@/utils/ajaxResultUtil'
import { baseApiDeleteMethod } from '@/components/CURD/baseApi'

export default {
  name: 'DelBtn',
  props: {
    btnType: {
      type: String,
      default: 'danger'
    },
    label: {
      type: String,
      require: true,
      default: '删除'
    },
    value: [Object, Array, String],
    /**
     * 查询的url
     */
    url: String
  },
  methods: {
    /**
     * 打开弹窗
     */
    openDialog() {
      if (this.value == null || this.value.length <= 0) {
        this.$message.warning('请选择1至少一条记录')
        return
      }
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        baseApiDeleteMethod(this.url, this.value).then(resp => {
          if (isSuccessResult(resp)) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.$emit('success')
          } else {
            this.$message.error(getMessage(resp))
            return
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>

<style scoped>

</style>
