<template>
  <div v-if="addFields&&addFields.length >0">
    <el-form
      ref="form"
      :size="$store.size"
      :model="value"
      :rules="formRules"
      :label-width="labelWidth"
      v-bind="{...(options && options.formProps) }"
    >
      <config-form-items :add-fields="addFields" :default-span="defaultSpan" :value="value" />
    </el-form>
  </div>
</template>

<script>
import { baseApiPostMethod } from '@/components/CURD/baseApi'
import { getMessage, isSuccessResult } from '@/utils/ajaxResultUtil'
import ConfigFormItems from '@/components/CURD/Config/ConfigFormItems'

/**
 * 添加的表单
 */
export default {
  /**
   * 添加的表单
   */
  name: 'ConfigForm',
  components: { ConfigFormItems },
  /**
   * 属性名
   */
  props: {
    /**
     * 新增的表单选项
     */
    addFields: Array,
    /**
     * 表单的选项
     */
    options: Object,
    /**
     * 表单对象
     */
    value: Object,
    /**
     * 表单提交的地址
     */
    url: {
      type: String,
      require: true
    },
    /**
     * 提交之前的校验， 返回true会提交表单，false则不提交
     */
    beforeSubmit: Function,
    /**
     * label的宽度
     */
    labelWidth: {
      type: String,
      default: '120px'
    }
  },
  data() {
    return {
      /**
       * 默认一行显示几个查询, 默认3个
       */
      showNum: 4,
      /**
       * 默认显示的span个数
       */
      defaultSpan: 6
    }
  },
  computed: {
    /**
     * 规则校验
     * @returns {*[]}
     */
    formRules() {
      return {}
    }
  },
  watch: {
    value: {
      deep: true,
      handler: function() {
        this.$refs.form.clearValidate()
      }
    }
  },
  /**
   * 创建时候执行
   */
  created() {
    // 初始化重置表单
    this.$nextTick(() => {
      // 做不同屏幕分辨率匹配
      this.showNumCalculate()
    })
    window.onresize = this.showNumCalculate
    console.log('addForm')
  },
  methods: {
    /**
     * 显示数量计算
     */
    showNumCalculate() {
      if (this.options && this.options.showNum) {
        this.showNum = this.options.showNum
      } else {
        const s = (this.$el && this.$el.getBoundingClientRect().width) || document.body.clientWidth
        if (s < 768) {
          this.showNum = 1
        } else if (s > 768 && s < 1200) {
          this.showNum = 2
        } else if (s > 1200 && s < 1912) {
          this.showNum = 3
        } else if (s >= 1912) {
          this.showNum = 4
        }
      }
      // 默认的显示个数
      this.defaultSpan = 24 / this.showNum
    },
    /**
     * 提交的时候执行
     */
    doSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.beforeSubmit) {
            const passed = this.beforeSubmit(this.value)
            if (!(passed === true)) {
              return
            }
          }
          // 发送post请求
          baseApiPostMethod(this.url, this.value).then(resp => {
            if (isSuccessResult(resp)) {
              this.$message.success(getMessage(resp))
            } else {
              this.$message.error(getMessage(resp))
            }
            this.$emit('success')
            this.$emit('closeDialog')
          })
        } else {
          return false
        }
      })
    },
    /**
     * 重置
     */
    doCancel() {
      this.$emit('closeDialog')
    }
  }
}
</script>

<style scoped>

</style>
