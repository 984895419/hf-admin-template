<template>
  <div>
    <div v-if="groupLength <= 1">
      <el-row :gutter="10">
        <el-col
          v-for="item in addFields"
          :key="item.value"
          :span="item.span || defaultSpan"
          :class=" (item.span || defaultSpan) !== 24 ? '' : 'col-24-bottom'"
        >
          <slot :name="item.value" :data="item">
            <add-form-item v-model="value" :operate="operate" :item="item" />
          </slot>
        </el-col>
      </el-row>
    </div>
    <div v-else>
      <el-row :gutter="10">
        <el-col
          v-for="item in emptyGroupFields"
          :key="item.value"
          :span="item.span || defaultSpan"
          :class=" (item.span || defaultSpan) !== 24 ? '' : 'col-24-bottom'"
        >
          <slot :name="item.value" :data="item">
            <add-form-item v-model="value" :operate="operate" :item="item" />
          </slot>
        </el-col>
      </el-row>
      <el-card v-for="group in groupFields" :key="group.name" class="box-card">
        <div slot="header" class="clearfix">
          <span>{{ group.name }}</span>
        </div>
        <el-row :gutter="10">
          <el-col
            v-for="item in group.fields"
            :key="item.value"
            :span="item.span || defaultSpan"
            :class=" (item.span || defaultSpan) !== 24 ? '' : 'col-24-bottom'"
          >
            <slot :name="item.value" :data="item">
              <add-form-item v-model="value" :operate="operate" :item="item" />
            </slot>
          </el-col>
        </el-row>
      </el-card>
    </div>
  </div>
</template>

<script>
import AddFormItem from '@/components/CURD/Add/AddFormItem'

function isString(obj) {
  return Object.prototype.toString.call(obj) === '[object String]'
}

export default {
  name: 'AddFormItems',
  components: { AddFormItem },
  /**
   * 属性名
   */
  props: {
    /**
     * 新增的表单选项
     */
    addFields: Array,
    /**
     * 值对象
     */
    value: Object,
    /**
     * 默认的span
     */
    defaultSpan: {
      type: Number,
      default: 6
    },
    /**
     * 操作类型，更新
     */
    operate: {
      type: String,
      default: 'update'
    }
  },
  computed: {
    /**
     * 用来查询是否有分组信息
     */
    groupLength() {
      const groups = []
      const defaultGroup = '其他信息'
      this.addFields.forEach(t => {
        let group
        if (t.belongGroup) {
          if (isString(t.belongGroup)) {
            group = t.belongGroup
          } else {
            group = t.belongGroup.name
          }
        }
        group = group || defaultGroup
        if (groups.indexOf(group) < 0) {
          groups.push(group)
        }
      })
      return groups.length
    },
    /**
     * 分组和字段的显示
     */
    groupFields() {
      const groupsMap = {}
      const groupSort = {}
      this.addFields.filter(t => t.belongGroup).forEach(t => {
        let group
        if (t.belongGroup) {
          if (isString(t.belongGroup)) {
            group = t.belongGroup
            groupSort[group] = 999
          } else {
            group = t.belongGroup.name
            groupSort[group] = t.belongGroup.sort || 999
          }
        }
        if (groupsMap[group] == null) {
          groupsMap[group] = {
            name: group,
            fields: [t]
          }
        } else {
          groupsMap[group].fields.push(t)
        }
      })
      const groups = []
      for (const ind in groupsMap) {
        groups.push(groupsMap[ind])
      }
      groups.sort((a, b) => {
        return groupSort[a.name] - groupSort[b.name]
      })
      return groups
    },

    /**
     * 分组和字段的显示
     */
    emptyGroupFields() {
      return this.addFields.filter(t => !(t.belongGroup))
    }
  }
}
</script>

<style scoped>
/deep/ .el-card__header {
  padding: 10px;
  font-weight: 700;
}

/deep/ .el-card__body {
  padding: 10px;
}

/deep/ .el-card {
  margin: 5px 0px;
}
</style>
