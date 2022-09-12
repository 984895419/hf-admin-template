<template>
  <div>
    <slot v-if="noSpecial && noSpecial.length > 0" :fields="noSpecial" />
    <div v-if="groupFields">
      <el-table-column v-for="item in sortGroupFields" :key="item.value" :label="$t(namespace + '.' + item.value)">
        <slot v-if="item.children && item.children.length > 0" :fields="inGroup(item.children)" />
        <!-- {{ showFields }} -->
      </el-table-column>
    </div>
  </div>
</template>
<script>
import { deepClone } from '@/utils'

  /**
   * 特殊字段说明，可以放在最后
   */
const specialFields = [
  'creatorUserName',
  'modifierUserName',
  'createTime',
  'modifyTime'
]
  export default {
    props: {
      showFields: {
        type: Array,
        default: () => []
      },
      groupFields: {
        type: Array,
        default: () => []
      },
      namespace: {
        type: String
      }
    },
    computed: {
      sortGroupFields() {
        // 决定那先展示，哪些后展示
        const arrays = this.showFields.map(t => t.value)
        if (this.groupFields && this.groupFields.length > 0) {
          const group = deepClone(this.groupFields)
          group.sort((a, b) => {
            return this.getMin(a.children, arrays) - this.getMin(b.children, arrays)
          })
          return group
        }
        return []
      },
      /**
       * 显示除了groupFields和specialFields以外的所有字段
       */
      noSpecial() {
        if (this.groupFields) {
          let ignoreFiels = [].concat(specialFields)
          for (const key in this.groupFields) {
            ignoreFiels = ignoreFiels.concat(this.groupFields[key].children)
          }
          return this.showFields?.filter(s => ignoreFiels.indexOf(s.value) < 0)
        }
        return this.showFields
      },
      inGroup() {
        return (arry = []) => {
          return this.showFields.filter(s => arry.indexOf(s.value) >= 0)
        }
      }
    },
    methods: {
      getMin(children, array) {
        let min = 999
        if (children && children.length > 0) {
          for (const ind in children) {
            if (array.indexOf(children[ind]) >= 0) {
              min = Math.min(min, array.indexOf(children[ind]))
            }
          }
        }
        return min
      }
    }
  }
</script>
