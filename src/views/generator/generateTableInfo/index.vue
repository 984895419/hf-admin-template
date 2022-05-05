<template>
  <div class="app-container">
    <c-r-u-d
      ref="curdRef"
      :base-url="conf.baseUrl"
      :url-methods="conf.urlMethods"
      :table-config="conf.default"
    >
      <template v-slot:curd-btn-right-after>
        <common-dialog-btn label="从数据源导入" style="margin-right: 10px">
          <template v-slot="{closeDialog}">
            请选择数据源：
            <datasource-select-refer v-model="datasource" />
            <origin-table-info
              v-if="datasource"
              :datasource="datasource"
              :close-dialog="closeDialog"
              @success="refreshMethod"
            />
          </template>
        </common-dialog-btn>
      </template>
      <template v-slot:col-btn-dropdown="{data}">
        <dropdown-btn>
          <common-dialog-btn label="查看字段" type="text">
            <generate-table-field-refer :table-id="data.tableId" />
          </common-dialog-btn>
        </dropdown-btn>
        <dropdown-btn>
          <common-dialog-btn label="配置" :title="data.tableComment + '(' + data.tableName + ')' + '配置'" type="text">
            <template v-slot="{ closeDialog }">
              <run-table-getter :value="data">
                <template v-slot="{data}">
                  <run-table-config
                    :value="data"
                    @closeDialog="closeDialog"
                    @success="this.$refs.curdRef.triggerSearch()"
                  />
                </template>
              </run-table-getter>
            </template>
          </common-dialog-btn>
        </dropdown-btn>
      </template>
    </c-r-u-d>
  </div>
</template>

<script>
import CRUD from '@/components/CURD'
import * as conf from './api'
import CommonDialogBtn from '@/components/CURD/Btns/CommonDialogBtn'
import OriginTableInfo from '@/views/generator/generateTableInfo/OriginTableInfo'
import DatasourceSelectRefer from '@/views/generator/datasource/DatasourceSelectRefer'
import GenerateTableFieldRefer from '@/views/generator/generateTableField/GenerateTableFieldRefer'
import DropdownBtn from '@/components/CURD/Btns/DropdownBtn'
import RunTableConfig from '@/views/generator/generateRunTable/RunTableConfig'
import RunTableGetter from '@/views/generator/generateRunTable/RunTableGetter'

export default {
  name: 'GenerateTableInfoIndexVue',
  components: {
    RunTableGetter,
    RunTableConfig,
    DropdownBtn,
    GenerateTableFieldRefer,
    DatasourceSelectRefer,
    OriginTableInfo,
    CommonDialogBtn,
    CRUD
  },
  data() {
    return {
      conf: conf,
      datasource: undefined
    }
  },
  methods: {
    refreshMethod() {
      this.$nextTick(() => {
        this.$refs.curdRef.triggerSearch()
      })
    }
  }
}
</script>

<style scoped>

</style>
