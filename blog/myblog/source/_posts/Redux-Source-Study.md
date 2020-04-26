---
title: Redux-Source-Study
date: 2020-04-21 09:58:59
tags: Redux
---

`Redux` 是`JavaScript` 应用的状态容器，保证程序行为的一致性且用于测试。

###### 解决痛点

越来越多的 `state` 使得我们在应用和管理的时候显得力不从心，我们需要一个插件让 `state` 的变化可预测。

###### 核心概念

使用 `action` 来修改 `state` ，使用 `reducer` 来接收 `action` 和 `state` 。

###### 基本原则

单一数据源：整个应用的 `state` 被存储在一个 `object tree` 中，并只存在一个 `store` 中。 

`state`  是只读的：唯一改变 `state` 的方法就是触发 `action`，所有的修改都被集中化处理。

使用纯函数：为了描述 `action` 如何改变 `state tree` ，你需要编写 [reducers](http://cn.redux.js.org/docs/Glossary.html#reducer)。



简单的实现

1. `createStore ` 创建 `store`
2. `reducer`  初始化，修改状态函数，定义修改规则
3. `getState`  获取状态值
4. `dispatch`  提交更新，通过 `action` 来提交对数据的修改提交到reducer函数里，根据传入的 ` action` 的`type`，返回新的 `state `
5. `subscribe ` 变更订阅 

# Reducer

`Reducer`  就是一个纯函数，接受旧的state和action，返回新的state。

不要在`reducer ` 做这些操作

1. 修改传入参数
2. 执行有副作用的操作，如 `API` 请求和路由操作
3. 调用非纯函数，如 `Date.now()` 和 `Math.random()`



`Redux`  的源码中使用工具函数 `compose`   作用是组合函数，依次组合传入的函数：

1. 后一个函数作为前一个函数的参数
2. 最后一个函数可以接受多个参数，前面的函数只能接受单个参数，最后一个返回值传给前一个

## reduce

`reduce()` 方法接收一个函数作为累加器，数组中的每个值（从左到右）开始缩减，最终计算为一个值。

`reduce()` 可以作为一个高阶函数，用于函数的 `compose`。

```javascript
 function compose(...funcs) {
  if (funcs.length === 0) {
    return arg => arg
  }

  if (funcs.length === 1) {
    return funcs[0]
  }

  return funcs.reduce((a, b) => (...args) => a(b(...args)))
}
```

todo

1. `type`  统一管理
2. 事件副作用不要写在页面组件中

## Middleware

`Redux` 提供 `applyMiddleware` 来让你使用中间件。

