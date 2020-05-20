---
title: 将数组扁平化并去除其中重复数据，最终得到一个升序且不重复的数组
date: 2020-05-20 14:32:15
tags: Daily-Interview-Question
---

```
function Fun(arr){
	return Array.from(new Set(arr.flat(Infinity))).sort((a,b)=>a-b)
}
const arr = [ [1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14] ] ] ], 10];
Fun(arr)
```

