import Home from "./Home/Home.jsx"
import { useGetcurrentuser } from "./Hooks/getcurrentuser.jsx"
import { Routes,Route, Navigate } from "react-router-dom";
import Dashboard from "./Dashboard/Dashboard.jsx";
import Generate from "./Generate/Generate.jsx";
import { useSelector } from "react-redux";
import {  WebsiteEditor } from "./Editor/Editor.jsx";
import LiveSite from "./LiveSite/LiveSite.jsx";
import Pricing from "./Pricing/Pricing.jsx";
function App() {
 useGetcurrentuser();
 const {userData}=useSelector(state=>state.user)
  return (
   <>
  <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/dashboard" element={userData ? <Dashboard/>:<Navigate to={<Home/>}/>}/>
    <Route path="/generate" element={userData ? <Generate/>:<Navigate to={<Home/>}/>}/>
    <Route path="/editor/:id" element={userData ? <WebsiteEditor/>:<Navigate to={<Home/>}/>}/>
    <Route path="/site/:id" element={<LiveSite/>}/>
    <Route path="/pricing" element={<Pricing/>}/>
  </Routes>
   </>
  )
}

export default App
