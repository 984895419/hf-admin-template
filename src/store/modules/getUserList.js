import { baseApiGetMethod } from '@/components/CURD/baseApi'
import { getMessage, isSuccessResult, isTheRetCode } from '@/utils/ajaxResultUtil'
export function getUserRoute() {
  baseApiGetMethod('/api/hfBaseRightMenu/route').then(
    (resp) => {
      if (isSuccessResult(resp)) {
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
