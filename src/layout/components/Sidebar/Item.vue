<script>
export default {
  name: 'MenuItem',
  functional: true,
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  render(h, context) {
    const { icon, title } = context.props
    const vnodes = []

    if (icon) {
      if (icon.indexOf('el-icon') > -1) {
        vnodes.push(<i class={icon} />)
      } else {
        vnodes.push(<svg-icon icon-class={icon} />)
      }
    }

    if (title) {
      vnodes.push(<span slot='title'>{(title)}</span>)
    }
    return vnodes
  }
}
</script>
<style>
  .el-scrollbar .el-tooltip {
    text-align: center;
  }
  .el-scrollbar i {
    color: white;
  }
  .nest-menu i {
    color: white;
  }
</style>
