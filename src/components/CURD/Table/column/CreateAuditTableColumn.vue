<template>
  <div>
    <el-table-column prop="creatorUserName"  label="创建人" width="130"> </el-table-column>
    <date-time-format-table-column prop="createTime" label="创建时间" width="180"> </date-time-format-table-column>
  </div>
</template>

<script>
import DateTimeFormatTableColumn from './DateTimeFormatTableColumn';
/**
 * 创建人及创建时间
 */
export default {
    name: 'CreateAuditTableColumn',
    components: { DateTimeFormatTableColumn }
}
</script>

<style scoped>

</style>
