<template>
  <div>
    <el-button :size="size" :type="type" :icon="icon" @click="openDialog">{{ label }}</el-button>
    <hf-dialog
      :visible.sync="showImportDialog"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <div style="margin-top: 10px">
        <slot :closeDialog="closeDialog" :showState="showImportDialog" />
      </div>
    </hf-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
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
    title: String,
    icon: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      showImportDialog: false
    }
  },
  computed: {
      ...mapGetters([
          'size'
      ])
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

</style>
