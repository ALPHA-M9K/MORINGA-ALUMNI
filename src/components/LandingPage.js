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
          <Link to="/register" style={styles.button}>Sign Up For Free</Link>
          {/* <Link to="/login" style={styles.button}>Log In</Link> */}
        </section>
      </div>
    </div>
  );
}

const styles = {
  container: {
    position: 'relative',
    minHeight: '100vh',
    background: 'linear-gradient(to right, #007bff, #ff5733)', 
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: 'white',
    padding: '40px 20px',
    boxSizing: 'border-box',
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
    marginBottom: '30px',
  },
  features: {
    marginTop: '40px',
    textAlign: 'center',
  },
  featureItem: {
    marginBottom: '20px',
  },
  cta: {
    marginTop: '40px',
  },
  button: {
    backgroundColor: '#ff5733', 
    color: 'white',
    padding: '15px 30px',
    textDecoration: 'none',
    borderRadius: '5px',
    margin: '10px',
    display: 'inline-block',
    fontSize: '1.2rem',
  },
  h2: {
    fontSize: '2rem',
    marginTop: '30px',
  }
};

export default LandingPage;
