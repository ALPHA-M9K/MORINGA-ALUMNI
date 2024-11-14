// src/components/FundraiserForm.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addFundraiser } from '../pages/fundraiserSlice';

function FundraiserForm() {
    const [name, setName] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [goalAmount, setGoalAmount] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        const fundraiserData = {
            name,
            title,
            description,
            goal_amount: parseFloat(goalAmount),
        };
        dispatch(addFundraiser(fundraiserData)); // Dispatch the action to add the fundraiser
        setName('');
        setTitle('');
        setDescription('');
        setGoalAmount('');
    };

    return (
        <form onSubmit={handleSubmit}>
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
    );
}

export default FundraiserForm;
