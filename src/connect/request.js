import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/connect/auth'
import { getMessage, isSuccessResult, isTheRetCode } from '@/utils/ajaxResultUtil'

import { isEmpty } from 'element-ui/src/utils/util' // internationalization

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 180000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['X-Token'] = getToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    if (response.headers) { // 文件名
      let filename = response.headers['content-disposition']
      if (!isEmpty(filename)) {
        try {
          filename = filename.split(';')[1].split('filename=')[1]
          res.filename = filename
        } catch (e) {
          console.log(3)
        }
      }
    }
    // if the custom code is not 00001, it is judged as an error.
    if (!isSuccessResult(res)) {
      /* Message({
        message: res.resMsg || 'Error',
        type: 'error',
        duration: 5 * 1000
      })*/
      // EXPIRED("00007",  "登录已过期");
      if (isTheRetCode(res, '00007')) {
        // to re-login
        MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
          confirmButtonText: 'Re-Login',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      } else {
        Message({
          type: 'error',
          message: getMessage(res)
        })
      }
      return res
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
