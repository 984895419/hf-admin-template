<template>
  <div>
    <!-- 如果没有配置，默认所有addShowable的字段都可以填写 -->
    <div
      v-if="(operate !== 'update' && item.createConfig && item.createConfig.addable === true)
        || (operate === 'update' && item.updateConfig && item.updateConfig.updatable === true)"
    >
      <!-- 下拉 -->
      <el-select
        v-if="item.type === 'select'"
        v-model="value[item.value]"
        clearable
        v-bind="item.props"
        :placeholder=" item.placeholder ||`请选择${item.label}`"
      >
        <el-option
          v-for="option in item.children"
          :key="option.value"
          :value="option.value"
          :label="option.label"
        />
      </el-select>
      <!-- 级联 -->
      <el-date-picker
        v-else-if="item.type === 'picker'"
        v-model="value[item.value]"
        clearable
        :placeholder="item.placeholder || '选择日期'"
        v-bind="item.props || { type: 'date' }"
      />
      <el-cascader
        v-else-if="item.type === 'cascader'"
        v-model="value[item.value]"
        :options="item.options"
      />
      <!--数字 -->
      <el-input
        v-else-if="item.inputType === 'number'"
        v-model="value[item.value]"
        clearable
        v-bind="item.props"
        :placeholder="item.placeholder || `请输入${ item.label}`"
      />
      <!--文本-->
      <el-input
        v-else-if="item.type === 'text'"
        v-model="value[item.value]"
        clearable
        v-bind="item.props"
        :placeholder="item.placeholder || `请输入${item.label}`"
      />

      <!--文本-->
      <el-input
        v-else-if="item.type === 'textarea'"
        v-model="value[item.value]"
        type="textarea"
        clearable
        v-bind="item.props"
        :placeholder="item.placeholder || `请输入${item.label}`"
      />

      <el-switch
        v-else-if="item.type === 'switch'"
        v-model="value[item.value]"
        v-bind="item.props"
      />
      <div v-else-if="item.type === 'ref'">
        <component
          :is="dynamicComponent"
          v-if="item.referOption && item.referOption.refPath"
          v-model="value"
          v-bind="{ valueReferId: item.value, ...item.referOption}"
          v-on="$listeners"
        />
        <span v-else>
          没有找到对应类型的组件
        </span>
      </div>
      <div v-else-if="item.type === 'tableRef'">
        <component
          :is="dynamicComponent"
          v-if="item.referOption && item.referOption.refPath"
          v-model="value[item.value]"
        />
        <span v-else>
          没有找到对应类型的组件
        </span>
      </div>
      <div v-else>
        没有找到该类型的实现{{ item.type }}
      </div>
    </div>
    <div v-else>
      <span v-if="item.type === 'select'">
        {{ labelOption(value[item.value]) }}
      </span>
      <span v-else>
        {{ value[item.value] }}
      </span>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  name: 'FormItemRender',
  props: {
    item: Object,
    value: Object,
    /**
     * 操作类型，更新
     */
    operate: {
      type: String,
      default: 'update'
    }
  },
  computed: {
    dynamicComponent() {
      if (this.item.referOption && this.item.referOption.refPath) {
        if (typeof this.item.referOption.refPath === 'string') {
          return Vue.component(this.item.referOption.refPath)
        }
        return this.item.referOption.refPath
      }
      return null
    },
    labelOption() {
      return function(val) {
        if (this.item.children) {
          for (const ind in this.item.children) {
            const tag = this.item.children[ind]
            if (tag.value === val) {
              return tag.label
            }
          }
        }
        return val
      }
    }
  },
  /**
   * 填充默认值
   */
  created() {
    if (this.item.defaultVal != null && (this.value[this.item.value] == null)) {
      this.value[this.item.value] = this.item.defaultVal
    }
  }
}
</script>

<style scoped>

</style>
