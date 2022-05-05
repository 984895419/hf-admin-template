<template>
  <div v-if="searchFields&&searchFields.length >0">
    <el-form
      ref="form"
      :size="$store.size"
      :model="value"
      label-width="120px"
      v-bind="{...(options && options.formProps) }"
    >
      <el-row :gutter="10">
        <el-col
          v-for="item in firstLineFields"
          :key="item.value"
          :span="colSpan(item)"
          :class=" (colSpan(item)) !== 24 ? '' : 'col-24-bottom'"
        >
          <slot :name="item.value" :data="item">
            <search-form-item :item="item" @valChange="doSearch" />
          </slot>
        </el-col>
        <el-col
          :span="defaultSpan"
        >
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="doSearch">查询</el-button>
            <el-button icon="el-icon-circle-close" @click="doReset">重置</el-button>
            <slot name="btns" />
            <el-button
              v-if="hideFields && hideFields.length > 0 && !showMoreCondition"
              icon="el-icon-arrow-down"
              type="primary"
              @click="showMoreCondition = !showMoreCondition"
            >
              显示
            </el-button>
            <el-button
              v-if="hideFields && hideFields.length > 0 && showMoreCondition"
              type="danger"
              icon="el-icon-arrow-up"
              @click="showMoreCondition = !showMoreCondition"
            >
              隐藏
            </el-button>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="showMoreCondition" :gutter="10" class="more-query">
        <el-col
          v-for="item in hideFields"
          :key="item.value"
          :span="colSpan(item)"
        >
          <slot :name="item.value" :data="item">
            <search-form-item :item="item" @valChange="doSearch" />
          </slot>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import SearchFormItem from '@/components/CURD/Query/SearchFormItem'
import { deepClone } from '@/utils'

export default {
  name: 'SearchForm',
  components: { SearchFormItem },
  props: {
    /**
     * 查询字段
     */
    searchFields: [Array],
    /**
     * 对象值
     */
    value: {
      type: Object,
      default: function() {
        return {}
      }
    },
    /**
     * 表单的选项
     */
    options: Object,
    /**
     * 返回类型
     */
    returnType: {
      type: String,
      /**
       * 默认使用searchFields的方式，如果是表单方式，需要默认为‘form’
       */
      default: 'fields'
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
      defaultSpan: 6,
      /**
       * 表单信息
       */
      form: {},
      /**
       * 重置查询条件的字段
       */
      resetFields: null,
      /**
       * 是否显示更多查询条件
       */
      showMoreCondition: false,
      /**
       * 是否马上触发查询条件
       */
      immediately: true
    }
  },
  computed: {
    colSpan() {
      return (item) => {
        if (item.type === 'picker') {
          if (item.operate === 'BETWEEN') {
            return item.span || (this.defaultSpan * 2)
          }
        }
        return item.span || this.defaultSpan
      }
    },
    /**
     * 解析第一行的字段
     * @returns {*[]}
     */
    firstLineFields() {
      const res = []
      let totalRowSpan = 0
      for (const ind in this.searchFields) {
        const itemField = this.searchFields[ind]
        if (totalRowSpan + (itemField.span || this.defaultSpan) >= 24 &&
          res.length > 0) {
          return res
        }
        // 如果TODO 做更多的操作
        if (itemField.type === 'picker') {
          if (itemField.operate === 'BETWEEN') {
            itemField.props = {
              ...{ type: 'datetimerange', 'value-format': 'yyyy-MM-dd HH:mm:ss' },
              ...itemField.props
            }
          }
        }
        res.push(itemField)
        totalRowSpan += (itemField.span || this.defaultSpan)
      }
      return res
    },
    /**
     * 查询时候默认隐藏的字段
     * @returns {*[]}
     */
    hideFields() {
      const res = []
      let totalRowSpan = 0
      for (const ind in this.searchFields) {
        const itemField = this.searchFields[ind]
        if (totalRowSpan + (itemField.span || this.defaultSpan) < 24 ||
          (ind === '0' && (itemField.span || this.defaultSpan) === 24)) {
          totalRowSpan += (itemField.span || this.defaultSpan)
          continue
        }
        // 如果TODO 做更多的操作
        if (itemField.type === 'picker') {
          if (itemField.operate === 'BETWEEN') {
            itemField.props = {
              ...{ type: 'datetimerange', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
              ...itemField.props
            }
          }
        }
        res.push(itemField)
        totalRowSpan += (itemField.span || this.defaultSpan)
      }
      return res
    }
  },
  created() {
    // 初始化重置表单
    this.resetFields = deepClone(this.searchFields)
    // 做不同屏幕分辨率匹配
    this.$nextTick(() => {
      this.showNumCalculate()
    })
    window.onresize = this.showNumCalculate
  },
  methods: {
    /**
     * 触发查询操作
     */
    triggerSearch() {
      this.doSearch()
    },
    /**
     * 显示数量计算
     */
    showNumCalculate() {
      if (this.$el) {
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
      }
    },
    /**
     * 查询
     */
    doSearch() {
      this.$emit('search', this.getEmitData())
    },
    /**
     * 重置查询条件
     */
    doReset() {
      this.immediately = false
      const initVal = {}
      // 获取默认值信息
      for (const ind in this.resetFields) {
        initVal[this.resetFields[ind].label] = this.resetFields[ind].val
      }
      // 填充字段的值
      for (const ind in this.searchFields) {
        this.$set(this.searchFields[ind], 'val', initVal[this.searchFields[ind].label])
      }
      this.$emit('reset', this.getEmitData())
    },
    /**
     * 获取回传的数据
     */
    getEmitData() {
      if (this.returnType === 'fields') {
        return this.searchFields.map(s => {
          if (s.type === 'picker' && s.operate === 'BETWEEN') {
            const obj = {
              columnId: s.fieldId,
              columnName: s.columnName,
              val: s.val && s.val.join(','),
              operate: s.operate
            }
            return obj
          } else {
            const obj = {
              columnId: s.fieldId,
              columnName: s.columnName,
              val: s.val,
              operate: s.operate
            }
            return obj
          }
        })
      } else {
        // 将字段解析成对象，并传递
        for (const ind in this.searchFields) {
          // 判断是不是field
          const field = this.searchFields[ind]
          // 赋值
          this.$set(this.form, field.value, field.val)
        }
        return this.form
      }
    }
  }
}
</script>

<style scoped>
.search-form {
  margin: 5px 10px;
}

/deep/ .el-card__body {
  padding: 10px;
}

/deep/ .el-form-item {
  margin-bottom: 0px;
}

.col-24-bottom {
  margin-bottom: 10px;
}

/deep/ .more-query .el-form-item {
  margin-top: 10px;
}

/deep/ .el-card__header {
  padding: 5px 10px
}
</style>
