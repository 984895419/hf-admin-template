<template>
    <div>
      <el-table
        :data="templateFields"
        style="width: 100%">
        <el-table-column
          prop="field"
          label="模板字段">
        </el-table-column>
        <el-table-column
          prop="from"
          label="数据源字段">
          <template slot-scope="scopeRow">
            <el-cascader
              v-model="scopeRow.row.from"
              clearable
              :show-all-levels="true"
              :props="{ checkStrictly: true, expandTrigger: 'hover'  }"
              :options="sourceFields"></el-cascader>
          </template>
        </el-table-column>

        <el-table-column
          prop="defaultVal"
          label="默认值">
          <template slot-scope="scopeRow">
            <el-input v-model="scopeRow.row.defaultVal"></el-input>
          </template>
        </el-table-column>

      </el-table>
      <div style="margin-top: 5px">
        <el-button type="primary" @click="doSave">{{$t('common.save')}}</el-button>
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
        data() {
          return {
              templateFields: []
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
                debugger
                while ((temp = regex.exec(this.templateContent)) !== null) {
                    fields.push({
                        field: temp[1],
                        from: valueMap[temp[1]] && valueMap[temp[1]].from,
                        defaultVal: valueMap[temp[1]] && valueMap[temp[1]].defaultVal
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
                    obj[this.templateFields[ind].field] = {
                        from: this.templateFields[ind].from,
                        defaultVal: this.templateFields[ind].defaultVal
                    }
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
