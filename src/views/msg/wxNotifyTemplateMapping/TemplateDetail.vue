<template>
    <div>
      <el-row :gutter="10">
        <el-col :span="6">
          <div>
            示例数据：<json-views copyable :expand-depth="0" :data="JSON.parse(templateData)"/>
          </div>
          <div style="margin-top: 10px">
<!--            <el-button type="primary">预览</el-button>-->
            <el-button type="primary" @click="doSave">保存</el-button>
          </div>
        </el-col>
        <el-col :span="18">
          <div>
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
    </div>
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
