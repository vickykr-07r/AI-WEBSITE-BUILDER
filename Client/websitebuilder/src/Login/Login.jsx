import { RxCrossCircled } from "react-icons/rx";
import Style from "../Login/Login.module.css";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { useContext } from "react";
import { ServerContext } from "../Context/ServerContext";
function Login({ open, onClose }) {
  if (!open) return null;
  const {Serverurl}=useContext(ServerContext);
  const googleauth=async()=>{
    try {
        const result=await signInWithPopup(auth,provider)
        console.log(result.user)
    } catch (error) {
        console.log(error)
    }
  }
  return (
    <div className={Style.overlay}>
  <div className={Style.modal}>

    <div className={Style.nav}>
      <RxCrossCircled className={Style.close} onClick={onClose} />
    </div>

    <button className={Style.tag}>
      AI Powered Website Builder
    </button>

    <h1>Welcome To GenWeb.AI</h1>

    <button className={Style.googleBtn} onClick={googleauth}>
      <img 
        src="https://cdn.pixabay.com/photo/2015/12/11/11/43/google-1088004_1280.png" 
        alt="google"
      />
      Continue With Google
    </button>

    <div className={Style.divider}>
      <span>Secure Login</span>
    </div>

    <footer className={Style.footer}>
      By continuing, you agree to our Terms of Service and Privacy Policy
    </footer>

  </div>
</div>
  );
}

export default Login;