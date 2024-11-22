// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./HomePage.css"; 

// const HomePage = () => {
//   const [news, setNews] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [email, setEmail] = useState("");
//   const [message, setMessage] = useState("");

//   const apiKey = "2825fdb132b948dda60f566dfab8acaf";
//   const pageSize = 16;

//   useEffect(() => {
//     const fetchTechNews = async () => {
//       try {
//         const response = await axios.get(
//           `https://newsapi.org/v2/everything?q=technology&pageSize=${pageSize}&page=${currentPage}&apiKey=${apiKey}`
//         );
//         setNews(response.data.articles);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching tech news:", error);
//         setLoading(false);
//       }
//     };

//     fetchTechNews();
//   }, [currentPage]);

//   const handleNewsletterSubmit = (e) => {
//     e.preventDefault();
//     if (email) {
//       setMessage("Thank you for subscribing to our newsletter!");
//       setEmail("");
//     } else {
//       setMessage("Please enter a valid email address.");
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <h1 style={styles.title}>Welcome to the Moringa Alumni Platform</h1>
//       <p style={styles.subtitle}>Your community of tech enthusiasts and innovators!</p>

//       <h2 style={styles.newsTitle}>Latest Tech News</h2>
//       {loading ? (
//         <p>Loading the latest news...</p>
//       ) : (
//         <div style={styles.newsList}>
//           {news.length > 0 ? (
//             news.map((article, index) => (
//               <div key={index} style={styles.newsItem}>
//                 <img
//                   src={article.urlToImage || "https://via.placeholder.com/150"}
//                   alt={article.title}
//                   style={styles.newsImage}
//                 />
//                 <h3>
//                   <a
//                     href={article.url}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     style={styles.newsLink}
//                   >
//                     {article.title}
//                   </a>
//                 </h3>
//                 <p>{article.description}</p>
//                 <p>
//                   <strong>Source:</strong> {article.source.name}
//                 </p>
//               </div>
//             ))
//           ) : (
//             <p>No news found at the moment.</p>
//           )}
//         </div>
//       )}

//       <div style={styles.pagination}>
//         <button
//           onClick={() => setCurrentPage(currentPage - 1)}
//           disabled={currentPage === 1}
//           style={styles.pageButton}
//         >
//           Previous
//         </button>
//         <span style={styles.pageNumber}>Page {currentPage}</span>
//         <button onClick={() => setCurrentPage(currentPage + 1)} style={styles.pageButton}>
//           Next
//         </button>
//       </div>

//       <section style={styles.newsletterSection}>
//         <h2 style={styles.sectionTitle}>Subscribe to Our Newsletter</h2>
//         <p>Stay updated with the latest news, opportunities, and success stories.</p>
//         <form onSubmit={handleNewsletterSubmit} style={styles.form}>
//           <input
//             type="email"
//             placeholder="Enter your email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             style={styles.input}
//             required
//           />
//           <button type="submit" style={styles.primaryButton}>Subscribe</button>
//         </form>
//         {message && <p>{message}</p>}
//       </section>
//     </div>
//   );
// };

// const styles = {
//   container: {
//     padding: "20px",
//     color: '#333',
//     backgroundColor: '#f4f4f9',
//     fontFamily: 'Arial, sans-serif',
//     maxWidth: '800px',
//     margin: '0 auto',
//   },
//   title: {
//     color: '#007BFF',
//     textAlign: 'center',
//   },
//   subtitle: {
//     color: '#555',
//     textAlign: 'center',
//     marginBottom: '20px',
//   },
//   newsTitle: {
//     color: '#007BFF',
//     marginTop: '40px',
//     fontSize: '1.5em',
//   },
//   newsList: {
//     display: 'flex',
//     flexDirection: 'column',
//     gap: '20px',
//   },
//   newsItem: {
//     backgroundColor: '#fff',
//     padding: '15px',
//     borderRadius: '8px',
//     boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
//   },
//   newsImage: {
//     maxWidth: '100%',
//     borderRadius: '8px',
//   },
//   newsLink: {
//     color: '#FF7F50',
//     fontSize: '1.2em',
//     textDecoration: 'none',
//   },
//   pagination: {
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: '20px',
//   },
//   pageButton: {
//     padding: '10px 15px',
//     backgroundColor: '#007BFF',
//     color: 'white',
//     border: 'none',
//     borderRadius: '5px',
//     margin: '0 10px',
//     cursor: 'pointer',
//     fontWeight: 'bold',
//   },
//   pageNumber: {
//     fontWeight: 'bold',
//   },
//   newsletterSection: {
//     marginTop: '50px',
//     textAlign: 'center',
//   },
//   sectionTitle: {
//     color: '#007BFF',
//   },
//   form: {
//     display: 'flex',
//     flexDirection: 'column',
//     gap: '15px',
//     alignItems: 'center',
//   },
//   input: {
//     padding: '10px',
//     borderRadius: '5px',
//     border: '1px solid #ddd',
//     width: '80%',
//   },
//   primaryButton: {
//     backgroundColor: '#007BFF',
//     color: 'white',
//     padding: '10px 20px',
//     border: 'none',
//     borderRadius: '5px',
//     cursor: 'pointer',
//     fontWeight: 'bold',
//   },
// };

