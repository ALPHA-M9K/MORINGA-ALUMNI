// import React from 'react';
// import { Link } from 'react-router-dom'; // Assuming you're using React Router

// function LandingPage() {
//     return (
//         <div style={styles.container}>
//             <div style={styles.overlay}>
//                 <header style={styles.header}>
//                     <h1>Welcome to Moringa Alumni Platform</h1>
//                     <p>Connect, Share, Grow! Join the vibrant Moringa alumni community.</p>
//                 </header>

//                 <section style={styles.features}>
//                     <h2>What We Offer</h2>
//                     <div style={styles.featureItem}>
//                         <h3>Success Stories</h3>
//                         <p>Share your journey and inspire others in the Moringa community.</p>
//                     </div>
//                     <div style={styles.featureItem}>
//                         <h3>Fundraisers</h3>
//                         <p>Start or contribute to fundraisers for great causes within the community.</p>
//                     </div>
//                     <div style={styles.featureItem}>
//                         <h3>Mentorship & Co-founders</h3>
//                         <p>Find mentors or co-founders for your next project.</p>
//                     </div>
//                 </section>

//                 <section style={styles.cta}>
//                     <h2>Join the Community</h2>
//                     <p>Don't miss out on the chance to connect with like-minded individuals.</p>
//                     <Link to="/register" style={styles.button}>Sign Up</Link>
//                     <Link to="/login" style={styles.button}>Log In</Link>
//                 </section>
//             </div>
//         </div>
//     );
// }

// const styles = {
//     container: {
//         position: 'relative',
//         minHeight: '100vh',
//         backgroundImage: 'url("https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHdlYiUyMGRldmVsb3BtZW50JTIwYmFja2dyb3VuZHxlbnwwfHwwfHx8MA%3D%3D")',
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//         // filter: 'blur(8px)', // Apply blur effect to the background
//         zIndex: 1,
//         overflow: 'hidden',
//     },
//     overlay: {
//         position: 'absolute',
//         top: 0,
//         left: 0,
//         right: 0,
//         bottom: 0,
//         backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent overlay for better readability
//         zIndex: 2,
//         color: 'white',
//         textAlign: 'center',
//         padding: '20px',
//     },
//     header: {
//         padding: '50px 20px',
//     },
//     features: {
//         marginTop: '40px',
//     },
//     featureItem: {
//         marginBottom: '20px',
//     },
//     cta: {
//         marginTop: '40px',
//     },
//     button: {
//         backgroundColor: '#4CAF50',
//         color: 'white',
//         padding: '15px 30px',
//         textDecoration: 'none',
//         borderRadius: '5px',
//         margin: '10px',
//     },
// };

// export default LandingPage;
// LandingPage Component
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
                    <Link to="/register" style={styles.primaryButton}>Sign Up</Link>
                    <Link to="/login" style={styles.secondaryButton}>Log In</Link>
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
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        zIndex: 2,
        color: 'white',
        textAlign: 'center',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        padding: '50px 20px',
        maxWidth: '600px',
        color: '#ffffff',
    },
    features: {
        marginTop: '40px',
        maxWidth: '600px',
        color: '#ffffff',
    },
    featureItem: {
        marginBottom: '20px',
    },
    cta: {
        marginTop: '40px',
    },
    primaryButton: {
        backgroundColor: '#007BFF',
        color: '#ffffff',
        padding: '15px 30px',
        textDecoration: 'none',
        borderRadius: '5px',
        margin: '10px',
        fontWeight: 'bold',
    },
    secondaryButton: {
        backgroundColor: '#FF7F50',
        color: '#ffffff',
        padding: '15px 30px',
        textDecoration: 'none',
        borderRadius: '5px',
        margin: '10px',
        fontWeight: 'bold',
    },
};

export default LandingPage;

