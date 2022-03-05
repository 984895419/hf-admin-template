<template>
  <el-form
    ref="form"
    style="padding-top: 10px;border-top: #CCCCCC solid 1px"
    :model="row"
    label-width="100px"
  >
    <el-label v-text="$t('common.account.mmdpNew')" />
    <input
      v-model="row.mmdpNew"
      class="input1"
      type="password"
      placeholder="New Password"
    >
    <el-label v-text="$t('common.account.mmdpNewConfirm')" />
    <input
      v-model="row.mmdpNewConfirm"
      class="input1"
      type="password"
      placeholder="New Password Confirm"
    >
    <el-button
      type="primary"
      style="width:100%;padding:10px;margin-bottom:30px;"
      @click="handleSubmit"
    >
      提交
    </el-button>
  </el-form>
</template>

<script>
import { loginResetMMdp } from '@/api/user'
import { messageErrorHandle, messageSuccesHandle } from '@/utils/message-handle'

export default {
  name: 'Mmdp',
  data() {
    return {
      /**
       * 列表字段
       */
      row: {
        userCode: '',
        mmdpNew: '',
        mmdpNewConfirm: ''
      }
    }
  },
  created() {
  },
  methods: {
    setFormData(row) {
      this.row.userCode = row
      this.row.mmdpNew = ''
      this.row.mmdpNewConfirm = ''
      this.$message({
        type: 'warning',
        message: '重置密码'
      })
    },
    /**
     * 提交
     */
    handleSubmit() {
      const _this = this
      if (this.row.mmdpNew === '') {
        this.$message({
          type: 'warning',
          message: '密码不能为空'
        })
        return false
      }
      if (this.row.mmdpNew !== this.row.mmdpNewConfirm) {
        this.$message({
          type: 'warning',
          message: '两次输入不一致'
        })
        return false
      }
      if (this.row.mmdpNew === '12345678') {
        this.$message({
          type: 'warning',
          message: '新密码不能与原密码相同'
        })
        return false
      }
      loginResetMMdp(this.row).then(response => {
        if (response.res === '1') {
          _this.$emit('submit-success')
          messageSuccesHandle(_this, _this.$t('common.table.edit'))
        } else {
          messageErrorHandle(_this, response, _this.$t('common.table.edit'))
        }
      }).catch(err => {
        messageErrorHandle(_this, err, _this.$t('common.table.edit'))
        console.error(err)
      })
    }
  }
}
</script>

<style>
.input1,
select {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}
</style>
