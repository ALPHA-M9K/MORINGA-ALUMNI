import React from "react";
import { Link } from "react-router-dom";

const AboutPage = () => {
  return (
    <div className="about-container">
      {/* Header Section */}
      <section className="about-header">
        <h1>Welcome to the Moringa Alumni Platform!</h1>
        <p>
          The Moringa Alumni Platform is a community-driven space that connects
          Moringa alumni with each other, fostering a space for collaboration,
          sharing success stories, and growing professionally in the tech world.
        </p>
      </section>

      {/* Mission and Problem Section */}
      <section className="about-content">
        <div className="about-section">
          <h2>Our Mission</h2>
          <p>
            We are committed to bringing together Moringa alumni and creating a
            supportive network that helps individuals reach new heights in their
            professional journey. Whether you’re looking for mentorship,
            co-founders, or simply want to share your success, this platform is
            for you.
          </p>
        </div>

        <div className="about-section">
          <h2>Problem We Are Solving</h2>
          <p>
            Until now, Moringa alumni have lacked a specific space to connect
            with one another. With the Moringa Alumni Platform, we aim to bridge
            that gap, creating a space where alumni can interact and share:
          </p>
          <ul>
            <li>Success stories</li>
            <li>Technical discussions</li>
            <li>Fundraising opportunities</li>
            <li>Collaborations with other developers and co-founders</li>
          </ul>
        </div>
      </section>

      {/* Features Section */}
      <section className="about-features">
        <h2>What You Can Do Here</h2>
        <div className="feature-list">
          <div className="feature-item">
            <h3>Create Posts/Discussions</h3>
            <p>Share your experiences and ask questions in discussions.</p>
          </div>
          <div className="feature-item">
            <h3>Connect in Cohorts/Groups</h3>
            <p>Join or create private or public groups with your peers.</p>
          </div>
          <div className="feature-item">
            <h3>Fundraisers</h3>
            <p>
              Organize or contribute to a fundraiser for a cause or project.
            </p>
          </div>
          <div className="feature-item">
            <h3>Mentorship</h3>
            <p>Find mentors or become one yourself.</p>
          </div>
        </div>
      </section>

      {/* Why Join Section */}
      <section className="about-why-join">
        <h2>Why Join Us?</h2>
        <p>
          Joining the Moringa Alumni Platform allows you to stay connected with
          a network of professionals who share your vision and background.
          You'll gain access to resources, expertise, and opportunities that can
          help you continue to thrive in the tech world.
        </p>
      </section>

      {/* Call to Action Section */}
      <section className="about-cta">
        <h2>Join the Community Today!</h2>
        <p>
          Get started by creating your profile and connecting with fellow
          alumni. Together, we can continue to learn, grow, and succeed in the
          tech industry!
        </p>
        <Link to="/signup" className="cta-button">
          Join Now
        </Link>
      </section>
    </div>
  );
};

export default AboutPage;
