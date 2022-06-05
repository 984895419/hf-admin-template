<template>
    <div>
      <el-form
        ref="form"
        :size="$store.size"
        :model="value"
        v-bind="$attrs"
      >
        <slot></slot>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="doSearch">查询</el-button>
          <el-button icon="el-icon-circle-close" @click="doReset">重置</el-button>
          <slot name="btns" />
          <el-button
            v-if="$scopedSlots['pageInfo'] && !more"
            icon="el-icon-arrow-down"
            type="primary"
            @click="more = !more"
          >
            显示
          </el-button>
        </el-form-item>
        <div v-if="more">
          <slot name="more"></slot>
        </div>
      </el-form>
    </div>
</template>

<script>
    import { deepClone } from '../../../utils'

    export default {
        name: 'SsoClientSearch',
        props: {
          value: Object
        },
        data() {
          return {
              initValue: deepClone(this.value),
              more: false
          }
        },
        methods: {
            /**
             * 查询
             */
            doSearch() {
                this.$emit('search')
            },
            /**
             * 重置查询条件
             */
            doReset() {
                this.$emit('input', this.initValue)
                this.$emit('search')
            },
        }
    }
</script>

<style scoped>

</style>
