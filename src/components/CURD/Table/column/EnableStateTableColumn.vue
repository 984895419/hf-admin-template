<template>
  <el-table-column prop="enableState"  label="状态" :width="operate ? 150 : 55">
    <template slot-scope="scope">
      <div v-if="operate">
        <el-switch
          v-model="scope.row.enableState"
          :active-value="1"
          :inactive-value="0"
          active-color="#13ce66"
          inactive-color="#ff4949"
          active-text="启用"
          @change="doSwitchState(scope.row)"
          inactive-text="禁用">
        </el-switch>
      </div>
      <div v-else>
        <el-tag type="success" v-if="scope.row.enableState === 1">启用</el-tag>
        <el-tag type="danger" v-if="scope.row.enableState === 0">禁用</el-tag>
      </div>
    </template>
  </el-table-column>
</template>

<script>
    import { baseApiPutMethod } from '../../baseApi'
    import CurdMixin from '@/components/CURD/curd.mixin'
    import { getMessage, isSuccessResult } from '../../../../utils/ajaxResultUtil'

    export default {
        name: 'EnableStateTableColumn',
        mixins: [CurdMixin],
        props: {
            operate: {
                type: Boolean,
                default: false
            },
            enableUrl: {
                type: String,
                default: null
            },
            disableUrl: {
                type: String,
                default: null
            }
        },
        methods: {
          doSwitchState(row) {
              let url = this.disableUrl
              debugger
              if (row.enableState === 1) {
                  url = this.enableUrl
              }
              if (url) {
                  baseApiPutMethod(this.templateUrl(url, row)).then(resp => {
                      if (isSuccessResult(resp)) {
                          this.$emit('success')
                      } else {
                          this.$message.error(getMessage(resp))
                      }
                  })
              } else {
                  throw new Error('没有对应的url')
              }
          }
        }
    }
</script>

<style scoped>

</style>
