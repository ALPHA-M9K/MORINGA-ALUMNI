import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid"; // For generating unique IDs

const CreateFundraiser = ({ addFundraiser }) => {
  const navigate = useNavigate();

  // State to hold input values for the new fundraiser
  const [newFundraiser, setNewFundraiser] = useState({
    name: "",
    description: "",
    image: "",
    targetAmount: "",
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewFundraiser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add unique ID to the new fundraiser
    const newFundraiserData = {
      id: uuidv4(),
      ...newFundraiser,
      currentAmount: 0, // Initially set the current amount to 0
    };

    // Call the addFundraiser function to add the new fundraiser to the list
    // addFundraiser(newFundraiserData);

    // Redirect to the fundraiser list after submission
    navigate("/");
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Create a New Fundraiser</h1>

      <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
            Fundraiser Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={newFundraiser.name}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Enter fundraiser name"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="description">
            Fundraiser Description
          </label>
          <textarea
            id="description"
            name="description"
            value={newFundraiser.description}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Enter description"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="image">
            Fundraiser Image URL
          </label>
          <input
            type="url"
            id="image"
            name="image"
            value={newFundraiser.image}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Enter image URL"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="targetAmount">
            Target Amount (USD)
          </label>
          <input
            type="number"
            id="targetAmount"
            name="targetAmount"
            value={newFundraiser.targetAmount}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Enter target amount"
            required
          />
        </div>

        <button
          type='submit'
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700"
        >
          Create Fundraiser
        </button>
      </form>
    </div>
  );
};

export default CreateFundraiser;
