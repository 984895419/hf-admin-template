<template>
    <div>
      <iframe :src="srcParamsInside"  style="position: absolute; top: 0; left: 0;width: 100%;height: 100%; "></iframe>
    </div>
</template>

<script>
export default {
  name: 'Index',
  props: {
    src: String
  },
  data() {
    return {
      /**
       * 暂存map
       */
      storeMap: {}
    }
  },
  computed: {
    srcParamsInside() {
      // 进行组合，添加站点
      const url = this.src
      const qIndex = url.indexOf('?')
      if (qIndex > 0) {
        const urls = url.substr(qIndex)
        let urlParams = ''
        const paramsCnts = urls.split('&')
        for (const ind in paramsCnts) {
          const params = urls[ind].split('=')
          if (params[1].startsWith(':')) {
            urlParams += params[0] + '=' + this.storeMap[params[1].substr(1)]
          } else {
            urlParams += params[0] + '=' + params[1]
          }

          if (ind !== paramsCnts.length + '') {
            urlParams += '&'
          }
        }
        return url.substr(0, qIndex) + urlParams
      }
      return url
    }
  },
  created() {
    this.storeMap['username'] = this.$store.getters.username
    this.storeMap['userCode'] = this.$store.getters.userCode
    this.storeMap['userId'] = this.$store.getters.userId
    this.storeMap['companyId'] = this.$store.getters.companyId
    this.storeMap['organizationId'] = this.$store.getters.curCompanyId
    this.storeMap['dept'] = this.$store.getters.dept
    this.storeMap['deptId'] = this.$store.getters.curDeptId
  }
}
</script>

<style scoped>

</style>
