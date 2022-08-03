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
          <tinymce
            :id="value.notifyId + '-' +  (Math.random() * 1000).toFixed(0)"
            v-model="value[prop]"
          />
        </el-col>
      </el-row>
    </div>
</template>

<script>
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
