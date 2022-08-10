<template>
  <add-btn :init-data="value">
    <template v-slot="{ closeDialog, data }">
      <cu-form :value="data" :action-method="addUrl" :form-rules="formRules" v-on="$listeners" @closeDialog="closeDialog">
        <template v-slot="{ errorMessage }">
          <row-span-slot>
            <template v-slot="{ span }">
              <!-- 新增的的字段配置 -->
              <form-item-col
                :value="data"
                :error="errorMessage('wxId')"
                :span="span"
                prop="wxId"
                :namespace="conf.namespace"
              >
                <wx-server-conf-input-refer
                  :value="data"
                  value-refer-id="wxId"
                  value-refer-name="wxIdName"
                />
              </form-item-col>
              <form-item-col
                :value="data"
                :error="errorMessage('menuName')"
                :span="span"
                prop="menuName"
                :namespace="conf.namespace"
              />
              <form-item-col-select
                :list="conf.menuContentTypes"
                :value="data"
                :error="errorMessage('menuContentType')"
                :span="span"
                prop="menuContentType"
                :namespace="conf.namespace"
              />
              <form-item-col
                :value="data"
                :error="errorMessage('menuContent')"
                :span="span"
                prop="menuContent"
                :namespace="conf.namespace"
              />
              <form-item-col
                :value="data"
                :error="errorMessage('parentId')"
                :span="span"
                prop="parentId"
                :namespace="conf.namespace"
              >
                <wx-menu-conf-input-refer
                  :value="data"
                  value-refer-id="parentId"
                  value-refer-name="parentIdName"
                />
              </form-item-col>
              <form-item-col
                :value="data"
                :error="errorMessage('sort')"
                :span="span"
                prop="sort"
                :namespace="conf.namespace"
              />
            </template>
          </row-span-slot>
        </template>
      </cu-form>
    </template>
  </add-btn>
</template>

<script>
    import * as conf from './api'
    import AddBtn from '@/components/CURD/Btns/AddBtn'
    import CuForm from '@/components/CURD/Form/cuFrom'
    import RowSpanSlot from '@/components/CURD/Slot/RowSpanSlot'
    import FormItemCol from '@/components/CURD/Form/formItemCol'
    import FormItemColDict from '@/components/CURD/Form/formItemColDict'
    import { baseApiPostMethod } from '@/components/CURD/baseApi'
    import FormItemColEnableState from '@/components/CURD/Form/formItemColEnableState'
    import WxServerConfInputRefer from '@/views/msg/wxServerConf/inputRefer'
    import WxMenuConfInputRefer from '@/views/msg/wxMenuConf/inputRefer'
    import FormItemColSelect from '../../../components/CURD/Form/formItemColSelect'
    export default {
        name: 'WxMenuConfAdd',
        components: {
            FormItemColSelect,
        WxServerConfInputRefer,
        WxMenuConfInputRefer,
        FormItemColDict, FormItemCol, RowSpanSlot, CuForm, AddBtn, FormItemColEnableState },
        props: {
            value: {
                type: Object,
                default: function() {
                    return { enableState: 1 }
                }
            },
            actionUrl: String
        },
        data() {
            return {
                conf: conf,
                formRules: null
            }
        },
        computed: {
            addUrl() {
              return (data) => {
                  return baseApiPostMethod(this.actionUrl, data)
              }
            }
        },
        created() {
          this.formRules = conf.formRules(this)
        }
    }
</script>

<style scoped>

</style>
