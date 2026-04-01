import Home from "./Home/Home.jsx"
import { useGetcurrentuser } from "./Hooks/getcurrentuser.jsx"
import { Routes,Route } from "react-router-dom";
function App() {
 useGetcurrentuser();
  return (
   <>
  <Routes>
    <Route path="/" element={<Home/>}/>
  </Routes>
   </>
  )
}

export default App
