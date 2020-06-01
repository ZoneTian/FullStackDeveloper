---
title: TCP 三次握手和四次挥手的
date: 2020-06-01 14:56:37
tags:Daily-Interview-Question

---

<p style="color:red">只是个人学习笔记详情请移步</p>

<a href="https://muyiy.cn/question/frame/1.html">壹题</a>



##结论



TCP三次握手：

​	1、客户端发送syn包到服务器，等待服务器确认接收。

​	2、服务器确认接收syn包并确认客户的syn，并发送回来一个syn+ack的包给客户端。

​	3、客户端确认接收服务器的syn+ack包，并向服务器发送确认包ack，二者相互建立联系后，完成tcp三次握手。

四次握手就是中间多了一层 等待服务器再一次响应回复相关数据的过程



<a href="https://juejin.im/post/5c078058f265da611c26c235">作为前端的你了解多少tcp的内容</a>