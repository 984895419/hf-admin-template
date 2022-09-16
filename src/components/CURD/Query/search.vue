<template>
  <div>
    <el-form ref="form" :size="size" :model="value" :label-position="labelPosition" v-bind="$attrs"
      @submit.native.prevent>
      <row-span-slot>
        <template v-slot="{ span }">
          <div>
            <!-- 普通搜索-->
            <slot :span="span" />
            <el-col :span="span" style="width:auto">
              <el-form-item>
                <slot name="btns-before" />
                <slot name="btns" />
                <el-button type="primary" :size="size" native-type="submit" icon="el-icon-search" @click="doSearch">{{
                $t('common.search')
                }}</el-button>
                <el-button icon="el-icon-circle-close" :size="size" @click="doReset">{{ $t('common.reset') }}
                </el-button>
                <!-- 高级搜索-->
                <common-dialog-btn v-if="$scopedSlots['advanced']" ref="advanced"
                  style="display:inline-block;margin-left:10px" :size="size" :label="'高级搜索'"
                  :icon="'el-icon-platform-eleme'">
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
                                <el-button type="primary" :size="size" native-type="submit" icon="el-icon-search"
                                  @click="doSearch(closeDialog)">{{
                                  $t('common.search')
                                  }}</el-button>
                                <el-button icon="el-icon-circle-close" :size="size" @click="doReset">{{
                                $t('common.reset')
                                }}</el-button>
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

          </div>
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
      initValue: deepClone(this.value),
      labelPosition: "right"
    }
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
      if (cb && typeof cb === 'function') {
        cb()
      }
    },
    /**
     * 重置查询条件
     */
    doReset(cb) {
      this.$emit('input', deepClone(this.initValue))
      this.$emit('search')
      if (cb && typeof cb === 'function') {
        cb()
      }
    }
  }
}
</script>

<style scoped lang="less">
.advanced-title {
  border-bottom: 1px solid rgb(25, 137, 250);
  padding: 0 0 10px 0;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 10px;
}

/deep/ .el-icon-platform-eleme {
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAATFJREFUOE+lkz1LnEEURs9prcVGQRsVJIVFrGxSiBIUtNFSTeFPsNWFdOnTiBEso/9gbULEQDCgjbYi2KWx2/KR93VX3l1d14+BKebOnXPneeaOvHP4zvP0BCRZAkaBW+BarVeLloAktbagluskZ0AD+Av0A9PAsbrWym8BtpuBcq3WkuwAJ+p+FZ5kD/ij7pa5T3mQZBL4ps527icZAerqWAlIsgwcVBJXgMFiqptdCpwCG+p5S8KnB036K8ln4Kv6sQsgQJ/aeARoelBA/gGr6mWHB4XBw+qXloQJ4Hsl6b+6kmQGOAIWgd/AAFDcdEsdanuFbs2UZBz4ARSm3hTuA3PAulrA71+hsw8qwAv1sEPCAvAT+KBevRpQKTilzvds5Wfk1YqGezPgRSa+5KfeAa/IdBGiUrIwAAAAAElFTkSuQmCC) no-repeat center center;

  &:before {
    content: "11";
    visibility: hidden;
  }
}
</style>
