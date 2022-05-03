<template>
  <div>
    <el-form v-if="value" :size="$store.size" :inline="true" :model="value">
      <el-collapse v-model="activeName">
        <el-collapse-item title="表格属性" name="tableConfig">
          <row-span-slot :active-re-calculate="activeName.indexOf('tableConfig') >= 0">
            <template v-slot="{ span }">
              <el-col :span="span">

                <el-form-item label="是否显示序号" prop="showIndex">
                  <el-switch
                    v-model="value.showIndex"
                    :active-value="1"
                    :inactive-value="0"
                    :active-text="'是'"
                    :inactive-text="'否'"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="span">

                <el-form-item label="默认搜索模式" prop="searchModel">
                  <el-select v-model="value.searchModel">
                    <el-option value="fields" label="字段搜索" />
                    <el-option value="keyword" label="关键字搜索" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="span">

                <el-form-item label="默认显示复选框" prop="showSelected">
                  <el-switch
                    v-model="value.showSelected"
                    :active-value="1"
                    :inactive-value="0"
                    :active-text="'是'"
                    :inactive-text="'否'"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="span">

                <el-form-item label="是否显示操作栏" prop="showItemOperate">
                  <el-switch
                    v-model="value.showItemOperate"
                    :active-value="1"
                    :inactive-value="0"
                    :active-text="'是'"
                    :inactive-text="'否'"
                  />
                </el-form-item>
              </el-col>
            </template>
          </row-span-slot>
        </el-collapse-item>
        <el-collapse-item title="字段配置" name="columnConfig">
          <run-column-getter :table-id="value.tableId">
            <template v-slot="{fields}">
              <run-table-field :fields="fields" />
            </template>
          </run-column-getter>
        </el-collapse-item>
        <el-collapse-item title="参照配置" name="referConfig">
          <row-span-slot :active-re-calculate="activeName.indexOf('referConfig') >= 0">
            <template v-slot="{ span }">
              <el-col :span="span">
                <el-form-item label="参照时候回传的主键" prop="referId">
                  <el-input v-model="value.referId" />
                </el-form-item>
              </el-col>
              <el-col :span="span">
                <el-form-item label="默认的参照名称" prop="referName">
                  <el-input v-model="value.referName" />
                </el-form-item>
              </el-col>
            </template>
          </row-span-slot>
        </el-collapse-item>
      </el-collapse>
      <el-form-item style="margin-top: 10px">
        <el-button type="primary">保存</el-button>
        <el-button type="danger">取消</el-button>
      </el-form-item>
    </el-form>
    <div v-else>
      表信息不存在
    </div>
  </div>
</template>

<script>
import RowSpanSlot from '@/components/CURD/Slot/RowSpanSlot'
import RunTableField from '@/views/generator/generateRunColumn/RunTableField'
import RunColumnGetter from '@/views/generator/generateRunColumn/RunColumnGetter'

/**
 * 运行时表单配置
 */
export default {
  name: 'RunTableConfig',
  components: { RunColumnGetter, RunTableField, RowSpanSlot },
  props: {
    value: Object
  },
  data() {
    return {
      activeName: ['tableConfig']
    }
  }
}
</script>

<style scoped>

</style>
