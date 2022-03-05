<template>
  <!--
    vue 基础语法
      状态管理模式
      属性冒号: 或者v-bind: 单向绑定，将js中的数据赋值到html中   注：有冒号和没有冒号的区别： 冒号后面的是表达式，没有冒号的是字符串
      事件@     或者v-on 事件
      属性v-model  双向绑定
      属性v-html 输出代码
      标签间文本 {{ 属性名 }}
  -->
  <!--
      Loading 加载组件
      全屏遮罩 通过变量fullscreenLoading来控制
  -->
  <div
    v-loading.fullscreen.lock="fullscreenLoading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.1)"
    class="app-container"
  >
    <!--
      layout布局
      <el-row>和 <el-col :span="3">
    -->
    <el-col :span="3">
      <!--
        自定义组件
        父组件获取子组件的data和方法
        1.ref：可以通过ref获取子组件的属性和方法，$refs.treePannel.属性/方法
        其他说明见<operate-add>上的注释
      -->
      <left-tree
        ref="treePannel"
        @tree-node-click="treeNodeClick"
      />
    </el-col>
    <el-col :span="21">
      <!--
        Form表单/Form相关组件/表单验证
        <el-form> 表单
          :inline="true" 行内表单
          :rules 校验规则
          :model 表单数据对象
        <el-form-item>
          :label 标签文本
          prop 校验属性，对应于el-form :model 对象的字段
        <el-input>
          v-model 表单数据对象	，数据双向绑定  .trim修饰符，去掉前后空格
          :placeholder 提示    $t('common.')国际化  参看zh.js文件
        <el-select> 选择器 支持搜索/清除等
      -->
      <el-form
        ref="searchForm"
        :rules="rules"
        :model="searchForm"
        label-width="80px"
      >
        <el-row>
          <el-col :span="5">
            <el-form-item
              :label="$t('common.operate.operatName')"
              prop="operatName"
            >
              <el-input
                v-model="searchForm.operatName"
                :placeholder="$t('common.operate.operatName')"
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item
              :label="$t('common.operate.operatUrl')"
              prop="operatUrl"
            >
              <el-input
                v-model="searchForm.operatUrl"
                :placeholder="$t('common.operate.operatUrl')"
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <!-- <el-form-item :label="$t('common.operate.operatWay')+'：'">
              <el-select v-model.trim="searchForm.operatWay" prop="operatWay" filterable :placeholder="$t('common.common.pleaseSelect')">
                <el-option label="访问越权" value="1" />
                <el-option label="按钮权限" value="0" />
              </el-select>
            </el-form-item>-->
            <el-form-item
              :label="$t('common.operate.operatType')"
              prop="operatType"
            >
              <el-select
                v-model.trim="searchForm.operatType"
                filterable
                :placeholder="$t('common.common.pleaseSelect')"
              >
                <!--
                  v-for
                -->
                <el-option
                  v-for="(value, key) in operatTypeMap"
                  :key="key"
                  :label="value"
                  :value="key"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item>
              <!--
                按钮权限
                v-if="hasPerm('/operate/queryOperates')"
                @click="handleSearch" 事件
              -->
              <el-button
                v-if="hasPerm('/operate/queryOperates')"
                class="filter-item"
                type="primary"
                icon="el-icon-search"
                @click="handleSearch"
              >
                {{ $t('common.common.search') }}
              </el-button>
              <el-button
                v-if="hasPerm('/operate/queryOperates')"
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
        <advance-search ref="advaceSearch">
          <el-row>
            <el-col :span="5">
              <el-form-item :label="$t('common.operate.operatWay')">
                <el-select
                  v-model.trim="searchForm.operatWay"
                  prop="operatWay"
                  filterable
                  :placeholder="$t('common.common.pleaseSelect')"
                >
                  <el-option
                    label="访问越权"
                    value="1"
                  />
                  <el-option
                    label="按钮权限"
                    value="2"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </advance-search>

      </el-form>
      <el-row class="operate-nav">
        <el-button
          v-if="hasPerm('/operate/deleteOperates')"
          type="danger"
          style="margin-left: 10px"
          @click="handleDeleteBatch"
        >{{ $t('common.common.batchDelete') }}</el-button>
        <el-button
          v-if="hasPerm('/operate/addOperate')"
          type="primary"
          @click="handleAdd"
        >{{ $t('common.common.add') }}</el-button>
        <!-- <el-button v-if="hasPerm('/operate/addOperate')" type="primary" @paste="pasteInto($event)">{{ $t('common.common.paste') }}</el-button> -->
        <el-dropdown
          trigger="click"
          @command="handleExport"
        >
          <el-button type="primary">
            <i class="el-icon-arrow-down el-icon--right" />{{ $t('common.table.export') }}
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="exportAll">{{ $t('common.table.exportAll') }}</el-dropdown-item>
            <el-dropdown-item command="exportSelect">{{ $t('common.table.exportSelect') }}</el-dropdown-item>
            <el-dropdown-item command="exportCurPage">{{ $t('common.table.exportCurPage') }}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-button
          type="primary"
          style="margin-right: 10px"
          @click="handleUpload"
        >{{ $t('common.table.upload') }}</el-button>
      </el-row>
      <!-- 文件上传组件 accept-type：可接受文件类型,字符串，逗号隔开；upload-url上传路径；template-down-url模板下载路径；@submit-success回调函数-->
      <file-upload
        ref="fileupload"
        accept-type="xlsx"
        upload-url="/api/operate/uploadOperates"
        template-down-url="/api/operate/exportPageOperates"
        @submit-success="submitSuccess"
      />
      <!--
        表格
        <el-table>
          v-loading 加载
          :data 表格数据
          tooltip-effect 提示
          @selection-change 复选框选中项变化时，用于多选情况下，保存当前已选的记录
        <el-table-column> 列
          :label 表头
          prop 对应字段
          min-width 最小宽度
          :formatter 格式化
      -->
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
          :label="$t('common.operate.operatName')"
          prop="operatName"
          align="center"
          min-width="110"
          show-overflow-tooltip
        />
        <el-table-column
          :label="$t('common.operate.operatUrl')"
          prop="operatUrl"
          align="center"
          min-width="110"
          show-overflow-tooltip
        />
        <el-table-column
          :label="$t('common.operate.operatType')"
          prop="operatType"
          align="center"
          min-width="110"
          show-overflow-tooltip
          :formatter="formatOperatType"
        />
        <el-table-column
          :label="$t('common.operate.operatWay')"
          prop="operatWay"
          align="center"
          min-width="110"
          show-overflow-tooltip
          :formatter="formatOperatWay"
        />
        <el-table-column
          class-name="status-col"
          :label="$t('common.operate.isLog')"
          min-width="110"
          show-overflow-tooltip
        >
          <!--
             网址：https://cn.vuejs.org/v2/guide/components-slots.html
            插槽的作用：将组件开闭标签中间的内容，输出到组件模板的slot中去
            注： 不能直接<el-table-column>{{ row.isLog}}</el-table-column>；因为标签中间的内容“{{ row}}”是父组件里的变量，
                  或者说是父组件传递给子组件<el-table-column>的变量。。需要子组件接收了才可以使用；<el-table-column>是用prop来接收的；
                  而插槽的slot-scope或则v-slot属性就相当于插槽prop
                  除此之外，子组件的变量，也需要通过插槽prop传递到父组件插槽内容
            如果子组件模板中没有slot。。则组件开闭标签中间的内容不会展示
            作用域插槽 slot-scope
          -->
          <template slot-scope="scope">
            <span>{{ scope.row.isLog=='1'?'是':'否' }}</span>
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
              v-if="hasPerm('/operate/updateOperate')"
              type="text"
              size="mini"
              @click="handleUpdate(rowData)"
            >
              {{ $t('common.common.edit') }}
            </el-button>
            <el-button
              v-if="hasPerm('/operate/addOperate')"
              type="text"
              size="mini"
              @click="referAdd(rowData)"
            >
              {{ $t('common.common.referAdd') }}
            </el-button>
            <el-button
              v-if="hasPerm('/operate/addOperate')"
              v-clipboard:copy="copyData(rowData)"
              type="text"
              size="mini"
            >
              {{ $t('common.common.copy') }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!--
        Pagination 分页；
        v-show 是否展示
        :total 总数量
        :page.sync 页码
        :limit.sync 一页记录数
        :page-sizes 每页显示个数选择器
        @pagination 页码事件
      -->
      <pagination
        v-show="data.total>0"
        :total="data.total"
        :page.sync="pageData.pageNum"
        :limit.sync="pageData.pageSize"
        :page-sizes="[10, 50, 100, 1000]"
        @pagination="getList"
      />

      <!--
        <el-dialog> 对话框组件
          v-el-drag-dialog ： 可拖动指令
          :visible.sync ： 是否弹出，可见性
          :title 标题
          :close-on-click-modal 是否可以通过点击 modal 关闭 Dialog
      -->
      <el-dialog
        v-el-drag-dialog
        :visible.sync="dialogFormVisible"
        :title="textMap[dialogStatus]"
        :close-on-click-modal="false"
      >
        <!--
          0.camelCased (驼峰式) 命名与 kebab-case（短横线命名） Pascal命名法（大驼峰式，首字母大写）
          html对大小写不敏感。
          大小写规范：
            js中变量名，camelCased (驼峰式)  || vue组件名Pascal命名法  || props 驼峰命名
            css中定义的元素名称  kebab-case（短横线命名）
            html中，标签、属性名、事件名 kebab-case（短横线命名） 如： <menu-tree>/:operat-type-map/@tree-node-click
            html与js 相互转化关系： 1.vue组件名，js中MenuTree，html中<menu-tree> 2. props， js中operatTypeMap，html中operat-type-map
          父子组件间的传值和事件触发
          1.props属性传递：
            vue的组件的props属性支持驼峰命名,不支持连接线命名,使用是用连接线进行赋值或者数据绑定!
            即：operat-way-map对应组件OperateAdd的属性props中的operatWayMap
            原因：html不支持大小写，所以用连接线代替驼峰
          2.自定义事件：
            使用 $on(eventName) 监听事件，如：@submitSuccess="submitSuccess" @相当于$on(),@submitSuccess的submitSuccess相当于eventName
            使用 $emit(eventName) 触发事件， 如： 在add.vue里使用this.$emit('submitSuccess')
          3..syn修饰符，相当于属性传递和更新事件结合
            <comp :foo.sync="bar"></comp> 相当于 <comp :foo="bar" @update:foo="val => bar = val"></comp>
            当子组件需要更新 foo 的值时，它需要显式地触发一个更新事件：this.$emit('update:foo', newValue)
        -->
        <operate-add
          ref="addPannel"
          :operat-way-map="operatWayMap"
          :operat-type-map="operatTypeMap"
          @submit-success="submitSuccess"
          @cancel="cancel"
        />
      </el-dialog>
    </el-col>

  </div>
</template>

<script>
// 一个文件就相当于一个模块。。
// 模块之间的变量不通用，可以相同名字。
// 模块之间的引用，通过import
// 模块中的属性/方法 通过 export 暴露出去
// import 后的'@' 表示 /src 目录
// ./ 表示当前目录
// @/api/目录下的是 和后台对接的接口调用
import Pagination from '@/components/Pagination'
import OperateAdd from './Add'
import LeftTree from './Tree'
import { getCodeMap } from '@/api/dict'
import { delteOperates, fetchOperateList, exportCurPage, exportAll, exportSelect } from '@/api/operate'
import { messageErrorHandle, messageSuccesHandle } from '@/utils/message-handle'
import { isEmpty } from 'element-ui/src/utils/util'
import elDragDialog from '@/directive/el-drag-dialog'
import { specificationRegExp } from '@/utils/validate'
import AdvanceSearch from '@/components/AdvanceSearch'
import FileUpload from '@/components/FileUpload'
import clipboard from '@/directive/clipboard/index.js' // use clipboard by v-directive

export default {
  name: 'OperateList', // 组件名称  Pascal命名法
  directives: { elDragDialog, clipboard }, // 自定义指令 拖拽
  components: { FileUpload, AdvanceSearch, Pagination, OperateAdd, LeftTree }, // 分页，添加修改页面，菜单树
  data() { // vue 数据函数，可以理解为对象属性
    /* 自定义校验规则
      let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };*/
    return {
      operatTypeMap: {
        1: '新增',
        2: '修改',
        3: '删除'
      },
      operatWayMap: {
        1: '访问越权',
        2: '按钮权限'
      },
      treeSelected: [], //  树选中
      multipleSelection: [], // 表格 勾选记录
      multipleSelectData: [], // 表格 勾选记录详细，用于导出
      dialogStatus: 'add', // 对话框状态，新增或者修改
      textMap: { // 对话框标题
        edit: 'edit', /* this. */
        add: 'add',
        detail: 'detail'
      },
      /**
       * 空的查询表单，用于重置的时候的复制
       */
      emptySearchForm: {
        operatName: '',
        operatUrl: '',
        operatType: '',
        operatWay: ''
      },
      /**
       * 搜索表单字段
       */
      searchForm: {
        operatName: '',
        operatUrl: '',
        operatType: '',
        operatWay: ''
      },
      rules: { // 校验规则
        operatName: [
          // required 必填，会自动加红色* ； message：提示信息 ； trigger： 校验触发事件
          // { required: true, message: this.$t('common.validate.pleaseInput') + this.$t('common.operate.operatName'), trigger: 'blur' },
          // pattern 校验规则
          { pattern: specificationRegExp, message: this.$t('common.validate.pleaseInputLegal'), trigger: 'change' }
        ],
        operatUrl: [
          // { required: true, message: this.$t('common.validate.pleaseInput') + this.$t('common.operate.operatName'), trigger: 'blur' },
          { pattern: specificationRegExp, message: this.$t('common.validate.pleaseInputLegal'), trigger: 'change' }
        ]
        // 也可以自定义校验规则， 查看form组件资料
        /* pass: [
          { validator: validatePass, trigger: 'blur' }
        ] */
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
      /**
       * 全屏加载中是否显示
       */
      fullscreenLoading: false
    }
  },
  /**
   * 组件加载时调用；可以理解为初始化函数
   */
  created() {
    this.textMap.edit = this.$t('common.table.edit')
    this.textMap.add = this.$t('common.table.add')
    this.textMap.detail = this.$t('common.table.detail')
    const _this = this
    getCodeMap({ codeKinds: 'OPERAT_TYPE,OPERAT_WAY' }).then(response => {
      _this.operatTypeMap = response.OPERAT_TYPE
      _this.operatWayMap = response.OPERAT_WAY
    })
    this.getList()
  },
  /**
   * 可以理解为组件成员方法
   */
  methods: {

    /**
     * format开头的，为格式化函数
     */
    formatOperatType(row, column, cellValue, index) {
      return this.operatTypeMap[cellValue]
    },
    formatOperatWay(row, column, cellValue, index) {
      return this.operatWayMap[cellValue]
    },
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
        return { operatId: item.operatId }
      })
      this.multipleSelectData = val
    },
    /**
     * 查询
     */
    getList() {
      if (!this.hasPerm('/operate/queryOperates')) {
        return
      }
      this.listLoading = true
      let param = {}
      param = Object.assign(param, this.searchForm, this.pageData)
      if (!isEmpty(this.treeSelected)) {
        Object.assign(param, { menuId: this.treeSelected.menuId })
      }
      const _this = this
      fetchOperateList(param).then(response => {
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
      this.$refs.searchForm.validate((valid) => { // 校验
        if (valid) {
          this.pageData.pageNum = 1
          this.pageData.pageSize = 10
          this.getList()
        }
      })
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
      this.dialogFormVisible = true
      const _this = this
      setTimeout(function() {
        // 通过 refs对象 获取子组件对象
        _this.$refs.addPannel.setFormData({
          menuId: _this.treeSelected.menuId,
          metaTitle: _this.treeSelected.metaTitle
        })
      }, 100)
    },

    referAdd(rowData) {
      this.dialogStatus = 'add'
      this.dialogFormVisible = true
      const _this = this
      setTimeout(function() {
        _this.$refs.addPannel.setFormData(Object.assign({}, rowData.row, { operatId: null }))
      }, 100)
    },

    copyData(rowData) {
      return JSON.stringify(Object.assign({}, rowData.row, { operatId: null, menuId: null, metaTitle: null }))
    },

    pasteInto(e) {
      let clipboardData = e.clipboardData
      if (!clipboardData) {
        // chrome
        clipboardData = e.originalEvent.clipboardData
      }
      const data = clipboardData.getData('Text')
      this.dialogStatus = 'add'
      this.dialogFormVisible = true
      const _this = this
      setTimeout(function() {
        _this.$refs.addPannel.setFormData(Object.assign({}, rowData.row, { operatId: null }))
      }, 100)
    },

    /**
     * 修改按钮编辑
     * @param row
     */
    handleUpdate(rowData, isLook) {
      if (isLook) {
        this.dialogStatus = 'edit'
      } else {
        this.dialogStatus = 'detail'
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
      this.getList()
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
          delteOperates(_this.multipleSelection).then(response => {
            if (response.res === '1') {
              messageSuccesHandle(_this, _this.$t('common.table.delete'))
              this.getList()
            } else {
              messageErrorHandle(_this, response, _this.$t('common.table.delete'))
            }
            _this.fullscreenLoading = false
          })
        }).catch(err => {
          _this.fullscreenLoading = false
          messageErrorHandle(_this, err, _this.$t('common.table.delete'))
        })
      }
    },
    handleUpload() {
      this.$refs.fileupload.openDialog()
    },
    handleExport(command) {
      const _this = this
      this.fullscreenLoading = true
      if (command === 'exportCurPage') {
        exportCurPage(_this.data.list).then(response => {
          this.$util.downloadFile(response)
          _this.fullscreenLoading = false
        })
      } else if (command === 'exportAll') {
        let param = {}
        param = Object.assign(param, this.searchForm, this.pageData)
        if (!isEmpty(this.treeSelected)) {
          Object.assign(param, { menuId: this.treeSelected.menuId })
        }
        exportAll(param).then(response => {
          this.$util.downloadFile(response)
          _this.fullscreenLoading = false
        })
      } else if (command === 'exportSelect') {
        exportSelect(_this.multipleSelectData).then(response => {
          this.$util.downloadFile(response)
          _this.fullscreenLoading = false
        })
      }
    }
  }
}
</script>

<style scoped>
/* 按钮右靠齐*/
.operate-nav {
  margin-bottom: 10px;
  direction: rtl;
}
</style>
