<template>
  <div>
    <refer-table-data
      :base-url="baseUrl"
      :table-config="tableConfig"
      :url-methods="urlMethods"
      v-bind="$attrs"
      :fixed-condition="fixedCondition"
      v-on="$listeners"
      @row-dblclick="rowDbClick"
    />
  </div>
</template>

<script>
import ReferTableData from '@/components/CURD/referTableData'

export default {
  name: 'Refer',
  components: { ReferTableData },
  props: {
    /**
     * 基础的默认地址
     */
    baseUrl: String,
    /**
     * url地址: {
     *   pageUrl: // 分页查询地址，
     *   addUrl: // 添加时候的url
     *   updateUrl: // 更新时候的u'r'l
     *   queryUrl: // 查询单条时候的url
     * }
     */
    urlMethods: {
      type: Object
    },
    /**
     * 表单配置信息
     */
    tableConfig: {
      type: Object,
      default: function() {
        return {}
      }
    },
    value: {
      type: Object,
      require: true
    },
    /**
     * 参照对应的字段ID
     */
    valueReferId: {
      type: [String, Number],
      require: true
    },
    /**
     * 参照对应的字段名
     */
    valueReferName: {
      type: [String, Number],
      require: true
    },
    /**
     * 扩展的参照集合
     */
    valueExpendRefers: {
      type: Object
    },
    /**
     * 固定的查询条件
     */
    fixedCondition: [Object, Array]
  },
  data() {
    return {}
  },
  methods: {
    /**
     * 行点击时候进行赋值
     * @param row
     * @param column
     * @param event
     */
    rowDbClick(row, column, event) {
      if (this.value && this.tableConfig.referOption) {
        if (this.valueReferId && this.tableConfig.referOption.referId) {
          this.$set(this.value, this.valueReferId, row[this.tableConfig.referOption.referId])
        }
        if (this.valueReferName && this.tableConfig.referOption.referName) {
          this.$set(this.value, this.valueReferName, row[this.tableConfig.referOption.referName])
        }
        if (this.valueExpendRefers) {
          for (const ind in this.valueExpendRefers) {
            this.$set(this.value, ind, row[this.valueExpendRefers[ind]])
          }
        }
        // 已经选完后要调用的事件
        this.$emit('selectHandler')
      } else {
        console.log('请确定参照中是否设置了接收对象Value/参照集合中是否设置了referOption')
      }
    }
  }
}
</script>

<style scoped>

/deep/ .curd-btn-right > div,
.curd-btn-left > div,
.curd-btn-right-after > div
.moreBtn > div,
.moreBtn > .el-button {
  display: inline-block;
  margin-right: 10px;
}
</style>
