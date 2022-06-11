<template>
  <div>
    <inquiry-mode
      ref="inquirySearch"
      :search-fields="searchFields"
      :search-type="'keyword'"
      @search="inquiryChangeSearch"
    />
    <editable-table
      v-if="editable"
      :batch-update-url="urlMethodCache.batchUpdateUrl"
      :editable-fields="updatableFields"
      :table-data="jsonData.list"
      @success="triggerSearch"
    >
      <template v-slot:btn-header-area>
        <el-button type="danger" @click="changeToCannotEditable">取消编辑</el-button>
      </template>
    </editable-table>
    <simple-table
      v-if="!editable"
      v-loading="loading"
      :table-fields="tableConfig.fields"
      :table-data="jsonData.list"
      :table-item-option="tableConfig.tableItemOption"
      v-bind="$attrs"
      :list-url="urlMethodCache.listUrl"
      :tree-grid="tableConfig.treeGrid"
      :tree-grid-lazy="tableConfig.treeGridLazy"
      :element-loading-text="'正在加载中...'"
      v-on="$listeners"
      @sort-change="sortChange"
      @expand-change="expandChange"
    >
      <template v-slot:expand-area="{data}">
        <slot :name="'expand-area'" :data="data" :expandedRows="expandedRows" />
      </template>
      <template v-slot:btn-area-left>
        <add-btn>
          <template slot-scope="{ data, closeDialog }">
            <add-form
              :value="data"
              :add-fields="addFields"
              :url="urlMethodCache.addUrl"
              @success="doSearch"
              @closeDialog="closeDialog"
            >
              <template v-slot:add-btn-before="{data, formValidate}">
                <slot :name="'curd-add-before'" :data="data" :formValidate="formValidate" />
              </template>
              <template v-slot:add-btn-after="{data, formValidate}">
                <slot :name="'curd-add-after'" :data="data" :formValidate="formValidate" />
              </template>
            </add-form>
          </template>
        </add-btn>
        <!-- 左侧的按钮区域, 扩展的入口 -->
        <div v-if="$scopedSlots['curd-btn-left']" class="curd-btn-left">
          <slot name="curd-btn-left" />
        </div>
      </template>
      <template v-slot:btn-area-right="{toggleRowSelectionArray, showSelected}">
        <!-- 右侧的按钮区域, 扩展的入口 -->
        <div v-if="$scopedSlots['curd-btn-right']" class="curd-btn-right">
          <slot name="curd-btn-right" />
        </div>
        <!-- 右侧的按钮区域, 扩展的入口 -->
        <div v-if="$scopedSlots['curd-btn-right-after']" class="curd-btn-right-after">
          <slot name="curd-btn-right-after" />
        </div>
        <del-btn
          v-if="showSelected"
          :url="templateUrl(urlMethodCache.deleteUrl, toggleRowSelectionArray)"
          :value="toggleRowSelectionArray"
          label="批量删除"
          @success="doSearch"
        />
        <template-confirm-btn
          v-if="urlMethodCache.enableUrl
            && existEnableFields && showSelected"
          :url="templateUrl(urlMethodCache.enableUrl, toggleRowSelectionArray)"
          :btn-type="'primary'"
          :label="'批量启用'"
          :value="toggleRowSelectionArray"
          @success="doSearch"
        />
        <template-confirm-btn
          v-if="urlMethodCache.disableUrl
            && existEnableFields && showSelected"
          :url="templateUrl(urlMethodCache.disableUrl, toggleRowSelectionArray)"
          :btn-type="'primary'"
          :value="toggleRowSelectionArray"
          :label="'批量禁用'"
          @success="doSearch"
        />
        <el-button type="primary" style="margin-left: 10px" @click="changeToEditable">编辑</el-button>
      </template>
      <template v-slot:col-btn="{ data }">
        <update-btn :url="templateUrl(urlMethodCache.queryUrl, data)" :btn-type="'text'">
          <template slot-scope="{ data, closeDialog }">
            <update-form
              v-if="existOperate(data, 'EDIT')"
              :value="data"
              :add-fields="updatableFields"
              :url="templateUrl(urlMethodCache.updateUrl, data)"
              @success="doSearch"
              @closeDialog="closeDialog"
            >
              <template v-slot:update-btn-before="{data, formValidate}">
                <slot :name="'curd-update-before'" :data="data" :formValidate="formValidate" />
              </template>
              <template v-slot:update-btn-after="{data, formValidate}">
                <slot :name="'curd-update-after'" :data="data" :formValidate="formValidate" />
              </template>
            </update-form>
          </template>
        </update-btn>
        <div v-if="$scopedSlots['col-btn-more']" class="moreBtn">
          <slot name="col-btn-more" :data="data" />
        </div>
      </template>
      <template v-slot:col-btn-dropdown="{ data }">
        <slot name="col-btn-dropdown" :data="data" />
        <el-dropdown-item>
          <template-confirm-btn
            v-if="urlMethodCache.enableUrl && existEnableFields && existOperate(data, 'ENABLE')"
            :url="templateUrl(urlMethodCache.enableUrl, data)"
            :btn-type="'text'"
            :value="data"
            :label="'启用'"
            @success="doSearch"
          />
        </el-dropdown-item>
        <el-dropdown-item>
          <template-confirm-btn
            v-if="urlMethodCache.disableUrl && existEnableFields && existOperate(data, 'DISABLE')"
            :url="templateUrl(urlMethodCache.disableUrl, data)"
            :btn-type="'text'"
            :value="data"
            :label="'禁用'"
            @success="doSearch"
          />
        </el-dropdown-item>
        <el-dropdown-item>
          <del-btn
            v-if="existOperate(data, 'DELETE')"
            :url="templateUrl(urlMethodCache.deleteUrl, data)"
            :btn-type="'text'"
            :value="data"
            @success="doSearch"
          />
        </el-dropdown-item>
        <el-dropdown-item>
          <common-dialog-btn :label="'设置角色'" :type="'text'">
            <template slot-scope="{ closeDialog }">
              <role-settings :data="data" @closeDialog="closeDialog" />
            </template>
          </common-dialog-btn>
        </el-dropdown-item>
        <el-dropdown-item>
          <el-button type="text">
            <router-link style="display:block" :to="{ name:'user-bind'}">绑定用户</router-link>
          </el-button>
        </el-dropdown-item>
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
import AddBtn from '@/components/CURD/Btns/AddBtn'
import UpdateBtn from '@/components/CURD/Btns/UpdateBtn'
import UpdateForm from '@/components/CURD/Add/UpdateForm'
import DelBtn from '@/components/CURD/Btns/DelBtn'
import TemplateConfirmBtn from '@/components/CURD/Btns/TemplateConfirmBtn'
import CommonDialogBtn from '@/components/CURD/Btns/CommonDialogBtn'
import RoleSettings from '@/views/oa/role-settings.vue'
import AddForm from '@/components/CURD/Add/AddForm'
import { deepClone } from '@/utils'
import EditableTable from '@/components/CURD/Table/EditableTable'
import CurdMixin from '@/components/CURD/curd.mixin'

