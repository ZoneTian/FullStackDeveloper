---
title: 如何实现一个 new。
date: 2020-06-01 14:56:29
tags: Daily-Interview-Question
---

<p style="color:red">只是个人学习笔记详情请移步</p>

<a href="https://muyiy.cn/question/frame/1.html">壹题</a>



##结论

```
function _new(fn,...arg){
	const obj = Object.create(fn.prototype);
	const ret = fn.apply(obj,...arg);
	return ret instanceof Object?ret:obj
}
```


