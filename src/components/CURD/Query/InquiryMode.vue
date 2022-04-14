<template>
  <!-- 自定义查询方式 -->
  <el-card class="search-form">
    <!-- 可以抽离出去做查询方式切换 -->
    <div v-if="showHeader" slot="header" class="clearfix">
      <el-button-group style="float:right;padding: 0px 3px" :size="$store.size">
        <el-button
          v-if="existKeywordField > 0"
          :type="cacheSearchType === 'keyword' ? 'primary':''"
          icon="el-icon-search"
          :size="$store.size"
          @click="cacheSearchType = 'keyword'"
        >关键词搜索
        </el-button>
        <el-button
          :type="cacheSearchType === 'default' ? 'primary':''"
          icon="el-icon-search"
          :size="$store.size"
          @click="cacheSearchType = 'default'"
        >默认搜索
        </el-button>
      </el-button-group>
    </div>
    <keyword-search-form
      v-show="cacheSearchType === 'keyword' && existKeywordField > 0"
      v-bind="$props"
      v-on="$listeners"
    />
    <search-form
      v-show="cacheSearchType === 'default'"
      v-bind="$props"
      v-on="$listeners"
    />
  </el-card>
</template>

<script>
import SearchForm from '@/components/CURD/Query/SearchForm'
import KeywordSearchForm from '@/components/CURD/Query/KeywordSearchForm'

export default {
  name: 'InquiryMode',
  components: {
    KeywordSearchForm,
    SearchForm
  },
  props: {
    /**
     * 查询字段
     */
    searchFields: [Array],
    /**
     * 对象值
     */
    value: {
      type: Object,
      default: function() {
        return {}
      }
    },
    /**
     * 表单的选项
     */
    options: Object,
    /**
     * 返回类型
     */
    returnType: {
      type: String,
      /**
       * 默认使用searchFields的方式，如果是表单方式，需要默认为‘form’
       */
      default: 'fields'
    },
    /**
     * 显示方式
     */
    showType: {
      type: String,
      /**
       * 默认使用all的方式，如果是可以支持显示自定义操作符号
       */
      default: 'all'
    },
    showHeader: {
      type: Boolean,
      default: true
    },

    /**
     * 显示模式: default默认是显示; keyword是关键词， custom是自定义
     */
    searchType: {
      type: String,
      default: 'default'
    }
  },
  data() {
    return {
      cacheSearchType: this.searchType
    }
  },
  computed: {
    /**
     * 存在字段
     */
    existKeywordField() {
      return this.searchFields && this.searchFields.filter(t => t.keyword === true).length > 0
    }
  }
}
</script>

<style scoped>

/deep/ .el-card__body {
  padding: 10px;
}

/deep/ .el-form-item {
  margin-bottom: 0px;
}

.col-24-bottom {
  margin-bottom: 10px;
}

/deep/ .more-query .el-form-item {
  margin-top: 10px;
}

/deep/ .el-card__header {
  padding: 5px 10px
}
</style>
