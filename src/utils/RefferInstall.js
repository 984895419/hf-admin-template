/**
 * 参照引用工具类
 */
const install = function(Vue) {
  const requireAll = require.context('@/views/', true, /Refer\.vue/)
  const modulList = requireAll.keys().map(item => requireAll(item))
  modulList.forEach(({
                       default: modulObj
                     }) => {
    Vue.component(modulObj.name, modulObj)
  })

  /**
   * 找到curd下面的所有组件
   */
   const curdAll = require.context('@/components/CURD/', true, /\.vue/)
   const curdList = curdAll.keys().map(item => curdAll(item))
   curdList.forEach(({
                        default: modulObj
                      }) => {
     try {
       if (modulObj.name) {
         Vue.component(modulObj.name, modulObj)
       } else {
         Vue.component(modulObj.__file.substring(modulObj.__file.lastIndexOf('/') + 1,
          modulObj.__file.indexOf('.vue')), modulObj)
       }
     } catch (err) {
       console.log(err)
     }
   })
}
export default install
