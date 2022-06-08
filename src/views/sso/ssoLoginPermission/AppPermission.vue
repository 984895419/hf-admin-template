<template>
  <div >
    <app-grid-dashbord v-if="formData" v-model="formData.appIds" @success="bindApps"/>
  </div>
</template>

<script>
import { baseApiGetMethod } from '@/components/CURD/baseApi'
import CurdMixin from '@/components/CURD/curd.mixin'
import * as conf from './api'
import { getData, getMessage, isSuccessResult } from '@/utils/ajaxResultUtil'
import {baseApiPostMethod} from '@/components/CURD/baseApi'
import AppGridDashbord from '../ssoLoginApp/AppGridDashbord'
export default {
    name: 'AppPermission',
    components: {AppGridDashbord},
    props: {
        permissionId: {
            type: Number,
            default: undefined
        }
    },
    data() {
      return {
        conf: conf,
        formData: null
      }
    },
    mixins: [CurdMixin],
    created() {
      this.loadBindApps()
    },
    methods: {
      loadBindApps() {
        baseApiGetMethod(this.templateUrl(this.conf.urlMethods.appPermissionUrl,
            { permissionId: this.permissionId })).then(resp => {
          if (isSuccessResult(resp)) {
              this.formData = getData(resp)
          } else {
              this.$message.error(getMessage(resp))
          }
        })
      },
      bindApps() {
          baseApiPostMethod(this.conf.urlMethods.appPermissionSaveUrl, this.formData).then(resp => {
              if (isSuccessResult(resp)) {
                  this.$message.success(getMessage(resp))
                  this.$emit('success')
              } else {
                  this.$message.error(getMessage(resp))
              }
          })
      }
    }
}
</script>

<style scoped>

</style>
