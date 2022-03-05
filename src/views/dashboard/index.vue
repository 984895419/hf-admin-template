<template>
  <div class="super-flow-base-demo">
    <super-flow
      ref="superFlow"
      :node-list="nodeList"
      :link-list="linkList"
      :origin="origin"
      :enter-intercept="enterIntercept"
      :output-intercept="outputIntercept"
      :link-desc="linkDesc"
    >
      <template v-slot:node="{meta}">
        <div
          :class="`flow-node flow-node-${meta.prop}`"
          @dblclick="handleClick({meta})"
        >
          <header class="ellipsis">
            {{ meta.name }}
          </header>
          <section>
            {{ meta.desc }}
          </section>
        </div>
      </template>
    </super-flow>
    <el-dialog
      v-el-drag-dialog
      :title="drawerConf.title"
      :visible.sync="drawerConf.visible"
      :close-on-click-modal="false"
      width="500px"
    >
      <el-form
        v-show="drawerConf.type === drawerType.node"
        ref="nodeSetting"
        :model="nodeSetting"
        @keyup.native.enter="settingSubmit"
        @submit.native.prevent
      >
        <el-form-item
          label="节点名称"
          prop="name"
        >
          <el-input
            v-model="nodeSetting.name"
            placeholder="请输入节点名称"
            maxlength="30"
            @focus="handleMenuFocus"
          />
        </el-form-item>
        <el-form-item
          label="节点描述"
          prop="desc"
        >
          <el-input
            v-model="nodeSetting.desc"
            placeholder="请输入节点描述"
            maxlength="30"
          />
        </el-form-item>
      </el-form>
      <el-form
        v-show="drawerConf.type === drawerType.link"
        ref="linkSetting"
        :model="linkSetting"
        @keyup.native.enter="settingSubmit"
        @submit.native.prevent
      >
        <el-form-item
          label="连线描述"
          prop="desc"
        >
          <el-input
            v-model="linkSetting.desc"
            placeholder="请输入连线描述"
          />
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="drawerConf.cancel">
          取 消
        </el-button>
        <el-button
          type="primary"
          @click="settingSubmit"
        >
          确 定
        </el-button>
      </span>
    </el-dialog>

    <el-dialog
      v-el-drag-dialog
      :visible.sync="menuFormVisible"
      :title="$t('common.menu.menuSelect')"
      width="60vw"
      :close-on-click-modal="false"
      append-to-body
    >
      <menu-select
        ref="menuPannel"
        style="height: 50vh"
        @submit-menu="submitMenu"
      />
    </el-dialog>
  </div>
</template>

<script>
import { updateIndexConfig, queryIndexConfig } from '@/api/baseParame'
import { messageErrorHandle, messageSuccesHandle } from '@/utils/message-handle'
import MenuSelect from './components/MenuSelect'
import elDragDialog from '@/directive/el-drag-dialog'
import { isEmpty } from 'element-ui/src/utils/util'

const drawerType = {
  node: 0,
  link: 1
}

