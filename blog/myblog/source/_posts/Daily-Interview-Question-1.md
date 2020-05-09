---
title: 写 React / Vue 项目时为什么要在列表组件中写 key，其作用是什么？
date: 2020-05-09 17:25:16
tags: Daily-Interview-Question
---

<p style="color:red">只是个人学习笔记详情请移步</p>

<a href="https://muyiy.cn/question/frame/1.html">壹题</a>



##结论

`key` 的作用主要是为了高效的更新虚拟 `DOM`，`key` 值是用来判断 `VDOM` 元素项的唯一依据。

## 题目详解

###React 中的 key

​	`key` 帮助 `React` 识别哪些元素改变了，比如被添加或删除。因此你应当给数组中的每一个元素赋予一个确定的标识。一个元素的 `key` 最好是这个元素在列表中拥有的一个独一无二的字符串。通常，我们使用数据中的 `id` 来作为元素的 `key`。

​	当元素没有确定 `id` 的时候，万不得已你可以使用元素索引 `index` 作为 `key`。如果列表项目的顺序可能会变化，我们不建议使用索引来用作 `key` 值，因为这样做会导致性能变差，还可能引起组件状态的问题。

> <a href = "https://zh-hans.reactjs.org/docs/lists-and-keys.html#keys" >React官方的解释</a>

###Vue 中的 key

`key` 的特殊 `attribute` 主要用在 `Vue` 的虚拟 `DOM` 算法，在新旧 `nodes` 对比时辨识 `VNodes`。如果不使用 key，`Vue` 会使用一种最大限度减少动态元素并且尽可能的尝试就地修改/复用相同类型元素的算法。而使用 `key` 时，它会基于 `key` 的变化重新排列元素顺序，并且会移除 `key` 不存在的元素。

有相同父元素的子元素必须有**独特的 key**。重复的 `key` 会造成渲染错误。

> <a href = "https://cn.vuejs.org/v2/api/#key" >Vue官方的解释</a>

## 延伸

### vue 和 react diff设计的不同点

vue使用依赖收集追踪，可以更加颗粒化更新组件，而react采用自顶而下的更新策略。

### 使用key是否能提高diff速度

分情况讨论，在没有绑定key的情况下，并且遍历模版简单，会导致虚拟新旧节点对比更快，节点也会复用，但是这种复用是就地复用，鸭式辩型的复用。但是会导致一些隐藏的副作用，比如可能不会产生过渡效果，或者在某些节点有绑定数据（表单）状态，会出现状态错位。VUE文档也说明了 [`这个默认的模式是高效的，但是只适用于不依赖子组件状态或临时 DOM 状态 (例如：表单输入值) 的列表渲染输出`](https://cn.vuejs.org/v2/guide/list.html#key)