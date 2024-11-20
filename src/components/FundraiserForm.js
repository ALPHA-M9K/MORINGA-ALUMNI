// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { addFundraiser } from "../pages/FundraiserSlice";

// function FundraiserForm() {
//   const [name, setName] = useState("");
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [goalAmount, setGoalAmount] = useState("");
//   const [paymentAmount, setPaymentAmount] = useState("");
//   const [paymentMethod, setPaymentMethod] = useState("mpesa"); 
//   const [fundraisers, setFundraisers] = useState([]); 
//   const dispatch = useDispatch();

//   const handleSubmitFundraiser = (e) => {
//     e.preventDefault();
//     const fundraiserData = {
//       name,
//       title,
//       description,
//       goal_amount: parseFloat(goalAmount),
//     };
//     dispatch(addFundraiser(fundraiserData)); 
//     setFundraisers((prevFundraisers) => [...prevFundraisers, fundraiserData]); 
//     setName("");
//     setTitle("");
//     setDescription("");
//     setGoalAmount("");
//   };

//   const handlePayment = (e) => {
//     e.preventDefault();

//     if (paymentMethod === "mpesa") {
//       alert(`Processing M-Pesa payment of ${paymentAmount}`);
      
//     } else if (paymentMethod === "paypal") {
//       alert(`Processing PayPal payment of ${paymentAmount}`);
      
//     } else {
//       alert("Invalid payment method");
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmitFundraiser} style={styles.form}>
//         <h2>Create a Fundraiser</h2>
//         <input
//           type="text"
//           placeholder="Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />
//         <input
//           type="text"
//           placeholder="Title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//         />
//         <textarea
//           placeholder="Description"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//         />
//         <input
//           type="number"
//           placeholder="Goal Amount"
//           value={goalAmount}
//           onChange={(e) => setGoalAmount(e.target.value)}
//         />
//         <button type="submit">Create Fundraiser</button>
//       </form>

//       <form onSubmit={handlePayment} style={styles.form}>
//         <h2>Make a Donation</h2>
//         <input
//           type="number"
//           placeholder="Donation Amount"
//           value={paymentAmount}
//           onChange={(e) => setPaymentAmount(e.target.value)}
//         />
//         <select
//           value={paymentMethod}
//           onChange={(e) => setPaymentMethod(e.target.value)}
//         >
//           <option value="mpesa">M-Pesa</option>
//           <option value="paypal">PayPal</option>
//           <option value="banktransfer">Bank Transfer</option>
//           <option value="cash">Cash</option>
//         </select>
//         <button type="submit">Donate</button>
//       </form>

//       {/* Display the list of created fundraisers */}
//       <div>
//         <h2>Created Fundraisers</h2>
//         {fundraisers.map((fundraiser, index) => (
//           <div key={index} style={styles.fundraiser}>
//             <h3>{fundraiser.title}</h3>
//             <p>
//               <strong>Organizer:</strong> {fundraiser.name}
//             </p>
//             <p>
//               <strong>Description:</strong> {fundraiser.description}
//             </p>
//             <p>
//               <strong>Goal Amount:</strong> ${fundraiser.goal_amount}
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// const styles = {
//   form: {
//     display: "flex",
//     flexDirection: "column",
//     gap: "10px",
//     marginBottom: "20px",
//   },
//   fundraiser: {
//     border: "1px solid #ddd",
//     padding: "10px",
//     marginBottom: "10px",
//   },
// };

// export default FundraiserForm;

// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { addFundraiser, makeDonation } from "../pages/FundraiserSlice";
// import axios from 'axios';

// function FundraiserForm() {
//   const [name, setName] = useState("");
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [goalAmount, setGoalAmount] = useState("");
//   const [paymentAmount, setPaymentAmount] = useState("");
//   const [paymentMethod, setPaymentMethod] = useState("mpesa");
//   const [fundraisers, setFundraisers] = useState([]); 
//   const [phoneNumber, setPhoneNumber] = useState(""); // Added for M-Pesa
//   const dispatch = useDispatch();

//   const handleSubmitFundraiser = (e) => {
//     e.preventDefault();
//     const fundraiserData = {
//       name,
//       title,
//       description,
//       goal_amount: parseFloat(goalAmount),
//     };
//     dispatch(addFundraiser(fundraiserData)); 
//     setFundraisers((prevFundraisers) => [...prevFundraisers, fundraiserData]); 
//     setName("");
//     setTitle("");
//     setDescription("");
//     setGoalAmount("");
//   };

//   const handlePayment = async (e) => {
//     e.preventDefault();

//     try {
//       // Prepare donation data
//       const donationData = {
//         amount: parseFloat(paymentAmount),
//         payment_method: paymentMethod,
//         // You'll need to add a way to select the specific fundraiser
//         fundraiser_id: 1 // This should be dynamically selected
//       };

//       // Add phone number for M-Pesa
//       if (paymentMethod === "mpesa" && phoneNumber) {
//         donationData.phone_number = phoneNumber;
//       }

//       // Dispatch donation action
//       const response = await dispatch(makeDonation(donationData));

//       // Handle successful donation
//       if (response.payload) {
//         alert(`Successfully donated ${paymentAmount} via ${paymentMethod}`);
//         setPaymentAmount("");
//         setPhoneNumber("");
//       }
//     } catch (error) {
//       console.error("Donation failed:", error);
//       alert("Donation failed. Please try again.");
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmitFundraiser} style={styles.form}>
//         <h2>Create a Fundraiser</h2>
//         <input
//           type="text"
//           placeholder="Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />
//         <input
//           type="text"
//           placeholder="Title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//         />
//         <textarea
//           placeholder="Description"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//         />
//         <input
//           type="number"
//           placeholder="Goal Amount"
//           value={goalAmount}
//           onChange={(e) => setGoalAmount(e.target.value)}
//         />
//         <button type="submit">Create Fundraiser</button>
//       </form>

//       <form onSubmit={handlePayment} style={styles.form}>
//         <h2>Make a Donation</h2>
//         <input
//           type="number"
//           placeholder="Donation Amount"
//           value={paymentAmount}
//           onChange={(e) => setPaymentAmount(e.target.value)}
//         />
//         <select
//           value={paymentMethod}
//           onChange={(e) => setPaymentMethod(e.target.value)}
//         >
//           <option value="mpesa">M-Pesa</option>
//           <option value="paypal">PayPal</option>
//           <option value="banktransfer">Bank Transfer</option>
//           <option value="cash">Cash</option>
//         </select>
//         {paymentMethod === "mpesa" && (
//           <input
//             type="text"
//             placeholder="Phone Number"
//             value={phoneNumber}
//             onChange={(e) => setPhoneNumber(e.target.value)}
//           />
//         )}
//         <button type="submit">Donate</button>
//       </form>

//       {/* Display the list of created fundraisers */}
//       <div>
//         <h2>Created Fundraisers</h2>
//         {fundraisers.map((fundraiser, index) => (
//           <div key={index} style={styles.fundraiser}>
//             <h3>{fundraiser.title}</h3>
//             <p>
//               <strong>Organizer:</strong> {fundraiser.name}
//             </p>
//             <p>
//               <strong>Description:</strong> {fundraiser.description}
//             </p>
//             <p>
//               <strong>Goal Amount:</strong> ${fundraiser.goal_amount}
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// const styles = {
//   form: {
//     display: "flex",
//     flexDirection: "column",
//     gap: "10px",
//     marginBottom: "20px",
//   },
//   fundraiser: {
//     border: "1px solid #ddd",
//     padding: "10px",
//     marginBottom: "10px",
//   },
// };

// export default FundraiserForm;