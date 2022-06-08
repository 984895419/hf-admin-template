<template>
  <div>
    <div v-loading="loading" style="margin-bottom: 10px">
      <el-checkbox-group v-if="list" v-model="checkedAppIds">
      <el-row  :gutter="10">
        <el-col :span="3" v-for="item in list" :key="item.appId">
          <el-card>
            <div slot="header">
              <el-checkbox :label="item.appId">
                <el-tag type="primary">{{item.appName}}</el-tag>
              </el-checkbox>
            </div>
            <el-image :src="item.iconPath">
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline"></i>
              </div>
            </el-image>
          </el-card>
        </el-col>
      </el-row>
      </el-checkbox-group>

      <div v-else>
        不存在list
      </div>
    </div>
    <div >
      <el-button type="primary" @click="emitValue">保存</el-button>
    </div>
  </div>
</template>

<script>
    import * as conf from './api'
    import { deepClone } from '@/utils'
    import { baseApiGetMethod } from '@/components/CURD/baseApi'
    import { getData, getMessage, isSuccessResult } from '@/utils/ajaxResultUtil'
    export default {
        name: 'AppGridDashbord',
        props: {
            /**
             * 权限ID
             */
            value: {
                type: Array,
                default: function () {
                    return []
                }
            }
        },
        data() {
            return {
                loading: true,
                conf: conf,
                checkedAppIds: deepClone(this.value || []),
                list: null
            }
        },
        created() {
          this.loadAppIds()
        },
        methods: {
            /**
             * 查询所有的应用
             */
            loadAppIds() {
              baseApiGetMethod(conf.urlMethods.listQueryUrl, { enableState: 1 }).then(resp => {
                  if (isSuccessResult(resp)) {
                      this.list = getData(resp)
                  } else {
                      this.$message.error(getMessage(resp))
                  }
                  this.loading = false
              }).catch(e => {
                  this.loading = false
              })
            },
            emitValue() {
                this.$emit('input', this.checkedAppIds)
                this.$emit('success')
            }
        }
    }
</script>

<style scoped>
/deep/ .el-card .el-card__header,
  .el-card .el-card__body {
  padding: 5px;
}
</style>
