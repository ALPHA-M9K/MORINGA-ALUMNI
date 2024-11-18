import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const getFundraisers = async () => {
  const response = await axios.get(`${API_URL}/fundraisers`);
  return response.data;
};

export const createFundraiser = async (fundraiserData) => {
  return await axios.post(`${API_URL}/fundraisers`, fundraiserData);
};
