import React from 'react';
import LegalLayout from '../../layouts/LegalLayout';

export default function Terms() {
    return (
        <LegalLayout
            title="Terms of Service"
            lastUpdated="March 1, 2026"
            seoUrl="https://releaf.com/terms"
        >
            <h2>1. Agreement to Terms</h2>
            <p>
                By accessing our website and purchasing our products, you agree to be bound by these Terms of Service. If you do not agree, please do not use our services.
            </p>

            <h2>2. Products and Sustainability</h2>
            <p>
                We strive to display our products as accurately as possible. However, because our cases are made from natural materials (flax shive and biopolymers), slight variations in texture and color are proof of their organic origin.
            </p>

            <h2>3. Purchases</h2>
            <p>
                You agree to provide current, complete, and accurate purchase and account information for all purchases made at our store.
            </p>

            <h2>4. Limitation of Liability</h2>
            <p>
                ReLeaf shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your access to or use of our services.
            </p>

            <h2>5. Governing Law</h2>
            <p>
                These Terms shall be governed by and defined following the laws of Delaware, United States.
            </p>
        </LegalLayout>
    );
}
