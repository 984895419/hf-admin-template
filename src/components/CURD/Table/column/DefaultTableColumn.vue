<template>
    <div>
      <el-table-column
        :prop="prop"
        :label="$t(namespace + '.' + prop)"
        v-bind="$attrs"
      >
        <template slot-scope="scope">
          <div v-if="copyable" @mouseenter="textHover = true" @mouseleave="textHover = false">
            {{scope.row[prop]}}
            <i
            v-if="textHover"
             class="el-icon-document-copy"
            v-clipboard:success="successHandler"
            v-clipboard:error="failedHandler"
             v-clipboard:copy="copyData(scope.row)"/>
          </div>
          <div v-else>
            {{scope.row[prop]}}
          </div>
        </template>
      </el-table-column>
    </div>
</template>

<script>
export default {
    name: 'DefaultTableColumn',
    props: {
        copyable: {
            type: Boolean,
            default: false
        },
        namespace: {
            type: String
        },
        prop: {
            type: String
        }
    },
    data() {
        return {
            textHover: false
        }
    },
    methods: {
        copyData(row) {
            return row[this.prop]
        },
        successHandler() {
            this.$message.success(this.$t('common.copySuccess'))
        },
        failedHandler() {
            this.$message.error(this.$t('common.copyFailed'))
        }
    }
}
</script>

<style scoped>

</style>
