import { baseApiGetMethod } from '@/components/CURD/baseApi'
import { getMessage, isSuccessResult, isTheRetCode } from '@/utils/ajaxResultUtil'
// sjn  获取路由
export function getUserRoute() {
 return baseApiGetMethod('/api/hfBaseRightMenu/route').then(
    (resp) => {
      if (isSuccessResult(resp)) {
        return resp.data
        // export var  resp
      } else {
        if (!isTheRetCode('00003')) {
          this.$message.error(getMessage(resp))
        }
      }
    }
  ).catch(e => {
  })
}
