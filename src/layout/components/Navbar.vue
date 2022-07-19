<template>
  <div class="navbar">
    <hamburger
      id="hamburger-container"
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />

    <breadcrumb
      id="breadcrumb-container"
      class="breadcrumb-container"
    />
    <div class="right-menu">
      <template v-if="device!=='mobile'">
        <div class="right-menu-item">
          <div style="font-size: 1vh; height: 30%">{{ $store.getters.username }}</div>
          <div v-if="$store.getters.tenantOpen !== false && $store.getters.tenantOpen !== 'false'" style="font-size: 1vh">
            <change-company
              ref="changePannel"
              @submitSuccess="submitSuccess"
              @cancel="cancel"
            >
              {{tenantName}}
            </change-company>
          </div>
        </div>

        <search
          id="header-search"
          class="right-menu-item"
        />

        <error-log class="errLog-container right-menu-item hover-effect" />

        <screenfull
          id="screenfull"
          class="right-menu-item hover-effect"
        />

        <el-tooltip
          :content="$t('common.navbar.size')"
          effect="dark"
          placement="bottom"
        >
          <size-select
            id="size-select"
            class="right-menu-item hover-effect"
          />
        </el-tooltip>

        <lang-select class="right-menu-item hover-effect" />

      </template>

      <el-dropdown
        class="avatar-container right-menu-item hover-effect"
        trigger="click"
      >
        <div class="avatar-wrapper">
          <el-avatar
            shape="square"
            :size="20"
            style="background-color: black"
          >
            <svg-icon icon-class="user" />
          </el-avatar>
          <!-- <i class="el-icon-caret-bottom" />-->
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/oa/mmdp">
            <el-dropdown-item>
              {{ $t('common.navbar.profile') }}
            </el-dropdown-item>
          </router-link>
<!--          <router-link to="/">-->
<!--            <el-dropdown-item>-->
<!--              {{ $t('common.navbar.dashboard') }}-->
<!--            </el-dropdown-item>-->
<!--          </router-link>-->
          <el-dropdown-item>
            <user-setting/>
          </el-dropdown-item>
<!--          <el-dropdown-item-->
<!--            divided-->
<!--            @click.native="change"-->
<!--          >-->
<!--            <span style="display:block;">{{ $t('common.navbar.changeTenant') }}</span>-->
<!--          </el-dropdown-item>-->
          <el-dropdown-item
            divided
            @click.native="logout"
          >
            <span style="display:block;">{{ $t('common.navbar.logOut') }}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

<!--    <el-dialog-->
<!--      v-el-drag-dialog-->
<!--      :visible.sync="dialogFormVisible"-->
<!--      :title="$t('common.navbar.changeTenant')"-->
<!--      width="67vw"-->
<!--      :close-on-click-modal="false"-->
<!--    >-->
<!--      -->
<!--    </el-dialog>-->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import ErrorLog from '@/components/ErrorLog'
import Screenfull from '@/components/Screenfull'
import SizeSelect from '@/components/SizeSelect'
import LangSelect from '@/components/LangSelect'
import Search from '@/components/HeaderSearch'
import elDragDialog from '@/directive/el-drag-dialog'
import ChangeCompany from './ChangeCompany'
import md5 from 'js-md5'
import UserSetting from '../../views/basic/preferenceSetting/UserSetting'

export default {
  directives: { elDragDialog },
  components: {
      UserSetting,
    Breadcrumb,
    Hamburger,
    ErrorLog,
    Screenfull,
    SizeSelect,
    LangSelect,
    Search,
    ChangeCompany
  },
  data() {
    return {
      dialogFormVisible: false,
      dataObj: {},
      drawer: false,
      // docs: [],
      activeName: '0'
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'device',
      'tenantName'
    ]),
    storeCurDeptName() {
      return this.dataObj.curDeptName || this.$store.getters.curDeptName
    },
    md5String() {
      return function(str) {
        if (str) {
          return md5(str).substr(0, 10)
        }
        return ''
      }
    }
  },
  methods: {
    openUrl(url) {
      window.open(url, '_blank')
    },
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login`)
    },
    change() {
      this.dialogFormVisible = true
    },
    /**
     * 新增/修改提交成功时候的数据
     */
    submitSuccess(obj) {
      this.dialogFormVisible = false
      this.dataObj = obj
    },
    /**
     * 取消时候的调用关闭
     */
    cancel() {
      this.dialogFormVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
