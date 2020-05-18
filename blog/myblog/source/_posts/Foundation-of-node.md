---
title: 初探 Node
date: 2020-05-18 15:22:42
tags: node
---

### 什么是 node

- 运行在服务端的 javaScript
- 基于 chrome JavaScript 运行时建立的一个平台
- 事件驱动 I/O 服务端 JavaScript 环境，基于 Google 的 V8 的引擎。

### 为什么要使用 node

- 非阻塞型的  I/O 

  1. 只支持单线程，不用担心死锁。
  2. 非阻塞机制，例如，在访问数据库取得搜索结果的时候，在开始访问数据库之后、数据库返回结果之前，存在一段时间的等待。
     在传统的单线程处理机制中，在执行了访问数据库的代码之后，整个线程都将暂停下来，等待数据库返回查询结果之后才能继续执行其后面的代码。也就是I/O操作阻塞了代码的执行，极大的降低了程序的执行效率。
     由于Node.js中采用了非阻塞型I/O机制，因此在执行访问数据库的代码之后将立即转而执行其后面的代码，把数据库返回结果的处理代码放在回调函数中执行，从而提高了程序的执行效率。

- event loop

  一个循环 每次循环叫tick 每次循环的代码叫task

  在Node.js中，在一个时刻只能执行一个事件回调函数，但是在执行一个事件回调函数的中途可以转而执行其他事件，然后返回继续执行原事件回调函数，这种处理机制叫事件环机制

  先同步再异步 异步放入队列等同步完成后在执行 每次循环叫一个tick (process.nextTick())

   <a href="https://www.processon.com/view/link/5e70b1c2e4b011fcce9b89b5#map">深度查看事件循环</a>

### EventEmitter

Node.js 所有的异步 I/O 操作在完成时都会发送一个事件到事件队列。

Node.js 里面的许多对象都会分发事件：一个 net.Server 对象会在每次有新连接时触发一个事件， 一个 fs.readStream 对象会在文件被打开的时候触发一个事件。 所有这些产生事件的对象都是 events.EventEmitter 的实例。

### Buffer

JavaScript 语言自身只有字符串数据类型，没有二进制数据类型。

但在处理像TCP流或文件流时，必须使用到二进制数据。因此在 Node.js中，定义了一个 Buffer 类，该类用来创建一个专门存放二进制数据的缓存区。

### Stream

Stream 是一个抽象接口，Node 中有很多对象实现了这个接口。例如，对http 服务器发起请求的request 对象就是一个 Stream，还有stdout（标准输出）。

所有的 Stream 对象都是 EventEmitter 的实例。

