import React from "react";

const UserAgreement = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">User Agreement</h1>
      <p>
        Welcome to the Moringa Alumni Platform. By accessing or using our
        services, you agree to the following terms and conditions.
      </p>

      <h2 className="text-xl font-semibold mt-4">1. Account Registration</h2>
      <p>
        To access certain features, you must create an account. You are
        responsible for maintaining the confidentiality of your account
        information and are liable for all activities under your account.
      </p>

      <h2 className="text-xl font-semibold mt-4">2. User Conduct</h2>
      <p>
        You agree to use the platform responsibly and not to engage in
        prohibited activities, including but not limited to:
      </p>
      <ul className="list-disc list-inside mt-2">
        <li>Posting harmful, misleading, or offensive content</li>
        <li>Violating any laws or regulations</li>
        <li>Infringing on the rights of others</li>
      </ul>

      <h2 className="text-xl font-semibold mt-4">3. Termination</h2>
      <p>
        We reserve the right to suspend or terminate your account for any
        violations of this agreement or other applicable policies.
      </p>

      <h2 className="text-xl font-semibold mt-4">
        4. Changes to the Agreement
      </h2>
      <p>
        We may update this agreement from time to time. Continued use of the
        platform indicates your acceptance of the updated terms.
      </p>

      <h2 className="text-xl font-semibold mt-4">Contact Us</h2>
      <p>
        If you have any questions about this agreement, contact us at{" "}
        <a href="mailto:support@moringaalumni.com" className="text-blue-500">
          support@moringaalumni.com
        </a>
        .
      </p>
    </div>
  );
};

export default UserAgreement;
