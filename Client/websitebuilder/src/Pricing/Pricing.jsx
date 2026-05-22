import { IoMdArrowRoundBack } from "react-icons/io";
import Style from "../Pricing/Pricing.module.css";
import { FaCoins } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
function Pricing() {
  const plan = [
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
      description: "For serious creator and freelancer ",
      features: [
        "Everything is in free",
        "Fast generation",
        "Edit and generate",
        "Download source code",
      ],
      popular: true,
      button: "Upradge to pro",
    },
    {
      key: "enterprises",
      name: "enterprises",
      price: "₹1499",
      credits: "1000",
      description: "For team and power user",
      features: [
        "unlimated iterations",
        "Highest priority",
        "Team collabrations",
        "Dedicated support",
      ],
      popular: false,
      button: "Contact sales",
    },
  ];
  const navigate=useNavigate();
  return (
    <>
      <div className={Style.container}>
        <div className={Style.nav}>
          <p onClick={()=>{navigate("/")}}>
            <IoMdArrowRoundBack /> Back
          </p>
        </div>

        <div className={Style.pricingbox}>
          {plan.map((p, i) => {
            return (
              <div key={i} className={p.popular ? Style.popularCard : ""}>
                <h1>{p.key}</h1>
                <h2>{p.description}</h2>

                <div>
                  <span className={Style.pri}>{p.price}</span>
                  <span>/one-Time</span>
                </div>

                <div className={Style.coins}>
                  <p>
                    <FaCoins /> {p.credits} credits
                  </p>
                </div>

                <ul>
                  {p.features.map((m, i) => (
                    <li key={i}>{m}</li>
                  ))}
                </ul>

                <button className={Style.button}>{p.button}</button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Pricing;
