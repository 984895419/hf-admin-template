<template>
  <hf-timeline
    :query-url="conf.urlMethods.pageUrl"
    timestamp-props="metTime"
    :sort-info="[
      { fieldName: 'createTime', value: 1 }
    ]"
  >
    <template v-slot="{data}">
      <div>
        <div>{{ data.metTitle }}</div>
        <div v-html="data.metContent" />
      </div>
    </template>
  </hf-timeline>
</template>
<script>
  import * as conf from './api'
  import HfTimeline from '@/components/CURD/Others/HfTimeline.vue'
  export default {
    components: { HfTimeline },
    data() {
      return {
        conf: conf
      }
    }
  }
</script>
