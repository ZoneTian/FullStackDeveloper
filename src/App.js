import React ,{useState}from "react";
// import ReduxPage from "./pages/ReduxPage";
// import ReactReduxHookPage from './pages/ReactReduxHookPage'
import RouterPage from "./pages/RouterPage";
// import ReduxHooks from './pages/ReduxHooks'
// import ReactReduxPage from './pages/ReactReduxPage'

export default function App(props) {

 const [state, setstate] = useState(1)
  return (
    <div>
      <button onClick = {()=>setstate(state+1)}>{state}</button>
      {/* {state % 2  && <ReduxPage />} */}
      {/* <ReactReduxHookPage/> */}
      {/* <ReduxHooks/> */}
      {/* <ReactReduxPage/> */}
      <RouterPage/>
    </div>
  );
}
