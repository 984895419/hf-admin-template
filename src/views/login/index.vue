<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      autocomplete="on"
      label-position="left"
    >

      <div class="title-container">
        <h3 class="title">
          {{ $t('common.login.title') }}
        </h3>
        <lang-select class="set-language" />
      </div>

      <el-form-item prop="userCode">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="userCode"
          v-model="loginForm.userCode"
          :placeholder="$t('common.login.userCode')"
          name="userCode"
          type="text"
          tabindex="1"
          autocomplete="on"
        />
      </el-form-item>

      <el-tooltip
        v-model="capsTooltip"
        content="Caps lock is On"
        placement="right"
        manual
      >
        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            :placeholder="$t('common.login.password')"
            name="password"
            tabindex="2"
            autocomplete="on"
            @keyup.native="checkCapslock"
            @blur="capsTooltip = false"
            @keyup.enter.native="handleLogin"
          />
          <span
            class="show-pwd"
            @click="showPwd"
          >
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>
      </el-tooltip>

      <el-button
        :loading="loading"
        type="primary"
        style="width:100%;margin-bottom:30px;"
        @click.native.prevent="handleLogin"
      >
        {{ $t('common.login.logIn') }}
      </el-button>

      <!--<div style="position:relative">
        <div class="tips">
          <span>{{ $t('common.login.username') }} : admin</span>
          <span>{{ $t('common.login.password') }} : {{ $t('common.login.any') }}</span>
        </div>
        <div class="tips">
          <span style="margin-right:18px;">
            {{ $t('common.login.username') }} : editor
          </span>
          <span>{{ $t('common.login.password') }} : {{ $t('common.login.any') }}</span>
        </div>

        <el-button class="thirdparty-button" type="primary" @click="showDialog=true">
          {{ $t('common.login.thirdparty') }}
        </el-button>
      </div>-->
    </el-form>

    <el-dialog
      :title="$t('common.login.thirdparty')"
      :visible.sync="showDialog"
    >
      {{ $t('common.login.thirdpartyTips') }}
      <br>
      <br>
      <br>
      <social-sign />
    </el-dialog>
    <el-dialog
      v-el-drag-dialog
      :visible.sync="dialogFormVisible"
      top="5vh"
      width="500px"
      title="????????????"
      :close-on-click-modal="false"
    >
      <Mmdp
        ref="resetPannel"
        @submit-success="submitResetMMdp"
      />
    </el-dialog>
  </div>
</template>

<script>
import LangSelect from '@/components/LangSelect'
import { specificationRegExp } from '@/utils/validate'
import { messageErrorHandle, messageSuccesHandle } from '@/utils/message-handle'
import SocialSign from './components/SocialSignin'
import Mmdp from './Mmdp'
import elDragDialog from '@/directive/el-drag-dialog'
export default {
  name: 'Login',
  components: { LangSelect, SocialSign, Mmdp },
  directives: {
    elDragDialog
  },
  data() {
    return {
      loginForm: {
        userCode: '',
        password: ''

      },
      loginRules: {
        userCode: [
          { required: true, message: this.$t('common.validate.pleaseInput') + this.$t('common.login.userCode'), trigger: 'blur' },
          { pattern: specificationRegExp, message: this.$t('common.validate.pleaseInputLegal'), trigger: 'change' }
        ],
        password: [
          { required: true, message: this.$t('common.validate.pleaseInput') + this.$t('common.login.password'), trigger: 'blur' },
          { pattern: specificationRegExp, message: this.$t('common.validate.pleaseInputLegal'), trigger: 'change' }
        ]
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      showDialog: false,
      dialogFormVisible: false,
      redirect: undefined,
      otherQuery: {}
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  created() {
    // window.addEventListener('storage', this.afterQRScan)
  },
  mounted() {
    if (this.loginForm.userCode === '') {
      this.$refs.userCode.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
    checkCapslock(e) {
      const { key } = e
      this.capsTooltip = key && key.length === 1 && (key >= 'A' && key <= 'Z')
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          const _this = this
          this.$store.dispatch('user/login', this.loginForm)
            .then(response => {
              if (response.res === '1') {
                this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
                this.loading = false
                messageSuccesHandle(_this, _this.$t('common.login.logIn'))
              } else {
                if (response.obj === 'RESET') {
                  _this.dialogFormVisible = true
                  setTimeout(function() {
                    _this.$refs.resetPannel.setFormData(_this.loginForm.userCode)
                  }, 100)
                  this.loading = false
                  return
                }
                this.loading = false
                messageErrorHandle(_this, response, _this.$t('common.login.logIn'))
              }
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    },
    /**
   * ??????????????????
   */
    submitResetMMdp() {
      this.loginForm.userCode = ''
      this.loginForm.password = ''
      this.dialogFormVisible = false
    }
    // afterQRScan() {
    //   if (e.key === 'x-admin-oauth-code') {
    //     const code = getQueryObject(e.newValue)
    //     const codeMap = {
    //       wechat: 'code',
    //       tencent: 'code'
    //     }
    //     const type = codeMap[this.auth_type]
    //     const codeName = code[type]
    //     if (codeName) {
    //       this.$store.dispatch('LoginByThirdparty', codeName).then(() => {
    //         this.$router.push({ path: this.redirect || '/' })
    //       })
    //     } else {
    //       alert('?????????????????????')
    //     }
    //   }
    // }
  }
}
</script>

<style lang="scss">
/* ??????input ??????????????? ??????????????? */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }

    .set-language {
      color: #fff;
      position: absolute;
      top: 3px;
      font-size: 18px;
      right: 0px;
      cursor: pointer;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>
