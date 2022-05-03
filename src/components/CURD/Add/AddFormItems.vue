<template>
  <div>
    <div v-if="groupLength(addFields) <= 1">
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
          v-for="item in emptyGroupFields(addFields)"
          :key="item.value"
          :span="item.span || defaultSpan"
          :class=" (item.span || defaultSpan) !== 24 ? '' : 'col-24-bottom'"
        >
          <slot :name="item.value" :data="item">
            <add-form-item v-model="value" :operate="operate" :item="item" />
          </slot>
        </el-col>
      </el-row>
      <el-card v-for="group in groupFields(addFields)" :key="group.name" class="box-card">
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
import curdMixin from '@/components/CURD/curd.mixin'

export default {
  name: 'AddFormItems',
  components: { AddFormItem },
  mixins: [curdMixin],
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
