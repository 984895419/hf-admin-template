<template>
    <el-form
      ref="form"
      :size="$store.size"
      :rules="formRules"
      v-bind="$attrs"
      >
        <el-form-item>
            <div style="float: right">
                <slot name="add-btn-before" :data="value" :formValidate="formValidate" />
                <el-button type="primary" icon="el-icon-search" @click="doSubmit">保存</el-button>
                <el-button icon="el-icon-circle-close" @click="doCancel">取消</el-button>
                <slot name="add-btn-after" :data="value" :formValidate="formValidate" />
            </div>
        </el-form-item>
    </el-form>
</template>
<script>

export default {
    name: '',
    data() {
        return {
            model: {},
            formRules: []
        }
    }
}
</script>
