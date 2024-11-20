// import React, { useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// // import { fetchFundraisers } from "../pages/FundraiserSlice";

// function FundraiserList() {
//   const dispatch = useDispatch();
//   const fundraisers = useSelector((state) => state.fundraiser.list);

//   useEffect(() => {
//     dispatch(fetchFundraisers()); 
//   }, [dispatch]);

//   return (
//     <div>
//       <h2>Fundraisers</h2>
//       <ul>
//         {fundraisers && fundraisers.length > 0 ? (
//           fundraisers.map((fundraiser) => (
//             <li key={fundraiser.id}>
//               <h3>{fundraiser.title}</h3>
//               <p>{fundraiser.description}</p>
//               <p>Goal: ${fundraiser.goal_amount.toFixed(2)}</p>
//               <p>Current: ${fundraiser.current_amount.toFixed(2)}</p>
//             </li>
//           ))
//         ) : (
//           <p>No fundraisers available.</p>
//         )}
//       </ul>
//     </div>
//   );
// }

// export default FundraiserList;
// import React, { useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { fetchFundraisers } from "../pages/FundraiserSlice";
// import axios from 'axios';

// function FundraiserList() {
//   const dispatch = useDispatch();
//   const fundraisers = useSelector((state) => state.fundraiser.list);
//   const fundraiserStatus = useSelector((state) => state.fundraiser.status);

//   useEffect(() => {
//     // Only fetch if fundraisers haven't been loaded yet
//     if (fundraiserStatus !== 'succeeded') {
//       dispatch(fetchFundraisers());
//     }
//   }, [dispatch, fundraiserStatus]);

//   // Loading and error states
//   if (fundraiserStatus === 'loading') {
//     return <div>Loading fundraisers...</div>;
//   }

//   if (fundraiserStatus === 'failed') {
//     return <div>Error loading fundraisers</div>;
//   }

//   return (
//     <div>
//       <h2>Fundraisers</h2>
//       <ul>
//         {fundraisers && fundraisers.length > 0 ? (
//           fundraisers.map((fundraiser) => (
//             <li key={fundraiser.id}>
//               <h3>{fundraiser.title}</h3>
//               <p>{fundraiser.description}</p>
//               <p>Goal: ${fundraiser.goal_amount ? fundraiser.goal_amount.toFixed(2) : '0.00'}</p>
//               <p>Current: ${fundraiser.raised_amount ? fundraiser.raised_amount.toFixed(2) : '0.00'}</p>
//             </li>
//           ))
//         ) : (
//           <p>No fundraisers available.</p>
//         )}
//       </ul>
//     </div>
//   );
// }

// export default FundraiserList;
