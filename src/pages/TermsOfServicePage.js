import React from "react";
import { Link } from "react-router-dom";

const TermsOfServicePage = () => {
  return (
    <div className="terms-container">
      <h2>Moringa Alumni Terms of Service</h2>
      <p>
        Moringa alumni aims to create a community that accepts everyone. By
        using our services, you agree to:
      </p>
      <ul>
        <li>
          1. Treat everyone with respect and without judgment or bias,
          regardless of age, gender, race, religion, national origin, skin
          color, disability, gender identity, or sexual orientation.
        </li>
        <li>
          2. Engage in constructive dialogue, and refrain from any offensive or
          harmful behavior.
        </li>
        <li>
          3. Follow all platform guidelines and contribute positively to the
          community.
        </li>
      </ul>

      <p>
        By agreeing to these Terms of Service, you are committing to cultivating
        an inclusive and respectful environment for all.
      </p>

      <Link to="/">Go back to Home</Link>
    </div>
  );
};

export default TermsOfServicePage;
