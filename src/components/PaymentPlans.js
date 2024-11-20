import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; 
import axios from "axios"; 
import "../App.css"; 

function PaymentPlans() {
  const [currency, setCurrency] = useState("USD"); 
  const [conversionRate, setConversionRate] = useState(140); 

  
  useEffect(() => {
    axios
      .get(
        `https://api.exchangerate-api.com/v4/latest/USD?apikey=98329ff6be1d57838278091d`
      )
      .then((response) => {
        const rate = response.data.rates.KES; 
        setConversionRate(rate); 
      })
      .catch((error) =>
        console.error("Error fetching conversion rate:", error)
      );
  }, []);

  
  const convertToCurrency = (amount) => {
    return currency === "USD" ? amount : amount * conversionRate;
  };

  return (
    <div className="payment-plans-container">
      <h1>Select a Payment Plan</h1>
      <p>Choose the plan that works best for you:</p>

      {/* Currency Toggle */}
      <div className="currency-toggle">
        <button
          onClick={() => setCurrency("USD")}
          className={`mr-4 ${currency === "USD" ? "font-bold" : ""}`}
        >
          USD
        </button>
        <button
          onClick={() => setCurrency("KSH")}
          className={`${currency === "KSH" ? "font-bold" : ""}`}
        >
          KSH
        </button>
      </div>

      {/* Free Plan */}
      <div className="payment-plan">
        <h2>Free Plan (With Ads)</h2>
        <p>No cost, but will include ads in your experience.</p>
        <div className="plan-advantages">
          <h3>Advantages:</h3>
          <ul>
            <li>Free access to basic features</li>
            <li>Ads included</li>
            <li>Ideal for users who don't mind interruptions</li>
          </ul>
        </div>
        <Link to="/select-plan/free">
          <button className="plan-button">Select Free Plan</button>
        </Link>
      </div>

      {/* Paid Plans */}
      <div className="payment-plan">
        <h2>Basic Plan</h2>
        <p>
          {currency === "USD"
            ? "$9.99"
            : `KSH ${convertToCurrency(9.99).toFixed(2)}`}{" "}
          / month
        </p>
        <p>This is a monthly subscription plan. Cancel anytime.</p>
        <div className="plan-advantages">
          <h3>Advantages:</h3>
          <ul>
            <li>No ads, providing a cleaner experience</li>
            <li>Access to essential features</li>
            <li>Cancel anytime with no long-term commitment</li>
          </ul>
        </div>
        <Link to={`/select-plan/basic`}>
          <button className="plan-button">Select Plan</button>
        </Link>
      </div>

      <div className="payment-plan">
        <h2>Standard Plan</h2>
        <p>
          {currency === "USD"
            ? "$49.99"
            : `KSH ${convertToCurrency(49.99).toFixed(2)}`}{" "}
          / 6 months
        </p>
        <p>
          This is a subscription plan billed every 6 months. Cancel anytime.
        </p>
        <div className="plan-advantages">
          <h3>Advantages:</h3>
          <ul>
            <li>No ads, providing a premium experience</li>
            <li>Access to additional features and content</li>
            <li>Lower cost per month when you commit to 6 months</li>
            <li>Cancel anytime without penalties</li>
          </ul>
        </div>
        <Link to={`/select-plan/standard`}>
          <button className="plan-button">Select Plan</button>
        </Link>
      </div>

      <div className="payment-plan">
        <h2>Premium Plan</h2>
        <p>
          {currency === "USD"
            ? "$89.99"
            : `KSH ${convertToCurrency(89.99).toFixed(2)}`}{" "}
          / year
        </p>
        <p>This is a subscription plan billed annually. Cancel anytime.</p>
        <div className="plan-advantages">
          <h3>Advantages:</h3>
          <ul>
            <li>No ads, providing an uninterrupted experience</li>
            <li>Full access to all features and exclusive content</li>
            <li>Best value: save more by committing to an annual plan</li>
            <li>Cancel anytime with full flexibility</li>
            <li>Priority customer support</li>
          </ul>
        </div>
        <Link to={`/select-plan/premium`}>
          <button className="plan-button">Select Plan</button>
        </Link>
      </div>

      <Link to="/settings">
        <button className="back-button">Back to Settings</button>
      </Link>
    </div>
  );
}

export default PaymentPlans;
