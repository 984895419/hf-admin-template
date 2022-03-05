<template>
  <div
    v-loading.fullscreen.lock="fullscreenLoading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.1)"
    class="app-container"
  >
    <el-col :span="3">
      <menu-tree
        ref="treePannel"
        @tree-node-click="treeNodeClick"
      />
    </el-col>
    <el-col :span="21">
      <el-form
        ref="searchForm"
        :rules="rules"
        :model="searchForm"
        label-width="100px"
      >
        <el-row>
          <el-col :span="5">
            <el-form-item
              :label="$t('common.menu.metaTitle')"
              prop="metaTitle"
            >
              <el-input
                v-model="searchForm.metaTitle"
                :placeholder="$t('common.menu.metaTitle')"
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col :span="19">
            <el-form-item>
              <el-button
                v-if="hasPerm('/menu/queryMenus')"
                class="filter-item"
                type="primary"
                icon="el-icon-search"
                @click="handleSearch"
              >
                {{ $t('common.common.search') }}
              </el-button>
              <el-button
                v-if="hasPerm('/menu/queryMenus')"
                class="filter-item"
                type="danger"
                icon="el-icon-reset"
                @click="handleReset"
              >
                {{ $t('common.common.reset') }}
              </el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-row class="operate-nav">
        <el-button
          v-if="hasPerm('/menu/deleteMenus')"
          type="danger"
          style="margin-left: 10px"
          @click="handleDeleteBatch"
        >{{ $t('common.common.batchDelete') }}</el-button>
        <el-button
          v-if="hasPerm('/menu/addMenu')"
          type="primary"
          @click="handleAdd"
        >{{ $t('common.common.add') }}</el-button>
      </el-row>
      <el-table
        v-loading="listLoading"
        :data="data.list"
        tooltip-effect="dark"
        border
        fit
        highlight-current-row
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          fixed
          type="selection"
          width="40"
        />
        <el-table-column
          :label="$t('common.menu.sortno')"
          prop="sortno"
          align="center"
          min-width="110"
          show-overflow-tooltip
        />
        <el-table-column
          :label="$t('common.menu.path')"
          prop="path"
          align="center"
          min-width="110"
          show-overflow-tooltip
        />
        <el-table-column
          :label="$t('common.menu.metaTitle')"
          prop="metaTitle"
          align="center"
          min-width="110"
          show-overflow-tooltip
        />
        <el-table-column
          :label="$t('common.menu.metaIcon')"
          prop="metaIcon"
          align="center"
          min-width="110"
          show-overflow-tooltip
        />
        <el-table-column
          :label="$t('common.menu.component')"
          prop="component"
          align="center"
          min-width="110"
          show-overflow-tooltip
        />
        <el-table-column
          :label="$t('common.menu.redirect')"
          prop="redirect"
          align="center"
          min-width="110"
          show-overflow-tooltip
        />

        <el-table-column
          class-name="status-col"
          :label="$t('common.menu.metaNocache')"
          width="80"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span>{{ scope.row.metaNocache=='1'?'是':'否' }}</span>
          </template>
        </el-table-column>

        <el-table-column
          class-name="status-col"
          :label="$t('common.menu.metaBreadcrumb')"
          width="110"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span>{{ scope.row.metaBreadcrumb=='1'?'是':'否' }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('common.menu.location')"
          prop="location"
          align="center"
          min-width="110"
          show-overflow-tooltip
        />
        <el-table-column
          :label="$t('common.menu.name')"
          prop="name"
          align="center"
          min-width="110"
          show-overflow-tooltip
        />

        <el-table-column
          class-name="status-col"
          :label="$t('common.menu.hidden')"
          width="80"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span>{{ scope.row.hidden=='1'?'是':'否' }}</span>
          </template>
        </el-table-column>

        <el-table-column
          class-name="status-col"
          :label="$t('common.menu.alwaysshow')"
          width="110"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span>{{ scope.row.alwaysshow=='1'?'是':'否' }}</span>
          </template>
        </el-table-column>

        <el-table-column
          fixed="right"
          align="center"
          :label="$t('common.table.actions')"
          width="120"
        >
          <template slot-scope="rowData">
            <el-button
              type="text"
              size="mini"
              @click="handleUpdate(rowData,true)"
            >
              {{ $t('common.common.detail') }}
            </el-button>
            <el-button
              v-if="hasPerm('/menu/updateMenu')"
              type="text"
              size="mini"
              @click="handleUpdate(rowData)"
            >
              {{ $t('common.common.edit') }}
            </el-button>
            <el-button
              v-if="hasPerm('/menu/addMenu')"
              type="text"
              size="mini"
              @click="referAdd(rowData)"
            >
              {{ $t('common.common.referAdd') }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <pagination
        v-show="data.total>0"
        :total="data.total"
        :page.sync="pageData.pageNum"
        :limit.sync="pageData.pageSize"
        :page-sizes="[10, 50, 100, 1000]"
        @pagination="getList"
      />

      <el-dialog
        v-el-drag-dialog
        :visible.sync="dialogFormVisible"
        :title="textMap[dialogStatus]"
        :close-on-click-modal="false"
      >
        <menu-add
          ref="addPannel"
          @submit-success="submitSuccess"
          @cancel="cancel"
        />
      </el-dialog>
    </el-col>

  </div>
</template>

<script>
import { fetchMenuList } from '@/api/menu'
import Pagination from '@/components/Pagination'
import MenuAdd from './Add'
import MenuTree from './Tree'
import { delteMenus } from '@/api/menu'
import { messageErrorHandle, messageSuccesHandle } from '@/utils/message-handle'
import { isEmpty } from 'element-ui/src/utils/util'
import elDragDialog from '@/directive/el-drag-dialog'
import { specificationRegExp } from '@/utils/validate'
export default {
  name: 'MenuList',
  directives: { elDragDialog },
  components: { Pagination, MenuAdd, MenuTree },
  data() {
    return {
      treeSelected: [], //  树选中
      multipleSelection: [],
      dialogStatus: 'add',
      textMap: {
        edit: 'edit', /* this. */
        add: 'add',
        detail: 'detail'
      },
      /**
       * 空的查询表单，用于重置的时候的复制
       */
      emptySearchForm: {
        metaTitle: ''
      },
      /**
       * 搜索表单字段
       */
      searchForm: {
        metaTitle: ''
      },
      rules: {
        metaTitle: [
          { required: true, message: this.$t('common.validate.pleaseInput') + this.$t('common.menu.metaTitle'), trigger: 'blur' },
          { pattern: specificationRegExp, message: this.$t('common.validate.pleaseInputLegal'), trigger: 'change' }
        ]
      },
      /**
       * 列表字段
       */
      data: {
        list: [],
        total: 0
      },
      /**
       * 加载中是否显示
       */
      listLoading: false,
      /**
       * 分页数据
       */
      pageData: {
        pageNum: 1,
        pageSize: 10
      },
      /**
       * 新增编辑的弹框显示与否
       */
      dialogFormVisible: false,
      fullscreenLoading: false
    }
  },
  created() {
    this.textMap.edit = this.$t('common.table.edit')
    this.textMap.add = this.$t('common.table.add')
    this.textMap.detail = this.$t('common.table.detail')
    this.getList()
  },
  methods: {
    /**
     * 树点击
     */
    treeNodeClick(data) {
      this.treeSelected = data
      this.getList()
    },
    /**
     * 表格复选框变化
     */
    handleSelectionChange(val) {
      this.multipleSelection = val.map(item => {
        return { menuId: item.menuId }
      })
    },
    /**
     * 查询
     */
    getList() {
      if (!this.hasPerm('/menu/queryMenus')) {
        return
      }
      this.listLoading = true
      let param = {}
      param = Object.assign(param, this.searchForm, this.pageData)
      if (!isEmpty(this.treeSelected)) {
        Object.assign(param, { parentMenuId: this.treeSelected.menuId })
      }
      const _this = this
      fetchMenuList(param).then(response => {
        if (response.res === '1') {
          _this.data.list = response.obj.list
          _this.data.total = response.obj.total
        } else {
          messageErrorHandle(_this, response, _this.$t('common.table.search'))
        }
        _this.listLoading = false
      }).catch(() => {
        _this.data.list = []
        _this.data.total = 0
        _this.listLoading = false
      })
    },
    /**
     * 搜索按钮触发时间
     */
    handleSearch() {
      this.pageData.pageNum = 1
      this.pageData.pageSize = 10
      this.getList()
    },
    /**
     * 重置查询条件
     */
    handleReset() {
      for (const key in this.searchForm) {
        if (this.emptySearchForm[key]) {
          this.searchForm[key] = this.emptySearchForm[key]
        } else {
          this.searchForm[key] = ''
        }
      }
    },
    /**
     * 添加操作
     */
    handleAdd() {
      if (isEmpty(this.treeSelected)) {
        this.$message({
          type: 'warning',
          message: this.$t('common.menu.pleaseSelectOneNode')
        })
        return
      }
      this.dialogStatus = 'add'
      this.textMap
      this.dialogFormVisible = true
      const _this = this
      setTimeout(function() {
        _this.$refs.addPannel.setFormData({
          parentMenuId: _this.treeSelected.menuId,
          parentMetaTitle: _this.treeSelected.metaTitle
        })
      }, 100)
    },

    referAdd(rowData) {
      this.dialogStatus = 'add'
      this.textMap
      this.dialogFormVisible = true
      const _this = this
      setTimeout(function() {
        _this.$refs.addPannel.setFormData(Object.assign({}, rowData.row, { menuId: null }))
      }, 100)
    },
    /**
     * 修改按钮编辑
     * @param row
     */
    handleUpdate(rowData, isLook) {
      if (isLook) {
        this.dialogStatus = 'detail'
      } else {
        this.dialogStatus = 'edit'
      }
      this.dialogFormVisible = true
      const _this = this
      /**
       * 延时处理是因为addPannel面板首次还未初始化
       */
      setTimeout(function() {
        _this.$refs.addPannel.setFormData(rowData.row, isLook)
      }, 100)
    },
    /**
     * 新增/修改提交成功时候的数据
     */
    submitSuccess() {
      this.dialogFormVisible = false
      this.$refs.treePannel.getMenuTree(this.treeSelected)
      if (isEmpty(this.treeSelected)) { // 可以设置编辑不用刷新
        this.getList()
      }
    },
    /**
     * 取消时候的调用关闭
     */
    cancel() {
      this.dialogFormVisible = false
    },
    /**
     * 批量删除
     */
    handleDeleteBatch() {
      const _this = this
      if (this.multipleSelection.length > 0) {
        this.$confirm(this.$t('common.table.confirm') + this.$t('common.table.delete'), this.$t('common.infoLevel.warning'), {
          confirmButtonText: this.$t('common.table.confirm'),
          cancelButtonText: this.$t('common.table.cancel'),
          type: 'warning'
        }).then(() => {
          _this.fullscreenLoading = true
          delteMenus(_this.multipleSelection).then(response => {
            if (response.res === '1') {
              messageSuccesHandle(_this, _this.$t('common.table.delete'))
              _this.$refs.treePannel.getMenuTree(_this.treeSelected)
              if (isEmpty(_this.treeSelected)) {
                _this.getList()
              }
            } else {
              messageErrorHandle(_this, response, _this.$t('common.table.delete'))
            }
            _this.fullscreenLoading = false
          })
        }).catch(err => {
          _this.fullscreenLoading = _this
          messageErrorHandle(_this, err, _this.$t('common.table.delete'))
        })
      }
    }
  }
}
</script>

<style scoped>
.operate-nav {
  margin-bottom: 10px;
  direction: rtl;
}
</style>
