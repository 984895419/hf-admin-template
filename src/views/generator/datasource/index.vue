<template>
  <div class="app-container">
    <c-r-u-d
      base-url="/api/datasource"
      :url-methods="{
        pageUrl: '/api/datasource/nameQuery'
      }"
      :table-config="tableConfig"
    />
  </div>
</template>

<script>
import CRUD from '@/components/CURD'

export default {
  name: 'IndexVue',
  components: { CRUD },
  data() {
    return {
      tableConfig: {
        tableItemOption: {
          showItemOperate: true,
          showSelected: true,
          showIndex: true
        },
        fields: [
          {
            label: '主键ID',
            value: 'datasourceId',
            type: 'text',
            primaryKey: true,
            searchConfig: {
              searchable: false
            },
            selectChecked: false
          },
          {
            label: '数据库类型',
            value: 'dbType',
            type: 'select',
            columnName: 'db_type',
            operate: 'EQ',
            createConfig: {
              addable: true,
              addShowable: true
            },
            updateConfig: {
              updateShowable: true,
              updatable: true
            },
            children: [
              {
                label: 'mysql',
                value: 'Mysql'
              },
              {
                label: 'oracle',
                value: 'Oracle'
              }
            ]
          },
          {
            label: 'jdbcUrl',
            columnName: 'url',
            value: 'url',
            type: 'text',
            operate: 'ALL_LIKE',
            createConfig: {
              addable: true,
              addShowable: true
            },
            updateConfig: {
              updateShowable: true,
              updatable: true
            }
          },
          {
            label: '用户名',
            value: 'username',
            columnName: 'username',
            type: 'text',
            createConfig: {
              addable: true,
              addShowable: true
            },
            updateConfig: {
              updateShowable: true,
              updatable: true
            }
          },
          {
            label: '密码',
            value: 'password',
            columnName: 'password',
            type: 'text',
            createConfig: {
              addable: true,
              addShowable: true
            },
            updateConfig: {
              updateShowable: true,
              updatable: true
            }
          },
          {
            label: '状态',
            value: 'enableState',
            columnName: 'enable_state',
            type: 'switch',

            createConfig: {
              addable: true,
              addShowable: true
            },
            updateConfig: {
              updateShowable: true,
              updatable: true
            },
            tableColumnOption: {
              width: '100px'
            },
            props: {
              activeText: '启用',
              activeValue: true,
              inactiveText: '禁用',
              inactiveValue: false
            }
          }
        ]
      }
    }
  }
}
</script>

<style scoped>

</style>
