<template>
  <div>
    <editable-table
      :height="600"
      :table-data="fields"
      :editable-fields="conf.default.fields"
    >
      <template v-slot:col-btn="{data}">
        <common-dialog-btn :label="'编辑'" :type="'text'">
          <template v-slot="{ closeDialog }">
            <update-form
              :value="data"
              :add-fields="conf.default.fields"
              @closeDialog="closeDialog"
              @success="closeDialog"
            />
          </template>
        </common-dialog-btn>
      </template>
    </editable-table>
  </div>
</template>

<script>
import * as conf from './api'
import EditableTable from '@/components/CURD/Table/EditableTable'
import UpdateForm from '@/components/CURD/Add/UpdateForm'
import UpdateBtn from '@/components/CURD/Btns/UpdateBtn'
import CommonDialogBtn from '@/components/CURD/Btns/CommonDialogBtn'

export default {
  name: 'RunTableField',
  components: { CommonDialogBtn, UpdateBtn, UpdateForm, EditableTable },
  props: {
    fields: Array
  },
  data() {
    return {
      conf: conf
    }
  }
}
</script>

<style scoped>

</style>
