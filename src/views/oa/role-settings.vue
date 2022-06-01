<template>
  <div class="app-container">
    <div class="container-main">
      <div>用户拥有的角色如下: </div>
      <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange">全选</el-checkbox>
      <div style="margin: 15px 0;" />
      <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
        <el-checkbox v-for="city in cities" :key="city" :label="city">{{ city }}</el-checkbox>
      </el-checkbox-group>
    </div>
  </div>
</template>

<script>
import { baseApiGetMethod } from '@/components/CURD/baseApi'
const cityOptions = ['上海', '北京', '广州', '深圳']
export default {
  data() {
    return {
      checkAll: false,
      checkedCities: ['上海', '北京'],
      cities: cityOptions,
      isIndeterminate: true
    }
  },
  mounted() {
    this.init()
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
        baseApiGetMethod('/api/hfBaseRightRole/').then(
        (resp) => {
          if (resp.retCode === '00001') {
            console.log(resp.data, 111)
          }
        }
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.container-main {
  /deep/ .el-checkbox {
    display: block;
  }
}
</style>
