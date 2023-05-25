
import MyNavbar from "./Components/Navbar";
import SignUp from "./Components/SignUp";
import Home from "./Components/Home";
import { Routes, Route } from "react-router-dom";
import SignIn from "./Components/SignIn";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoginStatus } from "./store/AuthSlice";

function App() {
  const isLogin = useSelector(state=>state.auth.isLogin)
  const dispatch = useDispatch()
  useEffect(()=>{
    const token = localStorage.getItem('loginId')
    if(token) dispatch(setLoginStatus(true))
    if(!token) dispatch(setLoginStatus(false))
  }, [isLogin])

  return (
    <div>
    <MyNavbar/>
    <Routes>
    <Route path="/" element={<Home/>} />
    <Route path="/sign-up" element={<SignUp/>} />
    <Route path="/sign-in" element={<SignIn/>} />
    </Routes>
    <ToastContainer/>
    </div>
  );
}

export default App;
