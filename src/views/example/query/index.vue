<template>
  <el-row :gutter="10" style="padding: 5px">
    <el-col :span="16">
      <inquiry-mode :search-fields="fields.filter(s => s.searchable !== false)" />
    </el-col>
    <el-col :span="8" style="border-left: 1px solid gray">
      <el-tabs v-model="activeName">
        <el-tab-pane label="表单配置" name="1">
          <el-tabs :tab-position="'left'">
            <el-tab-pane
              v-for="item in fields"
              :key="item.value"
              :label="item.label"
            >
              <config-form
                :label-width="'70px'"
                :value="item"
                :add-fields="formFields"
                :show-btn-area="false"
              />
            </el-tab-pane>
          </el-tabs>
        </el-tab-pane>
        <el-tab-pane label="json配置" name="0">
          <json-editor v-if="activeName === '0'" v-model="fields" />
        </el-tab-pane>
      </el-tabs>
      <div />
    </el-col>
  </el-row>
</template>

<script>

import JsonEditor from '@/components/CURD/JsonEditor'
import InquiryMode from '@/components/CURD/Query/InquiryMode'
import ConfigForm from '@/components/CURD/Config/ConfigForm'

export default {
  name: 'QueryIndex',
  components: { ConfigForm, InquiryMode, JsonEditor },
  data() {
    return {
      activeName: '1',
      obj: {},
      /**
       * 编辑时候的表单
       */
      formFields: [
        {
          label: '显示名称',
          value: 'label',
          type: 'text',
          addable: true,
          addShowable: true,
          span: 24
        },
        {
          label: '字段名称',
          value: 'value',
          type: 'text',
          addable: true,
          addShowable: true,
          span: 24
        },
        {
          label: '支持查询',
          value: 'searchable',
          type: 'switch',
          addable: true,
          span: 24,
          addShowable: true,
          _props: {
            activeText: '是',
            activeValue: true,
            inactiveText: '否',
            inactiveValue: false
          }
        },
        {
          label: '关键字搜索',
          value: 'keyword',
          type: 'switch',
          span: 24,
          addable: true,
          addShowable: true,
          _props: {
            activeText: '是',
            activeValue: true,
            inactiveText: '否',
            inactiveValue: false
          }
        },
        {
          label: '字段类型',
          value: 'type',
          type: 'select',
          addable: true,
          addShowable: true,
          span: 24,
          children: [
            {
              label: '文本',
              value: 'text'
            },
            {
              label: '下拉框',
              value: 'select'
            },
            {
              label: '切换框',
              value: 'switch'
            }
          ]
        },
        {
          label: '选项',
          value: 'children',
          type: 'table',
          addable: true,
          addShowable: true,
          span: 24,
          condition: "value.type === 'select'",
          tableHeader: [
            {
              label: '选项key',
              value: 'label'
            }, {
              label: '选项值',
              value: 'value'
            }
          ]
        },
        {
          label: '切换框配置',
          value: '_props',
          type: 'switchSet',
          addable: true,
          addShowable: true,
          span: 24,
          condition: "value.type === 'switch'"
        },
        {
          label: '提示',
          value: 'placeholder',
          addable: true,
          addShowable: true,
          span: 24,
          type: 'text'
        }
      ],
      /**
       * 查询字段信息
       */
      fields: [
        {
          label: '客户姓名',
          value: 'name',
          type: 'text',
          keyword: true,
          searchable: true
        },
        {
          label: '申请编号',
          value: 'applyNum',
          type: 'text',
          keyword: true,
          searchable: true
        },
        {
          label: '客户手机号',
          value: 'customTel',
          type: 'text',
          searchable: true
        },
        {
          label: '状态',
          value: 'status',
          type: 'select',
          children: [
            {
              label: '待征信授权审批',
              value: 1
            },
            {
              label: '已提交审批',
              value: 2
            }
          ]
        },
        {
          type: 'picker',
          label: '提交时间',
          updateShowable: true,
          value: 'picker'
        }
      ]
    }
  }
}
</script>

<style>
.jsoneditor-vue {
  height: 100%;
}
</style>
