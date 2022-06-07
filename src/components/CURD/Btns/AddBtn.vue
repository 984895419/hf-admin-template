<template>
  <div>
    <el-button
      :type="type"
      :icon="icon"
      :size="$store.size"
      @click="openDialog"
    >
      {{ label }}
    </el-button>
    <el-dialog
      :visible.sync="showDialog"
      width="75%"
      :title="title"
      append-to-body
      top="5vh"
      v-bind="Object.assign({ 'close-on-click-modal': false}, $attrs)"
      v-on="$listeners"
    >
      <div style="margin-top:20px">
        <slot :data="postData" :closeDialog="closeDialog" />
      </div>
    </el-dialog>
  </div>
</template>

<script>/**
 * 新增按钮
 */
import { deepClone } from '@/utils'

export default {
  name: 'AddBtn',
  props: {
    type: {
      type: String,
      default: 'primary'
    },
    icon: {
      type: String,
      default: 'el-icon-circle-plus-outline'
    },
    title: {
        type: String,
        default: '新增'
    },
    label: {
      type: String,
      require: true,
      default: '新增'
    },
    initData: {
      type: Object,
      default: function() {
        return {}
      }
    }
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
      this.postData = deepClone(this.initData)
      this.showDialog = true
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
