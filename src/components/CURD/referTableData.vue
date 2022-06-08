<template>
  <div>
    <inquiry-mode
      :show-header="false"
      :search-fields="searchFields"
      :search-type="'keyword'"
      @search="inquiryChangeSearch"
    />
    <simple-table
      ref="referTableData"
      :table-fields="tableConfig.fields"
      :table-data="jsonData.list"
      :table-item-option="{ ...tableConfig.tableItemOption,
                            ...{showItemOperate:false}}"
      :toggle-row-selection="myToggleRowSelection"
      v-bind="$attrs"
      highlight-current-row
      v-on="$listeners"
      :max-height="600"
      @sort-change="sortChange"
      @selection-change="handleSelectionChange"
      @colSelectedChange="triggerSelection"
    >
      <template v-slot:btn-area-right>
        <div>
          <el-button
            v-if="myToggleRowSelection.length > 0"
            type="primary"
            icon="el-icon-s-release"
            @click="reverseOperate()"
          >
            反选
          </el-button>
        </div>
      </template>
      <template v-slot:col-btn="{ data }">
        <update-btn :url="templateUrl(urlMethodCache.queryUrl, data)" :btn-type="'text'">
          <template slot-scope="{ data, closeDialog }">
            <update-form
              :value="data"
              :add-fields="updatableFields"
              :url="templateUrl(urlMethodCache.updateUrl, data)"
              @closeDialog="closeDialog"
            />
          </template>
        </update-btn>
        <del-btn :url="templateUrl(urlMethodCache.deleteUrl, data)" :btn-type="'text'" />
        <div class="moreBtn">
          <slot name="col-btn-more" :data="data" />
        </div>
      </template>
      <template v-slot:pageInfo>
        <el-pagination
          :current-page="searchForm.pageInfo.pageNo"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="searchForm.pageInfo.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="jsonData.total"
          @size-change="doSearch"
          @current-change="doSearch"
        />
      </template>
    </simple-table>
  </div>
</template>

<script>
import { baseApiGetMethod } from '@/components/CURD/baseApi'
import { isSuccessResult } from '@/utils/ajaxResultUtil'
import InquiryMode from '@/components/CURD/Query/InquiryMode'
import SimpleTable from '@/components/CURD/Table/SimpleTable'
import UpdateBtn from '@/components/CURD/Btns/UpdateBtn'
import UpdateForm from '@/components/CURD/Add/UpdateForm'
import DelBtn from '@/components/CURD/Btns/TemplateConfirmBtn'
import CurdMixin from '@/components/CURD/curd.mixin'

