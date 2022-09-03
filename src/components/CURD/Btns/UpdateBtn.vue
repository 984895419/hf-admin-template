<template>
  <div v-loading.fullscreen.lock="loading">
    <el-button
      :type="type || btnType"
      :size="size"
      @click="openDialog"
    >
      {{ label }}
    </el-button>
    <el-dialog
      :visible.sync="showDialog"
      width="75%"
      :title="title"
      append-to-body
      v-bind="Object.assign({ 'close-on-click-modal': false}, $attrs)"
      v-on="$listeners"
    >
      <div style="margin-top:20px">
        <slot :data="postData" :closeDialog="closeDialog" :showState="showDialog" />
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { baseApiGetMethod } from '@/components/CURD/baseApi'
import { getData, getMessage, isSuccessResult } from '@/utils/ajaxResultUtil'
import { mapGetters } from 'vuex'
import { deepClone } from '@/utils'

export default {
  name: 'UpdateBtn',
  props: {
    btnType: {
      type: String,
      default: 'primary'
    },
    type: {
      type: String,
      default: 'primary'
    },
    label: {
      type: String,
      require: true,
        default: function() {
            return this.$t('common.edit')
        }
    },
    title: {
        type: String,
        default: function() {
            return this.$t('common.edit')
        }
    },
    /**
     * 附带的查询数据
     */
    queryData: {
      type: Object,
      default: () => {}
    },
    /**
     * 查询的url
     */
    url: {
      type: {
        type: String,
        default: undefined
      }
    },
    /**
     * 初始数据，如果有初始数据，就不会去后端查询
     */
    initData: Object
  },
  data() {
    return {
      loading: false,
      showDialog: false,
      postData: null
    }
  },
  computed: {
    ...mapGetters([
      'size'
    ])
  },
  methods: {
    /**
     * 打开弹窗
     */
    openDialog() {
      // 从指定的
      if (this.initData) {
        this.postData = deepClone(this.initData)
        this.$emit('loadSuccess', this.postData)
        this.showDialog = true
      } else {
        this.loading = true
        baseApiGetMethod(this.url, this.queryData).then(resp => {
          if (isSuccessResult(resp)) {
            this.postData = getData(resp)
            this.$emit('loadSuccess', this.postData)
            this.showDialog = true
          } else {
            this.$message.error(getMessage(resp))
          }
          this.loading = false
        }).catch(e => {
          this.loading = false
        })
      }
    },
    /**
     * 关闭弹窗
     */
    closeDialog() {
      this.showDialog = false
    }
  }
}
</script>

<style scoped>

</style>
