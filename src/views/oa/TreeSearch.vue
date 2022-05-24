<template>
  <div class="content-lf">
    <el-input placeholder="输入关键字进行过滤" @input="filterInput" v-model="filterText" clearable>
    </el-input>
    <el-tree class="filter-tree" :data="data" :props="defaultProps" default-expand-all :filter-node-method="filterNode"
      @node-click="handleNodeClick" ref="treesearch">
    </el-tree>
  </div>
</template>

<script>
export default {
  name: 'TreeSearch',
  data() {
    return {
      filterText: "",
      defaultProps: {
        children: "children",
        label: "name",
      },
    }
  },
  props: {
    data: {
      type: Array
    }
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    },
    filterInput() {
      this.$refs.treesearch.filter(this.filterText)
    },
    handleNodeClick(val) {
      this.$emit('treeNodeval', val)
    }
  }
}
</script>

<style lang="scss" scoped>
.content-lf {
  padding: 20px 0 0 0;
  box-sizing: border-box;
}
</style>