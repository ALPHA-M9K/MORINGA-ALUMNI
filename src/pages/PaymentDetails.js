import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const PaymentDetails = () => {
  const { fundraiserId } = useParams();
  const navigate = useNavigate();

  const [paymentAmount, setPaymentAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [currency, setCurrency] = useState("USD");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!paymentMethod) {
      alert("Please select a payment method.");
      return;
    }

    
    alert(
      `Donating ${paymentAmount} ${currency} using ${paymentMethod} for fundraiser ID ${fundraiserId}`
    );

    
    navigate("/");
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Payment Details</h1>
      <form
        onSubmit={handleSubmit}
        className="max-w-sm mx-auto bg-white p-6 rounded shadow-lg"
      >
        <div className="mb-4">
          <label htmlFor="amount" className="block text-lg font-bold">
            Enter Donation Amount
          </label>
          <div className="flex items-center">
            <span className="text-lg font-bold mr-2">
              {currency === "USD" ? "$" : "KSh"}
            </span>
            <input
              type="number"
              id="amount"
              value={paymentAmount}
              onChange={(e) => setPaymentAmount(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-2"
              placeholder="Amount"
              required
            />
          </div>
        </div>

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
            <option value="M-Pesa">M-Pesa</option>
            <option value="PayPal">PayPal</option>
            <option value="Card">Credit/Debit Card</option>
          </select>
        </div>

        {paymentMethod === "M-Pesa" && (
          <div className="mb-4">
            <label htmlFor="phoneNumber" className="block text-lg font-bold">
              Enter M-Pesa Phone Number
            </label>
            <input
              type="tel"
              id="phoneNumber"
              className="w-full p-2 border border-gray-300 rounded mt-2"
              placeholder="M-Pesa Phone Number"
              required
            />
          </div>
        )}

        {paymentMethod === "PayPal" && (
          <div className="mb-4">
            <label htmlFor="paypalEmail" className="block text-lg font-bold">
              Enter PayPal Email
            </label>
            <input
              type="email"
              id="paypalEmail"
              className="w-full p-2 border border-gray-300 rounded mt-2"
              placeholder="PayPal Email Address"
              required
            />
          </div>
        )}

        {paymentMethod === "Card" && (
          <>
            <div className="mb-4">
              <label htmlFor="cardNumber" className="block text-lg font-bold">
                Card Number
              </label>
              <input
                type="text"
                id="cardNumber"
                className="w-full p-2 border border-gray-300 rounded mt-2"
                placeholder="1234 5678 9012 3456"
                required
              />
            </div>
            <div className="mb-4 flex space-x-4">
              <div className="w-1/2">
                <label
                  htmlFor="expirationDate"
                  className="block text-lg font-bold"
                >
                  Expiration Date
                </label>
                <input
                  type="month"
                  id="expirationDate"
                  className="w-full p-2 border border-gray-300 rounded mt-2"
                  required
                />
              </div>
              <div className="w-1/2">
                <label htmlFor="cvc" className="block text-lg font-bold">
                  CVC
                </label>
                <input
                  type="text"
                  id="cvc"
                  className="w-full p-2 border border-gray-300 rounded mt-2"
                  placeholder="CVC"
                  required
                />
              </div>
            </div>
          </>
        )}

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700"
        >
          Submit Payment
        </button>
      </form>
    </div>
  );
};

export default PaymentDetails;



