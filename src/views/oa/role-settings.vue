<template>
  <div class="app-container">
    <div class="container-main">
      <div>用户拥有的角色如下: </div>
      <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange">全选</el-checkbox>
      <div style="margin: 15px 0;" />
      <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
        <el-checkbox v-for="(item, index) in cities" :key="index" :label="item">{{ item.roleName }}
        </el-checkbox>
      </el-checkbox-group>
      <div class="main-btn">
        <el-button type="primary" @click="saveRole()">保存</el-button>
        <el-button @click="closeDialog()">取消</el-button>
      </div>

    </div>
  </div>
</template>

<script>
import { baseApiGetMethod } from '@/components/CURD/baseApi'
export default {
  props: {
    data: {
      type: Object
    }
  },
  data() {
    return {
      checkAll: false,
      checkedCities: [],
      cities: [],
      isIndeterminate: true,
      deepCloneData: []
    }
  },
  mounted() {
    this.init()
  },
  created() {
    this.deepCloneData = this.data
  },
  methods: {
    handleCheckAllChange(val) {
      this.checkedCities = val ? cityOptions : []
      this.isIndeterminate = false
    },
    handleCheckedCitiesChange(value) {
      const checkedCount = value.length
      this.checkAll = checkedCount === this.cities.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length
    },
    init() {
      this.viewRoleManagement()
      baseApiGetMethod(`/api/hfBaseUserInfo/bindRoles/${this.data.userId}`).then(
        (resp) => {
          if (resp.retCode === '00001') {
            console.log(resp.data, 111)
          }
        }
      )
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
      let param = {}
      param = {
        // 'roleId': this.checkedCities.roleId,
        // 'userIds': this.checkedCities.userIds
      }
      console.log(param)
      baseApiGetMethod('/api/hfBaseRightRole/bindUsers', param).then(
        (resp) => {
          if (resp.retCode === '00001') {
             console.log(resp.data, 'bindUsers')
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
