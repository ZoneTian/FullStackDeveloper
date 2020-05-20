---
title: Async/Await 如何通过同步的方式实现异步
date: 2020-05-20 14:32:07
tags: Daily-Interview-Question
---

<p style="color:red">只是个人学习笔记详情请移步</p>

<a href="https://muyiy.cn/question/frame/1.html">壹题</a>



##结论

```
function get(val) {
  return new Promise((resolve, reject)=>{
    console.log(`正在加载${val}`);
    setTimeout(()=>{
      resolve(val);
      console.log(`${val}加载完毕`);
    },1000 + Math.random() * 10000);
  });
}
const startFunction = async ()=>{
	const res = await get(1)
	console.log('test')
	const res1 = await get(2)
}
const resall =startFunction()
```



## 题目详解

#####Async/Await

首先，`async/await` 是 `Generator` 的语法糖，`async`函数就是将 Generator 函数的星号（`*`）替换成`async`，将`yield`替换成`await`，仅此而已。

但是也略有不同

（1）内置执行器。

Generator 函数的执行必须靠执行器，所以才有了`co`模块，而`async`函数自带执行器。也就是说，`async`函数的执行，与普通函数一模一样，只要一行。

（2）更好的语义。

`async`和`await`，比起星号和`yield`，语义更清楚了。`async`表示函数里有异步操作，`await`表示紧跟在后面的表达式需要等待结果。

（3）更广的适用性。

`co`模块约定，`yield`命令后面只能是 Thunk 函数或 Promise 对象，而`async`函数的`await`命令后面，可以是 Promise 对象和原始类型的值（数值、字符串和布尔值，但这时会自动转成立即 resolved 的 Promise 对象）。

（4）返回值是 Promise。

`async`函数的返回值是 Promise 对象，这比 Generator 函数的返回值是 Iterator 对象方便多了。你可以用`then`方法指定下一步的操作。

进一步说，`async`函数完全可以看作多个异步操作，包装成的一个 Promise 对象，而`await`命令就是内部`then`命令的语法糖。

> <a href = "https://es6.ruanyifeng.com/#docs/async" >阮一峰的es6 </a>

## 延伸

`async/await` 是参照 `Generator` 封装的一套异步处理方案，可以理解为 `Generator` 的语法糖，

所以了解 `async/await` 就不得不讲一讲 `Generator`,

而 `Generator` 又依赖于迭代器`Iterator`，

所以就得先讲一讲 `Iterator`,

而 `Iterator` 的思想呢又来源于单向链表。

> <a href = "https://muyiy.cn/question/async/9.html" >从async/await到单向链表</a>

## 