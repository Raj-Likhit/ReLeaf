import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function SEO({
    title = 'ReLeaf | The Future of Sustainable Tech',
    description = 'The world\'s first 100% biodegradable premium iPhone case ecosystem. Designed by nature, engineered for life.',
    image = '/hero-social.jpg', // Ensure this exists or use a default
    url = 'https://releaf.com'
}) {
    const siteTitle = 'ReLeaf';

    return (
        <Helmet>
            {/* Primary Meta Tags */}
            <title>{title}</title>
            <meta name="title" content={title} />
            <meta name="description" content={description} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={url} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            <meta property="og:site_name" content={siteTitle} />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={url} />
            <meta property="twitter:title" content={title} />
            <meta property="twitter:description" content={description} />
            <meta property="twitter:image" content={image} />
        </Helmet>
    );
}
