<template>
  <div class="app-container">
    <el-row :gutter="10">
      <el-col :span="12">
        <c-r-u-d
          :base-url="conf.baseUrl"
          :url-methods="conf.urlMethods"
          :table-config="conf.default"
          @row-click="rowClick"
        >
          <template v-slot:col-btn-more="{data}">
            <add-btn
              type="text"
              :icon="''"
              :label="'新增字典值'"
              :init-data="{typeCode: data.code, name: data.name }"
            >
              <template v-slot="{data, closeDialog}">
                <add-dict-value :value="data" @success="closeDialog" @closeDialog="closeDialog" />
              </template>
            </add-btn>
          </template>
        </c-r-u-d>
      </el-col>
      <el-col :span="12">
        <dict-value-list :condition="condition" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import CRUD from '@/components/CURD'
import * as conf from './api'
import AddBtn from '@/components/CURD/Btns/AddBtn'
import AddDictValue from '@/views/basic/baseDictValue/addDictValue'
import DictValueList from '@/views/basic/baseDictValue/dictValueList'

export default {
  name: 'BaseDictTypeIndexVue',
  components: { DictValueList, AddDictValue, AddBtn, CRUD },
  data() {
    return {
      conf: conf,
      condition: {
        typeCode: undefined,
        name: undefined
      }
    }
  },
  methods: {
    rowClick(row) {
      this.condition.typeCode = row.code
      this.condition.name = row.name
    }
  }
}
</script>

<style scoped>

</style>
