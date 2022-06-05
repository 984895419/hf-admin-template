<template>
  <el-col :span="span">
    <el-form-item
      :size="$store.size"
      :label="label"
      :prop="prop"
      :label-width="labelWidth"
      :required="required"
      :rules="rules"
      :error="error"
    >
      <slot>
        <!-- 下拉 -->
        <el-select
          v-if="!$attrs['multiple']"
          v-model="value[prop]"
          clearable
          v-bind="$attrs"
          v-on="$listeners"
        >
          <el-option
            v-for="option in list"
            :key="option.dictValue"
            :value="option.dictValue"
            :label="option.dictKey"
          />
        </el-select>
        <el-select
          v-if="$attrs['multiple']"
          v-model="multipleSelect"
          clearable
          v-bind="$attrs"
          v-on="$listeners"
          @change="multipleChange"
        >
          <el-option
            v-for="option in list"
            :key="option.dictValue"
            :value="option.dictValue"
            :label="option.dictKey"
          />
        </el-select>
      </slot>
    </el-form-item>
  </el-col>
</template>
<script>/**
 * 数据字典的方式; 数据字典的url
 */

import {baseApiGetMethod} from "../baseApi";
import {getData, getMessage, isSuccessResult} from "../../../utils/ajaxResultUtil";

export default {
  name: 'FormItemColDict',
  props: {
    span: Number,
    value: Object,
    prop: String,
    rules: Object,
    error: String,
    label: String,
    required: Boolean,
    labelWidth: String,
    dictCode: null
  },
  data() {
      return {
          dictListUrl: '/api/baseDictValue/list',
          list: null,
          multipleSelect: this.$attrs['multiple']
              ? (this.value[this.prop] ? [] : this.value[this.prop].split(',')) : []
      }
  },
  created() {
    this.loadDict()
  },
  methods: {
      /**
       * 加载字典信息
       */
    loadDict() {
        baseApiGetMethod(this.dictListUrl, { typeCode: this.dictCode }).then(resp => {
            if (isSuccessResult(resp)) {
              this.list = getData(resp)
            } else {
                this.$message.error(getMessage(resp))
            }
        })
    },
    multipleChange() {
        debugger
      this.value[this.prop] = this.multipleSelect.join(",")
    }
  }
}
</script>
