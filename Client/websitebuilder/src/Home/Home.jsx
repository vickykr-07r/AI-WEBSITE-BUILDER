import { useContext, useState } from "react";
import Style from "../Home/Home.module.css";
import Login from "../Login/Login.jsx";
import { useDispatch, useSelector } from "react-redux";
import { GiTwoCoins } from "react-icons/gi";
import axios from "axios";
import { ServerContext } from "../Context/ServerContext.jsx";
import { setUserData } from "../Redux/userSlice.js";
import { useNavigate } from "react-router-dom";

function Home() {
  const highlight = [
    "AI Generated Code",
    "Fully Responsive Layouts",
    "Production Ready Output",
  ];

  const [openLogin, setOpenLogin] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);

  const { userData } = useSelector((state) => state.user);
  const { Serverurl } = useContext(ServerContext);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await axios.get(`${Serverurl}/api/auth/logout`, {
        withCredentials: true,
      });

      dispatch(setUserData(null));
      setOpenLogin(false);
      setOpenProfile(false);

      navigate("/", { replace: true });
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  return (
    <>
      <div className={Style.container}>
        <div className={Style.nav}>
          <div className={Style.left}>
            <h1>GenWeb.ai</h1>
          </div>

          <div className={Style.right}>
            {userData && (
              <div className={Style.coins}>
                <button>
                  <GiTwoCoins /> {userData?.credits}
                </button>
              </div>
            )}

            <div>
              <p>Pricing</p>

              {!userData ? (
                <button onClick={() => setOpenLogin(true)}>
                  Get Started
                </button>
              ) : (
                <img
                  src={userData?.avatar}
                  alt="profile"
                  onClick={() => setOpenProfile(!openProfile)}
                  style={{ cursor: "pointer", width: "40px", borderRadius: "50%" }}
                />
              )}
            </div>
          </div>
        </div>

        <div className={Style.box}>
          <h1>Build Websites with AI 🚀</h1>
          <p>
            Generate production-ready websites with clean code,
            modern UI, animations and full responsiveness.
          </p>
          {userData ? <button onClick={()=>{navigate("/dashboard")}}>Go To Dashboard</button>:<button onClick={() => setOpenLogin(true)}>
            Start Building
          </button>}
          
        </div>

        <div className={Style.card}>
          {highlight.map((h, i) => (
            <div key={i} className={Style.cardata}>
              <h2>{h}</h2>
              <p>
                GenWeb AI builds real websites with clean code,
                animations, responsiveness and scalable structure.
              </p>
            </div>
          ))}
        </div>

        <footer>
          © {new Date().getFullYear()} GenWeb.AI
        </footer>

        {openLogin && (
          <Login open={openLogin} onClose={() => setOpenLogin(false)} />
        )}

        {openProfile && userData && (
          <div className={Style.profile}>
            <div className={Style.userdaata}>
              <p>{userData?.name}</p>
              <p>{userData?.email}</p>
            </div>

            <div
              className={Style.dashboard}
              onClick={() => navigate("/dashboard")}
              style={{ cursor: "pointer" }}
            >
              <h4 onClick={()=>{navigate("/dashoard")}}>Dashboard</h4>
            </div>

            <div>
              <button onClick={logout}>Logout</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Home;