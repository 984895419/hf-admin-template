<template>
  <div v-if="addFields&&addFields.length >0" v-loading="loading">
    <el-form
      ref="form"
      :size="$store.size"
      :model="value"
      :rules="formRules"
      :label-width="labelWidth"
      v-bind="{...(options && options.formProps) }"
    >
      <add-form-items :add-fields="addFields" :error-info="errorInfo" :default-span="defaultSpan" :operate="'add'" :value="value" />
      <el-row v-if="showBtnArea === true">
        <el-col
          :span="24"
        >
          <el-form-item>
            <div style="float: right">
              <slot name="add-btn-before" :data="value" :formValidate="formValidate" />
              <el-button type="primary" icon="el-icon-search" @click="doSubmit">保存</el-button>
              <el-button icon="el-icon-circle-close" @click="doCancel">取消</el-button>
              <slot name="add-btn-after" :data="value" :formValidate="formValidate" />
            </div>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>

import AddFormItems from '@/components/CURD/Add/AddFormItems'
import { baseApiPostMethod } from '@/components/CURD/baseApi'
import { getData, getMessage, isSuccessResult, isTheRetCode } from '@/utils/ajaxResultUtil'

/**
 * 添加的表单
 */
export default {
  /**
   * 添加的表单
   */
  name: 'AddForm',
  components: { AddFormItems },
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
    },
    /**
     * 是否显示按钮区域
     */
    showBtnArea: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      loading: false,
      /**
       * 默认一行显示几个查询, 默认3个
       */
      showNum: 4,
      /**
       * 默认显示的span个数
       */
      defaultSpan: 6,
      errorInfo: null
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
     * 表单验证的回调
     * @param cb
     */
    formValidate(cb) {
      this.$refs.form.validate((valid) => {
        if (valid) {
          cb()
        } else {
          return false
        }
      })
    },
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
          this.errorInfo = null
          if (this.beforeSubmit) {
            const passed = this.beforeSubmit(this.value)
            if (!(passed === true)) {
              return
            }
          }
          // 发送post请求
          this.loading = true
          baseApiPostMethod(this.url, this.value).then(resp => {
            if (isSuccessResult(resp)) {
              this.$message.success(getMessage(resp))
              this.$emit('success')
              this.$emit('closeDialog')
            } else {
              if (isTheRetCode('00004')) {
                this.errorInfo = getData(resp)
              } else {
                this.$message.error(getMessage(resp))
              }
            }
            this.loading = false
          }).catch(res => {
            console.log(res)
            this.loading = false
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
