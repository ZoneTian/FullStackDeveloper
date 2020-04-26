---
title: ReactHook
date: 2020-04-23 11:20:18
tags: React
---

技术痛点： 函数组件没有 `state`，如果想写 `state`，官方会推荐渲染属性和高阶组件。

渲染属性：值为函数的 `prop` 来传递需要动态渲染的 `nodes` 或者组件。

高阶组件：一个函数接受一个组件作为参数，经过加工返回一个新的组件。

以上两个模式会增加我们代码的层级关系。



####	`useState` 允许使用 `state`

需要传入一个参数作为状态的初始值，当函数执行后会返回两个值，一个是当前状态的属性，一个是修改状态的方法。

```javascript

import React, { useState } from 'react';
function Counter() {
    const [
        count,
        setNumber
    ] = useState(0)
    return (
        <div>
            <p>{count}</p>
            <button
                onClick={
                    () => setNumber(count + 1)
                }
            >
                更改
      </button>
        </div>
    )
}
export default Counter
```

**值得注意的是 `useState` 不帮助你处理状态，相较于 `setState` 非覆盖式更新状态，`useState` 覆盖式更新状态，需要开发者自己处理逻辑。**

`react` 是根据 `useState` 出现的顺序来定的，鉴于此，`react`规定我们必须把 `hooks` 写在函数的最外层，不能写在`ifelse` 等条件语句当中，来确保 `hooks` 的执行顺序一致。

#### `useEffect` 处理副作用

```
import React, { useState, useEffect } from "react";
let timer = null;
function App() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    document.title = "componentDidMount" + count;
  },[count]);

  useEffect(() => {
    timer = setInterval(() => {
      setCount(prevCount => prevCount + 1);
    }, 1000);
    // 一定注意下这个顺序：
    // 告诉react在下次重新渲染组件之后，同时是下次执行上面setInterval之前调用
    return () => {
      document.title = "componentWillUnmount";
      clearInterval(timer);
    };
  }, []);
  return (
    <div>
      Count: {count}
      <button onClick={() => clearInterval(timer)}>clear</button>
    </div>
  );
}
```

**`useEffect` 第一个参数接收一个函数，可以用来做一些副作用比如异步请求，修改外部参数等行为，而第二个参数称之为 `dependencies`，是一个数组，如果数组中的值变化才会触发 执行 `useEffect`  第一个参数中的函数。返回值(如果有)则在组件销毁或者调用函数前调用**。

1. 比如第一个 `useEffect `中，理解起来就是一旦` count ` 值发生改变，则修改 `documen.title` 值；
2. 而第二个 `useEffect` 中传递了一个空数组[]，这种情况下只有在组件初始化或销毁的时候才会触发，用来代替 `componentDidMount` 和 `componentWillUnmount`，慎用；
3. 还有另外一个情况，就是不传递第二个参数，也就是 `useEffect` 只接收了第一个函数参数，代表不监听任何参数变化。每次渲染 `DOM` 之后，都会执行`useEffect` 中的函数

​         `hooks` 可以反复多次使用，相互独立。所以我们合理的做法是，给每一个副作用一个单独的 `useEffect` 钩子。这样一来，这些副作用不再一股脑堆在生命周期钩子里，代码变得更加清晰。

怎么清除呢？让我们传给 `useEffect` 的副作用函数返回一个新的函数即可。这个新的函数将会在组件下一次重新渲染之后执行。这种解绑的模式跟 `componentWillUnmount` 不一样。`componentWillUnmount` 只会在组件被销毁前执行一次而已，而 `useEffec` t里的函数，每次组件渲染后都会执行一遍，包括副作用函数返回的这个清理函数也会重新执行一遍。所以我们一起来看一下下面这个问题。

#### `useContext` 减少组件层级

递给 `useContext` 的是 `context` 而不是 `consumer`，返回值即是想要透传的数据了。用法很简单，使用 `useContext `可以解决 `Consumer` 多状态嵌套的问题。

```source-js
function HeaderBar() {
  const user = useContext(CurrentUser);
  const notifications = useContext(Notifications);
  return (
    <header>
      Welcome back, {user.name}!
      You have {notifications.length} notifications.
    </header>
  );
}
```



#### `useReducer`

```
import React, { useReducer } from "react";
const initialState = {
  count: 0
};
function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + action.payload };
    case "decrement":
      return { count: state.count - action.payload };
    default:
      throw new Error();
  }
}
function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({ type: "increment", payload: 5 })}>
        +
      </button>
      <button onClick={() => dispatch({ type: "decrement", payload: 5 })}>
        -
      </button>
    </>
  );
}
```

