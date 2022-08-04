<template>
  <form-item-col-select :value="value" v-bind="$attrs" :list="selectList" @change="changHandler"/>
</template>

<script>
import FormItemColSelect from '../../../components/CURD/Form/formItemColSelect'
import {baseApiGetMethod} from '../../../components/CURD/baseApi'
import * as conf from './api'
import CurdMixin from '@/components/CURD/curd.mixin'
import { getData, getMessage, isSuccessResult } from '../../../utils/ajaxResultUtil'

export default {
    name: 'TemplateList',
    components: { FormItemColSelect },
    props: {
        appId: String,
        value: Object
    },
    mixins: [CurdMixin],
    data() {
        return {
            conf: conf,
            valueList: [],
            selectHandler: Function
        }
    },
    watch: {
        appId() {
            if (this.appId) {
               this.loadTemplates()
            }
        }
    },
    created() {
        debugger
      this.loadTemplates()
    },
    computed: {
      selectList() {
          let ary = []
          if (this.valueList && this.valueList.length > 0) {
            ary = this.valueList.map(t => {
                return {
                    label: t.title,
                    value: t.templateId,
                    ...t
                }
            })
          }
          return ary
      }
    },
    methods: {
        loadTemplates() {
            baseApiGetMethod(this.templateUrl(this.conf.urlMethods.templateListUrl, { appId: this.appId })).then(resp => {
                if (isSuccessResult(resp)) {
                    this.valueList = getData(resp)
                } else {
                    this.$message.error(getMessage(resp))
                }
            })
        },
        changHandler(val) {
            if (this.valueList && this.valueList.length > 0) {
                const res = this.valueList.filter(t => t.templateId === val)
                if (res && res.length > 0) {
                    this.$emit('change', this.value, res[0])
                }
            }
        }
    }
}
</script>

<style scoped>

</style>
