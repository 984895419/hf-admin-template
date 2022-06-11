<template>
  <div class="app-container">
    <div class="container-main">
      <div>用户拥有的角色如下: </div>
      <div style="margin: 15px 0;" />
      <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
        <el-checkbox v-for="(item,index) in cities" :key="index" :label="item.roleName">{{ item.roleName }}</el-checkbox>
      </el-checkbox-group>
      <div class="main-btn">
        <el-button type="primary" @click="saveRole()">保存</el-button>
        <el-button @click="closeDialog()">取消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { baseApiGetMethod, baseApiPostMethod } from '@/components/CURD/baseApi'
export default {
  props: {
    data: {
      type: Object
    }
  },
  data() {
    return {
      checkedCities: [],
      cities: [],
      isIndeterminate: true,
      deepCloneData: []
    }
  },

  created() {
    this.deepCloneData = this.data
    this.viewRoleManagement()
    this.getUserIdBindRole()
  },
  methods: {

    handleCheckedCitiesChange(value) {

    },
    // 查看角色管理
    viewRoleManagement() {
      baseApiGetMethod('/api/hfBaseRightRole/list').then(
        (resp) => {
          if (resp.retCode === '00001') {
            this.cities = resp.data
          }
        }
      )
    },
    // 保存
    saveRole() {
      const roleIdList = []
      if (this.checkedCities.length === 0) {
        this.$message({
          message: '还没有选择角色',
          type: 'warning'
        })
      } else {
        this.checkedCities.forEach((item, index) => {
          roleIdList.push(item.roleId)
        })
        const param = {
          'userId': this.data.userId,
          'roleIds': roleIdList
        }
        baseApiPostMethod('/api/hfBaseUserInfo/bindRoles', param).then(
          (resp) => {
            if (resp.retCode === '00001') {
              this.$message({
                message: '操作成功',
                type: 'success'
              })
              this.$emit('closeDialog')
            }
          }
        )
      }
    },
    // 获取用户绑定的角色
    getUserIdBindRole() {
      baseApiGetMethod(`/api/hfBaseUserInfo/bindRoles/${this.data.userId}`).then(
        (resp) => {
          if (resp.retCode === '00001') {
            // this.$set(this.checkedCities, 0, resp.data)
            this.checkedCities = resp.data
          }
        }
      )
    },
    closeDialog() {
      this.$emit('closeDialog')
    }
  }
}
</script>

<style lang="scss" scoped>
.container-main {
  /deep/ .el-checkbox {
    display: block;
  }

  .main-btn {
    display: flex;
    justify-content: flex-end;
    // float: right;
    margin-top: 20px;

  }
}
</style>
