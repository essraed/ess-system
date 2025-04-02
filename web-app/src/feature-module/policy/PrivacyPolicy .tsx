import React, { useState } from "react";
import Header from "../common/header";
import Footer from "../common/footer";

const PrivacyPolicy = () => {
  const [accepted, setAccepted] = useState(false);

  const handleAccept = () => {
    setAccepted(true);
    // You can add more actions here, like saving the acceptance to local storage or sending it to a server
  };

  return (
    <>
      <Header />
      <div className="privacy-policy-container">
        <div className="privacy-policy">
          <h2>Privacy Policy for Karama Business Center</h2>
          <p>
            <strong>Effective Date:</strong> [Insert Date]
          </p>

          <p>
            Welcome to Karama Business Center (&quot;we,&quot; &quot;our,&quot;
            &quot;us&quot;). We are committed to protecting your privacy and
            ensuring the security of your personal information. This Privacy
            Policy explains how we collect, use, disclose, and safeguard your
            information when you use our website, mobile application, or
            services (collectively, the &quot;Platform&quot;).
          </p>

          <p>
            By accessing or using our Platform, you agree to the terms of this
            Privacy Policy. If you do not agree with the terms, please do not
            use our Platform.
          </p>

          <h3>1. Information We Collect</h3>
          <p>We may collect the following types of information:</p>
          <ul>
            <li>
              <strong>1.1 Personal Information:</strong> Name, email address,
              phone number, and other contact details, Emirates ID, passport
              number, or other government-issued identification, Payment
              information, Medical information, Vehicle details, etc.
            </li>
            <li>
              <strong>1.2 Usage Data:</strong> IP address, browser type, device
              information, pages visited, time spent, etc.
            </li>
            <li>
              <strong>1.3 Cookies and Tracking Technologies:</strong> We use
              cookies to enhance your experience, analyze trends, and administer
              the Platform.
            </li>
          </ul>

          <h3>2. How We Use Your Information</h3>
          <p>We use your information for the following purposes:</p>
          <ul>
            <li>To provide, operate, and maintain our services.</li>
            <li>To process bookings, payments, and service requests.</li>
            <li>
              To communicate with you regarding your bookings, updates, and
              promotions.
            </li>
            <li>To improve our Platform and services.</li>
            <li>To comply with legal and regulatory requirements.</li>
            <li>To protect the security and integrity of our Platform.</li>
          </ul>

          <h3>3. Sharing Your Information</h3>
          <p>We may share your information with:</p>
          <ul>
            <li>Service Providers</li>
            <li>Government Authorities</li>
            <li>Legal Obligations</li>
            <li>Business Transfers</li>
          </ul>

          <h3>4. Data Security</h3>
          <p>
            We implement appropriate technical and organizational measures to
            protect your information from unauthorized access, disclosure,
            alteration, or destruction. However, no method of transmission over
            the internet or electronic storage is 100% secure.
          </p>

          <h3>5. Your Rights</h3>
          <p>
            Depending on applicable laws, you may have the following rights:
          </p>
          <ul>
            <li>
              Access: Request a copy of the personal information we hold about
              you.
            </li>
            <li>
              Correction: Request corrections to inaccurate or incomplete
              information.
            </li>
            <li>
              Deletion: Request deletion of your personal information, subject
              to legal requirements.
            </li>
            <li>
              Opt-Out: Opt-out of marketing communications or withdraw consent
              for data processing.
            </li>
          </ul>

          <h3>6. Retention of Information</h3>
          <p>
            We retain your personal information only for as long as necessary to
            fulfill the purposes outlined in this Privacy Policy or as required
            by law.
          </p>

          <h3>7. Third-Party Links</h3>
          <p>
            Our Platform may contain links to third-party websites or services.
            We are not responsible for the privacy practices or content of these
            third parties. Please review their privacy policies before providing
            any information.
          </p>

          <h3>8. Children’s Privacy</h3>
          <p>
            Our Platform is not intended for individuals under the age of 18. We
            do not knowingly collect personal information from children. If we
            become aware of such collection, we will take steps to delete the
            information.
          </p>

          <h3>9. Changes to This Privacy Policy</h3>
          <p>
            We may update this Privacy Policy from time to time. Any changes
            will be posted on this page with an updated effective date. Your
            continued use of the Platform constitutes acceptance of the revised
            policy.
          </p>

          <h3>10. Contact Us</h3>
          <p>
            If you have any questions or concerns about this Privacy Policy or
            our data practices, please contact us at:
          </p>
          <ul>
            <li>
              Email: <a href="mailto:customer@ess.ae">customer@ess.ae</a>
            </li>
            <li>Phone: 04 342 6666</li>
            <li>Address: Karama Post Office</li>
          </ul>

          <div className="action-buttons">
            {!accepted ? (
              <button onClick={handleAccept} className="accept-button">
                I Accept
              </button>
            ) : (
              <p>Thank you for accepting our Privacy Policy.</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PrivacyPolicy;
