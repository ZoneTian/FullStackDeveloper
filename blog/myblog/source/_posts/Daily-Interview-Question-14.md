---
title: React 中 setState 
date: 2020-06-01 14:56:42
tags:Daily-Interview-Question
---

<p style="color:red">只是个人学习笔记详情请移步</p>

<a href="https://muyiy.cn/question/frame/1.html">壹题</a>

```
class Example extends React.Component {
  constructor() {
    super();
    this.state = {
      val: 0
    };
  }
  
  componentDidMount() {
    this.setState({val: this.state.val + 1});
    console.log(this.state.val);    // 第 1 次 log

    this.setState({val: this.state.val + 1});
    console.log(this.state.val);    // 第 2 次 log

    setTimeout(() => {
      this.setState({val: this.state.val + 1});
      console.log(this.state.val);  // 第 3 次 log

      this.setState({val: this.state.val + 1});
      console.log(this.state.val);  // 第 4 次 log
    }, 0);
  }

  render() {
    return null;
  }
};

// 0 0 2 3 
```



##结论



setState 通过一个**队列机制**来实现 state 更新，当执行 setState() 时，会将需要更新的 state **浅合并**后放入 状态队列，而不会立即更新 state，队列机制可以高效的**批量更新** state。而如果不通过setState，直接修改this.state 的值，则不会放入状态队列，当下一次调用 setState 对状态队列进行合并时，之前对 this.state 的修改将会被忽略，造成无法预知的错误。

React通过状态队列机制实现了 setState 的异步更新，避免重复的更新 state。

```
setState(nextState, callback)
```

在 setState 官方文档中介绍：**将 nextState 浅合并到当前 state。这是在事件处理函数和服务器请求回调函数中触发 UI 更新的主要方法。不保证 `setState` 调用会同步执行，考虑到性能问题，可能会对多次调用作批处理。**



在React中， **如果是由React引发的事件处理（比如通过onClick引发的事件处理），调用setState不会同步更新this.state，除此之外的setState调用会同步执行this.state** 。所谓“除此之外”，指的是绕过React通过addEventListener直接添加的事件处理函数，还有通过setTimeout/setInterval产生的异步调用。

**原因：** 在React的setState函数实现中，会根据一个变量isBatchingUpdates判断是直接更新this.state还是放到队列中回头再说，而isBatchingUpdates默认是false，也就表示setState会同步更新this.state，但是，**有一个函数batchedUpdates，这个函数会把isBatchingUpdates修改为true，而当React在调用事件处理函数之前就会调用这个batchedUpdates，造成的后果，就是由React控制的事件处理过程setState不会同步更新this.state** 。
对于异步渲染，我们应在 `getSnapshotBeforeUpdate` 中读取 `state`、`props`, 而不是 `componentWillUpdate`。但调用`forceUpdate()` 强制 render 时，会导致组件跳过 `shouldComponentUpdate()`,直接调用 `render()`。

注意： setState的“异步”并不是说内部由异步代码实现，其实**本身执行的过程和代码都是同步的，只是合成事件和钩子函数的调用顺序在更新之前，导致在合成事件和钩子函数中没法立马拿到更新后的值，形式了所谓的“异步”**，当然可以通过第二个参数 setState(partialState, callback) 中的callback拿到更新后的结果。



 

## 延伸

> <a href = "https://github.com/sisterAn/blog/issues/26" >深入 setState 机制</a>
