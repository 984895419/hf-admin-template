<template>
  <div class="app-container">
    <div class="container-title">
      {{ dataList.roleName }}关联的权限列表
    </div>
    <div class="container-main">
      <el-tree
        v-if="openPanel"
        ref="tree"
        :data="menusData"
        show-checkbox
        node-key="menuId"
        :props="defaultProps"
        :default-checked-keys="nextDefaultCheckedKeysList"
        @check-change="handleCheckChange"
        @check="currentChecked"
      />
    </div>
    <div class="container-btn">
      <el-button class="transfer-footer" size="small" @click="closeDialog()">取消</el-button>
      <el-button class="transfer-footer" type="primary" size="small" @click="saveMenusData()">保存</el-button>
    </div>

  </div>
</template>

<script>
import { baseApiGetMethod, baseApiPostMethod } from '@/components/CURD/baseApi'
import { getMessage, isSuccessResult, isTheRetCode } from '@/utils/ajaxResultUtil'
import { fastLerp } from '_zrender@4.2.0@zrender/lib/tool/color'
export default {
  props: {
    'dataList': {}
  },
  data() {
    return {
      getRightMenusParam: {},
      configOperateRightParam: {},
      menusData: [],
      openPanel: false,
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      methodIds: [],
      menuIds: [],
      newCheckedNodesList: [],
      defaultCheckedKeysList: [],
      nextDefaultCheckedKeysList: []
    }
  },
  watch: {
    menusData(val, oldval) {

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
      this.openPanel = true

      baseApiGetMethod('/api/hfBaseRightMenu/getRightMenus', this.getRightMenusParam).then(
        (resp) => {
          if (isSuccessResult(resp)) {
            this.menusData = resp.data
            this.menusData.children = this.treeToList(this.menusData.children)
            console.log(this.treeToList(resp.data), '222')
          } else {
            if (!isTheRetCode('00003')) {
              this.$message.error(getMessage(resp))
            }
          }
        }
      ).catch(e => {
      })

      baseApiGetMethod('/api/hfBaseRightMenu/route').then(
        (resp) => {
          if (isSuccessResult(resp)) {
            this.$store.dispatch('permission/generateRoutes', resp.data)
          } else {
            if (!isTheRetCode('00003')) {
              this.$message.error(getMessage(resp))
            }
          }
        }
      ).catch(e => {
      })
    },
    //  保存权限设置
    saveMenusData() {
      if (this.menuIds.length > 0) {
        this.configOperateRightParam = {
          'roleId': this.dataList.roleId,
          'menuIds': this.menuIds,
          'methodIds': this.methodIds
        }
        baseApiPostMethod('/api/hfBaseRightRole/configOperateRight', this.configOperateRightParam).then(
          (resp) => {
            if (isSuccessResult(resp)) {
              this.$message({
                showClose: true,
                message: '操作成功',
                type: 'success'
              })
              this.init()
              this.$emit('closeDialog')
            } else {
              if (!isTheRetCode('00003')) {
                this.$message.error(getMessage(resp))
              }
            }
          }
        ).catch(e => {
        })
      } else {
        this.$message({
          showClose: true,
          message: '你还没有选择权限',
          type: 'warning'
        })
      }
    },
    closeDialog() {
      this.$emit('closeDialog')
    },
    // 节点选中状态发生变化时的回调
    handleCheckChange(data, checked, indeterminate) {
      const res1 = this.$refs.tree.getCheckedKeys().filter(x => !!x === true || x === 0)
      // 获取半选的节点
      const res2 = this.$refs.tree.getHalfCheckedKeys()
      console.log(res1, 'res1')
      console.log(res2, 'res2')
      console.log(this.dataList.roleId, 'roleId')
      console.log(this.menuIds, 'menuIds')
      console.log(this.methodIds, 'methodIds')
    },

    // 选中当前tree节点 获取menuIds \ methodIds
    currentChecked(nodeObj, SelectedObj) {
      const dataList = []
      // 过滤underfine
      // console.log(nodeObj, 'nodeObj')
      // console.log(SelectedObj, 'SelectedObj')
      SelectedObj.checkedNodes.forEach(el => {
        if (el.methodId !== null) {
          dataList.push(el.methodId)
        }
      })
      this.menuIds = SelectedObj.checkedKeys.filter(x => !!x === true || x === 0)
      const newArr = dataList.filter(x => !!x === true || x === 0)
      this.methodIds = this.newArrFn(newArr)
      // console.log(this.methodIds, 'this.methodIds')
    },
    // 去重
    newArrFn(arr) {
      return ([...new Set(arr)])
    },
    // 递归换名称
    treeToList(list) {
      if (list == null || list.length <= 0) { return [] }
      for (var i = 0; i < list.length; i++) {
        list[i].label = list[i].menuName || list[i].description

        if (list[i].methods != null) {
          list[i].children = list[i].methods
        }
        if (list[i].checked === true) {
          this.defaultCheckedKeysList.push(list[i].menuId)
        }
        list[i].children = this.treeToList(list[i].children)
      }
      this.nextDefaultCheckedKeysList = this.newArrFn(this.defaultCheckedKeysList.filter(x => !!x === true || x === 0))
      console.log(this.nextDefaultCheckedKeysList, 'this.nextDefaultCheckedKeysList')

      this.$nextTick(() => {
        this.$refs.tree.setCheckedKeys(this.nextDefaultCheckedKeysList)
      })
      return list
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
