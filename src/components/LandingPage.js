import React from 'react';
import { Link } from 'react-router-dom'; 

function LandingPage() {
    return (
        <div style={styles.container}>
            <div style={styles.overlay}>
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
        </div>
    );
}

const styles = {
    container: {
        position: 'relative',
        minHeight: '100vh',
        backgroundImage: 'url("https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHdlYiUyMGRldmVsb3BtZW50JTIwYmFja2dyb3VuZHxlbnwwfHwwfHx8MA%3D%3D")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        
        zIndex: 1,
        overflow: 'hidden',
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', 
        zIndex: 2,
        color: 'white',
        textAlign: 'center',
        padding: '20px',
    },
    header: {
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
