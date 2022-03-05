<template>
  <div style="margin-top: -20px">
    <el-divider><el-button type="text" size="medium" :icon="btnText" style="margin-top: -9px;" @click="showToggle" /></el-divider>
    <div v-show="isShow" style="margin-top: -15px">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdvanceSearch',
  data() {
    return {
      btnText: 'el-icon-arrow-down',
      isShow: false
    }
  },
  created() {
  },
  methods: {
    showToggle() {
      this.isShow = !this.isShow
      if (this.isShow) {
        this.btnText = 'el-icon-arrow-up'
      } else {
        this.btnText = 'el-icon-arrow-down'
      }
    }
  }
}
</script>

<style>
  .el-divider__text.is-center {
    height: 20px;
  }
</style>
