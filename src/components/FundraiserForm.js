import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addFundraiser } from '../pages/fundraiserSlice';

function FundraiserForm() {
    const [name, setName] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [goalAmount, setGoalAmount] = useState('');
    const [paymentAmount, setPaymentAmount] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('mpesa'); // Default to M-Pesa
    const [fundraisers, setFundraisers] = useState([]); // State to store fundraiser data
    const dispatch = useDispatch();

    const handleSubmitFundraiser = (e) => {
        e.preventDefault();
        const fundraiserData = {
            name,
            title,
            description,
            goal_amount: parseFloat(goalAmount),
        };
        dispatch(addFundraiser(fundraiserData)); // Dispatch the action to add the fundraiser
        setFundraisers((prevFundraisers) => [...prevFundraisers, fundraiserData]); // Update local state
        setName('');
        setTitle('');
        setDescription('');
        setGoalAmount('');
    };

    const handlePayment = (e) => {
        e.preventDefault();
        // Implement backend API call based on selected payment method
        if (paymentMethod === 'mpesa') {
            alert(`Processing M-Pesa payment of ${paymentAmount}`);
            // Backend API call for M-Pesa here
        } else if (paymentMethod === 'paypal') {
            alert(`Processing PayPal payment of ${paymentAmount}`);
            // Backend API call for PayPal here
        } else {
            alert('Invalid payment method');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmitFundraiser} style={styles.form}>
                <h2>Create a Fundraiser</h2>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Goal Amount"
                    value={goalAmount}
                    onChange={(e) => setGoalAmount(e.target.value)}
                />
                <button type="submit">Create Fundraiser</button>
            </form>

            <form onSubmit={handlePayment} style={styles.form}>
                <h2>Make a Donation</h2>
                <input
                    type="number"
                    placeholder="Donation Amount"
                    value={paymentAmount}
                    onChange={(e) => setPaymentAmount(e.target.value)}
                />
                <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                >
                    <option value="mpesa">M-Pesa</option>
                    <option value="paypal">PayPal</option>
                    <option value="banktransfer">Bank Transfer</option>
                    <option value="cash">Cash</option>
                </select>
                <button type="submit">Donate</button>
            </form>

            {/* Display the list of created fundraisers */}
            <div>
                <h2>Created Fundraisers</h2>
                {fundraisers.map((fundraiser, index) => (
                    <div key={index} style={styles.fundraiser}>
                        <h3>{fundraiser.title}</h3>
                        <p><strong>Organizer:</strong> {fundraiser.name}</p>
                        <p><strong>Description:</strong> {fundraiser.description}</p>
                        <p><strong>Goal Amount:</strong> ${fundraiser.goal_amount}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

const styles = {
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        marginBottom: '20px',
    },
    fundraiser: {
        border: '1px solid #ddd',
        padding: '10px',
        marginBottom: '10px',
    },
};

export default FundraiserForm;