// export default HomePage;


import React, { useState, useEffect } from "react";
import axios from "axios";
import "./HomePage.css";

const apiKey = process.env.REACT_APP_NEWS_API_KEY;

const HomePage = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const pageSize = 16;

  useEffect(() => {
    const fetchTechNews = async () => {
      try {
        const response = await axios.get(
          `https://newsapi.org/v2/everything?q=technology&pageSize=${pageSize}&page=${currentPage}&apiKey=${apiKey}`
        );
        setNews(response.data.articles);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching tech news:", error);
        setLoading(false);
      }
    };

    if (apiKey) {
      fetchTechNews();
    } else {
      console.error("API key is not set");
      setLoading(false);
      setError("API key is not set");
    }
  }, [currentPage, apiKey]);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setMessage("Thank you for subscribing to our newsletter!");
      setEmail("");
    } else {
      setMessage("Please enter a valid email address.");
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Welcome to the Moringa Alumni Platform</h1>
      <p style={styles.subtitle}>
        Your community of tech enthusiasts and innovators!
      </p>

      <h2 style={styles.newsTitle}>Latest Tech News</h2>
      {loading ? (
        <p>Loading the latest news...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div style={styles.newsList}>
          {news.length > 0 ? (
            news.map((article, index) => (
              <div key={index} style={styles.newsItem}>
                <img
                  src={article.urlToImage || "https://via.placeholder.com/150"}
                  alt={article.title}
                  style={styles.newsImage}
                />
                <h3>
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={styles.newsLink}
                  >
                    {article.title}
                  </a>
                </h3>
                <p>{article.description}</p>
                <p>
                  <strong>Source:</strong> {article.source.name}
                </p>
              </div>
            ))
          ) : (
            <p>No news found at the moment.</p>
          )}
        </div>
      )}

      <div style={styles.pagination}>
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          style={styles.pageButton}
        >
          Previous
        </button>
        <span style={styles.pageNumber}>Page {currentPage}</span>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          style={styles.pageButton}
        >
          Next
        </button>
      </div>

      <section style={styles.newsletterSection}>
        <h2 style={styles.sectionTitle}>Subscribe to Our Newsletter</h2>
        <p>
          Stay updated with the latest news, opportunities, and success stories.
        </p>
        <form onSubmit={handleNewsletterSubmit} style={styles.form}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            required
          />
          <button type="submit" style={styles.primaryButton}>
            Subscribe
          </button>
        </form>
        {message && <p>{message}</p>}
      </section>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    color: "#333",
    backgroundColor: "#f4f4f9",
    fontFamily: "Arial, sans-serif",
    maxWidth: "800px",
    margin: "0 auto",
  },
  title: {
    color: "#007BFF",
    textAlign: "center",
  },
  subtitle: {
    color: "#555",
    textAlign: "center",
    marginBottom: "20px",
  },
  newsTitle: {
    color: "#007BFF",
    marginTop: "40px",
    fontSize: "1.5em",
  },
  newsList: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  newsItem: {
    backgroundColor: "#fff",
    padding: "15px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  newsImage: {
    maxWidth: "100%",
    borderRadius: "8px",
  },
  newsLink: {
    color: "#FF7F50",
    fontSize: "1.2em",
    textDecoration: "none",
  },
  pagination: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "20px",
  },
  pageButton: {
    padding: "10px 15px",
    backgroundColor: "#007BFF",
    color: "white",
    border: "none",
    borderRadius: "5px",
    margin: "0 10px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  pageNumber: {
    fontWeight: "bold",
  },
  newsletterSection: {
    marginTop: "50px",
    textAlign: "center",
  },
  sectionTitle: {
    color: "#007BFF",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    alignItems: "center",
  },
  input: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ddd",
    width: "80%",
  },
  primaryButton: {
    backgroundColor: "#007BFF",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default HomePage;


