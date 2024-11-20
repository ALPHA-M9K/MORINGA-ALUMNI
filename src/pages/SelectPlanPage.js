import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../App.css";

function SelectPlanPage() {
  const { planId } = useParams();
  const navigate = useNavigate();
  const [planDetails, setPlanDetails] = useState(null);
  const [currency, setCurrency] = useState("USD"); 

  
  const plans = {
    free: {
      name: "Free Plan",
      price: {
        USD: 0,
        KSH: 0,
      },
      description: "Free access to basic features with ads.",
      advantages: [
        "Free access to basic features",
        "Ads included",
        "Ideal for users who don't mind interruptions",
      ],
    },
    basic: {
      name: "Basic Plan",
      price: {
        USD: 9.99,
        KSH: 1290,
      },
      description: "Basic subscription plan.",
      advantages: [
        "No ads",
        "Access to essential features",
        "Cancel anytime with no long-term commitment",
      ],
    },
    standard: {
      name: "Standard Plan",
      price: {
        USD: 49.99,
        KSH: 6455,
      },
      description: "Standard subscription plan.",
      advantages: [
        "No ads",
        "Access to additional features",
        "Cancel anytime without penalties",
      ],
    },
    premium: {
      name: "Premium Plan",
      price: {
        USD: 89.99,
        KSH: 11620,
      },
      description: "Premium subscription plan.",
      advantages: [
        "No ads",
        "Full access to all features",
        "Priority customer support",
      ],
    },
  };

  useEffect(() => {
    setPlanDetails(plans[planId]);
  }, [planId]);

  if (!planDetails) {
    return <div>Loading...</div>;
  }

  const handleProceedToPayment = () => {
    navigate(`/payment-page`, { state: { plan: planDetails } });
  };

  return (
    <div className="select-plan-container">
      <h1>{planDetails.name}</h1>
      <p>{planDetails.description}</p>
      <h3>
        Price:{" "}
        {currency === "USD"
          ? `$${planDetails.price.USD}`
          : `KSH ${planDetails.price.KSH}`}
      </h3>
      <h3>Advantages:</h3>
      <ul>
        {planDetails.advantages.map((advantage, index) => (
          <li key={index}>{advantage}</li>
        ))}
      </ul>
      <div className="currency-switch">
        <button onClick={() => setCurrency("USD")}>USD</button>
        <button onClick={() => setCurrency("KSH")}>KSH</button>
      </div>
      <button className="plan-button" onClick={handleProceedToPayment}>
        Proceed to Payment
      </button>
      <button
        className="back-button"
        onClick={() => navigate("/payment-plans")}
      >
        Back to Plans
      </button>
    </div>
  );
}

export default SelectPlanPage;
