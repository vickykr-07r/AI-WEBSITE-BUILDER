import { IoMdArrowRoundBack } from "react-icons/io";
import Style from "../Pricing/Pricing.module.css";
import { FaCoins } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { ServerContext } from "../Context/ServerContext";
import { useSelector } from "react-redux";
import axios from "axios";

function Pricing() {
  const plans = [
    {
      key: "free",
      name: "free",
      price: "₹0",
      credits: "100",
      description: "Perfect to explore GenWeb.ai",
      features: [
        "AI websites generation",
        "Responsive HTML Output",
        "Basic animations",
      ],
      popular: false,
      button: "Get Started",
    },
    {
      key: "pro",
      name: "pro",
      price: "₹499",
      credits: "500",
      description: "For serious creator and freelancer",
      features: [
        "Everything in free",
        "Fast generation",
        "Edit and generate",
        "Download source code",
      ],
      popular: true,
      button: "Upgrade to Pro",
    },
    {
      key: "enterprises",
      name: "enterprises",
      price: "₹1499",
      credits: "1000",
      description: "For team and power user",
      features: [
        "Unlimited iterations",
        "Highest priority",
        "Team collaborations",
        "Dedicated support",
      ],
      popular: false,
      button: "Contact Sales",
    },
  ];

  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.user);
  const { Serverurl } = useContext(ServerContext);

  const [loading, setLoading] = useState("");

  const handleBuy = async (planKey) => {
    if (!userData) {
      navigate("/");
      return;
    }

    if (planKey === "free") {
      navigate("/dashboard");
      return;
    }

    setLoading(planKey);

    try {
      const result = await axios.post(
        `${Serverurl}/api/website/billing`,
        { planType: planKey },
        { withCredentials: true },
      );

      console.log(result.data);

      if (result.data?.sessionUrl) {
        window.location.href = result.data.sessionUrl;
      }

      setLoading("");
    } catch (error) {
      console.log("Status:", error.response?.status);
      console.log("Error Data:", error.response?.data);
      console.log(error);

      setLoading("");
    }
  };

  return (
    <div className={Style.container}>
      <div className={Style.nav}>
        <p onClick={() => navigate("/")}>
          <IoMdArrowRoundBack /> Back
        </p>
      </div>

      <div className={Style.pricingbox}>
        {plans.map((p, i) => (
          <div key={i} className={p.popular ? Style.popularCard : ""}>
            <h1>{p.name}</h1>

            <h2>{p.description}</h2>

            <div>
              <span className={Style.pri}>{p.price}</span>
              <span>/one-Time</span>
            </div>

            <div className={Style.coins}>
              <p>
                <FaCoins /> {p.credits} Credits
              </p>
            </div>

            <ul>
              {p.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>

            <button
              className={Style.button}
              disabled={loading === p.key}
              onClick={() => handleBuy(p.key)}
            >
              {loading === p.key ? "Redirecting..." : p.button}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Pricing;
