import Home from "./Home/Home.jsx"
import { useGetcurrentuser } from "./Hooks/getcurrentuser.jsx"

function App() {
 useGetcurrentuser();
  return (
   <>
  <Home/>
   </>
  )
}

export default App
