<template>
  <div
    v-loading.fullscreen.lock="fullscreenLoading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.1)"
  >
    <table style="width:100%;border:1px solid #bbbbbb">
      <!--
        v-for 一定要加 key
        v-for 不要和 v-if 一起用
        <template> cannot be keyed
      -->
      <template v-for="(company,index) in companyList">
        <tr :key="company.companyId">
          <td style="width:50%">
            {{ company.companyName }}
          </td>
          <td v-if="company.departs && company.departs.length > 0" style="text-aligin:center">
            <el-tag style="margin:5px" v-for="depart in company.departs" :key="depart.deptId" :type="(currentDataObject.curDeptId || $store.getters.curDeptId) === depart.deptId ? 'success':'danger'" @click="changeCampany(index, depart.deptId, depart.deptName)">
              {{ depart.deptName }}
            </el-tag>
          </td>
        </tr>
      </template>
    </table>
  </div>
</template>
<script>
import { fetchCompanyList } from '@/api/company'
import { resetRouter } from '@/router'

export default {
  name: 'MenuAdd',
  data() {
    return {
      companyList: [],
      fullscreenLoading: false,
      currentDataObject: {}
    }
  },
  created() {
    this.getCompanyList()
  },
  methods: {
    getCompanyList(row) {
      // TODO 从后台查询数据
      const _this = this
      fetchCompanyList().then(response => {
        _this.companyList = response.obj
        // // 判断当前的部门是不是在当前的权限里
        // let inList = false
        // let firstIndex = null
        // let firstDeptId = null
        // let firstDeptName = null
        // for(const ind in _this.companyList) {
        //   const company = _this.companyList[ind]
        //   if(firstIndex == null) {
        //     firstIndex = ind
        //   }
        //   if(company.departs) {
        //     for(const dind in company.departs) {
        //       if(firstDeptId == null) {
        //         firstDeptId = company.departs[dind].deptId
        //         firstDeptName = company.departs[dind].deptName
        //       }
        //       if(company.departs[dind].deptId ===  _this.$store.getters.curDeptId) {
        //         inList = true
        //         break;
        //       }
        //     }
        //   }
        // }
        // if(inList === false) {
        //   this.changeCampany(firstIndex, firstDeptId, firstDeptName)
        // }
      }).catch(() => {
        _this.companyList = []
      })
    },
    changeCampany(index, deptId, deptName) {
      const _this = this
      debugger
      if (_this.companyList[index].companyId === _this.$store.getters.curCompanyId && deptId === (_this.currentDataObject.curDeptId || _this.$store.getters.curDeptId)) {
        this.$emit('cancel')
        return
      }
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      setTimeout(() => {
        loading.close()
      }, 2000)
      this.$store.dispatch('user/changeCampany', {
        companyId: _this.companyList[index].companyId,
        companyName: _this.companyList[index].companyName,
        deptId: deptId,
        deptName: deptName
      }).then((data) => {
        loading.close()
        _this.$store.dispatch('permission/generateRoutes', data.obj).then(() => {
          resetRouter()
          _this.$router.addRoutes(_this.$store.getters.addRouters)
          _this.$store.dispatch('tagsView/delAllViews')
          // _this.$router.replace('/_empty')// 刷新方式：先切换到空白页面,再返回Dashboard
          _this.$router.replace('/')
          _this.currentDataObject = data.obj
          _this.$emit('submitSuccess', data.obj)
        })
      })
    },
    cancelHandler() {
      this.$emit('cancel')
    }
  }
}
</script>
<style>
  table tr td:hover {
    color: #ff4949;
    cursor: pointer
  }
</style>
