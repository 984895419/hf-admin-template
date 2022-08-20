<template>
  <preference-setting-api-slot
    v-model="stringData"
    :preference-type="preferenceType"
    :preference-alias="preferenceAlias"
    @loadAfter="loadAfter"
  >
    <template v-slot="{ preferenceData, doSave }">
      <slot
        :preferenceData="preferenceDataComputed(preferenceData)"
        :doSave="saveHandler(doSave)"
        :headerDragend="headerDragend"
      />
    </template>
  </preference-setting-api-slot>
</template>

<script>
    import PreferenceSettingApiSlot from './PreferenceSettingApiSlot'
    export default {
        name: 'TableColumnPreferenceSettingApiSlot',
        components: { PreferenceSettingApiSlot },
        props: {
            /**
             * 偏好别名
             */
            preferenceAlias: {
                type: String,
                default: undefined
            },
            initData: {
                type: Array
            }
        },
        data() {
            return {
                preferenceType: 'TABLE_COLUMN_SHOW',
                stringData: null,
                widths: {}
            }
        },
        computed: {
            preferenceDataComputed() {
                return (preferenceData) => {
                    if (preferenceData) {
                        const res = JSON.parse(preferenceData)
                        const resValues = res.map(t => t.value)
                        return res.concat(this.initData.filter(t => resValues.indexOf(t.value) < 0))
                    }
                    return this.initData.map(s => {
                        s.selectChecked = true
                        return s
                    })
                }
            }
        },
        methods: {
            saveHandler(doSave) {
              return (data, cb) => {
                  // 只显示有效的字段
                  const effectedFields = this.initData.map(s => s.value)
                  for (const ind in data) {
                      data[ind].width = this.widths[data[ind].value] || data[ind].width
                  }
                  // 保存操作
                  doSave(JSON.stringify(data.filter(t => effectedFields.indexOf(t.value) >= 0)), cb)
                }
            },
            loadAfter() {
                if (this.stringData) {
                    this.$emit('input', JSON.parse(this.stringData).filter(s => s.selectChecked))
                } else {
                    this.$emit('input', this.initData)
                }
            },
            headerDragend(newWidth, oldWidth, column, event) {
                debugger
                this.widths[column.property] = newWidth
            }
        }
    }
</script>

<style scoped>

</style>
