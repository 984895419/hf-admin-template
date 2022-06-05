<template>
  <iframe v-if="isLoginPage === 1" src="/api/oauth/qywx" frameborder="0" />
</template>
<script>
import { baseApiGetMethod } from '@/components/CURD/baseApi'
import { Loading } from 'element-ui'
import { getData, getMessage, isSuccessResult, isTheRetCode } from '@/utils/ajaxResultUtil'
export default {
    name: 'QywxScanLogin',
    props: {
        isLoginPage: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            timer: null,
            /**
             * 定时器周期
             */
            timeSplit: 1000,
            loadingInstance: null,
            checking: false
        }
    },
    watch: {
        isLoginPage() {
           if (this.isLoginPage === 1) {
                if (this.timer) {
                    window.clearInterval(this.timer)
                }
                this.timer = setInterval(() => {
                    this.checkLogin()
                }, this.timeSplit)
           } else {
                 if (this.timer) {
                    window.clearInterval(this.timer)
                }
           }
        }
    },
    created() {
        /**
         * 只有携带了微信扫码成功后的标志才启动检测
         */
        const scanResult = this.$util.getQueryVariable('qywxScanSuccess')
        if (scanResult === true || scanResult === 'true') {
            this.loadingInstance = Loading.service({
                text: '正在检测登录.....'
            })
            this.timer = setInterval(() => {
                this.checkLogin()
            }, this.timeSplit)
        } else {
            if (scanResult !== undefined) {
                this.$message.error('扫码登录失败')
            }
        }
    },
    methods: {
        /**
         * 检查是否已经扫码登录
         */
        checkLogin() {
            if (this.checking === false) {
                this.checking === true
                baseApiGetMethod('/api/oauth/checkLogin').then(
                    (resp) => {
                        if (isSuccessResult(resp)) {
                            clearInterval(this.timer)
                            this.$store.dispatch('user/setToken', getData(resp).token)
                            // 本地重定向下，隐藏请求扫码结果参数
                            location.href = window.location.protocol + '//' + window.location.host
                        } else {
                            if (!isTheRetCode('00003')) {
                                this.$message.error(getMessage(resp))
                            }
                        }
                        if (this.loadingInstance) {
                            this.loadingInstance.close()
                        }
                        this.checking === false
                    }
                ).catch(e => {
                    this.checking === false
                })
            }
        }
    }
}

</script>
