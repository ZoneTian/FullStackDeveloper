---
title: ['1', '2', '3'].map(parseInt) what & why ?-Interview-Question-2
date: 2020-05-14 16:14:50
tags:
---

<p style="color:red">只是个人学习笔记详情请移步</p>

<a href="https://muyiy.cn/question/frame/1.html">壹题</a>



##结论

**[1, NaN, NaN]**

```javascript
//代码实际执行为
['1', '2', '3'].map((item, index) => {
	return parseInt(item, index)
})
```

1. parseInt('1', 0) //radix为0时，且string参数不以“0x”和“0”开头时，按照10为基数处理。这个时候返回1
2. parseInt('2', 1) //基数为1（1进制）表示的数中，最大值小于2，所以无法解析，返回NaN
3. parseInt('3', 2) //基数为2（2进制）表示的数中，最大值小于3，所以无法解析，返回NaN

## 题目详解

###map

仔细看文档可得知，map的第一个参数是一个回调函数

生成新数组元素的函数，使用三个参数：

- `currentValue`

  `callback` 数组中正在处理的当前元素。

- `index`可选

  `callback` 数组中正在处理的当前元素的索引。

- `array`可选

  `map` 方法调用的数组。

> <a href = "https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/map" >MDN关于Map</a>

# parseInt

**parseInt(\*string\*, \*radix\*)**  将一个字符串 string 转换为 radix 进制的整数， `radix` 为介于2-36之间的数。

> <a href = "https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/parseInt" >parseInt</a>

## 延伸

<a href="https://www.h5jun.com/post/parseInt-to-functional.html">从一道坑人的面试题说函数式编程</a>

