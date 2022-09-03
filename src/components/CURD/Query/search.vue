<template>
  <div>
    <el-form ref="form" :size="size" :model="value" v-bind="$attrs" @submit.native.prevent>
      <row-span-slot>
        <template v-slot="{ span }">
          <div>
            <!-- 普通搜索-->
            <slot :span="span" />
            <el-col :span="span" style="width:auto">
              <el-form-item>
                <slot name="btns-before" />
                <el-button type="primary" :size="size" native-type="submit" icon="el-icon-search" @click="doSearch">{{
                  $t('common.search')
                }}</el-button>
                <el-button icon="el-icon-circle-close" :size="size" @click="doReset">{{ $t('common.reset') }}</el-button>
                <slot name="btns" />

                <!-- 高级搜索-->
                <common-dialog-btn
                  ref="advanced"
                  style="display:inline-block;margin-left:10px"
                  :size="size"
                  :label="'高级搜索'"
                >
                  <template v-slot="{ closeDialog, showState }">
                    <div>
                      <div class="advanced-title">高级搜索</div>
                      <el-form :model="value" v-bind="$attrs">
                        <row-span-slot>
                          <template v-slot="{ span }">
                            <slot :span="span" />
                            <slot name="advanced" :span="span" />
                            <el-col :span="span" style="width:auto">
                              <el-form-item>
                                <slot name="btns-before" />
                                <el-button type="primary" :size="size" native-type="submit" icon="el-icon-search" @click="doSearch(closeDialog)">{{
                                  $t('common.search')
                                }}</el-button>
                                <el-button icon="el-icon-circle-close" :size="size" @click="doReset">{{ $t('common.reset') }}</el-button>
                                <slot name="btns" />
                              </el-form-item>
                            </el-col>
                          </template>
                        </row-span-slot>
                      </el-form>
                    </div>

                  </template>
                </common-dialog-btn>

              </el-form-item>
            </el-col>
          </div></template></row-span-slot></el-form></div>
</template>
      </row-span-slot>
    </el-form>
  </div>
</template>

<script>
import { deepClone } from '@/utils'
import RowSpanSlot from '@/components/CURD/Slot/RowSpanSlot.vue'
import { mapGetters } from 'vuex'
import CommonDialogBtn from '@/components/CURD/Btns/CommonDialogBtn'

export default {
  name: 'SimpleSearch',
  components: { RowSpanSlot, CommonDialogBtn },
  props: {
    value: Object
  },
  data() {
    return {
      initValue: deepClone(this.value)
    }
  },
  mounted() {
    console.log(this.$scopedSlots, '1232')
  },
  computed: {
    ...mapGetters([
      'size',
      'tenantId'
    ])
  },
  watch: {
    tenantId() {
      this.doSearch()
    }
  },
  methods: {
    /**
     * 查询
     */
    doSearch(cb) {
      this.$emit('search')
      if (cb) {
        cb()
      }
    },
    /**
     * 重置查询条件
     */
    doReset() {
      this.$emit('input', deepClone(this.initValue))
      this.$emit('search')
    }
  }
}
</script>

<style scoped>

.advanced-title {
    border-bottom: 1px solid rgb(25, 137, 250);
    padding: 0 0 10px 0;
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 10px;
}
</style>
