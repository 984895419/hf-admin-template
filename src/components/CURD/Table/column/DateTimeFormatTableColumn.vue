<template>
  <el-table-column v-bind="{...$attrs, formatter: timeFormat}"> </el-table-column>
</template>

<script>
    import {parseTime} from "../../../../utils";

    export default {
        name: 'DateTimeFormatTableColumn',
        props: {
            /**
             * {y}-{m}-{d} {h}:{i}:{s}
             */
            formatStr: {
                type: String,
                default: '{y}-{m}-{d}'
            }
        },
        computed: {
            timeFormat() {
                return (row, column, cellValue, index) => {
                    debugger
                    return parseTime(cellValue, this.formatStr)
                }
            }
        }
    }
</script>

<style scoped>

</style>