export default {
  name: 'CRUD',
  components: {
    EditableTable,
    TemplateConfirmBtn,
    DelBtn,
    UpdateForm,
    UpdateBtn,
    AddBtn,
    AddForm,
    SimpleTable,
    InquiryMode,
    CommonDialogBtn,
    RoleSettings
  },
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
          deleteUrl: baseUrl + '/{id}',
          enableUrl: baseUrl + '/enable/{id}',
          disableUrl: baseUrl + '/disable/{id}',
          listUrl: baseUrl + '/list',
          batchUpdateUrl: baseUrl + '/batch'
        }
      } else {
        return {}
      }
    }
    return {
      // 是否是编辑的状态
      editable: false,
      /**
       * 加载中的显示
       */
      loading: false,
      urlMethodCache: {
        ...defaultUrlMethod(this.baseUrl),
        ...this.urlMethods
      },
      expandedRows: null,
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
    existOperate() {
      return (data, operate) => {
        if (data && data.links) {
          return data.links.filter(s => s.operate === operate).length > 0
        }
        return true
      }
    },
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
     * 可新增字段筛选
     * @returns {T[]|*[]}
     */
    addFields() {
      if (this.tableConfig &&
        this.tableConfig.fields &&
        this.tableConfig.fields.length > 0) {
        return this.tableConfig.fields.filter(s => {
          // 设置默认所有的字段都可以填写的，除非配置了addShowable为false
          return s.createConfig && s.createConfig.addShowable === true
        })
      }
      return []
    },
    /**
     * 可修改字段筛选
     * @returns {T[]|*[]}
     */
    updatableFields() {
      if (this.tableConfig &&
        this.tableConfig.fields &&
        this.tableConfig.fields.length > 0) {
        return this.tableConfig.fields.filter(s => {
          return (s.updateConfig && s.updateConfig.updateShowable === true) || s.primaryKey === true
        })
      }
      return []
    },
    /**
     * 判断是否存在enable_state字段
     * @returns {T[]|*[]}
     */
    existEnableFields() {
      if (this.tableConfig &&
        this.tableConfig.fields &&
        this.tableConfig.fields.length > 0) {
        return this.tableConfig.fields.filter(s => {
          return s.value === 'enableState'
        }).length > 0
      }
      return false
    }
  },
  created() {
    this.doSearch()
  },
  methods: {
    changeToCannotEditable() {
      this.editable = false
    },
    changeToEditable() {
      this.editable = true
    },
    /**
     * 触发查询操作
     */
    triggerSearch() {
      // 触发查询
      if (this.$refs.inquirySearch) {
        this.$refs.inquirySearch.triggerSearch()
      }
    },
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
    expandChange(row, expandedRows) {
      this.expandedRows = expandedRows
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
        const obj = deepClone(this.searchForm)
        obj.treeGridLazy = this.tableConfig.treeGridLazy
        this.loading = true
        baseApiGetMethod(this.urlMethodCache.pageUrl, obj).then(resp => {
          if (isSuccessResult(resp)) {
            this.$set(this.jsonData, 'list', resp.data.list)
            this.$set(this.jsonData, 'total', resp.data.total)
          } else {
            this.$message.error(resp.message)
          }
          this.loading = false
        }).catch(e => {
          console.log(e)
          this.loading = false
        })
      } else {
        this.$message.error('请配置分页查询地址参数:{pageUrl: xxxx}')
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
