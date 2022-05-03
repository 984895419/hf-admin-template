<template>
  <div v-if="addFields&&addFields.length >0">
    <el-form
      ref="form"
      :size="$store.size"
      :model="value"
      :rules="formRules"
      label-width="120px"
      v-bind="{...(options && options.formProps) }"
    >
      <add-form-items :add-fields="addFields" :default-span="defaultSpan" :value="value" />
      <el-row>
        <el-col
          :span="24"
        >
          <el-form-item>
            <div style="float: right">
              <slot name="update-btn-before" :data="value" :formValidate="formValidate" />
              <el-button type="primary" icon="el-icon-search" @click="doSubmit">保存</el-button>
              <el-button icon="el-icon-circle-close" @click="doCancel">取消</el-button>
              <slot name="update-btn-after" :data=" value" :formValidate="formValidate" />
            </div>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import AddFormItems from '@/components/CURD/Add/AddFormItems'
import { getMessage, isSuccessResult } from '@/utils/ajaxResultUtil'
import { baseApiPutMethod } from '@/components/CURD/baseApi'

/**
 * 添加的表单
 */
export default {
  /**
   * 添加的表单
   */
  name: 'UpdateForm',
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
    beforeSubmit: Function
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
      if (this.$el.getBoundingClientRect) {
        if (this.options && this.options.showNum) {
          this.showNum = this.options.showNum
        } else {
          const s = this.$el.getBoundingClientRect().width || document.body.clientWidth
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
      }
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
          if (this.url) {
            // 发送仅编辑的数据
            const postData = {}
            const fields = this.addFields.filter(s => (s.updateConfig && s.updateConfig.updatable === true) || s.primaryKey === true)
            for (const ind in fields) {
              const field = fields[ind]
              postData[field.value] = this.value[field.value]
              if (field.type === 'ref' && field.referOption) {
                // 如果是参照，需要将参照的字段也塞进去
                postData[field.referOption.valueReferName] = this.value[field.referOption.valueReferName]
                if (field.referOption.valueExpendRefers) {
                  for (const ind in field.referOption.valueExpendRefers) {
                    postData[ind] = this.value[ind]
                  }
                }
              }
            }
            // 发送post请求
            baseApiPutMethod(this.url, postData).then(resp => {
              if (isSuccessResult(resp)) {
                this.$message.success(getMessage(resp))
                this.$emit('success')
                this.$emit('closeDialog')
              } else {
                this.$message.error(getMessage(resp))
              }
            })
          } else {
            this.$emit('success')
          }
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
