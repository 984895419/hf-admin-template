<template>
  <el-dropdown
    trigger="click"
    class="international"
    @command="handleSetLanguage"
  >
    <div>
      <svg-icon
        class-name="international-icon"
        icon-class="language"
      />
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item
        v-for="item in supportLanguage"
        :key="item"
        :disabled="language===item"
        :command="item"
      >
        {{$t('common.' + item)}}
      </el-dropdown-item>

    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters([
        'supportLanguage',
        'language'
    ])
  },
  methods: {
    handleSetLanguage(lang) {
      this.$i18n.locale = lang
      this.$store.dispatch('app/setLanguage', lang)
      this.$message({
        message: 'Switch Language Success',
        type: 'success'
      })
    }
  }
}
</script>
