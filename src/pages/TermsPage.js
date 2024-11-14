import React from "react";
import { Link } from "react-router-dom";

const TermsPage = () => {
  return (
    <div className="terms-container">
      <h2>Terms and Conditions</h2>
      <p>
        Welcome to Moringa alumni. By accessing and using this platform, you
        agree to the following terms:
      </p>
      <ul>
        <li>
          1. You agree to treat all members with respect and without judgment or
          bias.
        </li>
        <li>
          2. You agree not to engage in any activity that could harm or disrupt
          the community.
        </li>
        <li>
          3. You agree to abide by all rules set forth by the platform and its
          moderators.
        </li>
        <li>
          4. The platform reserves the right to modify these terms at any time.
        </li>
      </ul>

      <h3>Code of Conduct:</h3>
      <p>
        - Be kind, inclusive, and respectful to all members of the Moringa
        alumni community.
        <br />
        - Avoid hate speech, harassment, or any form of discrimination.
        <br />- Uphold the values of diversity, equity, and inclusion.
      </p>

      <p>
        If you do not agree with these terms, please refrain from using Moringa
        alumni.
      </p>

      <Link to="/">Go back to Home</Link>
    </div>
  );
};

export default TermsPage;
