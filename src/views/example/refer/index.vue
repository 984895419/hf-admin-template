<template>
  <div class="app-container">
    参照显示的结果：{{ JSON.stringify(object) }}
    <refer-input
      v-if="tableConfig"
      v-model="object"
      :base-url="'/api/consumer'"
      :table-config="tableConfig"
      :value-refer-id="referId"
      :value-refer-name="referName"
    />
    <div style="margin-top: 10px">
      <multiple-refer
        v-if="tableConfig"
        v-model="selectedTableData"
        :base-url="'/api/consumer'"
        :table-config="tableConfig"
        :table-fields="tableConfig.fields"
      />
    </div>
  </div>
</template>

<script>

import { getMessage, isSuccessResult } from '@/utils/ajaxResultUtil'
import { fetchMyColumnInfos } from '@/api/columnInfo'
import ReferInput from '@/components/CURD/referInput.vue'
import MultipleRefer from '@/components/CURD/multipleRefer'

export default {
  components: { MultipleRefer, ReferInput },
  data() {
    return {
      tableConfig: null,
      object: {},
      referId: 'dId',
      referName: 'dName',
      selectedTableData: []
    }
  },
  created() {
    this.loadFields()
  },
  methods: {
    loadFields() {
      fetchMyColumnInfos().then(resp => {
        if (isSuccessResult(resp)) {
          this.tableConfig = resp.data
        } else {
          this.$message.error(getMessage(resp))
          return
        }
      })
    }
  }
}
</script>

<style lang="less">
</style>
