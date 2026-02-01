import React from 'react';
import LegalLayout from '../../layouts/LegalLayout';

export default function Privacy() {
    return (
        <LegalLayout
            title="Privacy Policy"
            lastUpdated="March 1, 2026"
            seoUrl="https://releaf.com/privacy"
        >
            <h2>1. Information We Collect</h2>
            <p>
                We believe in data minimalism. We only collect information that is strictly necessary to process your sustainable order and improve your experience.
            </p>
            <ul>
                <li><strong>Order Information:</strong> Name, shipping address, and payment details (processed securely via Stripe).</li>
                <li><strong>Device Information:</strong> Basic analytics to help us optimize our site for your device.</li>
            </ul>

            <h2>2. How We Use Your Information</h2>
            <p>
                Your data has one purpose: to get a biodegradable case into your hands.
            </p>
            <ul>
                <li>Processing and fulfilling your orders.</li>
                <li>Sending you order updates and tracking information.</li>
                <li>Improving our store functionality.</li>
            </ul>

            <h2>3. Information Sharing</h2>
            <p>
                We do not sell your personal data. Ever. We only share data with essential third-party partners required to run our business:
            </p>
            <ul>
                <li><strong>Shopify/Stripe:</strong> For secure payment processing.</li>
                <li><strong>Shipping Couriers:</strong> To deliver your package.</li>
            </ul>

            <h2>4. Your Rights</h2>
            <p>
                You have the right to request access to the personal information we hold about you and to ask that your personal information be corrected, updated, or deleted.
            </p>
        </LegalLayout>
    );
}
