<template>
    <preference-setting-api-slot
      v-model="stringData"
      @loadAfter="loadAfter"
      :preference-type="preferenceType"
      :preference-alias="preferenceAlias">
      <template v-slot="{ preferenceData, doSave }">
        <slot
          :preferenceData="preferenceDataComputed(preferenceData)"
          :doSave="saveHandler(doSave)"></slot>
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
        data() {
            return {
                preferenceType: 'TABLE_COLUMN_SHOW',
                stringData: null
            }
        },
        methods: {
            saveHandler(doSave) {
              return (data, cb) => {
                  doSave(JSON.stringify(data), cb)
                }
            },
            loadAfter() {
                if (this.stringData) {
                    this.$emit('input', JSON.parse(this.stringData).filter(s => s.selectChecked))
                } else {
                    this.$emit('input', this.initData)
                }
            }
        }
    }
</script>

<style scoped>

</style>
