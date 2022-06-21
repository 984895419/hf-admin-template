<template>
  <div class="app-container">
    <div class="container-title">
      {{ dataList.roleName }}关联的权限列表
    </div>
    <div class="container-main">
      <el-tree
        :data="data"
        show-checkbox
        node-key="id"
        :default-expanded-keys="[2, 3]"
        :default-checked-keys="[5]"
        :props="defaultProps"
      />
    </div>
    <div class="container-btn">
      <el-button class="transfer-footer" size="small">取消</el-button>
      <el-button class="transfer-footer" type="primary" size="small">确定</el-button>
    </div>

  </div>
</template>

<script>
import { baseApiGetMethod } from '@/components/CURD/baseApi'
import { getData, getMessage, isSuccessResult, isTheRetCode } from '@/utils/ajaxResultUtil'
export default {
  props: {
    dataList: {}
  },
  data() {
    return {
      getRightMenusParam: {},
      data: [{
        id: 1,
        label: '一级 1',
        children: [{
          id: 4,
          label: '二级 1-1',
          children: [{
            id: 9,
            label: '三级 1-1-1'
          }, {
            id: 10,
            label: '三级 1-1-2'
          }]
        }]
      }, {
        id: 2,
        label: '一级 2',
        children: [{
          id: 5,
          label: '二级 2-1'
        }, {
          id: 6,
          label: '二级 2-2'
        }]
      }, {
        id: 3,
        label: '一级 3',
        children: [{
          id: 7,
          label: '二级 3-1'
        }, {
          id: 8,
          label: '二级 3-2'
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  created() {
    this.init()
  },
  methods: {

    init() {
      console.log(123123)
      // 获取用户拥有的路由权限
      this.getRightMenusParam = {
        'onlyRight': false,
        'roleId': this.dataList.roleId
      }
      baseApiGetMethod('/api/hfBaseRightMenu/getRightMenus', this.getRightMenusParam).then(
        (resp) => {
          if (isSuccessResult(resp)) {
            console.log(resp)
          } else {
            if (!isTheRetCode('00003')) {
              this.$message.error(getMessage(resp))
            }
          }
        }
      ).catch(e => {
      })
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
