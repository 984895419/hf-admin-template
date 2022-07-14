# 开发指南

## 快速上手

本节将介绍如何在项目中使用 组件。

## 如何引用

组件引用跟自身写模块    引用组件的思路是一样的 , 在当前模块引用组件:

1. *template标签下引入组件名  *
2. *script标签下引用组件路径 ,*
3. export default里面抛出组件,
4. 根据文档所包含的函数,属性等自定义添加

#### 实例列举:

<template>
  <div>
    <AdvanceSearch />
  </div>
</template>

<script>
import AdvanceSearch from '@/components/AdvanceSearch'
export default {
  components: {
    AdvanceSearch
  },
  data() {
    return {}
  }
}
</script>





## 基础组件(未完待续)

### AdvanceSearch

![img](组件.assets/image-20220713135700329.png)

### BackToTop

![image-20220714093505239](组件.assets/image-20220714093505239.png)

### CURD

#### ADD

######      Attributes(属性)

| 参数         | 说明             | 类型     | 可选值 | 默认值 |
| ------------ | ---------------- | -------- | ------ | ------ |
| rules        | 表单规则         | Function | —      |        |
| size         | 尺寸大小         | String   | —      |        |
| model        |                  |          | —      |        |
| label-width  | label的宽度      | Function | —      | 120px  |
| addFields    | 新增的表单选项   | Array    | —      |        |
| error-info   | 错误信息         |          | —      |        |
| default-span | 默认屏幕占据比例 |          | —      |        |
| value        | 表单对象         | Object   | —      |        |
| options      | 表单的选项       | Object   | —      |        |
| url          | 表单提交的地址   | String   | —      |        |
| showBtnArea  | 是否显示按钮区域 | Boolean  | —      | true   |

###### 

#### API

######    Attributes(属性)

| 参数 | 说明 | 类型 | 可选值 | 默认值    |
| ---- | ---- | ---- | ------ | --------- |
| data | 数据 |      | —      | undefined |

#### Btns

常见按钮组件 

######          Attributes(属性)

| 参数     | 说明         | 类型    | 可选值 | 默认值                      |
| -------- | ------------ | ------- | ------ | --------------------------- |
| type     | 类型         | String  | —      | primary                     |
| icon     | 图标         | String  | —      | el-icon-circle-plus-outline |
| showIcon | 是否显示icon | Boolean | —      | true                        |
| title    | 标题         | String  | —      |                             |
| label    | 名称         | String  | —      | —                           |
| initData | 初始数值     | Object  | —      | —                           |
| size     | 尺寸         | String  | —      | mini                        |

###### 		 Events(事件)

| 事件名称    | 说明     | 回调函数 |
| ----------- | -------- | -------- |
| openDialog  | 打开弹窗 |          |
| closeDialog | 关闭弹窗 |          |



#####     AddBtn(添加按钮)

#####     CommonDialogBtn(遮罩层按钮)

#####     DelBtn(删除按钮)

######   	Attributes(属性)

| 参数          | 说明       | 类型     | 可选值 | 默认值 |
| ------------- | ---------- | -------- | ------ | ------ |
| url           | 查询的url  | String   | —      | —      |
| deleteHandler | 删除的函数 | Function | —      | —      |

##### 	DialogBtnPage(弹窗按钮)

##### 	DropdownBtn(下拉菜单按钮)

##### 	ExportBtn(导出按钮)

##### 	TemplateConfirmBtn

##### 	UpdateBtn(更新按钮)

######  Attributes(属性)

| 参数      | 说明           | 类型   | 可选值 | 默认值 |
| --------- | -------------- | ------ | ------ | ------ |
| url       | 查询的url      | String | —      | —      |
| queryData | 附带的查询数据 | Object | —      | —      |

#### Config

###### Attributes(属性)

| 参数         | 说明             | 类型   | 可选值    | 默认值 |
| ------------ | ---------------- | ------ | --------- | ------ |
| value        | 表单对象         | Object |           |        |
| default-span | 屏幕宽度显示占比 | number | 8 ,12 ,24 | —      |
| add-fields   | 新增的表单选项   | Array  |           |        |
| label-width  | label宽度        | String | —         |        |
| label        | 名称             | String | —         | —      |
| rules        | 表单规则         | Object | —         | —      |
| size         | 尺寸             | String | —         | mini   |
| options      | 表单的选项       | Object | —         |        |

###### 

#### developing

###### Attributes(属性)

