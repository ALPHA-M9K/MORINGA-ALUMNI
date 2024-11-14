// src/components/LandingPage.js
import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router

function LandingPage() {
    return (
        <div style={styles.container}>
            <header style={styles.header}>
                <h1>Welcome to Moringa Alumni Platform</h1>
                <p>Connect, Share, Grow! Join the vibrant Moringa alumni community.</p>
            </header>

            <section style={styles.features}>
                <h2>What We Offer</h2>
                <div style={styles.featureItem}>
                    <h3>Success Stories</h3>
                    <p>Share your journey and inspire others in the Moringa community.</p>
                </div>
                <div style={styles.featureItem}>
                    <h3>Fundraisers</h3>
                    <p>Start or contribute to fundraisers for great causes within the community.</p>
                </div>
                <div style={styles.featureItem}>
                    <h3>Mentorship & Co-founders</h3>
                    <p>Find mentors or co-founders for your next project.</p>
                </div>
            </section>

            <section style={styles.cta}>
                <h2>Join the Community</h2>
                <p>Don't miss out on the chance to connect with like-minded individuals.</p>
                <Link to="/register" style={styles.button}>Sign Up</Link>
                <Link to="/login" style={styles.button}>Log In</Link>
            </section>
        </div>
    );
}

const styles = {
    container: {
        fontFamily: 'Arial, sans-serif',
        padding: '20px',
        textAlign: 'center',
    },
    header: {
        backgroundColor: '#f7f7f7',
        padding: '50px 20px',
    },
    features: {
        marginTop: '40px',
    },
    featureItem: {
        marginBottom: '20px',
    },
    cta: {
        marginTop: '40px',
    },
    button: {
        backgroundColor: '#4CAF50',
        color: 'white',
        padding: '15px 30px',
        textDecoration: 'none',
        borderRadius: '5px',
        margin: '10px',
    },
};

export default LandingPage;
