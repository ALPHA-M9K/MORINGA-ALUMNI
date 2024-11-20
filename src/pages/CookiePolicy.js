import React from "react";

const CookiePolicy = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Cookie Policy</h1>
      <p>
        The Moringa Alumni Platform ("we", "us", "our") uses cookies and similar
        technologies to enhance your experience on our website. This policy
        explains what cookies are, how we use them, and your choices regarding
        their use.
      </p>

      <h2 className="text-xl font-semibold mt-4">What Are Cookies?</h2>
      <p>
        Cookies are small text files stored on your device when you visit a
        website. They help the website recognize your device and remember
        information about your visit, such as your preferences and login status.
      </p>

      <h2 className="text-xl font-semibold mt-4">How We Use Cookies</h2>
      <p>
        We use cookies to:
        <ul className="list-disc list-inside mt-2">
          <li>Ensure the website functions properly</li>
          <li>Remember your preferences and login details</li>
          <li>Analyze site traffic and user behavior</li>
          <li>Provide relevant content and advertisements</li>
        </ul>
      </p>

      <h2 className="text-xl font-semibold mt-4">Managing Cookies</h2>
      <p>
        You can control and manage cookies through your browser settings.
        However, disabling certain cookies may impact your experience on our
        site.
      </p>

      <h2 className="text-xl font-semibold mt-4">Contact Us</h2>
      <p>
        If you have questions about our use of cookies, please contact us at{" "}
        <a href="mailto:support@moringaalumni.com" className="text-blue-500">
          support@moringaalumni.com
        </a>
        .
      </p>
    </div>
  );
};

export default CookiePolicy;
