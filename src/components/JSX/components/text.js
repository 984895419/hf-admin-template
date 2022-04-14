/**
 * 字段类型定义:
 * {
 *             columnId: 1,
 *             fieldLabel: '审核人',
 *             fieldType: 'text',
 *             span: null,
 *             val: null,
 *             operate: 'EQ' // 操作符
 *           }
 * 1、根据字段类型、操作符转化为对于的类型
 * 2、
 */
// 定义标签类型
const tag = 'el-input'
// 定义文本类型
const type = 'text'
// 定义input输入所占的span的大小
const tag_col_span = 4
// 设置默认的字段类型
const defaultTextJson = {
  tag: tag,
  type: type,
  col: tag_col_span,
  placeholder: '请输入'
}

export default {
  /**
   * 可以支持的操作
   */
  supportOperates(fieldInfo) {
    return []
  }
  /**
   * 根据字段信息及操作符，将字段转化元素标签, 如el-input类型的标签
   */
}

export function toElementType(fieldInfo, h) {
  const self = this
  const textElement = Object.assign({}, fieldInfo, defaultTextJson)
  const node =
    h('el-input', {
      // props: Object.assign(textElement, self.$props),
      // attrs: Object.assign(textElement, self.$props),
      on: Object.assign({
        input: function(value) {
          debugger
          self.$set(fieldInfo, 'val', value)
        }
      })
    })
  return (
    <el-form-item label='活动名称'>
      <el-input onInput={(value) => {
        debugger
        this.$set(self.$props.queryField, 'val', value)
      }}/>
    </el-form-item>
  )
  // (
  //   // <el-col span={textElement.col}>
  //   //   <el-form-item label={textElement.fieldLabel} prop={textElement.columnId + ''}>
  //   //     {node}
  //   //   </el-form-item>
  //   // </el-col>
  //   { node }
  // )
}
