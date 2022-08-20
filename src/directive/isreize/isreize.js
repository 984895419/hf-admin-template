export default {
  isReize(el, binding, vnode) {
    console.log(el, '绑定', binding)
    let width = '',
      height = ''

    function isReize() {
      const style = document.defaultView.getComputedStyle(el);
      if (width !== style.width || height !== style.height) {
        // 关键(这传入的是函数,所以执行此函数)
        binding.value({
          width: style.width,
          height: style.height
        })
      }
      width = style.width
      height = style.height
    }

    el.__vueSetInterval__ = setInterval(isReize, 300)
  },
  unbind(el) {
    console.log(el, '解绑')
    clearInterval(el.__vueSetInterval__)
  }
}
