import Vue from 'vue'
/**
 * input, radio, checkbox, select, Cascader, timePicker, datePicker, dateTimePicker, switch
 */

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

Vue.component('QueryField', {
  props: {
    queryField: {
      type: Object
    }
  },
  render(createElement, hack) {
    const ele = 'el-button'
    const attributes = {
      type: 'primary'
    }
    const text = '提交'
    const self = this
    // 以下为JSX模板语法
    // const res = []
    // for (let i = 0; i < 5; i++) {
    //   res.push((
    //     <div>{i}</div>
    //   ))
    // }
    // debugger
    // return createElement('div', res)
    // 以下为使用createElement
    // return createElement(ele, {
    //   props: attributes,
    //   on: self.$listeners
    // }, this.$slots.default || text)
    // 使用其他方式
    return (
      <el-form-item label='活动名称'>
        <el-input onInput={(value) => {
          this.$emit('input', value)
        }}/>
      </el-form-item>
    )
    // return toElementType.call(self, self.$props.queryField, createElement)
  }
})

Vue.component('QueryFields', {
  props: {
    queryFields: {
      type: Array
    }
  },
  render(createElement, hack) {
    const self = this
    // 以下为JSX模板语法
    // const res = []
    // for (let i = 0; i < 5; i++) {
    //   res.push((
    //     <div>{i}</div>
    //   ))
    // }
    // debugger
    // return createElement('div', res)
    // 以下为使用createElement
    // return createElement(ele, {
    //   props: attributes,
    //   on: self.$listeners
    // }, this.$slots.default || text)
    // 使用其他方式
    if (self.$props.queryFields && self.$props.queryFields.length > 0) {
      const nodes = []
      for (const ind in self.$props.queryFields) {
        nodes.push(createElement('QueryField', {
          props: {
            queryField: self.$props.queryFields[ind]
          }
        }))
      }
      return (<div>
        {nodes}
      </div>)
    } else {
      return (<div></div>)
    }
  }
})