####`useCallback` 组件函数调用的优化

```
function App() {
  const memoizedHandleClick = useCallback(() => {
    console.log('Click happened')
  }, []); // 空数组代表无论什么情况下该函数都不会发生改变
  return <SomeComponent onClick={memoizedHandleClick}>Click Me</SomeComponent>;
}
```

通过 `useCallback` 获得一个记忆后的函数。第二个参数传入一个数组，数组中的每一项一旦值或者引用发生改变，`useCallback` 就会重新返回一个新的记忆函数提供给后面进行渲染。

这样只要子组件继承了 `PureComponent` 或者使用 `React.memo` 就可以有效避免不必要的 `VDOM` 渲染。

#### `useMemo` 记忆组件

`useCallback` 的功能完全可以由 `useMemo` 所取代，如果你想通过使用 `useMemo` 返回一个记忆函数也是完全可以的。

```
useCallback(fn, inputs) is equivalent to useMemo(() => fn, inputs).
```

```
function App() {
  const memoizedHandleClick = useMemo(() => () => {
    console.log('Click happened')
  }, []); // 空数组代表无论什么情况下该函数都不会发生改变
  return <SomeComponent onClick={memoizedHandleClick}>Click Me</SomeComponent>;
}
```

跟 `useCallback` 的区别是：**useCallback 不会执行第一个参数函数，而是将它返回给你，而 useMemo 会执行第一个函数并且将函数执行结果返回给你。**所以在前面的例子中，可以返回 `handleClick`  来达到存储函数的目的。

所以 `useCallback` 常用记忆事件函数，生成记忆后的事件函数并传递给子组件使用。而 `useMemo `更适合经过函数计算得到一个确定的值，比如记忆组件。

#### `useRef` 保存引用值

`useRef` 返回的值传递给组件或者 `DOM` 的 `ref` 属性，就可以通过 `ref.current` 值**访问组件或真实的 `DOM` 节点，重点是组件也是可以访问到的**，从而可以对 `DOM` 进行一些操作，比如监听事件等等。

当然 `useRef` 远比你想象中的功能更加强大，`useRef` 的功能有点像类属性，或者说您想要在组件中记录一些值，并且这些值在稍后可以更改。

利用 `useRef` 就可以绕过 `Capture Value` 的特性。可以认为 `ref` 在所有 `Render` 过程中保持着唯一引用，因此所有对 `ref` 的赋值或取值，拿到的都只有一个最终状态，而不会在每个 `Render` 间存在隔离。

####`useImperativeHandle` 透传 `Ref`

通过 `useImperativeHandle` 用于让父组件获取子组件内的索引



```source-js
import React, { useRef, useEffect, useImperativeHandle, forwardRef } from "react";
function ChildInputComponent(props, ref) {
  const inputRef = useRef(null);
  useImperativeHandle(ref, () => inputRef.current);
  return <input type="text" name="child input" ref={inputRef} />;
}
const ChildInput = forwardRef(ChildInputComponent);
function App() {
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  return (
    <div>
      <ChildInput ref={inputRef} />
    </div>
  );
}
```

#### `useLayoutEffect` 同步执行副作用

使用 `useEffect` 就可以帮我们处理组件的副作用，但是如果想要同步调用一些副作用，比如对 DOM 的操作，就需要使用 `useLayoutEffect`，`useLayoutEffect` 中的副作用会在 DOM 更新之后同步执行。

### useEffect和useLayoutEffect有什么区别？

**简单来说就是调用时机不同，`useLayoutEffect`和原来`componentDidMount`&`componentDidUpdate`一致，在react完成DOM更新后马上**同步**调用的代码，会阻塞页面渲染。而`useEffect`是会在整个页面渲染完才会调用的代码。**

官方建议优先使用`useEffect`

#### 自定义`hook`

自定义`hook`是一个函数，其名称以`use`开头，函数内部可以调用其他`hook`。

`hook` 使用规则

`Hook` 就是`JavaScript` 函数，但是使⽤用它们会有两个额外的规则：

只能在函数最外层调⽤用`Hook`，不要在循环、条件判断或者⼦子函数中调⽤用。

只能在React 的函数组件中调⽤用`Hook`。不要在其他 `JavaScript `函数中调⽤用。（还有⼀一个地⽅方可以调⽤ `Hook `—— 就是⾃定义的`Hook `中。）