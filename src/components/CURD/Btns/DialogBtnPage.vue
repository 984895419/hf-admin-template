<template>
  <div class="dialog-btn">
    <el-button :size="$store.size" :type="type" @click="openDialog">{{ label }}</el-button>
    <el-dialog
      :top="'5vh'"
      :visible.sync="showImportDialog"
      width="80%"
      :title="title"
      append-to-body
      v-bind="Object.assign({ 'close-on-click-modal': false }, $attrs)"
      v-on="$listeners"
    >
      <div style="margin-top: 10px">
        <slot :closeDialog="closeDialog" />
      </div>
    </el-dialog>
  </div>
</template>

<script>

export default {
  name: 'CommonDialogBtn',
  props: {
    label: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'primary'
    },
    title: String
  },
  data() {
    return {
      showImportDialog: false
    }
  },
  methods: {
    openDialog() {
      this.showImportDialog = true
      this.$emit('success')
    },
    /**
     * 打开弹窗
     */
    closeDialog() {
      this.showImportDialog = false
    }
  }
}
</script>

<style scoped>
.dialog-btn /deep/ .el-dialog {

}

.dialog-btn /deep/ .el-dialog__body {
  max-height: 60%;
}
</style>