| 参数 | 说明     | 类型   | 可选值 | 默认值    |
| ---- | -------- | ------ | ------ | --------- |
| type | 类型     | String | —      | primary   |
| size | 尺寸大小 | Number | —      | undefined |

###### 

#### Form

######     Attributes(属性)

| 参数        | 说明             | 类型    | 可选值    | 默认值    |
| ----------- | ---------------- | ------- | --------- | --------- |
| size        | 尺寸大小         | Number  | —         | undefined |
| label       | 名称             | String  | —         | undefined |
| label-width | label的宽度      | String  | —         | undefined |
| required    | 是否必填         | Boolean | —         | undefined |
| rules       | 表单规则         | Object  | —         | undefined |
| error       | 错误信息         | String  | —         | undefined |
| value       | 数组值           | Object  | —         | undefined |
| span        | 屏幕宽度显示占比 | number  | 8 ,12 ,24 | —         |

#### JsonEditor

###### Attributes(属性)

| 参数      | 说明             | 类型    | 可选值    | 默认值 |
| --------- | ---------------- | ------- | --------- | ------ |
| show-btns | 是否显示btn      | Boolean | —         | false  |
| span      | 屏幕宽度显示占比 | number  | 8 ,12 ,24 | —      |
| mode      |                  | string  | —         | code   |

###### 		 Events(事件)

| 事件名称    | 说明     | 回调函数 |
| ----------- | -------- | -------- |
| json-change | 实时改变 |          |
| json-save   | 实时保存 |          |
| has-error   | 错误信息 |          |

###### 

#### pagination

##### 图例

![image-20220713151837897](C:\Users\hf\AppData\Roaming\Typora\typora-user-images\image-20220713151837897.png)

##### Attributes(属性)

| 参数         | 说明                                | 类型     | 可选值                                                       | 默认值                                |
| :----------- | ----------------------------------- | :------- | :----------------------------------------------------------- | :------------------------------------ |
| total        | 总条目数                            | number   | —                                                            | —                                     |
| current-page | 当前页数，支持 .sync 修饰符         | number   | —                                                            | 1                                     |
| page-size    | 每页显示条目个数，支持 .sync 修饰符 | number   | —                                                            | 10                                    |
| page-sizes   | 每页显示个数选择器的选项设置        | number[] | —                                                            | [10, 20, 30, 40, 50, 100]             |
| layout       | 组件布局，子组件名用逗号分隔        | String   | sizes`, `prev`, `pager`, `next`, `jumper`, `->`, `total`, `slot | 'prev, pager, next, jumper, ->, total |

##### Events(事件)

| 事件名称       | 说明                               | 回调参数 |
| -------------- | ---------------------------------- | -------- |
| size-change    | pageSize 改变时会触发              | 每页条数 |
| current-change | currentPage 改变时会触发           | 当前页   |
| prev-click     | 用户点击上一页按钮改变当前页后触发 | 当前页   |
| next-click     | 用户点击下一页按钮改变当前页后触发 | 当前页   |



#### Query

######  Attributes(属性)

| 参数  | 说明             | 类型    | 可选值    | 默认值                      |
| ----- | ---------------- | ------- | --------- | --------------------------- |
| size  | 尺寸大小         | String  | —         | el-icon-circle-plus-outline |
| model | 数据值           | Boolean | —         | true                        |
| span  | 默认屏幕占据比例 | Number  | 8  12  24 | —                           |
|       |                  |         |           |                             |
|       |                  |         |           |                             |

##### Events(事件)

| 事件名称 | 说明         | 回调参数 |
| -------- | ------------ | -------- |
| doSearch | 查询         | --       |
| doReset  | 重置查询条件 | --       |

#### Table

######  Attributes(属性)

| 参数       | 说明                                                         | 类型                 | 可选值 | 默认值                      |
| ---------- | ------------------------------------------------------------ | -------------------- | ------ | --------------------------- |
| size       | 尺寸大小                                                     | String               | —      | el-icon-circle-plus-outline |
| data       | 数据值                                                       | Boolean              | —      | true                        |
| row-key    | 行数据的 Key，用来优化 Table 的渲染；在使用 reserve-selection 功能与显示树形数据时，该属性是必填的。类型为 String 时，支持多层访问：`user.info.id`，但不支持 `user.info[0].id`，此种情况请使用 `Function`。 | Function(row)/String | —      |                             |
| max-height | Table 的最大高度。合法的值为数字或者单位为 px 的高度。       | string/number        | —      | —                           |
|            |                                                              |                      |        |                             |



## 常用组合组件



## 模块组件

### hfBaseUserInfo

![img](组件.assets/image-20220713142229882.png)