export default {
  name: 'ReferTableData',
  components: { DelBtn, UpdateForm, UpdateBtn, SimpleTable, InquiryMode },
  mixins: [CurdMixin],
  props: {
    /**
     * 基础的默认地址
     */
    baseUrl: String,
    /**
     * url地址: {
     *   pageUrl: // 分页查询地址，
     *   addUrl: // 添加时候的url
     *   updateUrl: // 更新时候的u'r'l
     *   queryUrl: // 查询单条时候的url
     * }
     */
    urlMethods: {
      type: Object
    },
    /**
     * 表单配置信息
     */
    tableConfig: {
      type: Object,
      default: function() {
        return {}
      }
    },
    /**
     * 默认选中打勾的行
     */
    toggleRowSelection: Array,
    /**
     * 判重字段
     */
    uniqueColumn: {
      type: String,
      default: 'id'
    },
    /**
     * 固定的查询条件
     */
    fixedCondition: [Object, Array]
  },
  data() {
    const defaultUrlMethod = (baseUrl) => {
      if (baseUrl) {
        return {
          pageUrl: baseUrl + '/page',
          addUrl: baseUrl + '/save',
          updateUrl: baseUrl + '/{id}',
          queryUrl: baseUrl + '/{id}',
          deleteUrl: baseUrl + '/{id}'
        }
      } else {
        return {}
      }
    }
    return {
      urlMethodCache: {
        ...defaultUrlMethod(this.baseUrl),
        ...this.urlMethods
      },
      searchForm: {
        /**
         * 固定查询条件
         */
        fixedCondition: [],
        /**
         * 查询的数据
         */
        query: undefined,
        /**
         * 分页信息
         */
        pageInfo: {
          pageNo: 1,
          pageSize: 100
        },
        /**
         * 排序信息
         */
        sortInfo: []
      },
      jsonData: {
        list: [],
        total: 0
      }
    }
  },
  computed: {
    /**
     * 可查询的字段
     * @returns {T[]|*[]}
     */
    searchFields() {
      if (this.tableConfig &&
        this.tableConfig.fields &&
        this.tableConfig.fields.length > 0) {
        return this.tableConfig.fields.filter(s => {
          // 设置默认所有的字段都可以搜索，除非配置了searchable为false
          return !(s.searchConfig) || s.searchConfig.searchable !== false
        })
      }
      return []
    },
    /**
     * 勾选选中的字段
     * @returns {*[]}
     */
    myToggleRowSelection() {
      let ids = []
      if (this.toggleRowSelection) {
        ids = this.toggleRowSelection.map(s => s[this.uniqueColumn])
      }
      return this.jsonData.list.filter(s => ids.indexOf(s[this.uniqueColumn]) >= 0)
    }
  },
  created() {
    this.$nextTick(() => {
      this.doSearch()
    })
  },
  methods: {
    /**
     * 排序发生变化的时候执行的排序变化
     * @param column
     * @param prop
     * @param order
     */
    sortChange({ column, prop, order }) {
      console.log(column, prop, order)
      // 设置排序字段信息
      this.searchForm.sortInfo = [{
        sort: order === 'ascending' ? 0 : 1,
        ...this.getFieldInfo(prop)
      }]
      // 执行排序
      this.doSearch()
    },
    /**
     * 根据字段名，获取字段信息
     * @param prop
     * @returns {T}
     */
    getFieldInfo(prop) {
      return this.tableConfig.fields.filter(s => s.value === prop)[0]
    },
    /**
     * 查询条件变化
     */
    inquiryChangeSearch(query) {
      this.searchForm.query = query
      this.doSearch()
    },
    /**
     * 执行查询操作
     */
    doSearch() {
      if (this.urlMethodCache && this.urlMethodCache.pageUrl) {
        // 判断是否有固定的查询条件，仅在关键字查询时候有用
        if (this.fixedCondition) {
          if (Array.isArray(this.fixedCondition)) {
            this.searchForm.fixedCondition = this.fixedCondition
          } else {
            const conditions = []
            for (const ind in this.fixedCondition) {
              conditions.push({
                columnName: ind,
                operate: 'EQ',
                val: this.fixedCondition[ind]
              })
            }
            this.searchForm.fixedCondition = conditions
          }
        }
        baseApiGetMethod(this.urlMethodCache.pageUrl, this.searchForm).then(resp => {
          if (isSuccessResult(resp)) {
            this.$set(this.jsonData, 'list', resp.data.list)
            this.$set(this.jsonData, 'total', resp.data.total)
            this.triggerSelection()
          } else {
            this.$message.error(resp.message)
          }
        })
      } else {
        this.$message.error('请配置分页查询地址参数:{pageUrl: xxxx}')
      }
    },
    /**
     * 反选操作
     */
    reverseOperate() {
      const toggleRowSelection = this.myToggleRowSelection
      const toggleRowSelectionIds = toggleRowSelection.map(t => t[this.uniqueColumn])
      this.$refs.referTableData.toggleRowSelection(toggleRowSelection, false)
      this.$refs.referTableData.toggleRowSelection(this.jsonData.list.filter(s => toggleRowSelectionIds.indexOf(s[this.uniqueColumn]) < 0), true)
    },
    /**
     * 触发选中操作
     */
    triggerSelection() {
      const toggleRowSelection = this.myToggleRowSelection
      // 触发选中操作
      this.$nextTick(() => {
        this.$refs.referTableData.toggleRowSelection(toggleRowSelection)
      })
    },
    /**
     * 选中后处理的事件
     * @param section
     */
    handleSelectionChange(section) {
      if (this.toggleRowSelection) {
        // 先去掉当前行的，在插入section
        const sectionIds = section ? section.map(s => s[this.uniqueColumn]) : []
        const deleteIds = this.jsonData.list.filter(s => sectionIds.indexOf(s[this.uniqueColumn]) < 0).map(s => s[this.uniqueColumn])
        const deleteIndex = []
        for (const ind in this.toggleRowSelection) {
          if (deleteIds.indexOf(this.toggleRowSelection[ind][this.uniqueColumn]) >= 0) {
            deleteIndex.push(ind)
          }
        }
        // 排序
        deleteIndex.sort((a, b) => b - a)
        // 从序号大的开始删除
        for (const ind in deleteIndex) {
          this.toggleRowSelection.splice(deleteIndex[ind], 1)
        }
        // 插入section
        if (section && section.length > 0) {
          const toggleRowSelectionIds = this.toggleRowSelection.map(s => s[this.uniqueColumn])
          for (const ind in section) {
            if (toggleRowSelectionIds.indexOf(section[ind][this.uniqueColumn]) < 0) {
              this.toggleRowSelection.push(section[ind])
            }
          }
        }
      }
    }
  }
}
</script>

<style scoped>

/deep/ .curd-btn-right > div,
.curd-btn-left > div,
.curd-btn-right-after > div
.moreBtn > div,
.moreBtn > .el-button {
  display: inline-block;
  margin-right: 10px;
}
</style>
