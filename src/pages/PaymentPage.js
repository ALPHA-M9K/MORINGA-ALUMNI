import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./PaymentPage.css";

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const planDetails = location.state?.plan;

  const [paymentMethod, setPaymentMethod] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  if (!planDetails) {
    return (
      <div className="text-center p-8">
        No plan selected. Please select a plan first.
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!paymentMethod) {
      alert("Please select a payment method.");
      return;
    }

    alert(`Processing payment for ${planDetails.name} using ${paymentMethod}`);
    navigate("/");
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold text-center mb-8">
        Complete Your Payment
      </h1>

      {/* Plan Summary */}
      <div className="max-w-sm mx-auto bg-blue-50 p-4 rounded-lg mb-6">
        <h2 className="text-xl font-bold mb-2">Plan Summary</h2>
        <p className="text-lg font-semibold">{planDetails.name}</p>
        <p className="text-gray-600">
          {currency} {planDetails.price[currency]}
        </p>
        <p className="text-sm text-gray-500 mt-2">{planDetails.description}</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="max-w-sm mx-auto bg-white p-6 rounded shadow-lg"
      >
        {/* Personal Information */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-lg font-bold">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-2"
            required
            placeholder="Enter your full name"
          />
        </div>

        {/* Currency Selection */}
        <div className="mb-4">
          <label htmlFor="currency" className="block text-lg font-bold">
            Select Currency
          </label>
          <select
            id="currency"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-2"
            required
          >
            <option value="USD">USD (United States Dollar)</option>
            <option value="KSH">KSH (Kenyan Shilling)</option>
          </select>
        </div>

        {/* Payment Method Selection */}
        <div className="mb-4">
          <label htmlFor="paymentMethod" className="block text-lg font-bold">
            Select Payment Method
          </label>
          <select
            id="paymentMethod"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-2"
            required
          >
            <option value="">Choose Payment Method</option>
            <option value="Card">Credit/Debit Card</option>
            <option value="PayPal">PayPal</option>
            <option value="Mpesa">M-Pesa</option>
          </select>
        </div>

        {/* Conditional Payment Fields */}
        {paymentMethod === "Mpesa" && (
          <div className="mb-4">
            <label htmlFor="mpesaNumber" className="block text-lg font-bold">
              M-Pesa Number
            </label>
            <input
              type="text"
              id="mpesaNumber"
              className="w-full p-2 border border-gray-300 rounded mt-2"
              placeholder="Enter your M-Pesa number"
              required
            />
          </div>
        )}

        {paymentMethod === "PayPal" && (
          <div className="mb-4">
            <label htmlFor="paypalEmail" className="block text-lg font-bold">
              PayPal Email
            </label>
            <input
              type="email"
              id="paypalEmail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-2"
              placeholder="Enter your PayPal email"
              required
            />
          </div>
        )}

        {/* Buttons */}
        <div className="flex flex-col space-y-3">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          >
            Complete Payment
          </button>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="w-full bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400"
          >
            Back
          </button>
        </div>
      </form>
    </div>
  );
};

export default PaymentPage;