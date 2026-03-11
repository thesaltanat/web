import Head from 'next/head';

const StructuredData = () => {
    const jsonLD = [
        {
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "DevInsight Hub by Sopu",
            "url": "https://devsopu.com/",
            "image": "https://saif.devsopu.com/wp-content/uploads/2023/08/IMG_1025_exported_0-02.jpeg",
            "jobTitle": "Front-end Developer & Blogger",
            "worksFor": {
                "@type": "Organization",
                "name": "DevInsights Hub"
            },
            "sameAs": [
                "https://www.linkedin.com/in/devsopu/",
                "https://github.com/sopu175?tab=repositories",
                "https://twitter.com/devsopu",
                "https://www.facebook.com/saif2456/",
                "https://www.linkedin.com/in/saif2456/"
            ]
        }

    ];

    return (
        <Head>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLD) }}
            />
        </Head>
    );
};

export default StructuredData;
