<template>
  <div>
    <slot name="show-area">
      <el-input v-model="value[valueReferName]" v-bind="$attrs" @focus="openDialog" v-on="$listeners" />
    </slot>

    <el-dialog
      :visible.sync="showDialog"
      width="75%"
      append-to-body
      v-bind="Object.assign({ 'close-on-click-modal': false}, $attrs)"
    >
      <div style="margin-top: 10px">
        <slot :data="value" :closeDialog="closeDialog">
          <div v-if="!(baseUrl)">
            没有配置参照的请求地址baseUrl属性
          </div>
          <div v-else-if="!tableConfig">
            没有配置参照的列表配置tableConfig属性
          </div>
          <div v-else>
            <refer
              :show-btn-area="$attrs['show-btn-area'] || false"
              :base-url="baseUrl"
              :table-config="tableConfig"
              :value="value"
              :value-refer-id="valueReferId"
              :value-refer-name="valueReferName"
              :value-expend-refers="valueExpendRefers"
              :url-methods="urlMethods"
              @selectHandler="closeDialog"
            />
          </div>
        </slot>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Refer from '@/components/CURD/refer'

export default {
  name: 'ReferInput',
  components: { Refer },
  props: {
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
    baseUrl: {
      type: [String]
    },
    tableConfig: {
      type: Object
    },
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
    }
  },
  data() {
    return {
      showDialog: false
    }
  },
  methods: {
    openDialog() {
      this.showDialog = true
    },
    closeDialog() {
      this.showDialog = false
    }
  }
}
</script>

<style scoped>

</style>
