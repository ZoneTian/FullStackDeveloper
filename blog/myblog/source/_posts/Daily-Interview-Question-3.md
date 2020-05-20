---
title: 什么是防抖和节流？有什么区别？如何实现？
date: 2020-05-14 16:30:37
tags: Daily-Interview-Question
---

<p style="color:red">只是个人学习笔记详情请移步</p>

<a href="https://muyiy.cn/question/frame/1.html">壹题</a>



##结论

防抖和节流对于前端来说，算是性能优化的一种解决方案。

常见的业务场景有电商网站的联想搜索，当用户输入的时候我们就要请求接口，一个用户还好，当用户体量很大时，接口调用过于频繁，会对服务器造成很大的压力，抑或是我们需要在用户滑动到某个位置时去显示一个快速导航栏，这是我们需要去监听 `scroll` ，这个消耗无异于是巨大的，尤其是当你监听函数不仅仅是一个样式的更改，还有计算，很容易造成页面的卡顿。

以上两种情况我们就可以用防抖和节流来实现。

区别 ： 

1. 防抖动和节流本质是不一样的。防抖动是将多次执行变为最后一次执行，节流是将多次执行变成每隔一段时间执行。

   

##题目详解

# 防抖



- 触发高频事件后n秒内函数只会执行一次，如果n秒内高频事件再次被触发，则重新计算时间
- 每次触发事件时都取消之前的延时调用方法



```javascript
function debounce(func, wait, immediate) {

	var timeout, result;

	var debounced = function () {
		var context = this;
		var args = arguments;

		if (timeout) clearTimeout(timeout);
		if (immediate) {
			// 如果已经执行过，不再执行
			var callNow = !timeout;
			timeout = setTimeout(function(){
				timeout = null;
			}, wait)
			if (callNow) result = func.apply(context, args)
		}
		else {
			timeout = setTimeout(function(){
				func.apply(context, args)
			}, wait);
		}


		return result;
	};

	debounced.cancel = function() {
		clearTimeout(timeout);
		timeout = null;
	};

	return debounced;
}
```

### 

> <a href = "https://github.com/mqyqingfeng/Blog/issues/22" >JavaScript专题之跟着underscore学防抖 </a>

# 节流

- 高频事件触发，但在n秒内只会执行一次，所以节流会稀释函数的执行频率

- 每次触发事件时都判断当前是否有等待执行的延时函数



```javascript
var count = 1;
var container = document.getElementById('container');

function getUserAction() {
    container.innerHTML = count++;
};

var setUseAction = throttle(getUserAction, 10000);

container.onmousemove = setUseAction

document.getElementById("button").addEventListener('click', function(){
    setUseAction.cancel();
})

function throttle(func, wait, options) {
    var timeout, context, args, result;
    var previous = 0;
    if (!options) options = {};

    var later = function() {
        previous = options.leading === false ? 0 : new Date().getTime();
        timeout = null;
        func.apply(context, args);
        if (!timeout) context = args = null;
    };

    var throttled = function() {
        var now = new Date().getTime();
        if (!previous && options.leading === false) previous = now;
        var remaining = wait - (now - previous);
        context = this;
        args = arguments;
        if (remaining <= 0 || remaining > wait) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            previous = now;
            func.apply(context, args);
            if (!timeout) context = args = null;
        } else if (!timeout && options.trailing !== false) {
            timeout = setTimeout(later, remaining);
        }
    };

    throttled.cancel = function() {
        clearTimeout(timeout);
        previous = 0;
        timeout = null;
    };

    return throttled;
}
```

### 

> <a href = "https://github.com/mqyqingfeng/Blog/issues/26" >JavaScript专题之跟着 underscore 学节流</a>

## 延伸

<a href="https://blog.csdn.net/hupian1989/article/details/80920324">防抖(debounce) 和 节流(throttling)</a>

这篇文章将防抖和节流从理论分析上讲的更为详细，有兴趣可以看看。

