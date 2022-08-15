<template>
  <div>
    <el-table
      :data="templateFields"
      style="width: 100%"
    >
      <el-table-column
        prop="field"
        label="模板字段"
      />
      <el-table-column
        prop="from"
        label="数据源字段"
      >
        <template slot-scope="scopeRow">
          <el-cascader
            v-model="scopeRow.row.from"
            clearable
            :show-all-levels="true"
            :props="{ checkStrictly: true, expandTrigger: 'hover' }"
            :options="sourceFields"
          />
        </template>
      </el-table-column>
      <el-table-column
        prop="color"
        label="颜色"
      >
        <template slot-scope="scopeRow">
          <el-input v-model="scopeRow.row.color" placeholder="支持颜色填写，请填写色号，如“#03F4B6”" />
        </template>
      </el-table-column>
      <el-table-column
        prop="defaultVal"
        label="默认值"
      >
        <template slot-scope="scopeRow">
          <el-input v-model="scopeRow.row.defaultVal" placeholder="支持模板字段引用，请使用${字段名}进行引用, 如“${billNo}”" />
        </template>
      </el-table-column>

    </el-table>
    <div style="margin-top: 5px">
      <el-button type="primary" @click="doSave">{{ $t('common.save') }}</el-button>
    </div>
  </div>
</template>

<script>
    export default {
        name: 'DataMapping',
        props: {
            templateContent: {
                type: String,
                required: true
            },
            exampleData: {
                type: String,
                required: true
            },
            value: {
                type: String
            },
            row: {
                type: Object
            }
        },
        data() {
          return {
              templateFields: []
          }
        },
        computed: {
            valueMap() {
              if (this.value) {
                  try {
                      const obj = JSON.parse(this.value)
                      return obj
                  } catch (e) {
                      console.log(e)
                  }
              }
              return {}
            },
            sourceFields() {
                debugger
                let exampleMap = {}
                try {
                    exampleMap = JSON.parse(this.exampleData)
                } catch (e) {
                    console.log(e)
                }
                // 循环变成对象
                return this.iteratorExample(exampleMap)
            }
        },
        watch: {
          templateContent() {
              this.templateFields = this.createTemplateField()
          }
        },
        created() {
            this.templateFields = this.createTemplateField()
        },
        methods: {
            createTemplateField() {
                const valueMap = this.valueMap
                const regex = /\{\{([0-9|a-z|A-Z]+)\.DATA\}\}/g
                const fields = []
                let temp = null
                while ((temp = regex.exec(this.templateContent)) !== null) {
                    fields.push({
                        ...valueMap[temp[1]] && valueMap[temp[1]],
                        field: temp[1]
                    })
                }
                return fields
            },
            iteratorExample(map) {
              const ary = []
              for (const key in map) {
                if (typeof map[key] === 'object') {
                    ary.push({
                        label: key,
                        value: key,
                        children: this.iteratorExample(map[key])
                    })
                } else {
                    ary.push({
                        label: key,
                        value: key
                    })
                }
              }
              return ary
            },
            doSave() {
                const obj = {}
                for (const ind in this.templateFields) {
                    obj[this.templateFields[ind].field] = this.templateFields[ind]
                }
                this.row.mapping = JSON.stringify(obj)
                this.$emit('save', this.row, () => {
                    this.$emit('success')
                    this.$emit('closeDialog')
                })
            }
        }
    }
</script>

<style scoped>

</style>
