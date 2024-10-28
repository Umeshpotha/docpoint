
import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-900 text-gray-900 dark:text-white p-6">
      {/* Page Heading */}
      <div className="container mx-auto">
        <h1 className="text-5xl font-bold tracking-wider mb-8 text-sky-600 dark:text-teal-400 text-center">
          Privacy Policy
        </h1>

        {/* Introduction */}
        <section className="mb-10">
          <p className="text-lg text-gray-700 dark:text-gray-300 text-center mb-6">
            Welcome to Doctors Point. This privacy policy explains how we collect, use, and protect your personal information when you use our services. Your privacy is important to us, and we are committed to ensuring the confidentiality and security of your data.
          </p>
        </section>

        {/* Data Collection Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-sky-600 dark:text-teal-400 mb-4">Data Collection</h2>
          <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg shadow-lg">
            <p className="text-gray-700 dark:text-gray-300 text-lg mb-4">
              We collect the following types of data:
            </p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-400">
              <li>Personal Information: Name, email, phone number, etc.</li>
              <li>Health Information: Medical records, doctor appointments, etc.</li>
              <li>Location Data: To find nearby hospitals and doctors.</li>
              <li>Device Information: IP address, browser type, device type.</li>
              <li>Usage Data: Your interactions with the platform.</li>
            </ul>
          </div>
        </section>

        {/* Data Usage Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-sky-600 dark:text-teal-400 mb-4">How We Use Your Data</h2>
          <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg shadow-lg">
            <p className="text-gray-700 dark:text-gray-300 text-lg mb-4">
              We use your data to provide you with the best healthcare services, including:
            </p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-400">
              <li>Scheduling and managing doctor appointments.</li>
              <li>Sending notifications and reminders for upcoming appointments.</li>
              <li>Providing personalized recommendations based on your health data.</li>
              <li>Ensuring real-time synchronization with hospitals for doctor availability and services.</li>
              <li>Improving our platform and services through data analysis.</li>
            </ul>
          </div>
        </section>

        {/* Data Integrity and Security Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-sky-600 dark:text-teal-400 mb-4">Data Integrity and Security</h2>
          <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg shadow-lg">
            <p className="text-gray-700 dark:text-gray-300 text-lg mb-4">
              We are committed to maintaining the integrity and security of your personal information. The following measures are in place to protect your data:
            </p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-400">
              <li><span className="font-semibold">Encryption:</span> All data is encrypted both in transit and at rest using industry-standard encryption protocols (AES-256).</li>
              <li><span className="font-semibold">Access Control:</span> Only authorized personnel have access to sensitive data.</li>
              <li><span className="font-semibold">Regular Audits:</span> We regularly review and audit our security practices to ensure compliance with privacy standards.</li>
              <li><span className="font-semibold">Data Minimization:</span> We only collect data that is necessary for the provision of services and retain it only for as long as needed.</li>
              <li><span className="font-semibold">Two-Factor Authentication (2FA):</span> Users have the option to enable 2FA for an added layer of security.</li>
            </ul>
          </div>
        </section>

        {/* Data Sharing Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-sky-600 dark:text-teal-400 mb-4">Data Sharing</h2>
          <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg shadow-lg">
            <p className="text-gray-700 dark:text-gray-300 text-lg mb-4">
              We do not sell your data to third parties. However, we may share your data under the following circumstances:
            </p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-400">
              <li><span className="font-semibold">With healthcare providers:</span> We share your data with doctors and hospitals to facilitate your appointments and medical services.</li>
              <li><span className="font-semibold">For legal purposes:</span> We may disclose your data to comply with legal obligations or in response to a court order.</li>
              <li><span className="font-semibold">With your consent:</span> We will always seek your permission before sharing your data with third parties for purposes not outlined in this policy.</li>
            </ul>
          </div>
        </section>

        {/* Your Rights Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-sky-600 dark:text-teal-400 mb-4">Your Rights</h2>
          <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg shadow-lg">
            <p className="text-gray-700 dark:text-gray-300 text-lg mb-4">
              You have the right to:
            </p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-400">
              <li>Access your data and request copies of it.</li>
              <li>Request corrections to your data if it is inaccurate or incomplete.</li>
              <li>Delete your account and personal data at any time.</li>
              <li>Object to the processing of your data in certain circumstances.</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
