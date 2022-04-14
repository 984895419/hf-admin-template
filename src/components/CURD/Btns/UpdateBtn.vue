<template>
  <div>
    <el-button
      :type="btnType"
      icon="el-icon-edit"
      :size="$store.size"
      @click="openDialog"
    >
      {{ label }}
    </el-button>
    <el-dialog
      :visible.sync="showDialog"
      width="75%"
      append-to-body
      v-bind="Object.assign({ 'close-on-click-modal': false}, $attrs)"
      v-on="$listeners"
    >
      <div style="margin-top:20px">
        <slot :data="postData" :closeDialog="closeDialog" />
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { baseApiGetMethod } from '@/components/CURD/baseApi'
import { getData, getMessage, isSuccessResult } from '@/utils/ajaxResultUtil'

export default {
  name: 'UpdateBtn',
  props: {
    btnType: {
      type: String,
      default: 'primary'
    },
    label: {
      type: String,
      require: true,
      default: '编辑'
    },
    /**
     * 附带的查询数据
     */
    queryData: Object,
    /**
     * 查询的url
     */
    url: String
  },
  data() {
    return {
      showDialog: false,
      postData: null
    }
  },
  methods: {
    /**
     * 打开弹窗
     */
    openDialog() {
      // 从指定的
      baseApiGetMethod(this.url, this.queryData).then(resp => {
        if (isSuccessResult(resp)) {
          this.postData = getData(resp)
          this.showDialog = true
        } else {
          this.$message.error(getMessage(resp))
          return
        }
      })
    },
    /**
     * 关闭弹窗
     */
    closeDialog() {
      this.showDialog = false
    }
  }
}
</script>

<style scoped>

</style>
