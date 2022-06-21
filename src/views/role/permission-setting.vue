<template>
  <div class="app-container">
    <div class="container-title">
      {{ dataList.roleName }}关联的权限列表
    </div>
    <div class="container-main">
      <el-tree :data="menusData" show-checkbox node-key="menuId" :props="defaultProps" />
    </div>
    <div class="container-btn">
      <el-button class="transfer-footer" size="small" @click="closeDialog()">取消</el-button>
      <el-button class="transfer-footer" type="primary" size="small" @click="savemMenusData()">保存</el-button>
    </div>

  </div>
</template>

<script>
import { baseApiGetMethod } from '@/components/CURD/baseApi'
import { getMessage, isSuccessResult, isTheRetCode } from '@/utils/ajaxResultUtil'
export default {
  props: {
    'dataList': {}
  },
  data() {
    return {
      getRightMenusParam: {},
      menusData: [],
      defaultProps: {
          children: 'children',
          label: 'menuName'
        }
    }
  },
  created() {
    this.init()
  },
  methods: {

    init() {
      // 获取用户拥有的路由权限
      this.getRightMenusParam = {
        'onlyRight': false,
        'roleId': this.dataList.roleId
      }
      baseApiGetMethod('/api/hfBaseRightMenu/getRightMenus', this.getRightMenusParam).then(
        (resp) => {
          if (isSuccessResult(resp)) {
            this.menusData = resp.data
            debugger
            console.log(resp)
          } else {
            if (!isTheRetCode('00003')) {
              this.$message.error(getMessage(resp))
            }
          }
        }
      ).catch(e => {
      })

      // baseApiGetMethod('/api/hfBaseRightMenu/route').then(
      //   (resp) => {
      //     if (isSuccessResult(resp)) {
      //       console.log(resp)
      //       debugger
      //     } else {
      //       if (!isTheRetCode('00003')) {
      //         this.$message.error(getMessage(resp))
      //       }
      //     }
      //   }
      // ).catch(e => {
      // })
    },
    savemMenusData(val) {
      console.log(val)
    },
      closeDialog() {
      this.$emit('closeDialog')
    }
  }
}
</script>

<style lang="scss" scoped>
.container-title {}

.container-main {
  text-align: center;
  margin: 20px 0 0 0;
}

.container-btn {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}
</style>
