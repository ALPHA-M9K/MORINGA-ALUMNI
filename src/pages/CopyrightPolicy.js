import React from "react";

const CopyrightPolicy = () => {
  return (
    <div className="copyright-policy-container">
      <h1>Copyright Policy</h1>
      <p>
        The content on the Moringa Alumni Platform, including but not limited to
        text, graphics, logos, images, and software, is protected by copyright
        law. Unauthorized use, reproduction, or distribution of our content is
        prohibited.
      </p>

      <section>
        <h2>Reporting Copyright Infringement</h2>
        <p>
          If you believe your copyrighted work has been used on our platform
          without your permission, please contact us with the following
          information:
        </p>
        <ul>
          <li>Your name and contact information</li>
          <li>Identification of the copyrighted work</li>
          <li>Details of the infringing content (URL or description)</li>
          <li>
            A statement of your good faith belief that the use is unauthorized
          </li>
          <li>A statement that the information you provide is accurate</li>
        </ul>
      </section>

      <section>
        <h2>Contact Us</h2>
        <p>
          Email us at{" "}
          <a href="mailto:support@moringaalumni.com" className="text-blue-500">
            support@moringaalumni.com
          </a>{" "}
          to report copyright concerns.
        </p>
      </section>
    </div>
  );
};

export default CopyrightPolicy;
