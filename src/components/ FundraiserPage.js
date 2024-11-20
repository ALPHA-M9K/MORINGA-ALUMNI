import React from 'react';
import FundraiserForm from './FundraiserForm';
import FundraiserList from './FundraiserList';
import './CreateFundraiser.css';

function FundraiserPage() {
    return (
        <div>
            <FundraiserForm />
            <FundraiserList />
        </div>
    );
}

export default FundraiserPage;