export default {
  components: { MenuSelect },
  directives: { elDragDialog },
  data() {
    return {
      menuFormVisible: false,
      drawerType,
      drawerConf: {
        title: '',
        visible: false,
        type: null,
        info: null,
        open: (type, info) => {
          const conf = this.drawerConf
          conf.visible = true
          conf.type = type
          conf.info = info
          if (conf.type === drawerType.node) {
            conf.title = '节点'
            if (this.$refs.nodeSetting) this.$refs.nodeSetting.resetFields()
            this.$set(this.nodeSetting, 'name', info.meta.name)
            this.$set(this.nodeSetting, 'desc', info.meta.desc)
            this.$set(this.nodeSetting, 'prop', info.meta.prop)
          } else {
            conf.title = '连线'
            if (this.$refs.linkSetting) this.$refs.linkSetting.resetFields()
            this.$set(this.linkSetting, 'desc', info.meta ? info.meta.desc : '')
          }
        },
        cancel: () => {
          this.drawerConf.visible = false
          if (this.drawerConf.type === drawerType.node) {
            this.$refs.nodeSetting.clearValidate()
          } else {
            this.$refs.linkSetting.clearValidate()
          }
        }
      },
      linkSetting: {
        desc: ''
      },
      nodeSetting: {
        name: '',
        desc: ''
      },

      origin: [2000, 2000],
      nodeList: [],
      linkList: [],

      graphMenuList: [
        [
          {
            label: '开始',
            disable(graph) {
              // return !!graph.nodeList.find(node => node.meta.prop === 'start')
            },
            selected: (graph, coordinate) => {
              // const start = graph.nodeList.find(node => node.meta.prop === 'start')
              const start = false
              if (!start) {
                graph.addNode({
                  width: 100,
                  height: 100,
                  coordinate: coordinate,
                  meta: {
                    prop: 'start',
                    name: '开始'
                  }
                })
              }
            }
          },
          {
            label: '普通节点',
            disable: false,
            selected: (graph, coordinate) => {
              graph.addNode({
                width: 160,
                height: 100,
                coordinate: coordinate,
                meta: {
                  prop: 'common',
                  name: '普通节点'
                }
              })
            }
          },
          {
            label: '结束',
            disable(graph) {
              // return !!graph.nodeList.find(point => point.meta.prop === 'end')
            },
            selected: (graph, coordinate) => {
              graph.addNode({
                width: 80,
                height: 50,
                coordinate: coordinate,
                meta: {
                  prop: 'end',
                  name: '结束'
                }
              })
            }
          }
        ],
        [
          {
            label: '保存',
            selected: (graph, coordinate) => {
              const _this = this
              console.log(JSON.stringify(graph.toJSON(), null, 2))
              updateIndexConfig(graph.toJSON()).then(response => {
                if (response.res === '1') {
                  messageSuccesHandle(_this, _this.$t('common.table.edit'))
                } else {
                  messageErrorHandle(_this, response, _this.$t('common.table.edit'))
                }
                _this.fullscreenLoading = false
              }).catch(err => {
                _this.fullscreenLoading = false
                console.error(err)
              })
            }
          },
          {
            label: '全选',
            selected: (graph, coordinate) => {
              graph.selectAll()
            }
          }
        ]
      ],
      nodeMenuList: [
        [
          {
            label: '删除',
            disable: false,
            hidden(node) {
              // return node.meta.prop === 'start'
            },
            selected(node, coordinate) {
              node.remove()
            }
          }
        ],
        [
          {
            label: '编辑',
            selected: (node, coordinate) => {
              this.drawerConf.open(drawerType.node, node)
            }
          }
        ]
      ],
      linkMenuList: [
        [
          {
            label: '删除',
            disable: false,
            selected: (link, coordinate) => {
              link.remove()
            }
          }
        ],
        [
          {
            label: '编辑',
            disable: false,
            selected: (link, coordinate) => {
              this.drawerConf.open(drawerType.link, link)
            }
          }
        ]
      ]
    }
  },
  created() {
    const _this = this
    queryIndexConfig().then(response => {
      if (response.res === '1' && response.obj) {
        const reslut = JSON.parse(response.obj)
        _this.nodeList = reslut.nodeList
        _this.linkList = reslut.linkList
        _this.origin = reslut.origin
      } else {
        messageErrorHandle(_this, response, _this.$t('common.table.search'))
      }
    })
  },
  mounted() {
    this.$nextTick(() => {
      this.$el.scrollBy({
        left: (this.$el.scrollWidth - this.$el.clientWidth) / 2,
        top: (this.$el.scrollHeight - this.$el.clientHeight) / 2
      })
    })
  },
  methods: {
    handleClick(meta) {
      if (!isEmpty(meta.meta.path) && this.hasPermMenu(meta.meta.perPath)) {
        this.$router.push({
          name: meta.meta.path
        })
      }
    },
    /**
     * 添加(货币)
     */
    handleMenuFocus() {
      debugger
      if (this.nodeSetting.prop !== 'start' && this.nodeSetting.prop !== 'end') {
        this.menuFormVisible = true
      }
    },
    submitMenu(data) {
      this.menuFormVisible = false
      if (this.drawerConf.type === drawerType.node) {
        this.nodeSetting.path = data.name
        this.nodeSetting.perPath = data.path
        this.nodeSetting.desc = data.location
        this.nodeSetting.name = data.metaTitle
      }
    },
    enterIntercept(formNode, toNode, graph) {
      const formType = formNode.meta.prop
      switch (toNode.meta.prop) {
        case 'start':
          return false
        case 'common':
          return [
            'start',
            'common',
            'condition',
            'cc'
          ].includes(formType)
        case 'condition':
          return [
            'start',
            'common',
            'condition',
            'cc'
          ].includes(formType)
        case 'end':
          return [
            'common',
            'cc'
          ].includes(formType)
        default:
          return true
      }
    },
    outputIntercept(node, graph) {
      return !(node.meta.prop === 'end')
    },
    linkDesc(link) {
      return link.meta ? link.meta.desc : ''
    },
    settingSubmit() {
      const conf = this.drawerConf
      if (this.drawerConf.type === drawerType.node) {
        if (!conf.info.meta) conf.info.meta = {}
        Object.keys(this.nodeSetting).forEach(key => {
          this.$set(conf.info.meta, key, this.nodeSetting[key])
        })
        this.$refs.nodeSetting.resetFields()
      } else {
        if (!conf.info.meta) conf.info.meta = {}
        Object.keys(this.linkSetting).forEach(key => {
          this.$set(conf.info.meta, key, this.linkSetting[key])
        })
        this.$refs.linkSetting.resetFields()
      }
      conf.visible = false
    }
  }
}
</script>

<style lang="less">
.ellipsis {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  word-wrap: break-word;
}

.super-flow-base-demo {
  width: 100%;
  height: 800px;
  margin: 0 auto;
  background-color: #f5f5f5;
  overflow: scroll;

  .super-flow {
    width: 4000px;
    height: 4000px;
  }

  .super-flow__node {
    .flow-node {
      > header {
        font-size: 14px;
        height: 32px;
        line-height: 32px;
        padding: 0 12px;
        color: #ffffff;
      }

      > section {
        text-align: center;
        line-height: 20px;
        overflow: hidden;
        padding: 6px 12px;
        word-break: break-all;
      }

      &.flow-node-start {
        > header {
          background-color: #55abfc;
        }
      }

      &.flow-node-common {
        > header {
          background-color: rgba(188, 181, 58, 0.76);
        }
      }

      &.flow-node-end {
        > header {
          height: 50px;
          line-height: 50px;
          background-color: #00c777;
        }
      }
    }
  }
}
</style>
