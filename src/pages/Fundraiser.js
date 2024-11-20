import React, { useState, useEffect } from "react";
import { Link, Route, Routes } from "react-router-dom";
import axios from "axios";
import "./Fundraiser.css";



const Fundraiser = () => {
  const [currency, setCurrency] = useState("USD");
  const [conversionRate, setConversionRate] = useState(129);
  const [fundraisers, setFundraisers] = useState([
    {
      id: 1,
      name: "Fundraiser for Education",
      description: "Help fund education for underprivileged children.",
      image: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=400&auto=format&fit=crop&q=60",
      targetAmount: 5000,
      currentAmount: 1500,
    },
    {
      id: 2,
      name: "Fundraiser for Healthcare",
      description: "Contribute towards healthcare facilities in rural areas.",
      image: "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=400&auto=format&fit=crop&q=60",
      targetAmount: 3000,
      currentAmount: 1800,
    },
    {
      id: 3,
      name: "Fundraiser for Clean Water",
      description: "Help provide clean water to villages in need.",
      image: "https://images.unsplash.com/photo-1538300342682-cf57afb97285?w=400&auto=format&fit=crop&q=60",
      targetAmount: 8000,
      currentAmount: 2000,
    },
  ]);

  useEffect(() => {
    axios
      .get(`https://api.exchangerate-api.com/v4/latest/USD?apikey=98329ff6be1d57838278091d`)
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

  const addFundraiser = (newFundraiser) => {
    setFundraisers((prevFundraisers) => [...prevFundraisers, newFundraiser]);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Fundraisers</h1>

      {/* Currency Toggle */}
      <div className="flex justify-center mb-4">
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {fundraisers.map((fundraiser) => {
          const remainingAmount = fundraiser.targetAmount - fundraiser.currentAmount;
          const progressPercentage = (fundraiser.currentAmount / fundraiser.targetAmount) * 100;

          return (
            <div
              key={fundraiser.id}
              className="max-w-sm rounded overflow-hidden shadow-lg bg-white"
            >
              <img
                src={fundraiser.image || "https://via.placeholder.com/400"}
                alt={fundraiser.name}
                className="w-full h-64 object-cover"
              />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">
                  <strong>Name:</strong> {fundraiser.name}
                </div>
                <div className="text-gray-700 text-base mb-4">
                  <strong>Description:</strong> {fundraiser.description}
                </div>

                {/* Visual Progress Bar */}
                <div className="mb-4">
                  <div className="text-gray-700 mb-2">
                    <strong>Fundraiser Progress</strong>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
                    <div
                      className="h-4 rounded-full"
                      style={{
                        width: `${progressPercentage}%`,
                        backgroundColor:
                          progressPercentage >= 80
                            ? "green"
                            : progressPercentage >= 40
                            ? "yellow"
                            : "red",
                      }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      {currency === "USD" ? "$" : "KSH"}
                      {convertToCurrency(fundraiser.currentAmount).toFixed(2)}
                    </span>
                    <span className="text-gray-600">
                      {currency === "USD" ? "$" : "KSH"}
                      {convertToCurrency(fundraiser.targetAmount).toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Remaining Amount */}
                <div className="text-gray-700 mb-4">
                  <strong>Remaining Amount:</strong>{" "}
                  {currency === "USD" ? "$" : "KSH"}
                  {convertToCurrency(remainingAmount).toFixed(2)}
                </div>

                {/* Donate Button */}
                <Link
                  to={`/donate/${fundraiser.id}`}
                  className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                >
                  Donate Now
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Fundraiser Link */}
      <div className="mt-8 text-center">
        <Link
          to="/create-fundraiser"
          className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-700"
        >
          Create a New Fundraiser
        </Link>
      </div>
    </div>
  );
};

export default Fundraiser;
