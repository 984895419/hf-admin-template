<template>
  <div v-if="copyable" @mouseenter="textHover = true" @mouseleave="textHover = false">
    {{ row[prop] }}
    <i
      v-if="textHover"
      v-clipboard:success="successHandler"
      v-clipboard:error="failedHandler"
      v-clipboard:copy="copyData(row)"
      class="el-icon-document-copy"
    />
  </div>
  <div v-else>
    {{ row[prop] }}
  </div>
</template>

<script>
    export default {
        name: 'CopierRender',
        props: {
            copyable: {
                type: Boolean,
                default: false
            },
            row: {
                type: Object
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
