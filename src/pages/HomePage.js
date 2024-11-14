import React, { useState, useEffect } from "react";
import axios from "axios";

const HomePage = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const apiKey = "2825fdb132b948dda60f566dfab8acaf";
  const pageSize = 5;

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

    fetchTechNews();
  }, [currentPage]);

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
    <div className="home-page">
      <h1>Welcome to the Moringa Alumni Platform</h1>
      <p>Your community of tech enthusiasts and innovators!</p>

      <h2>Latest Tech News</h2>
      {loading ? (
        <p>Loading the latest news...</p>
      ) : (
        <div className="news-list">
          {news.length > 0 ? (
            news.map((article, index) => (
              <div key={index} className="news-item">
                {article.urlToImage ? (
                  <img
                    src={article.urlToImage}
                    alt={article.title}
                    className="news-image"
                  />
                ) : (
                  <img
                    src="https://via.placeholder.com/150"
                    alt="Default Image"
                    className="news-image"
                  />
                )}
                <h3>
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
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

      {/* Pagination Controls */}
      <div className="pagination">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>Page {currentPage}</span>
        <button onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
      </div>

      {/* Newsletter Section */}
      <section className="newsletter-section">
        <h2>Subscribe to Our Newsletter</h2>
        <p>
          Stay updated with the latest news, opportunities, and success stories.
        </p>
        <form onSubmit={handleNewsletterSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Subscribe</button>
        </form>
        {message && <p>{message}</p>}
      </section>
    </div>
  );
};

export default HomePage;
