<template>
  <div
    v-loading.fullscreen.lock="fullscreenLoading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.1)"
    class="app-container"
  >
    <el-timeline>
      <el-timeline-item v-for="(item, index) in versions" :key="item.uguid" :timestamp="formatDate(item.createTime)" placement="top">
        <el-card>
          <h4>{{item.title}}</h4>
          <p v-html="item.content"></p>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
import { loadAllArticle } from '@/api/hfBaseArticle'
import { isEmpty } from 'element-ui/src/utils/util'
import { parseTime } from '@/utils'
export default {
  name: 'Index',
  data() {
    return {
      versions: [],
      fullscreenLoading: false
    }
  },
  created() {
    this.toLoadAllArticle()
  },
  methods: {
    /* 日期处理*/
    formatDate(date) {
      if (isEmpty(date)) {
        return ''
      }
      return parseTime(date, '{y}-{m}-{d}')
    },
    toLoadAllArticle() {
      this.fullscreenLoading = true
      loadAllArticle({ articleType: '0', pageSize: 10, needContent: true }).then(resp => {

        this.fullscreenLoading = false
        if (resp.res === '1') {
          this.versions = resp.obj
        } else {
          this.versions = []
        }
      }).catch(e => {
        this.fullscreenLoading = false
      })
    }
  }
}
</script>

<style scoped>

</style>
