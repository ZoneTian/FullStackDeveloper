---
title: 异步笔试题，请写出下面代码的运行结果
date: 2020-05-20 14:32:11
tags: Daily-Interview-Question
---

<p style="color:red">只是个人学习笔记详情请移步</p>

<a href="https://muyiy.cn/question/frame/1.html">壹题</a>

```
async function async1() {
    console.log('async1 start');
    await async2();
    console.log('async1 end');
}
function async2() {
    console.log('async2');
}
console.log('script start');
setTimeout(function() {
    console.log('setTimeout');
}, 0)
async1();
new Promise(function(resolve) {
    console.log('promise1');
    resolve();
}).then(function() {
    console.log('promise2');
});
console.log('script end');
```



##结论

```
/*script start
async1 start
async2
promise1
script end
async1 end
promise2
setTimeout*/
```



## 题目详解

1.  先执行第一个console.log() 输出 **script start**

2. `setTimeout` 挂载在task

3. 执行`async1` 函数 输出 **async1 start**

4. await 后等待 `async2` 执行 输出 **async2**

5.  **易错点**  这时候的 `console.log('async1 end');` 相当于`async2` 的`resolve` 所以挂载在微任务队列

6. 执行 `Promise` 输出 **promise1** ， `Promise`的`resolve` 挂载在微任务队列

7.  输出 **script end**

8. 这时执行微任务队列 相继输出 

   **async1 end**

   **promise2**

9. 执行新的宏任务队列 输出 **setTimeout

   

## 延伸

> <a href = "https://muyiy.cn/question/async/9.html" >从async/await到单向链表</a>

#####eventloop

JS主线程不断的循环往复的从任务队列中读取任务，执行任务，这中运行机制称为事件循环（event loop）。

#####Microtasks、Macrotasks

Microtasks和Macrotasks是异步任务的一种类型，`Microtasks`的优先级要高于`Macrotasks`，下面是它们所包含的api：

- microtasks
  - process.nextTick
  - promise
  - Object.observe (废弃)
  - MutationObserver
- macrotasks
  - setTimeout
  - setImmerdiate
  - setInterval
  - I/O
  - UI 渲染

**注意：**

1. 每一个 event loop 都有一个 microtask queue
2. 每个 event loop 会有一个或多个macrotaks queue ( 也可以称为task queue )
3. 一个任务 task 可以放入 macrotask queue 也可以放入 microtask queue中
4. 每一次event loop，会首先执行 microtask queue， 执行完成后，会提取 macrotask queue 的一个任务加入 microtask queue， 接着继续执行microtask queue，依次执行下去直至所有任务执行结束。