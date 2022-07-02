<template>
  <div
    v-loading.fullscreen.lock="fullscreenLoading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.1)"
  >
    <base-tenant-id-slot :ids="tenantIds">
      <template v-slot="{ data }">
        <el-dropdown
          trigger="click"
          @command="changeTenant"
        >
          <span class="el-dropdown-link">
            <slot /><i v-if="data && data.length > 1" class="el-icon-arrow-down el-icon--right" />
          </span>
          <el-dropdown-menu v-if="data && data.length > 1" slot="dropdown">
            <el-dropdown-item
              v-for="item in data"
              :key="item.id"
              :command="item.id"
              :disabled="item.id === tenantId"
            >
              {{ item.tenantName }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </template>
    </base-tenant-id-slot>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { resetRouter } from '@/router'
import BaseTenantIdSlot from '@/views/basic/baseTenant/baseTenantApiSlot'

export default {
  name: 'MenuAdd',
    components: { BaseTenantIdSlot },
    data() {
    return {
      companyList: [],
      fullscreenLoading: false,
      currentDataObject: {}
    }
  },
    computed: {
        ...mapGetters([
            'tenantIds',
            'tenantId'
        ])
    },
  methods: {
    changeTenant(id) {
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        setTimeout(() => {
          loading.close()
        }, 2000)
        this.$store.dispatch('user/changeTenant', id).then((data) => {
          loading.close()
        })
    }
  }
}
</script>
<style>
  table tr td:hover {
    color: #ff4949;
    cursor: pointer
  }
</style>
