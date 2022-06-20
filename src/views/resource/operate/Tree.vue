<template>
  <div>
    <!--
      树节点过滤条件
    -->
    <el-input
      v-model="filterText"
      :placeholder="$t('common.menu.metaTitle')"
      style="width: 80%"
      clearable
      prefix-icon="el-icon-search"
    />
    <el-tree
      ref="tree"
      :data="data"
      accordion
      :filter-node-method="filterNode"
      :props="defaultProps"
      :check-on-click-node="true"
      :highlight-current="true"
      node-key="menuId"
      @check="handleNodeClick"
    />
  </div>
</template>
<script>
import { fetchMenuTree } from '@/api/menu'
import { baseApiGetMethod } from '@/components/CURD/baseApi'
export default {
  name: 'MenuTree',
  data() {
    return {
      data: [],
      defaultProps: {
        children: 'subMenuList',
        label: 'menuName'
      },
      filterText: ''
    }
  },
  /*
  *  监听属性，监听filterText属性
  * */
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },
  created() {
    this.getMenuTree()
    this.getMenuTreeList()
  },
  methods: {
    getMenuTree() {
      if (!this.hasPerm('/operate/queryOperates')) {
        return
      }
      const _this = this
      fetchMenuTree().then((response) => {
        _this.data = response.obj
      })
    },
    getMenuTreeList() {
     baseApiGetMethod('/api/hfBaseRightMenu/list/query').then(
        (resp) => {
          if (resp.retCode === '00001') {
            this.data = resp.data
          }
        }
      )
    },
    handleNodeClick(data) {
      this.$emit('tree-node-click', data)
    },
    filterNode(value, data) {
      if (!value) return true
      return data.metaTitle.indexOf(value) !== -1
    }
  }
}
</script>

<style scoped>
.el-select {
  width: 100%;
}
.edit-button-item {
  direction: rtl;
}
</style>
