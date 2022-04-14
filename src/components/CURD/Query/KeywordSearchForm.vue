<template>
  <div v-if="searchFields && searchFields.length >0">
    <el-form
      ref="form"
      :size="$store.size"
      :model="value"
      label-width="120px"
      v-bind="{...(options && options.formProps) }"
    >
      <el-row :gutter="10">
        <el-col
          :span="defaultSpan"
        >
          <el-form-item label="关键词">
            <el-input v-model="value.val" :placeholder="keywordsPlaceholder" />
          </el-form-item>
        </el-col>
        <el-col
          :span="defaultSpan"
          :style="{
            'margin-top': defaultSpan ===24? '5px': '0px'
          }"
        >
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="doSearch">查询</el-button>
            <el-button icon="el-icon-circle-close" @click="doReset">重置</el-button>
            <slot name="btns" />
          </el-form-item>
        </el-col>

      </el-row>
    </el-form>
  </div>
</template>

<script>

export default {
  name: 'KeywordSearchForm',
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
    options: Object
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
      val: null,
      /**
       * 是否马上触发查询条件
       */
      immediately: true
    }
  },
  computed: {
    keywordsPlaceholder() {
      return '支持“' + this.searchFields.filter(t => t.keyword === true).map(s => s.label).join('/') + '“字段进行模糊搜索'
    }
  },
  created() {
    // 做不同屏幕分辨率匹配
    this.$nextTick(() => {
      this.showNumCalculate()
    })
    window.onresize = this.showNumCalculate
  },
  methods: {

    /**
     * 显示数量计算
     */
    showNumCalculate() {
      if (this.$el) {
        if (this.options && this.options.showNum) {
          this.showNum = this.options.showNum
        } else {
          const s = this.$el.getBoundingClientRect().width || document.body.clientWidth
          if (s < 768) {
            this.showNum = 1
          } else if (s > 768 && s < 1200) {
            this.showNum = 2
          } else if (s > 1200 && s < 1912) {
            this.showNum = 2
          } else if (s >= 1912) {
            this.showNum = 2
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
      this.value.val = null
      this.$emit('reset', this.getEmitData())
    },
    getEmitData() {
      const _this = this
      return {
        columnIds: _this.searchFields.filter(t => t.keyword === true).map(s => s.label),
        val: _this.value.val
      }
    }
  }
}
</script>

<style scoped>

</style>
