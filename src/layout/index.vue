<template>
  <div
    :class="classObj"
    class="app-wrapper"
  >
    <div
      v-if="device==='mobile'&&sidebar.opened"
      class="drawer-bg"
      @click="handleClickOutside"
    />
    <sidebar class="sidebar-container" />
    <div
      :class="{hasTagsView:needTagsView}"
      class="main-container"
    >
      <div :class="{'fixed-header':fixedHeader}">
        <navbar />
        <tags-view v-if="needTagsView" />
      </div>
      <app-main />
      <right-panel v-if="showSettings">
        <settings />
      </right-panel>
    </div>
  </div>
</template>

<script>
import RightPanel from '@/components/RightPanel'
import { AppMain, Navbar, Settings, Sidebar, TagsView } from './components'
import ResizeMixin from './mixin/ResizeHandler'
import { mapState } from 'vuex'
import Socket from '@/connect/socket'
import Notifacation from '@/utils/notifacation'
import { registerIp } from '@/api/socket'

export default {
  name: 'Layout',
  components: {
    AppMain,
    Navbar,
    RightPanel,
    Settings,
    Sidebar,
    TagsView
  },
  mixins: [ResizeMixin],
  data() {
    return {
      client: null,
      // 直接分发出去的事件类型，分发的事件不会弹框
      directDispatcherEvents: [
        'CARD_READER'
      ]
    }
  },
  computed: {
    ...mapState({
      sidebar: state => state.app.sidebar,
      device: state => state.app.device,
      showSettings: state => state.settings.showSettings,
      needTagsView: state => state.settings.tagsView,
      fixedHeader: state => state.settings.fixedHeader,
      token: state => state.user.token
    }),
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  watch: {
    token() {
      this.doInit()
    }
  },
  created() {
    this.doInit()
  },
  beforeDestroy() {
    this.disposeClient()
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    },
    doInit() {
      // token变化，先关闭原来的client
      this.disposeClient()
      const _this = this
      const sw = process.env.VUE_APP_SOCKET_SWITCH
      if (sw === 'true' || sw === true) {
        if (this.$store.getters.token && this.$store.getters.token !== null && this.$store.getters.token !== '') {
          // 开启连接
          Socket.connect('/api/gs-websocket', this.$store.getters.token, false, function(client) {
            _this.client = client
            registerIp()
            // 订阅全局通知
            _this.client.subscribe('/topic/message/global', function(body) {
              if (body) {
                Notifacation.show(_this, body)
              }
            })
            // 订阅针对用户通知
            _this.client.subscribe('/user/topic/message/me', function(body) {
              if (body) {
                if (_this.$pubSub.$events[body.type]) {
                  _this.$pubSub.publish(body.type, body)
                } else {
                  Notifacation.show(_this, body)
                }
              }
            })
          })
        }
      }
    },
    disposeClient() {
      if (this.client) {
        this.client.disConnection(false)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/mixin.scss';
@import '~@/styles/variables.scss';

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;

  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}

.mobile .fixed-header {
  width: 100%;
}
</style>
