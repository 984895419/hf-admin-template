<template>
  <div>
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
import { isEmpty } from 'element-ui/src/utils/util'
import { expendnode } from '@/utils/tree-util'
export default {
  name: 'MenuTree',
  data() {
    return {
      data: [],
      defaultProps: {
        children: 'subMenuList',
        label: 'metaTitle'
      },
      filterText: ''
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },
  created() {
    this.getMenuTree()
  },
  methods: {
    getMenuTree(treeSelected) {
      if (!this.hasPerm('/menu/queryMenus')) {
        return
      }
      const _this = this
      fetchMenuTree().then((response) => {
        _this.data = response.obj
        if (!isEmpty(treeSelected)) {
          setTimeout(function() {
            _this.$refs.tree.setCurrentKey(treeSelected.menuId)
            expendnode(_this, treeSelected, 'menuId', 'parentMenuId')
            _this.$emit('tree-node-click', _this.$refs.tree.getCurrentNode())
          }, 200)
        }
      })
    },
    handleNodeClick(data) {
      this.$emit('tree-node-click', data)
    },
    filterNode(value, data) {
      if (!value) return true
      return data.text.indexOf(value) !== -1
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
