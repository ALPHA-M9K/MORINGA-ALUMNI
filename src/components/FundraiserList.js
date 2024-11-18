
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchFundraisers } from "../pages/FundraiserSlice";

function FundraiserList() {
  const dispatch = useDispatch();
  const fundraisers = useSelector((state) => state.fundraiser.list);

  useEffect(() => {
    dispatch(fetchFundraisers()); 
  }, [dispatch]);

  return (
    <div>
      <h2>Fundraisers</h2>
      <ul>
        {fundraisers && fundraisers.length > 0 ? (
          fundraisers.map((fundraiser) => (
            <li key={fundraiser.id}>
              <h3>{fundraiser.title}</h3>
              <p>{fundraiser.description}</p>
              <p>Goal: ${fundraiser.goal_amount.toFixed(2)}</p>
              <p>Current: ${fundraiser.current_amount.toFixed(2)}</p>
            </li>
          ))
        ) : (
          <p>No fundraisers available.</p>
        )}
      </ul>
    </div>
  );
}

export default FundraiserList;
