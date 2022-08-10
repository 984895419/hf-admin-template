<template>
    <el-card>
      <template v-slot:header>
        <el-row style="color: red;">
          <el-col :span="22">
            <span style="margin-right: 10px">
               *1、请使用${字段名}进行引用, 使用${this}可以获取到示例数据的JSON串
            </span>
              <span>
               *2、复杂明细数据(包含多条的明细)，建议使用纯html类型，可以使用“html+vue+手机端UI框架”进行编写
            </span>
          </el-col>
          <el-col :span="2">
            <el-button type="primary" style="float: right" @click="doSave">保存</el-button>
          </el-col>
        </el-row>
      </template>
      <el-row :gutter="10">
        <el-col :span="6">
          <div>
            示例数据：<json-views copyable :expand-depth="0" :data="JSON.parse(templateData)"/>
            <div>
            </div>
          </div>
        </el-col>
        <el-col :span="18">
          <div style="margin-bottom: 5px">
            类型：
            <el-radio
              v-model="value.templateDetailType"
              v-for="item in conf.templateDetailTypes"
              :key="item.value"
              :label="item.value"
              border>{{item.label}}
            </el-radio>
          </div>
          <div>
            <tinymce
              v-if="value.templateDetailType !== 'html'"
              :id="value.notifyId + '-' +  (Math.random() * 1000).toFixed(0)"
              v-model="value[prop]"
            />
            <el-input
              v-else
              type="textarea"
              :rows="30"
              placeholder="请把h5内容黏贴进来"
              v-model="value[prop]">
            </el-input>
          </div>
        </el-col>
      </el-row>
    </el-card>
</template>

<script>
    import * as conf from './api'
    import Tinymce from '../../../components/Tinymce/index'
    import JsonViews from 'vue-json-views'
    export default {
        name: 'TemplateDetail',
        components: { Tinymce, JsonViews },
        props: {
            templateData: {
                type: String
            },
            value: {
                type: Object
            },
            prop: {
                type: String
            }
        },
        data() {
          return {
              conf: conf
          }
        },
        methods: {
            doSave() {
                this.$emit('save', this.value, () => {
                    this.$emit('success')
                    this.$emit('closeDialog')
                })
            }
        }
    }
</script>

<style scoped>

</style>
